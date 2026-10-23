import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import { projects } from "../../shared/content.js";
import { listMessages, saveMessage } from "./store.js";
import { validateMessage } from "./validate.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 5000;
const adminToken = process.env.ADMIN_TOKEN || (process.env.NODE_ENV === "production" ? "" : "adarsh-inbox");

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN, "http://localhost:5173"].filter(Boolean),
  })
);
app.use(express.json({ limit: "32kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({ error: "Too many messages. Please try again in a little while." });
  },
});

function tokensMatch(provided, expected) {
  if (!provided || !expected) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function requireAdmin(req, res, next) {
  if (!tokensMatch(req.get("x-admin-token") || "", adminToken)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? "mongo" : "file",
  });
});

app.get("/api/projects", (_req, res) => {
  res.json(projects);
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  if (String(req.body?.company_url || "").trim()) {
    return res.json({ ok: true });
  }

  const result = validateMessage(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  try {
    await saveMessage(result.value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not save that message." });
  }
});

app.get("/api/messages", requireAdmin, async (_req, res) => {
  try {
    const messages = await listMessages();
    return res.json({ messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not load messages." });
  }
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

const distDir = path.join(__dirname, "../../client/dist");
if (process.env.NODE_ENV === "production" && fs.existsSync(path.join(distDir, "index.html"))) {
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    console.log("MONGO_URI is not set. Messages will be saved in server/data/messages.json.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error(`MongoDB connection failed. Using the file store instead. ${error.message}`);
  }
}

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
    if (process.env.NODE_ENV !== "production") {
      console.log(`Inbox: http://localhost:5173/inbox`);
      console.log(`Inbox token: ${adminToken || "(set ADMIN_TOKEN)"}`);
    }
  });
});
