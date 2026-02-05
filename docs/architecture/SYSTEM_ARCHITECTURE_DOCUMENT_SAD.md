# System Architecture Document (SAD)

# 1. Executive Summary

The Agricultural Scheme Eligibility Consultant AI is a voice-enabled RAG (Retrieval-Augmented Generation) system designed to democratize access to government agricultural schemes. The platform ingests complex PDF scheme documents, processes farmer profiles via voice or form input, and provides personalized eligibility decisions with verifiable document citations

# 2. System Overview

## 2.1 Purpose and Scope

Current Challenges:
• 100+ agricultural schemes launched annually with ₹50,000+ crore budgets
• Adoption rates below 30% due to complex eligibility criteria
• 40-50% application rejection rates due to incomplete or incorrect submissions
• Eligibility rules buried in 50-page technical PDFs

Solution:
Transform PDF bureaucracy into actionable, personalized eligibility decisions with proof and guidance.

## 2.2 Key Features

- Voice-enabled farmer profile capture (Hindi/English)
- RAG-based document analysis with citation extraction
- Binary eligibility decisions (Eligible/Not Eligible)
- Document-backed proof cards with page/paragraph citations
- Multi-scheme comparison and recommendation
- Application form pre-filling assistance
- Multilingual text-to-speech output
- Real-time dashboard with analytics
# 3. High-Level Architecture

## 3.1 System Components

The system follows a three-tier architecture:

### Presentation Layer

• React 18 with TypeScript (strict mode)
• Type-safe state management (Redux Toolkit with TypeScript)
• Voice input via Web Speech API
• Progressive Web App (PWA) for offline capability
• Multilingual UI support (i18next with type definitions)

### Application Layer

```
• Node.js/Express.js with TypeScript
• Type-safe API routes and controllers
• LangChain orchestration for RAG pipeline
• Authentication & authorization middleware
• Request validation with Zod schemas
• Type-safe session management
```

### Data Layer

• MongoDB with TypeScript ODM (Mongoose with type definitions) for structured data (farmer profiles, schemes metadata)
• Vector database (Pinecone/Weaviate) with typed clients for document embeddings
• Redis cache with ioredis (typed) for frequently accessed data
• S3-compatible storage with AWS SDK v3 (typed) for PDFs and generated documents

### AI/ML Layer

• LLM Integration (OpenAI GPT-4, Gemini Pro, or Llama 3)
• Embedding models (text-embedding-ada-002 or sentence-transformers)
• PDF processing pipeline (PyPDF2, pdfplumber)
• Speech-to-text services (Google Cloud Speech, Web Speech API)
• Text-to-speech for accessibility (gTTS, Azure TTS)

## 3.2 System Architecture Diagram

[Component Flow]

User Interface (React + TypeScript PWA)
    ↓
API Gateway (Express.js + TypeScript)
    ↓

```
┌─────────────────────┬────────────────────┬────────────────────┐
│                 │                 │                 │
Voice Module   Profile Service      RAG Engine   Document Service
(TypeScript)    (TypeScript)    (TypeScript)   (TypeScript)
│                 │                 │                 │
└─────────────────────┴────────────────────┴────────────────────┘
    ↓                 ↓                 ↓                 ↓
Speech APIs     MongoDB         Vector DB       Storage (S3)
(Typed SDKs)  (Mongoose+TS)   (Typed Client)  (AWS SDK v3)
```

# 4. Detailed Component Architecture

## 4.1 Frontend Architecture (React + TypeScript)

- VoiceInput Component: Captures speech using Web Speech API, converts to text with fallback to form input
- ProfileForm Component: Structured data entry for state, district, landholding, crop type, social category
- SchemeCard Component: Displays eligibility status, citations, required documents, and application links
- ProofViewer Component: Renders PDF excerpts with highlighted eligibility criteria
- Dashboard Component: Analytics and scheme comparison interface
- LanguageSelector Component: Supports Hindi, English, and regional languages and i18next integration
## 4.2 Backend Architecture (Node.js/Express + TypeScript)

- Authentication Module: JWT-based auth with refresh tokens, farmer profile management
- Voice Processing Module: Speech-to-text integration, language detection, text normalization
- Profile Service: CRUD operations for farmer profiles, validation and normalization
- RAG Engine: Document ingestion, embedding generation, semantic search, LLM orchestration
- Eligibility Analyzer: Rule extraction from PDFs, profile matching, citation generation
- Document Generator: PDF form filling, checklist generation, application package creation
- Analytics Service: Usage metrics, scheme effectiveness tracking, performance monitoring
## 4.3 RAG Pipeline Architecture

The RAG engine follows a multi-stage pipeline with full TypeScript typing:

### Stage 1: Document Ingestion

TypeScript Interfaces:
• PDFDocument interface for metadata
• ChunkMetadata type for extracted chunks
• SchemeIdentifier enum for scheme types

Process:
1. PDF download from official portals (PM-KISAN, PM-KUSUM, Agri-Infrastructure Fund)
2. Text extraction using pdfplumber with layout preservation
3. Section identification (Eligibility, Benefits, Application Process)
4. Chunking strategy: 500-token chunks with 50-token overlap
5. Metadata extraction: scheme name, ministry, effective date, budget allocation

### Stage 2: Embedding Generation

```
TypeScript Types:
• EmbeddingVector type (number[])
• VectorMetadata interface
• EmbeddingModel enum

Process:
1. Text preprocessing: normalization, removal of non-essential content
2. Embedding model: text-embedding-ada-002 (1536 dimensions) or sentence-transformers
3. Vector storage in Pinecone/Weaviate with metadata filtering
4. Index optimization for sub-second retrieval
```

### Stage 3: Query Processing

TypeScript Interfaces:
• FarmerProfile interface
• SearchQuery type
• SearchResult interface with metadata

Type-safe query flow:
1. Farmer profile structured as query: "Farmer with 1.5 acres, wheat crop, SC category, Madhya Pradesh"
2. Query embedding generation
3. Semantic search with top-k retrieval (k=5-10 chunks)
4. Metadata filtering: state-specific schemes prioritized
5. Re-ranking based on relevance scores

### Stage 4: LLM Processing

```
TypeScript Types:
• LLMRequest interface
• LLMResponse type with union types
• EligibilityDecision interface
• Citation type

Type-safe LLM integration:
1. Prompt engineering with retrieved context and farmer profile
2. Structured output: {eligible: boolean, reasoning: string, citations: [{page, paragraph, text}]}
3. Confidence scoring and fallback mechanisms
4. Citation extraction from LLM response
5. Validation of citations against source documents
```

# 5. Data Architecture

## 5.1 Database Design (MongoDB + TypeScript)

Mongoose Schemas with TypeScript Interfaces:

- IUser: User authentication with typed fields: email, password_hash, role enum, timestamps
- Authentication, profiles, preferences, usage history
- IFarmerProfile: Typed profile: state, district, landholding interface, crop_types array, category enum
- State, district, landholding, crop_types, social_category, annual_income
- IScheme: Type-safe scheme: eligibility_rules interface, benefits type, application_process
- Scheme metadata, eligibility_rules, benefits, application_links, document_requirements
- IEligibilityCheck: Strongly-typed check: schemes_checked array, citations interface, metrics
- Check history, results, citations, timestamps, farmer_profile_ref
- IPDFDocument: Typed document: processing_status enum, metadata interface, embedding_status
- Document metadata, processing status, embedding status, file paths
- IAnalytics: Type-safe events: event_type enum, metadata Record<string, any>
- Usage metrics, scheme popularity, conversion rates, error logs
## 5.2 Vector Database Schema

```
Pinecone TypeScript Interface:

interface VectorMetadata {
  document_id: string;
  scheme_id: string;
  chunk_index: number;
  section_type: SectionType;
  page_number: number;
  text_content: string;
  state_applicability: string[];
  language: Language;
}
```

```
From JavaScript Doc (For information only): 
“””
Pinecone/Weaviate Index Structure:
• Vector: 1536-dimensional embedding
• Metadata: scheme_name, section_type, page_number, chunk_index, effective_date
• Filtering: state, crop_type, landholding_range, category
```

“””

# 6. Security Architecture

- Authentication: JWT tokens with 15-minute expiry, refresh tokens stored in httpOnly cookies
- Zod Validation: Runtime type validation for all API inputs, type inference from schemas
- Authorization: Role-based access control with strict enum types (Farmer, Admin, Auditor)
- Data Encryption: TLS 1.3 in transit, AES-256 at rest for sensitive farmer data
- API Security: Rate limiting (100 req/hour per user), input validation, SQL injection prevention, request validation middleware
- Audit Logging: All eligibility checks logged with timestamps and IP addresses
# 7. Deployment Architecture

## 7.1 Infrastructure

```
• Frontend: Vercel/Netlify with CDN (CloudFlare) with build optimization
• Backend: AWS EC2/DigitalOcean Droplets with auto-scaling with compiled TypeScript (tsc)
• Database: MongoDB Atlas (M10 cluster) with Mongoose driver
• Vector DB: Pinecone Starter tier or self-hosted Weaviate with TypeScript SDK
• Cache: Redis Cloud (250MB free tier) with ioredis (typed client)
• Storage: AWS S3 with AWS SDK v3 or DigitalOcean Spaces (TypeScript-first)
```

## 7.2 Build Process

```
TypeScript Compilation:
• Frontend: Vite with TypeScript plugin, strict mode enabled
• Backend: tsc with --strict flag, output to dist/
• Type checking: Pre-commit hooks run tsc --noEmit
• Build optimization: Tree-shaking, code splitting
• Source maps: Generated for production debugging
```

## 7.3 CI/CD Pipeline

1. GitHub Actions for automated testing and deployment
2. Unit tests (Jest), integration tests (Supertest), E2E tests (Playwright)
3. Code quality: ESLint, Prettier, SonarQube
4. Docker containerization for consistent environments
5. Staging environment for pre-production testing
6. Blue-green deployment for zero-downtime releases

# 8. Scalability and Performance

## 8.1 Performance Targets

• Eligibility check response time: <10 seconds
• TypeScript compilation time: <30 seconds
• Type checking time: <15 seconds
• Voice transcription latency: <3 seconds
• Vector search retrieval: <500ms
• Concurrent users: 1,000+
• Mobile data usage: <2MB per eligibility check

## 8.2 Scalability Strategies

- Horizontal scaling of API servers with load balancing
- Caching layer (Redis) for frequently accessed schemes
- Vector search optimization with approximate nearest neighbor (ANN)
- Asynchronous PDF processing with job queues (Bull/BeeQueue)
- CDN for static assets and PDF documents
- Database indexing on farmer_profiles and schemes collections
- LLM response caching for common queries

## 8.3 TypeScript Benefits

- Compile-time error detection reduces runtime errors by 80%
- IntelliSense improves developer productivity by 40%
- Refactoring safety with type-aware transformations
- Self-documenting code through type annotations
- Enhanced collaboration with explicit interfaces
- Reduced debugging time with type-safe API contracts
# 9. External Integration Points

- Government Portals: Automated PDF fetching from Agmarknet, eNAM, state agriculture websites. Typed fetch wrappers, strongly-typed response parsers
- Speech Services: Google Cloud Speech-to-Text API, Web Speech API (fallback) with TypeScript
- LLM Providers: OpenAI GPT-4 Turbo, Google Gemini Pro, or self-hosted Llama 3 70B. {OpenAI SDK (native TypeScript), Gemini with typed client}.
- SMS Gateway: Twilio/MSG91 for application status notifications, typed message interfaces
- Analytics: Google Analytics 4 with gtag types, Mixpanel typed SDK for user behavior tracking
# 10. Monitoring and Observability

```
• Application monitoring: New Relic/Datadog with TypeScript agent
• Error tracking: Sentry with TypeScript SDK for real-time error alerts and source maps
• Logging: Winston with typed log levels and metadata, ELK Stack (Elasticsearch, Logstash, Kibana) or CloudWatch
• Uptime monitoring: Pingdom/UptimeRobot
• Type-safe metrics: Custom metric interfaces
• Performance metrics: Response times, error rates, cache hit ratios
• Business metrics: Eligibility checks per day, scheme popularity, user retention
• Cost monitoring: AWS Cost Explorer for infrastructure spending
```

# 11. Disaster Recovery and Backup

• Database backups: Daily automated backups with 30-day retention
• Point-in-time recovery: MongoDB Atlas continuous backup
• PDF document versioning: S3 versioning enabled
• Configuration management: Infrastructure as Code (Terraform)
• Failover strategy: Multi-region deployment for critical services
• Recovery Time Objective (RTO): <4 hours
• Recovery Point Objective (RPO): <24 hours


# 12. Cost Architecture

TypeScript-specific optimizations:

- Build Size: Dead code elimination via TypeScript tree-shaking, 20% smaller bundles
- Development Speed: 30% faster development with type safety and autocomplete
- Bug Prevention: 80% reduction in type-related bugs, lower debugging costs
- Maintenance: Self-documenting code reduces onboarding time by 40%
- Runtime Performance: Optimized compilation output, minimal runtime overhead
# 13. Cost-Effectiveness Strategy

Adhering to project guidelines for large-scale viability:

- LLM Usage: Aggressive caching (80%+ hit rate), batch processing, use of cheaper models for non-critical tasks
- Vector Search: Self-hosted Weaviate on shared VPS ($20/month) vs Pinecone ($70/month for starter)
- Embeddings: One-time embedding generation, incremental updates only
- Infrastructure: Start with $50/month (Vercel free + MongoDB Atlas M10 + DigitalOcean $12/month)
- Speech Services: Web Speech API (free, browser-based) as primary, Cloud API for unsupported browsers
- Data Sources: Scrape government portals (free) vs paid APIs
- Projected Cost: Under $0.50 per eligibility check at scale (100,000 checks/month)

# 14. Technology Stack Justification

## 14.1 TypeScript-Based MERN Stack

```
• MongoDB: Typed schemas with Mongoose + TypeScript, compile-time query validation
• Express.js: Type-safe routing, strongly-typed middleware, request/response types
• React: Type-safe components, props interfaces, strict null checks
• Node.js: Native TypeScript support, typed async/await, better error handling

TypeScript Benefits:
• 40% fewer production bugs
• 30% faster development
• Enhanced IDE support
• Self-documenting API contracts
• Safer refactoring
```

## 14.2 Type Safety Strategy

Strict TypeScript Configuration:
• strict: true (all strict checks enabled)
• noImplicitAny: true
• strictNullChecks: true
• strictFunctionTypes: true
• noUnusedLocals: true
• noUnusedParameters: true

Type Definition Strategy:
• Shared types package for client-server sync
• API contract types auto-generated from OpenAPI
• Database types generated from Mongoose schemas
• Utility types for common patterns (Partial, Pick, Omit)
• Generic types for reusable components

## 14.3 AI/ML Stack

• LangChain: Simplifies RAG pipeline, supports multiple LLM providers
• OpenAI/Gemini: Best-in-class reasoning for eligibility decisions
• Sentence-Transformers: Cost-effective embeddings for vector search
• Pinecone/Weaviate: Purpose-built for semantic search at scale

## 14.4 Mobile-First Approach

• PWA: Offline capability, installation without app stores
• Responsive design: Works on 2G/3G networks
• Optimized assets: <100KB initial load, lazy loading
• Voice interface: Accessible for low-literacy users


