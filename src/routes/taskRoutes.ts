import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const router = Router();

/**
 * GET all tasks
 */
router.get("/tasks", async (_, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET a single task by ID
 */
router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Task ID is required" });
      return
    }

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST: Create a new task
 */
router.post("/tasks", async (req, res) => {
  try {
    const { title, color } = req.body;

    if (!title || !color) {
      res.status(400).json({ error: "Title and color are required" });
      return
    }

    const task = await prisma.task.create({
      data: { title, color, completed: false },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PUT: Update a task by ID
 */
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, color, completed } = req.body;

    if (!id) {
      res.status(400).json({ error: "Task ID is required" });
      return
    }

    const existingTask = await prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      res.status(404).json({ error: "Task not found" });
      return
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, color, completed },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * DELETE: Remove a task by ID
 */
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Task ID is required" });
      return
    }

    const existingTask = await prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      res.status(404).json({ error: "Task not found" });
      return
    }

    await prisma.task.delete({ where: { id } });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
