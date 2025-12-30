## Plan: 搭建 React + TypeScript + Vite + ethers.js v6 + Zustand 前端项目（最终版）

为空白的 `wallet-lab` 仓库创建完整的 React + TypeScript + Vite 前端项目，集成 shadcn/ui + Tailwind CSS + ethers.js v6 + Zustand，支持 Mainnet + Sepolia，开发代理后端 API，生产环境直接 CORS 调用。

### Steps

1. **创建项目基础配置** — 创建 `package.json`（React 18、TypeScript、Vite、ethers ^6.13.0、zustand ^4.5.0、react-router-dom、shadcn/ui 依赖）、`.gitignore`（node_modules、dist、.env.local）、`README.md`、`index.html`、`.env.example`（VITE_API_URL、VITE_RPC_URL_MAINNET、VITE_RPC_URL_SEPOLIA）

2. **配置 TypeScript 和 Vite** — 创建 `tsconfig.json`（strict mode、路径别名）、`tsconfig.node.json`（Vite 配置文件类型）、`vite.config.ts`（`@/` → `src/`、开发代理 `/api` → `https://api.luchaopeng.com`、生产环境无代理）

3. **集成 Tailwind 和 shadcn/ui 配置** — 创建 `tailwind.config.js`（内容路径、主题扩展）、`postcss.config.js`、`components.json`（shadcn/ui 配置：style default、tsx、tailwind css variables）、`src/lib/utils.ts`（clsx + tailwind-merge 的 cn 函数）、`src/index.css`（@tailwind 指令和 CSS 变量）

4. **搭建 ethers.js v6 基础架构** — 创建 `src/config/constants.ts`（Mainnet/Sepolia 链 ID 和 RPC URLs）、`src/lib/ethers/types.ts`（WalletState 接口）、`src/lib/ethers/providers.ts`（createReadOnlyProvider 函数）、`src/lib/ethers/utils.ts`（formatEther/parseEther 封装）、`src/lib/ethers/contracts.ts`（空文件，注释预留 TypeChain）

5. **创建 Zustand 状态管理** — 创建 `src/stores/useWalletStore.ts`（状态：address、chainId、provider、isConnected、balance，预留 connect/disconnect/switchNetwork actions 接口注释）、`src/stores/index.ts`（export useWalletStore）

6. **搭建 React 应用和路由** — 创建 `src/vite-env.d.ts`（Vite 类型声明）、`src/main.tsx`（ReactDOM.createRoot 挂载）、`src/App.tsx`（BrowserRouter + Routes 配置 / 路由）、`src/pages/Welcome.tsx`（使用 shadcn Button/Card 展示项目信息和 wallet store 连接状态）

7. **配置 API 客户端层** — 创建 `src/lib/api.ts`（基于 `import.meta.env.VITE_API_URL` 的 fetch 封装，错误处理和类型定义）、`.env.development`（VITE_API_URL=/api 指向本地代理）、`.env.production.example`（VITE_API_URL=https://api.luchaopeng.com 直接 CORS）

8. **初始化 shadcn/ui 组件** — 在 README.md 中添加命令说明：`npx shadcn@latest add button card`，用于安装到 `src/components/ui/button.tsx` 和 `src/components/ui/card.tsx`

### Further Considerations

1. **依赖安装顺序** — 建议先运行 `npm install` 安装基础依赖，再执行 `npx shadcn@latest add` 安装 UI 组件（shadcn CLI 需要检测项目配置）

2. **环境变量管理** — `.env.local` 不提交到 Git，开发者需复制 `.env.example` 并填入实际 RPC API keys（如 Alchemy/Infura）

3. **Provider 初始化时机** — Welcome 页面是否在组件挂载时自动初始化只读 Provider，还是按需创建？（推荐：延迟到用户交互时创建，避免不必要的网络请求）