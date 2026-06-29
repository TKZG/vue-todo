import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const existingTodos = [
  {
    id: 1,
    text: "Learn TypeScript",
    completed: false
  },
  {
    id: 2,
    text: "Build a simple API",
    completed: false
  }
];

async function migrate() {
    try {
        console.log("Starting migration...");

        for (const todo of existingTodos) {
            await prisma.todo.create({
                data: {
                    text: todo.text,
                    completed: todo.completed
                },
            })
        }
        console.log(`✅ Migrated ${existingTodos.length} todos`)
    } catch (err) {
        console.error('❌ Migration failed:', err)
    } finally {
        await prisma.$disconnect
    }
}

migrate()