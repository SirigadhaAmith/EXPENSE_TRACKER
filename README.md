# EXPENSE_TRACKER




---

React + TypeScript + Vite + Tailwind Project Setup Guide ⚡

Welcome to your modern web development setup using React, TypeScript, Vite, and Tailwind CSS! This guide will walk you through everything you need to get up and running smoothly.


---

📦 Prerequisites

Before you begin, make sure you have the following installed:

Node.js (v16 or higher) – Download from nodejs.org

Code Editor – Visual Studio Code is recommended for the best experience



---

🚀 Initial Setup

1. Install TypeScript & React Type Definitions

npm install typescript @types/react @types/react-dom


2. Install Tailwind CSS and Dependencies

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


3. Install Required Packages
(Ensure you're in the root folder where package.json is located)

npm install




---

🧩 Included Dependencies

These are already listed in your package.json:

react

react-dom

lucide-react – Icon set

recharts – Charting library

@fingerprintjs/fingerprintjs – Browser fingerprinting

vite – Build tool

typescript

tailwindcss

postcss

autoprefixer

eslint & related plugins – For code linting



---

💻 Start Development Server

Run the app locally:

npm run dev

This will start the Vite dev server, and your application should be available at:

http://localhost:5173 (or a similar port)


---

📁 Project Structure

/src              -> Source code
  /components     -> Reusable React components
  /utils          -> Helper utility functions
  /types          -> TypeScript type definitions

index.html        -> HTML entry point
vite.config.ts    -> Vite configuration
tailwind.config.js -> Tailwind CSS configuration


---

✨ Features

Instant HMR (Hot Module Replacement) with Vite

Utility-first styling using Tailwind CSS

Strong typing with TypeScript

Enhanced visuals with Lucide Icons & Recharts

Device fingerprinting using FingerprintJS

Linting support via ESLint



---

⚙ Tips

Use CTRL + SPACE in VS Code for auto-suggestions.

Use npm run lint (if configured) to find and fix code issues.



---

Happy coding! Made with love and clean code.
Feel free to contribute and explore more features! ✨


