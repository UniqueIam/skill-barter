# 🔄 Team Members Details ( team name- VORTEX )

Gaurav Tiwari - gauravtiwari2509@gmail.com
Vivek Kumar Tiwari - vivektiwarii4545@gmail.com
Abhimanyu Kumar - abhimanyukumar83097@gmail.com

# 🔄 Skill Swap Platform

A modern full-stack web application that enables users to **offer and request skills**, facilitating a peer-to-peer learning ecosystem through skill-based collaboration.

---

## ⚙️ Tech Stack Overview

### 🧩 Frontend

- **Next.js 14 (App Router)** — Full-stack React framework with file-based routing and server components.
- **TypeScript** — Strong static typing for scalable and maintainable code.
- **Tailwind CSS** — Utility-first CSS framework for rapid UI development.
- **React Hook Form + Zod** — Performant form management with schema-based validation.
- **TanStack Query (React Query)** — Efficient data fetching and caching strategy for API interaction.

---

### 🔐 Authentication

- **NextAuth.js** — Secure and flexible authentication solution.
- (Optional: Fallback to custom JWT auth if needed.)

---

### 🗃 Database & ORM

- **PostgreSQL** — Powerful, production-grade relational database.
- **Prisma ORM** — Type-safe and intuitive ORM for database interaction.

---

### 🧠 Backend & API

- **Next.js API Routes / Server Actions** — Used to build secure and scalable backend logic within the app structure.

## PROJECT SETUP
## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gauravtiwari2509/skill-barter-odoo.git
cd skill-barter
```

### 2. Install Dependencies and Configure Environment

```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install
```

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/skllbarter"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
NEXTAUTH_SECRET="your-nextauth-secret"
```

> 📌 Make sure to use an App Password for Gmail (not your actual Gmail password).

---

### 3. Set Up the Database

Run the following commands to create and migrate your PostgreSQL database:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### 4. Start the Development Server

```bash
pnpm dev
# OR
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

---

## 🧪 Testing the Flow

- Use your email to register.
- Check your inbox for the OTP email.
- Enter the OTP to verify and activate your account.
- Start using the skill barter system.

---

## 📦 Deployment

You can deploy the app easily to [Vercel](https://vercel.com/).

Make sure to set the same environment variables (`DATABASE_URL`, `EMAIL_USER`, `EMAIL_PASS`, `NEXTAUTH_SECRET`) in your Vercel project settings.

---

## 👨‍💻 Author

**Gaurav Tiwari**
🔗 [LinkedIn](https://linkedin.com/in/gaurav-tiwari-121a77258)
🐙 [GitHub](https://github.com/gauravtiwari2509)

