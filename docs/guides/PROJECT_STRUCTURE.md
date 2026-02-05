Project Structure Document

# 1. Repository Structure

```
The project follows a monorepo structure with separate client and server directories:

agri-scheme-eligibility/
├── client/                  # React + TypeScript frontend
├── server/                  # Node.js + TypeScript backend
├── packages/
│   └── types/               # Shared TypeScript types
├── docs/                    # Documentation
├── scripts/                 # Build, deployment and utility scripts
├── .github/                 # GitHub Actions CI/CD
├── docker-compose.yml	# Local development setup
├── .gitignore
├── tsconfig.base.json       # Base TypeScript configuration
├── README.md
└── LICENSE
```

# 2. Client (Frontend) Structure

```
client/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
│   ├── robots.txt
│   └── assets/
│       ├── icons/           
│       └── images/
├── src/
│   ├── index.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   ├── routes/
│   │   └── index.tsx
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   ├── Home.module.css
│   │   │   └── types.ts
│   │   ├── ProfileInput/
│   │   │   ├── ProfileInput.tsx
│   │   │   ├── VoiceInput.tsx
│   │   │   ├── FormInput.tsx
│   │   │   ├── types.ts
│   │   │   └── ProfileInput.module.css
│   │   ├── Results/
│   │   │   ├── Results.tsx
│   │   │   ├── SchemeCard.tsx
│   │   │   ├── ProofViewer.tsx
│   │   │   ├── types.ts
│   │   │   └── Results.module.css
│   │   ├── SchemeDetail/
│   │   │   ├── SchemeDetail.tsx
│   │   │   ├── CitationCard.tsx
│   │   │   ├── types.ts
│   │   │   └── SchemeDetail.module.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── types.ts
│   │   │   └── Dashboard.module.css
│   │   ├── Profile/
│   │   │   ├── Profile.tsx
│   │   │   ├── types.ts
│   │   │   └── Profile.module.css
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── types.ts
│   │   │   └── Auth.module.css
│   │   └── NotFound/
│   │       └── NotFound.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Input.module.css
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Card.module.css
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Modal.module.css
│   │   │   ├── Loader/
│   │   │   │   ├── Loader.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Loader.module.css
│   │   │   └── ErrorBoundary/
│   │   │       └── ErrorBoundary.tsx
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Header.module.css
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Footer.module.css
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── Sidebar.module.css
│   │   │   └── Layout/
│   │   │       ├── Layout.tsx
│   │   │       ├── types.ts
│   │   │       └── Layout.module.css
│   │   └── features/
│   │       ├── VoiceRecorder/
│   │       │   ├── VoiceRecorder.tsx
│   │       │   ├── useVoiceRecognition.ts
│   │       │   ├── types.ts
│   │       │   └── VoiceRecorder.module.css
│   │       ├── LanguageSelector/
│   │       │   ├── LanguageSelector.tsx
│   │       │   ├── types.ts
│   │       │   └── LanguageSelector.module.css
│   │       └── SchemeComparison/
│   │           ├── SchemeComparison.tsx
│   │           ├── types.ts
│   │           └── SchemeComparison.module.css
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── profile.service.ts
│   │   ├── eligibility.service.ts
│   │   ├── scheme.service.ts
│   │   ├── voice.service.ts
│   │   └── storage.service.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── profileSlice.ts
│   │   │   ├── eligibilitySlice.ts
│   │   │   ├── schemeSlice.ts
│   │   │   └── uiSlice.ts
│   │   └── middleware/
│   │       └── apiMiddleware.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useVoice.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   ├── helpers.ts
│   │   └── analytics.ts
│   ├── types/
│   │   ├── api.types.ts
│   │   ├── models.types.ts
│   │   ├── components.types.ts
│   │   └── index.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── locales/
│   │       ├── en/
│   │       │   └── translation.json
│   │       ├── hi/
│   │       │   └── translation.json
│   │       └── mr/
│   │           └── translation.json
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── reset.css
│   └── tests/
│       ├── setup.ts
│       ├── unit/
│       │   ├── components/
│       │   └── services/
│       ├── integration/
│       └── e2e/
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .env.example
├── .eslintrc.cjs
└── .prettierrc
```

# 3. Server (Backend) Structure

```
server/
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── types/
│   │   ├── express/
│   │   │   └── index.d.ts
│   │   ├── models/
│   │   │   ├── User.types.ts
│   │   │   ├── FarmerProfile.types.ts
│   │   │   ├── Scheme.types.ts
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── requests.types.ts
│   │   │   ├── responses.types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── pinecone.ts
│   │   ├── aws.ts
│   │   └── env.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── profile.routes.ts
│   │   ├── eligibility.routes.ts
│   │   ├── scheme.routes.ts
│   │   ├── voice.routes.ts
│   │   ├── document.routes.ts
│   │   ├── analytics.routes.ts
│   │   └── admin.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── profile.controller.ts
│   │   ├── eligibility.controller.ts
│   │   ├── scheme.controller.ts
│   │   ├── voice.controller.ts
│   │   ├── document.controller.ts
│   │   ├── analytics.controller.ts
│   │   └── admin.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── profile.service.ts
│   │   ├── rag/
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   ├── pdfIngestion.service.ts
│   │   │   ├── embedding.service.ts
│   │   │   ├── vectorSearch.service.ts
│   │   │   ├── llm.service.ts
│   │   │   └── citation.service.ts
│   │   ├── eligibility.service.ts
│   │   ├── scheme.service.ts
│   │   ├── voice.service.ts
│   │   ├── document.service.ts
│   │   ├── notification.service.ts
│   │   ├── analytics.service.ts
│   │   └── cache.service.ts
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── FarmerProfile.model.ts
│   │   ├── Scheme.model.ts
│   │   ├── EligibilityCheck.model.ts
│   │   ├── PDFDocument.model.ts
│   │   ├── SavedScheme.model.ts
│   │   └── Analytics.model.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── rateLimiter.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── cors.middleware.ts
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── profile.validator.ts
│   │   ├── eligibility.validator.ts
│   │   └── scheme.validator.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── jwt.utils.ts
│   │   ├── encryption.utils.ts
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   └── helpers.ts
│   ├── adapters/
│   │   ├── llm/
│   │   │   ├── types.ts
│   │   │   ├── openai.adapter.ts
│   │   │   ├── gemini.adapter.ts
│   │   │   └── llama.adapter.ts
│   │   ├── speech/
│   │   │   ├── types.ts
│   │   │   ├── google.adapter.ts
│   │   │   └── webSpeech.adapter.ts
│   │   └── storage/
│   │       ├── types.ts
│   │       ├── s3.adapter.ts
│   │       └── local.adapter.ts
│   ├── jobs/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── processors/
│   │   │   ├── pdfProcessor.ts
│   │   │   ├── embeddingGenerator.ts
│   │   │   └── notificationSender.ts
│   │   └── schedules/
│   │       ├── schemeScraper.ts
│   │       └── analyticsAggregator.ts
│   └── tests/
│       ├── setup.ts
│       ├── unit/
│       │   ├── services/
│       │   ├── controllers/
│       │   └── models/
│       ├── integration/
│       │   └── api/
│       └── fixtures/
│           ├── users.ts
│           ├── schemes.ts
│           └── profiles.ts
├── dist/                    # Compiled JavaScript output
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── nodemon.json
└── jest.config.ts
```

# 4. Shared Types Package

```
packages/types/
├── src/
│   ├── models/
│   │   ├── User.ts
│   │   ├── FarmerProfile.ts
│   │   ├── Scheme.ts
│   │   ├── EligibilityCheck.ts
│   │   ├── PDFDocument.ts
│   │   └── index.ts
│   ├── api/
│   │   ├── requests/
│   │   │   ├── auth.ts
│   │   │   ├── profile.ts
│   │   │   ├── eligibility.ts
│   │   │   └── index.ts
│   │   ├── responses/
│   │   │   ├── auth.ts
│   │   │   ├── profile.ts
│   │   │   ├── eligibility.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── enums/
│   │   ├── Role.ts
│   │   ├── SocialCategory.ts
│   │   ├── ApplicationStatus.ts
│   │   ├── Language.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── ApiResponse.ts
│   │   ├── Pagination.ts
│   │   └── index.ts
│   └── index.ts
├── dist/                    # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

# 5. Documentation Structure

```
docs/
├── architecture/
│   ├── system-architecture.md
│   ├── database-design.md
│   └── api-specification.md
├── guides/
│   ├── installation.md
│   ├── development.md
│   ├── deployment.md
│   └── contributing.md
├── api/
│   └── swagger.yaml        # OpenAPI specification
├── diagrams/
│   ├── system-flow.png
│   ├── rag-pipeline.png
│   └── deployment.png
└── pdf/
    └── sample-schemes/     # Sample PDFs for testing
```

# 6. Scripts Structure

```
scripts/
├── setup/
│   ├── install.sh          # Install dependencies
│   └── seed-database.js    # Seed initial data
├── deployment/
│   ├── deploy-frontend.sh  # Deploy to Vercel
│   ├── deploy-backend.sh   # Deploy to DigitalOcean
│   └── migrate-database.js # Run migrations
├── maintenance/
│   ├── backup-db.sh
│   ├── clear-cache.js
│   └── reindex-vectors.js
└── testing/
    ├── load-test.js        # K6 load testing
    └── e2e-test.sh         # Run E2E tests
```

# 7. CI/CD Structure

```
.github/
├── workflows/
│   ├── ci.yml              # Continuous Integration
│   ├── deploy-frontend.yml
│   ├── deploy-backend.yml
│   └── security-scan.yml
└── PULL_REQUEST_TEMPLATE.md
```

# 8. TypeScript Configuration Files

## 8.1 tsconfig.base.json (Root)

```
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 8.2 client/tsconfig.json

```
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@types/*": ["../packages/types/src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 8.3 server/tsconfig.json

```
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@types/*": ["../packages/types/src/*"]
    },
    "types": ["node", "jest"],
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts", "**/*.test.ts"]
}
```

## 8.4 packages/types/tsconfig.json

```
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "composite": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

# 9. Package.json Files

## 9.1 client/package.json

```
{
  "name": "agri-scheme-client",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@reduxjs/toolkit": "^1.9.7",
    "react-redux": "^9.0.0",
    "axios": "^1.6.0",
    "i18next": "^23.7.0",
    "react-i18next": "^13.5.0",
    "dexie": "^3.2.4",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/react-redux": "^7.1.0",
    "@types/node": "^20.10.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

## 9.2 server/package.json

```
{
  "name": "agri-scheme-server",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "lint": "eslint . --ext .ts",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "ioredis": "^5.3.0",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "zod": "^3.22.0",
    "langchain": "^0.1.0",
    "openai": "^4.24.0",
    "@pinecone-database/pinecone": "^1.1.0",
    "pdf-parse": "^1.1.1",
    "bull": "^4.12.0",
    "winston": "^3.11.0",
    "express-rate-limit": "^7.1.0",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.10.0",
    "@types/bcrypt": "^5.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/cors": "^2.8.0",
    "@types/jest": "^29.5.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "typescript": "^5.3.0",
    "nodemon": "^3.0.0",
    "ts-node": "^10.9.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

## 9.3 packages/types/package.json

```
{
  "name": "@agri-schemes/types",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch"
  },
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

# 10. Environment Variables

## 10.1 Client (.env)

```
VITE_API_URL=http://localhost:5000/api/v1
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_ENABLE_VOICE=true
VITE_MAX_FILE_SIZE=10485760
```

## 10.2 Server (.env)

```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/agri-schemes
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# LLM APIs
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...

# Vector DB
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1
PINECONE_INDEX=agricultural-schemes

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-south-1
S3_BUCKET=agri-scheme-pdfs

# Speech Services
GOOGLE_CLOUD_PROJECT_ID=...
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json

# Notification
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...

# Rate Limiting
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=100
```

# 11. Docker Configuration

```
docker-compose.yml:

version: "3.8"

services:
  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongodb:27017/agri-schemes
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongodb
      - redis
    volumes:
      - ./server:/app
      - /app/node_modules

  client:
    build: ./client
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:5000/api/v1
    volumes:
      - ./client:/app
      - /app/node_modules

volumes:
  mongo-data:
```

# 12. Testing Structure

## 12.1 Unit Tests

```
Frontend (Vitest):
• Components: Test rendering, props, user interactions
• Services: Mock API calls, test data transformation
• Hooks: Test custom hook logic
• Utils: Test helper functions

Backend (Jest):
• Controllers: Test request/response handling
• Services: Test business logic, mocked dependencies
• Models: Test schema validation
• Utils: Test helper functions
```

## 12.2 Integration Tests

```
Backend (Supertest):
• API endpoints: Test HTTP requests/responses
• Database operations: Test CRUD operations
• External integrations: Use mocked services
```

## 12.3 E2E Tests

Playwright:
• User journeys: Login → Profile → Eligibility Check → Results
• Voice input flow
• Application submission flow
• Mobile responsiveness

# 13. ESLint Configuration

## 13.1 client/.eslintrc.cjs

```
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  },
}
```

## 13.2 server/.eslintrc.cjs

```
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  },
}
```

# 14. Build Configuration

## 14.1 vite.config.ts (Frontend)

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@types": path.resolve(__dirname, "../packages/types/src"),
    },
  },
  build: {
    target: "es2020",
    outDir: "dist",
    sourcemap: true,
  },
});
```

## 14.2 jest.config.ts (Backend)

```
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@types/(.*)$": "<rootDir>/../packages/types/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/*.test.ts",
  ],
};

export default config;
```

# 15. Nodemon Configuration

## 9.1 nodemon.json

```
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node --files src/index.ts",
  "env": {
    "NODE_ENV": "development"
  }
}
```

# 16. Build and Deployment

## 16.1 Frontend Build

```
Command: npm run build

Output: dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── manifest.json

Deployment: Vercel
Command: vercel --prod
URL: https://agri-schemes.vercel.app
```

## 16.2 Backend Deployment

```
Build: Docker image
Command: docker build -t agri-scheme-api .

Deployment: DigitalOcean App Platform
Environment: Production
URL: https://api.agri-schemes.com
```

# 17. Code Quality Tools

## 17.1 Linting

```
ESLint Configuration (.eslintrc.js):

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  rules: {
    "no-unused-vars": "warn",
    "react/prop-types": "off"
  }
}
```

## 17.2 Formatting

Prettier Configuration (.prettierrc):

{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}

## 17.3 Git Hooks

Husky + lint-staged:

Pre-commit:
• Run ESLint on staged files
• Run Prettier
• Run unit tests for changed files

Pre-push:
• Run full test suite
• Build verification

# 18. Development Workflow

## 18.1.1 Local Setup – {1}

```
1. Install dependencies:
   npm install (run in root, client, server, packages/types)

2. Build shared types:
   cd packages/types && npm run build

3. Start development:
   # Terminal 1 (Backend)
   cd server && npm run dev

   # Terminal 2 (Frontend)
   cd client && npm run dev

4. Type checking:
   npm run type-check (in client or server)
```

## 18.1.2 Local Setup – {2}

```
1. Clone repository:
   git clone https://github.com/org/agri-scheme-eligibility.git

2. Install dependencies:
   cd client && npm install
   cd ../server && npm install

3. Setup environment:
   cp .env.example .env
   # Fill in environment variables

4. Start services:
   docker-compose up -d mongodb redis

5. Seed database:
   cd server && npm run seed

6. Start development servers:
   cd client && npm run dev
   cd server && npm run dev

7. Access:
   Frontend: http://localhost:5173
   Backend: http://localhost:5000
```

## 18.2 Build Process

```
Production Build:

1. Build types package:
   cd packages/types && npm run build

2. Build backend:
   cd server && npm run build
   Output: server/dist/

3. Build frontend:
   cd client && npm run build
   Output: client/dist/

CI/CD Pipeline:
   - Run type checking: tsc --noEmit
   - Run linting: eslint
   - Run tests: jest/vitest
   - Build production bundles
```

## 18.3 Feature Development

```
1. Create feature branch:
   git checkout -b feature/scheme-comparison

2. Develop:
   • Write code
   • Write tests
   • Update documentation

3. Test locally:
   npm test
   npm run lint

4. Commit:
   git add .
   git commit -m "feat: add scheme comparison feature"

5. Push and create PR:
   git push origin feature/scheme-comparison
   # Create pull request on GitHub

6. CI/CD pipeline runs:
   • Tests
   • Linting
   • Security scan
   • Build verification

7. Code review and merge
```

# 19. Type Definition Examples

## 19.1 Express Type Extensions

```
server/src/types/express/index.d.ts:

import { IUser } from "../models/User.types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: IUser["role"];
      };
    }
  }
}

export {};
```

## 19.2 Shared Type Example

```
packages/types/src/models/FarmerProfile.ts:

export interface ILandholding {
  total_area: number;
  irrigated_area?: number;
  ownership_type: "owned" | "leased" | "mixed";
}

export interface IFarmerProfile {
  id: string;
  user_id: string;
  full_name: string;
  state: string;
  district: string;
  landholding: ILandholding;
  crop_types: string[];
  social_category: "General" | "SC" | "ST" | "OBC";
}
```

# 20. Naming Conventions

## 20.1 Files and Folders

```
• Components: PascalCase (Button.tsx, SchemeCard.tsx)
• Services/Utils: camelCase (auth.service.ts, formatters.ts)
• Constants: UPPER_SNAKE_CASE (API_BASE_URL, MAX_FILE_SIZE)
• CSS Modules: Component.module.css
• Test files: *.test.ts or *.spec.ts
```

## 20.2 Code

```
• Variables/Functions: camelCase (getUserProfile, isEligible)
• Classes: PascalCase (EligibilityService, UserModel)
• Components: PascalCase (ProfileInput, VoiceRecorder)
• Constants: UPPER_SNAKE_CASE (API_TIMEOUT, MAX_RETRIES)
• Private methods: _prefixedCamelCase (_validateInput)
• Boolean variables: is/has/can prefix (isLoading, hasProfile)
```

# 21. Key File Extensions

- .ts: TypeScript source files
- .tsx: TypeScript + JSX (React components)
- .d.ts: TypeScript type declarations
- .js: Compiled JavaScript output
- .map: Source map files
- .cjs: CommonJS configuration files
