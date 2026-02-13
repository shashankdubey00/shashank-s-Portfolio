import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogsFile = path.join(__dirname, "data", "blogs.json");
const adminSecret = process.env.BLOG_ADMIN_SECRET || "";

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(express.json());

async function ensureBlogsFile() {
  await fs.mkdir(path.dirname(blogsFile), { recursive: true });

  try {
    await fs.access(blogsFile);
  } catch {
    await fs.writeFile(blogsFile, "[]", "utf8");
  }
}

async function readBlogs() {
  await ensureBlogsFile();
  const raw = await fs.readFile(blogsFile, "utf8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeBlogs(blogs) {
  await ensureBlogsFile();
  await fs.writeFile(blogsFile, JSON.stringify(blogs, null, 2), "utf8");
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return String(tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function requireAdminSecret(req, res, next) {
  if (!adminSecret) {
    return res.status(503).json({
      message: "Admin secret is not configured on server. Set BLOG_ADMIN_SECRET to enable blog writes."
    });
  }

  const provided = req.header("x-admin-secret");
  if (!provided || provided !== adminSecret) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  next();
}

app.get("/api/blogs", async (_req, res) => {
  try {
    const blogs = await readBlogs();
    blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Failed to load blogs." });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blogs = await readBlogs();
    const blog = blogs.find((item) => item.id === req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.json(blog);
  } catch {
    res.status(500).json({ message: "Failed to load blog." });
  }
});

app.post("/api/blogs", requireAdminSecret, async (req, res) => {
  const { title, summary, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const blogs = await readBlogs();
    const now = new Date().toISOString();

    const post = {
      id: randomUUID(),
      title: String(title).trim(),
      summary: String(summary || "").trim(),
      content: String(content).trim(),
      tags: normalizeTags(tags),
      createdAt: now,
      updatedAt: now
    };

    blogs.push(post);
    await writeBlogs(blogs);

    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Failed to publish blog." });
  }
});

app.put("/api/blogs/:id", requireAdminSecret, async (req, res) => {
  const { id } = req.params;
  const { title, summary, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const blogs = await readBlogs();
    const index = blogs.findIndex((blog) => blog.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Blog not found." });
    }

    const existing = blogs[index];
    const updated = {
      ...existing,
      title: String(title).trim(),
      summary: String(summary || "").trim(),
      content: String(content).trim(),
      tags: normalizeTags(tags),
      updatedAt: new Date().toISOString()
    };

    blogs[index] = updated;
    await writeBlogs(blogs);

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update blog." });
  }
});

app.listen(port, () => {
  console.log(`Portfolio API running on http://localhost:${port}`);
});