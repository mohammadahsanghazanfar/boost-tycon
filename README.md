# BOSSTYCOON Agency Website

A high-end, modern digital marketing and creative agency website built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **Vite** — fast dev server & build tool
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion / GSAP** — animations
- **Radix UI** — accessible UI primitives
- **Express** — static file server for production
- **Lucide React** — icons

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repo
git clone https://github.com/mohammadahsanghazanfar/boost-tycon.git
cd boost-tycon

# Install dependencies
npm install
```

### Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set:

```
PORT=3000
```

### Development

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
boost-tycon/
├── src/
│   ├── components/     # All React components
│   ├── assets/         # Images and static assets
│   ├── data/           # Mock/static data
│   ├── lib/            # Utility functions
│   ├── types.ts        # TypeScript types
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
├── server.js           # Express production server
└── package.json
```

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Serve production build |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type check |

## 📄 License

MIT
