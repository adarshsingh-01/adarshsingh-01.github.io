const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateMessage(body = {}) {
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const message = String(body.message || "").trim();

  if (name.length < 2 || name.length > 80) {
    return { error: "Please add your name." };
  }
  if (!emailPattern.test(email) || email.length > 120) {
    return { error: "That email does not look right." };
  }
  if (company.length > 120) {
    return { error: "Company name is too long." };
  }
  if (message.length < 10 || message.length > 2000) {
    return { error: "Please write a message of at least a sentence." };
  }

  return { value: { name, email, company, message } };
}
