# Wallet Lab

A React + TypeScript + Vite frontend application integrated with ethers.js v6 and Zustand for Ethereum wallet functionality.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Modern React with hooks
- 🔷 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - High-quality React components
- 🦊 **ethers.js v6** - Ethereum library for blockchain interaction
- 🐻 **Zustand** - Lightweight state management
- 🛣️ **React Router** - Client-side routing

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Blockchain**: ethers.js v6 (Mainnet + Sepolia support)
- **State Management**: Zustand
- **Backend API**: Your Fastify backend with CORS enabled

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kedao/wallet-lab.git
cd wallet-lab
```

2. Install dependencies:
```bash
npm install
```

3. Install shadcn/ui components:
```bash
npx shadcn@latest add button card
```

4. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your backend API:
```env
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://localhost:3000
```

Note: All blockchain RPC requests are proxied through the backend API.

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
wallet-lab/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   ├── config/
│   │   └── constants.ts     # Chain IDs and names
│   ├── lib/
│   │   ├── ethers/          # ethers.js utilities
│   │   │   ├── providers.ts
│   │   │   ├── utils.ts
│   │   │   ├── types.ts
│   │   │   └── contracts.ts # Reserved for TypeChain
│   │   ├── api.ts           # API client
│   │   └── utils.ts         # Helper functions
│   ├── pages/
│   │   └── Welcome.tsx      # Welcome page
│   ├── stores/
│   │   ├── useWalletStore.ts
│   │   └── index.ts
│   ├── App.tsx              # Router configuration
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Type declarations
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `/api` (dev), `https://your-api.example.com` (prod) |
| `VITE_API_PROXY_TARGET` | Backend server for dev proxy | `http://localhost:3000` |

**Note**: All Ethereum RPC requests are handled by the backend API. No direct RPC configuration needed in frontend.

## Development Roadmap

- [x] Project setup with React + Vite + TypeScript
- [x] Tailwind CSS + shadcn/ui integration
- [x] ethers.js v6 provider setup
- [x] Zustand state management
- [ ] Wallet connection (MetaMask, WalletConnect) - Future implementation
- [ ] TypeChain integration for contract type generation
- [ ] Transaction management
- [ ] Multi-chain support expansion

## License

Apache License 2.0 - See [LICENSE](LICENSE) file for details

## Repository

- **Owner**: Kedao
- **Repository**: [wallet-lab](https://github.com/Kedao/wallet-lab)
- **Branch**: main
