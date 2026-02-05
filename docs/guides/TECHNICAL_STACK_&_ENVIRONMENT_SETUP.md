# Technical Stack & Environment Setup

# 1. Technology Stack Overview

## 1.1 Core Stack (MERN + TypeScript)

MongoDB (7.0+): NoSQL database - Document storage, indexing, aggregation

Express.js (4.18+): Web framework - REST API, middleware, routing

React (18.2+): Frontend library - UI components, PWA, hooks

Node.js (20.x LTS): Runtime environment - Server-side JavaScript/TypeScript

TypeScript (5.3+): Type system - Static typing, compile-time checks

## 1.2 Frontend Technologies

- React 18 (18.2.0): UI library with concurrent features
- TypeScript (5.3.3): Static type checking
- Vite (5.0.0): Build tool (10x faster than webpack)
- Redux Toolkit (1.9.7): State management with TypeScript
- React Router (6.20.0): Client-side routing
- Axios (1.6.0): HTTP client with interceptors
- Zod (3.22.0): Runtime type validation
- i18next (23.7.0): Internationalization
- Dexie (3.2.4): IndexedDB wrapper for offline storage
- Workbox (7.0.0): Service worker utilities
## 1.3 Backend Technologies

- Node.js (20.10.0 LTS): JavaScript runtime
- TypeScript (5.3.3): Type-safe Node.js
- Express.js (4.18.2): Web framework
- Mongoose (8.0.0): MongoDB ODM with TypeScript
- ioredis (5.3.0): Redis client (typed)
- jsonwebtoken (9.0.2): JWT authentication
- bcrypt (5.1.1): Password hashing
- Zod (3.22.0): Schema validation
- Winston (3.11.0): Logging library
- Bull (4.12.0): Job queue for async processing
- Helmet (7.1.0): Security headers
- CORS (2.8.5): Cross-origin resource sharing
- express-rate-limit (7.1.0): Rate limiting middleware
## 1.4 AI/ML Technologies

- LangChain (0.1.0): RAG orchestration framework
- OpenAI SDK (4.24.0): GPT-4 Turbo integration
- @pinecone-database/pinecone (1.1.0): Vector database client
- pdf-parse (1.1.1): PDF text extraction
- pdfplumber (0.10.0): Advanced PDF parsing (Python)
- pdflib (1.17.1): PDF form filling
- @google-cloud/speech (6.0.0): Speech-to-text API
- @google-cloud/text-to-speech (5.0.0): Text-to-speech API
## 1.5 Database & Storage

- MongoDB Atlas (M10 Cluster): Primary database (AWS ap-south-1)
- Redis Cloud (250MB): Caching layer
- Pinecone (Starter Tier): Vector database (1536 dims)
- AWS S3 (Standard): PDF document storage
- MongoDB Indexes (N/A): email, state+district, scheme_id
## 1.6 DevOps & Deployment

- Vercel (Pro Plan): Frontend hosting with CDN
- DigitalOcean (App Platform): Backend hosting ($12/month)
- GitHub Actions (Free): CI/CD pipeline
- Docker (24.0+): Containerization
- Nginx (1.24+): Reverse proxy & load balancer
- Let's Encrypt (Free): SSL certificates
- CloudFlare (Free): CDN & DDoS protection
- Sentry (Free Tier): Error tracking
- New Relic (Free Tier): Application monitoring
## 1.7 Development Tools

- VS Code (Latest): IDE with TypeScript support
- ESLint (8.55.0): Linting with TypeScript rules
- Prettier (3.1.0): Code formatting
- Husky (8.0.0): Git hooks
- lint-staged (15.2.0): Pre-commit linting
- Jest (29.7.0): Backend testing
- Vitest (1.0.0): Frontend testing
- Playwright (1.40.0): E2E testing
- Supertest (6.3.0): API testing
- ts-node (10.9.0): TypeScript execution
- nodemon (3.0.0): Development server
- Postman (Latest): API testing
# 2. Development Environment Setup

## 2.1 System Requirements

```
Minimum:
• OS: macOS 12+, Windows 10+, Ubuntu 20.04+
• RAM: 8GB
• Storage: 10GB free space
• Node.js: 20.x LTS
• npm: 10.x or pnpm 8.x

Recommended:
• RAM: 16GB
• Storage: 20GB SSD
• CPU: 4+ cores
```

## 2.2 Prerequisites Installation

### Node.js Installation

```
macOS (Homebrew):
brew install node@20

Windows (Chocolatey):
choco install nodejs-lts

Linux (Ubuntu):
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

Verify:
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### TypeScript Installation

```
Global Installation:
npm install -g typescript@5.3.3

Verify:
tsc --version  # Should show Version 5.3.3
```

### Git Installation

```
macOS: brew install git
Windows: choco install git
Linux: sudo apt-get install git

Configure:
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Docker Installation

```
Download Docker Desktop:
• macOS: https://www.docker.com/products/docker-desktop/
• Windows: Same link
• Linux: sudo apt-get install docker.io docker-compose

Verify:
docker --version
docker-compose --version
```

## 2.3 Project Setup

### Step 1: Clone Repository

```
git clone https://github.com/your-org/agri-scheme-eligibility.git
cd agri-scheme-eligibility
```

### Step 2: Install Dependencies

```
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Install shared types dependencies
cd ../packages/types
npm install
```

### Step 3: Environment Configuration

```
Client (.env):
cp client/.env.example client/.env

Edit client/.env:
VITE_API_URL=http://localhost:5000/api/v1
VITE_ENABLE_VOICE=true
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

Server (.env):
cp server/.env.example server/.env

Edit server/.env (critical fields):
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/agri-schemes
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-key-change-this
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-south-1
S3_BUCKET=agri-scheme-pdfs
```

### Step 4: Start Local Services

Using Docker Compose:
docker-compose up -d

This starts:
• MongoDB on port 27017
• Redis on port 6379

Manual Alternative (MongoDB):
brew services start mongodb-community@7.0  # macOS
sudo systemctl start mongod  # Linux

Manual Alternative (Redis):
brew services start redis  # macOS
sudo systemctl start redis  # Linux

### Step 5: Build Shared Types

```
cd packages/types
npm run build

# This generates dist/ with compiled types
```

### Step 6: Database Seeding

```
cd server
npm run seed

This creates:
• Admin user (admin@example.com / admin123)
• Sample schemes
• Test farmer profiles
```

### Step 7: Start Development Servers

```
Terminal 1 (Backend):
cd server
npm run dev
# Server runs on http://localhost:5000

Terminal 2 (Frontend):
cd client
npm run dev
# App runs on http://localhost:5173

Terminal 3 (Type Watching - Optional):
cd packages/types
npm run watch
```

## 2.4 Verification Steps

```
1. Check TypeScript compilation:
cd client && npm run type-check
cd server && npm run type-check
# Should show: Found 0 errors

2. Run linting:
cd client && npm run lint
cd server && npm run lint

3. Run tests:
cd server && npm test
cd client && npm test

4. Access application:
Open http://localhost:5173
Should see homepage with language selector

5. Check API:
curl http://localhost:5000/api/v1/health
# Should return: {"status":"ok"}
```

# 3. Production Environment Setup

## 3.1 MongoDB Atlas Setup

```
1. Create Account:
   https://www.mongodb.com/cloud/atlas/register

2. Create Cluster:
   • Provider: AWS
   • Region: ap-south-1 (Mumbai)
   • Tier: M10 (2GB RAM, 10GB storage)
   • Name: agri-scheme-prod

3. Configure Security:
   • Database Access: Create user (agri_admin)
   • Network Access: Add IP (0.0.0.0/0 or specific IPs)

4. Get Connection String:
   mongodb+srv://agri_admin:<password>@cluster.mongodb.net/agri-schemes

5. Create Indexes:
   Use MongoDB Compass or mongosh:
   db.users.createIndex({ email: 1 }, { unique: true })
   db.farmer_profiles.createIndex({ user_id: 1 }, { unique: true })
   db.farmer_profiles.createIndex({ state: 1, district: 1 })
   db.schemes.createIndex({ scheme_id: 1 }, { unique: true })
```

## 3.2 Redis Cloud Setup

```
1. Create Account:
   https://redis.com/try-free/

2. Create Database:
   • Provider: AWS
   • Region: ap-south-1
   • Memory: 250MB (free tier)
   • Name: agri-scheme-cache

3. Get Connection String:
   redis://default:<password>@redis-xxxxx.c1.ap-south-1-1.ec2.cloud.redislabs.com:16379
```

## 3.3 Pinecone Setup

```
1. Create Account:
   https://www.pinecone.io/

2. Create Index:
   • Name: agricultural-schemes
   • Dimensions: 1536 (for text-embedding-ada-002)
   • Metric: cosine
   • Pod Type: starter (free)
   • Environment: us-east-1

3. Get API Key:
   Settings → API Keys → Create API Key

4. Test Connection:
   Use Pinecone dashboard to verify index is created
```

## 3.4 OpenAI API Setup

```
1. Create Account:
   https://platform.openai.com/signup

2. Add Payment Method:
   Settings → Billing → Add payment method

3. Create API Key:
   API Keys → Create new secret key
   Format: sk-...

4. Set Usage Limits:
   Billing → Usage limits → Set monthly budget ($50)

5. Test API:
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer $OPENAI_API_KEY"
```

## 3.5 AWS S3 Setup

```
1. Create AWS Account:
   https://aws.amazon.com/

2. Create IAM User:
   IAM → Users → Create user
   Permissions: AmazonS3FullAccess (or custom policy)

3. Generate Access Keys:
   Security credentials → Create access key
   Save: Access Key ID, Secret Access Key

4. Create S3 Bucket:
   S3 → Create bucket
   • Name: agri-scheme-pdfs-prod
   • Region: ap-south-1
   • Block public access: Enable (access via signed URLs)

5. Configure CORS:
   Bucket → Permissions → CORS
   [
     {
       "AllowedOrigins": ["https://yourdomain.com"],
       "AllowedMethods": ["GET", "PUT", "POST"],
       "AllowedHeaders": ["*"]
     }
   ]
```

## 3.6 Vercel Deployment (Frontend)

```
1. Install Vercel CLI:
   npm install -g vercel

2. Login:
   vercel login

3. Deploy from project root:
   cd client
   vercel

4. Configure Environment Variables:
   Vercel Dashboard → Project → Settings → Environment Variables
   Add:
   • VITE_API_URL: https://api.yourdomain.com/api/v1
   • VITE_ENABLE_VOICE: true

5. Custom Domain:
   Domains → Add domain → yourdomain.com
   Update DNS:
   • CNAME: www → cname.vercel-dns.com
   • A: @ → 76.76.21.21

6. Automatic Deployments:
   Connected to GitHub → Auto-deploy on push to main
```

## 3.7 DigitalOcean Deployment (Backend)

```
1. Create Account:
   https://www.digitalocean.com/

2. Create App:
   App Platform → Create App
   • Source: GitHub repository (server folder)
   • Branch: main
   • Build Command: npm run build
   • Run Command: npm start

3. Configure Resources:
   • Plan: Basic ($12/month)
   • Instance: 1GB RAM, 1 vCPU

4. Environment Variables:
   Add all variables from server/.env
   Encrypt sensitive values

5. Custom Domain:
   Settings → Domains → Add domain
   api.yourdomain.com
   Update DNS: CNAME → app-xxxxx.ondigitalocean.app

6. Enable Auto-Deploy:
   Source → Auto-deploy on push to main
```

# 4. CI/CD Pipeline Setup

## 4.1 GitHub Actions Workflow

```
File: .github/workflows/ci.yml

name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/
```

## 4.2 Pre-commit Hooks

```
File: .husky/pre-commit

#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged

File: package.json

"lint-staged": {
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
```

# 5. Monitoring & Logging Setup

## 5.1 Sentry Error Tracking

```
1. Create Account: https://sentry.io/signup/

2. Create Project:
   • Platform: React (for frontend)
   • Platform: Node.js/Express (for backend)

3. Install SDK:
   Frontend: npm install @sentry/react
   Backend: npm install @sentry/node

4. Initialize (Frontend - client/src/index.tsx):
   import * as Sentry from "@sentry/react";
   Sentry.init({
     dsn: "https://xxxxx@sentry.io/xxxxx",
     environment: "production",
     tracesSampleRate: 0.1
   });

5. Initialize (Backend - server/src/app.ts):
   import * as Sentry from "@sentry/node";
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   app.use(Sentry.Handlers.requestHandler());
   app.use(Sentry.Handlers.errorHandler());
```

## 5.2 New Relic APM

```
1. Create Account: https://newrelic.com/signup

2. Install Agent:
   npm install newrelic

3. Configure (newrelic.js in server root):
   exports.config = {
     app_name: ["Agri Scheme API"],
     license_key: "your_license_key",
     logging: { level: "info" }
   };

4. Require at app entry (first line of server/src/index.ts):
   require("newrelic");
```

# 6. Common Issues & Solutions

MongoDB Connection Failed: Check MONGODB_URI, verify network access in Atlas, ensure IP whitelisted

```
TypeScript Compilation Errors: Run: npm install, check tsconfig.json paths, verify shared types built
```

Port Already in Use: Change PORT in .env or kill process: lsof -ti:5000 | xargs kill -9

Voice Input Not Working: Check browser permissions, use HTTPS (required for microphone), verify Web Speech API support

Pinecone Insert Failed: Verify API key, check index dimensions match (1536), confirm quota not exceeded

Build Fails on Vercel: Check build logs, verify environment variables set, ensure dependencies in package.json

Redis Connection Timeout: Check REDIS_URL format, verify network connectivity, check Redis Cloud status

# 7. Performance Optimization Checklist

- Enable gzip compression in Express
- Implement Redis caching for scheme data
- Use connection pooling for MongoDB (max 100)
- Optimize vector search with metadata filters
- Implement code splitting in React (lazy loading)
- Use WebP images with fallback
- Enable service worker for offline caching
- Minimize bundle size (<500KB gzipped)
- Use CDN for static assets (CloudFlare)
- Implement database indexes on frequently queried fields
- Use aggregation pipelines instead of multiple queries
- Batch LLM requests when possible
- Set appropriate TTLs for Redis cache (7 days max)
# 8. Security Hardening Checklist

- Use environment variables for all secrets
- Never commit .env files to Git
- Enable Helmet middleware for security headers
- Implement rate limiting (100 req/hour)
- Use HTTPS/TLS 1.3 in production
- Validate all inputs with Zod schemas
- Sanitize user inputs to prevent XSS
- Use parameterized queries to prevent injection
- Hash passwords with bcrypt (12 rounds)
- Use JWT with short expiry (15 min)
- Store refresh tokens in httpOnly cookies
- Implement CORS with specific origins
- Enable MongoDB authentication
- Use least privilege IAM policies for AWS
- Regular dependency updates (npm audit)
- Enable 2FA for all service accounts
