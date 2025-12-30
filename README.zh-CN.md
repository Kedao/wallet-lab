# Wallet Lab

[English](README.md) | 简体中文

一个集成 ethers.js v6 和 Zustand 的 React + TypeScript + Vite 前端应用，用于以太坊钱包功能开发。

## 特性

- ⚡ **Vite** - 快速构建工具和开发服务器
- ⚛️ **React 18** - 现代 React Hooks
- 🔷 **TypeScript** - 类型安全
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🧩 **shadcn/ui** - 高质量 React 组件库
- 🦊 **ethers.js v6** - 以太坊区块链交互库
- 🐻 **Zustand** - 轻量级状态管理
- 🛣️ **React Router** - 客户端路由

## 技术栈

- **前端**: React 18, TypeScript, Vite
- **样式**: Tailwind CSS, shadcn/ui
- **区块链**: ethers.js v6 (支持 Mainnet + Sepolia)
- **状态管理**: Zustand
- **后端 API**: 支持 CORS 的 Fastify 后端

## 快速开始

### 环境要求

- Node.js >= 18.x
- npm 或 yarn

### 安装

1. 克隆仓库：
```bash
git clone https://github.com/Kedao/wallet-lab.git
cd wallet-lab
```

2. 安装依赖：
```bash
npm install
```

3. 安装 shadcn/ui 组件：
```bash
npx shadcn@latest add button card
```

4. 设置环境变量：
```bash
cp .env.example .env.local
```

编辑 `.env.local` 配置后端 API：
```env
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://localhost:3000
```

注意：所有区块链 RPC 请求通过后端 API 代理。

### 开发

启动开发服务器：
```bash
npm run dev
```

应用将在 `http://localhost:5173` 运行

### 构建

构建生产版本：
```bash
npm run build
```

预览生产构建：
```bash
npm run preview
```

## 项目结构

```
wallet-lab/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui 组件
│   ├── config/
│   │   └── constants.ts     # 链 ID 和名称
│   ├── lib/
│   │   ├── ethers/          # ethers.js 工具
│   │   │   ├── providers.ts
│   │   │   ├── utils.ts
│   │   │   ├── types.ts
│   │   │   └── contracts.ts # 预留 TypeChain
│   │   ├── api.ts           # API 客户端
│   │   └── utils.ts         # 辅助函数
│   ├── pages/
│   │   └── Welcome.tsx      # 欢迎页面
│   ├── stores/
│   │   ├── useWalletStore.ts
│   │   └── index.ts
│   ├── App.tsx              # 路由配置
│   ├── main.tsx             # 入口文件
│   ├── index.css            # 全局样式
│   └── vite-env.d.ts        # 类型声明
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `VITE_API_URL` | 后端 API 地址 | `/api` (开发), `https://your-api.example.com` (生产) |
| `VITE_API_PROXY_TARGET` | 开发代理目标服务器 | `http://localhost:3000` |

**注意**：所有以太坊 RPC 请求由后端 API 处理，前端无需直接配置 RPC。

## 开发路线图

- [x] React + Vite + TypeScript 项目搭建
- [x] Tailwind CSS + shadcn/ui 集成
- [x] ethers.js v6 provider 设置
- [x] Zustand 状态管理
- [ ] 钱包连接 (MetaMask, WalletConnect) - 未来实现
- [ ] TypeChain 集成生成合约类型
- [ ] 交易管理
- [ ] 多链支持扩展

## 许可证

Apache License 2.0 - 详见 [LICENSE](LICENSE) 文件

## 仓库信息

- **所有者**: Kedao
- **仓库**: [wallet-lab](https://github.com/Kedao/wallet-lab)
- **分支**: main
