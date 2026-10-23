import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../data/messages.json");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: "" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

function usingMongo() {
  return mongoose.connection.readyState === 1;
}

function toPublic(entry) {
  return {
    id: entry.id || String(entry._id),
    name: entry.name,
    email: entry.email,
    company: entry.company || "",
    message: entry.message,
    createdAt: entry.createdAt,
  };
}

async function readFileStore() {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveMessage(value) {
  if (usingMongo()) {
    const saved = await Message.create(value);
    return toPublic(saved);
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const messages = await readFileStore();
  const entry = {
    id: crypto.randomUUID(),
    ...value,
    createdAt: new Date().toISOString(),
  };
  messages.unshift(entry);
  await fs.writeFile(filePath, JSON.stringify(messages.slice(0, 500), null, 2));
  return toPublic(entry);
}

export async function listMessages() {
  if (usingMongo()) {
    const docs = await Message.find().sort({ createdAt: -1 }).limit(200).lean();
    return docs.map(toPublic);
  }
  return readFileStore();
}
