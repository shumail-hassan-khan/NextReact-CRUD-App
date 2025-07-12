# 🛠️ Backend - NXTREACT CRUD APP

This is the backend of the CRUD application built using **Next.js API Routes** and **Prisma ORM** for PostgreSQL database interaction.

---

## 🚀 Features

- RESTful APIs using Next.js API routes
- Integrated Prisma ORM with PostgreSQL
- Input validation & error handling
- Soft delete support
- CORS enabled for frontend communication

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/)

---

## ⚙️ Setup Instructions (All Commands)

### 1. Move to backend directory

```bash
cd backend


npm install

DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<your-db-name>"


npx prisma generate


npx prisma migrate dev --name init


npm run dev
