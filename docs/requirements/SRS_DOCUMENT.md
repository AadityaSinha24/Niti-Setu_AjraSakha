# Software Requirements Specification

Agricultural Scheme Eligibility Consultant AI

Version: 1.0

Date: February 2026

# 1. Introduction

## 1.1 Purpose

This SRS defines functional and non-functional requirements for the Agricultural Scheme Eligibility Consultant AI system - a TypeScript-based MERN stack application using RAG technology to analyze government agricultural schemes and provide personalized eligibility decisions.

## 1.2 Scope

```
System Name: Agricultural Scheme Eligibility Consultant AI

Core Features:
• Voice-enabled farmer profile capture (Hindi/English)
• RAG-based PDF document analysis
• Binary eligibility decisions with verifiable citations
• Document generation and pre-filling
• Multilingual interface support
• Offline capability (PWA)

Boundaries:
• IN SCOPE: PM-KISAN, PM-KUSUM, Agri-Infrastructure Fund analysis
• OUT OF SCOPE: Ajrasakha system integration, state-specific portals integration
```

## 1.3 Definitions and Acronyms

- RAG: Retrieval-Augmented Generation
- LLM: Large Language Model
- PWA: Progressive Web App
- DBT: Direct Benefit Transfer
- MERN: MongoDB, Express.js, React, Node.js
- JWT: JSON Web Token
- OCR: Optical Character Recognition
- TTS: Text-to-Speech
- STT: Speech-to-Text
## 1.4 References

```
• PM-KISAN Guidelines: https://pmkisan.gov.in
• PM-KUSUM Scheme: https://mnre.gov.in
• Agmarknet Portal: https://agmarknet.gov.in
• TypeScript Documentation: https://typescriptlang.org
• React 18 Documentation: https://react.dev
```

# 2. Overall Description

## 2.1 Product Perspective

```
Standalone web application with PWA capabilities. Interfaces with:
• Government PDF repositories (read-only)
• Speech recognition APIs (Google Cloud Speech, Web Speech API)
• LLM providers (OpenAI, Gemini, Llama)
• Vector databases (Pinecone/Weaviate)
• SMS gateways (Twilio/MSG91)

System Context Diagram:
Farmers → Mobile/Web Interface → Application Server → Database/Vector DB → Government PDFs
```

## 2.2 Product Functions

- User authentication and profile management
- Voice input processing with language detection
- Farmer profile creation and management
- PDF document ingestion and processing
- Vector embedding generation and storage
- Semantic search across scheme documents
- LLM-based eligibility analysis
- Citation extraction and validation
- Multi-scheme comparison
- Application form pre-filling
- Document checklist generation
- Notification and reminder system
- Analytics and reporting
## 2.3 User Classes and Characteristics

### Farmers (Primary Users)

```
• Technical Expertise: Low to Medium
• Digital Literacy: Basic smartphone usage
• Language: Hindi, regional languages preferred
• Device: Smartphones with 2G/3G connectivity
• Frequency: Seasonal (planting, harvest seasons)
• Expected Features: Voice input, simple UI, offline access
```

### Administrators

• Technical Expertise: High
• Responsibilities: Scheme management, PDF ingestion, user management
• Expected Features: Admin dashboard, analytics, bulk operations

### Auditors

• Technical Expertise: Medium
• Responsibilities: Verify eligibility decisions, review citations
• Expected Features: Read-only access, export capabilities, audit logs

## 2.4 Operating Environment

```
Client-Side:
• Web Browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
• Mobile Browsers: Chrome Mobile, Safari iOS 14+
• Screen Sizes: 320px - 2560px width
• Network: 2G/3G/4G/WiFi (offline mode supported)

Server-Side:
• OS: Ubuntu 22.04 LTS or higher
• Node.js: 20.x LTS
• TypeScript: 5.3+
• MongoDB: 7.0+
• Redis: 7.0+
• Vector DB: Pinecone or Weaviate

Third-Party Services:
• LLM: OpenAI GPT-4 Turbo / Google Gemini Pro
• Speech: Google Cloud Speech API / Web Speech API
• Storage: AWS S3 / DigitalOcean Spaces
```

## 2.5 Design and Implementation Constraints

- Must use TypeScript-based MERN stack (MongoDB, Express, React, Node.js)
- Frontend bundle size < 500KB (gzipped)
- Mobile-first responsive design mandatory
- Support Hindi and English at minimum
- Work on 2G/3G networks (< 2MB data per eligibility check)
- Cost per eligibility check < $0.50 at scale
- Strict TypeScript mode (no implicit any)
- GDPR-compliant data handling
- Accessibility: WCAG 2.1 AA compliance
- Cannot integrate with Ajrasakha system
## 2.6 Assumptions and Dependencies

```
Assumptions:
• Government PDFs remain publicly accessible
• PDF structure follows standard formatting
• Users have smartphones with microphone access
• Internet connectivity available for initial setup

Dependencies:
• OpenAI/Gemini API availability and pricing
• MongoDB Atlas uptime
• Vercel/Netlify hosting availability
• Government portal stability
```

# 3. Specific Requirements

## 3.1 External Interface Requirements

### 3.1.1 User Interfaces

```
UI-001: Homepage
• Hero section with CTA button
• Language selector (Hindi/English/Regional)
• How it works section (3 steps)
• Trust indicators (scheme count, users helped)

UI-002: Profile Input
• Toggle: Voice / Form input
• Voice: Large microphone button, live transcription
• Form: 5 fields (State, District, Land, Crop, Category)
• Real-time validation
• Progress indicator

UI-003: Results Dashboard
• Summary card (eligible schemes count, total benefits)
• Scheme cards in grid layout
• Eligibility status badge (✓/✗)
• Filters and sorting options

UI-004: Scheme Detail
• Scheme header with logo
• Eligibility proof section with citations
• Benefits breakdown
• Document requirements checklist
• Action buttons (Apply, Download, Save)

UI-005: Dashboard
• Analytics metrics
• Saved schemes list
• Check history
• Profile management
```

### 3.1.2 Hardware Interfaces

```
HW-001: Microphone Access
• Access via Web Speech API or MediaRecorder
• Sample rate: 16kHz minimum
• Format: WebM/Opus or WAV

HW-002: Camera (Future)
• Document upload capability
• OCR processing
```

### 3.1.3 Software Interfaces

```
SW-001: MongoDB Database
• Interface: Mongoose ODM with TypeScript
• Version: 8.0+
• Protocol: MongoDB Wire Protocol
• Data Format: BSON

SW-002: Redis Cache
• Interface: ioredis client
• Version: 7.0+
• Protocol: RESP (Redis Serialization Protocol)

SW-003: OpenAI API
• Interface: OpenAI TypeScript SDK
• Model: gpt-4-turbo-preview
• Protocol: HTTPS REST
• Authentication: Bearer token

SW-004: Pinecone Vector DB
• Interface: @pinecone-database/pinecone
• Protocol: gRPC
• Dimensions: 1536 (text-embedding-ada-002)

SW-005: AWS S3
• Interface: AWS SDK v3
• Protocol: HTTPS REST
• Authentication: IAM credentials
```

### 3.1.4 Communication Interfaces

```
COM-001: HTTPS
• Protocol: TLS 1.3
• Port: 443
• Certificate: Let's Encrypt

COM-002: WebSocket (Future)
• Protocol: WSS
• Use Case: Real-time notifications

COM-003: SMS
• Provider: Twilio/MSG91
• Protocol: HTTPS REST API
```

## 3.2 Functional Requirements

### 3.2.1 User Authentication

```
FR-AUTH-001: User Registration
Priority: High
Description: User shall register with email and password
Inputs: Email, password (min 8 chars), phone (optional)
Processing: Validate email format, hash password (bcrypt), store in DB
Outputs: User account created, verification email sent
Error Handling: Duplicate email → 409 Conflict

FR-AUTH-002: User Login
Priority: High
Description: User shall login with email/password
Inputs: Email, password
Processing: Verify credentials, generate JWT (15 min expiry)
Outputs: Access token, refresh token (httpOnly cookie)
Error Handling: Invalid credentials → 401 Unauthorized

FR-AUTH-003: Token Refresh
Priority: High
Description: System shall refresh expired access tokens
Inputs: Refresh token from cookie
Processing: Validate refresh token, generate new access token
Outputs: New access token
Error Handling: Invalid/expired refresh token → 401

FR-AUTH-004: Logout
Priority: Medium
Description: User shall logout and invalidate tokens
Inputs: Access token
Processing: Clear refresh token cookie, blacklist access token
Outputs: Successful logout confirmation
```

### 3.2.2 Profile Management

```
FR-PROF-001: Create Profile
Priority: High
Description: User shall create farmer profile with demographic data
Inputs: Full name, state, district, pincode, landholding (acres), crop types, social category
Processing: Validate using Zod schema, store with user reference
Outputs: Profile ID, success confirmation
Validation Rules:
  • Name: 2-100 characters
  • Pincode: 6 digits
  • Landholding: Positive number
  • Crop types: Min 1 selection
  • Social category: Enum (General/SC/ST/OBC)

FR-PROF-002: Update Profile
Priority: Medium
Description: User shall update profile details
Inputs: Profile ID, updated fields (partial)
Processing: Validate changes, update timestamp
Outputs: Updated profile

FR-PROF-003: View Profile
Priority: High
Description: User shall view own profile
Inputs: Profile ID
Outputs: Full profile data
Authorization: User can only view own profile
```

### 3.2.3 Voice Processing

```
FR-VOICE-001: Voice Input Capture
Priority: High
Description: System shall capture voice input via microphone
Inputs: Audio stream from microphone
Processing: Record using MediaRecorder API, max 2 minutes
Outputs: Audio blob (WebM/Opus format)
Error Handling: Microphone permission denied → Fallback to form

FR-VOICE-002: Speech-to-Text Conversion
Priority: High
Description: System shall convert speech to text
Inputs: Audio file, language hint (hi/en)
Processing:
  • Primary: Web Speech API (browser-based, free)
  • Fallback: Google Cloud Speech API
  • Language auto-detection
Outputs: Transcript text, confidence score, detected language
Performance: < 3 seconds latency

FR-VOICE-003: Profile Data Extraction
Priority: High
Description: System shall extract structured data from transcript
Inputs: Transcript text
Processing: LLM-based entity extraction (GPT-4 Turbo)
Outputs: Extracted fields with confidence scores, missing fields list
Example:
  Input: "मेरे पास दो एकड़ जमीन है भोपाल में"
  Output: {landholding: 2, district: "Bhopal", confidence: {landholding: 0.9, district: 0.95}}

FR-VOICE-004: Confirmation Interface
Priority: Medium
Description: System shall display extracted data for user confirmation
Inputs: Extracted data
Processing: Show editable fields, allow corrections
Outputs: Confirmed/corrected profile data
```

### 3.2.4 Eligibility Analysis

```
FR-ELIG-001: Eligibility Check Initiation
Priority: High
Description: System shall initiate eligibility check for farmer profile
Inputs: Profile ID, optional scheme filters
Processing:
  1. Fetch farmer profile
  2. Query applicable schemes (state, crop filters)
  3. For each scheme: run RAG pipeline
  4. Compile results
Outputs: Check ID, eligibility results array
Performance: < 10 seconds for 50 schemes

FR-ELIG-002: RAG Pipeline Execution
Priority: High
Description: System shall analyze eligibility using RAG
Inputs: Profile data, scheme ID
Processing:
  Stage 1: Construct query from profile
  Stage 2: Vector search (top 10 chunks)
  Stage 3: LLM analysis with retrieved context
  Stage 4: Extract citations
  Stage 5: Validate citations against source
Outputs: Boolean eligibility, confidence (0-1), reasoning, citations array
Quality: 95%+ accuracy vs manual review

FR-ELIG-003: Citation Extraction
Priority: High
Description: System shall extract verifiable citations from PDFs
Inputs: LLM response, source PDF
Processing: Parse citation references, extract text from PDF
Outputs: Citation array with {page, paragraph, text_excerpt, document_url}
Validation: Verify text actually exists in source document

FR-ELIG-004: Results Caching
Priority: Medium
Description: System shall cache eligibility results
Inputs: Profile hash, scheme ID
Processing: Store in Redis with 7-day TTL
Outputs: Cached result on subsequent checks
Cache Hit Rate Target: 60%+

FR-ELIG-005: Check History
Priority: Medium
Description: User shall view past eligibility checks
Inputs: User ID, pagination params
Outputs: Paginated list of check summaries
Data Retention: 2 years
```

### 3.2.5 Scheme Management

```
FR-SCHEME-001: List Schemes
Priority: High
Description: System shall list active schemes
Inputs: Filters (state, ministry, crop), sort, pagination
Outputs: Paginated scheme summaries
Default Sort: Popularity descending

FR-SCHEME-002: View Scheme Detail
Priority: High
Description: User shall view full scheme details
Inputs: Scheme ID
Outputs: Name, description, eligibility rules, benefits, documents, deadlines
Multilingual: Return name/description in user's language

FR-SCHEME-003: Save Scheme
Priority: Medium
Description: User shall save schemes for later reference
Inputs: Scheme ID, optional notes
Outputs: Saved scheme ID
Constraint: No duplicate saves (user + scheme unique)

FR-SCHEME-004: Scheme Comparison
Priority: Low
Description: User shall compare multiple schemes side-by-side
Inputs: Array of scheme IDs (max 3)
Outputs: Comparison table (benefits, eligibility, deadlines)
```

### 3.2.6 Document Generation

```
FR-DOC-001: Generate Document Checklist
Priority: Medium
Description: System shall generate required documents list
Inputs: Scheme ID, profile ID
Processing: Extract required_documents from scheme, match with uploaded docs
Outputs: Checklist with status (uploaded/pending/verified)

FR-DOC-002: Pre-fill Application Form
Priority: Medium
Description: System shall pre-fill PDF application forms
Inputs: Scheme ID, profile ID
Processing: Map profile fields to PDF form fields using pdflib
Outputs: Pre-filled PDF URL (S3), expiration time
TTL: 7 days

FR-DOC-003: Download Proof Card
Priority: Low
Description: User shall download eligibility proof as PDF
Inputs: Check ID
Outputs: PDF with scheme name, eligibility status, citations
```

### 3.2.7 PDF Document Processing (Admin)

```
FR-PDF-001: Ingest PDF
Priority: High
Description: Admin shall upload scheme PDF for processing
Inputs: PDF file, scheme ID, document type, language
Processing:
  1. Upload to S3
  2. Queue processing job (Bull)
  3. Extract text (pdfplumber)
  4. Chunk (500 tokens, 50 overlap)
  5. Generate embeddings (batch)
  6. Upsert to Pinecone
Outputs: Document ID, processing status
Performance: 50 PDFs/hour

FR-PDF-002: Monitor Processing
Priority: Medium
Description: Admin shall monitor PDF processing status
Inputs: Document ID
Outputs: Status (pending/processing/completed/failed), progress %

FR-PDF-003: Version Control
Priority: Medium
Description: System shall track PDF versions
Inputs: New PDF for existing scheme
Processing: Compare checksum, increment version if changed
Outputs: New version number, re-processing triggered
```

### 3.2.8 Analytics

```
FR-ANALYTICS-001: Track Events
Priority: Medium
Description: System shall track user events
Events: profile_created, eligibility_check, scheme_viewed, voice_used, application_started
Storage: MongoDB analytics collection

FR-ANALYTICS-002: User Dashboard Metrics
Priority: Medium
Description: User shall view personal metrics
Metrics: Total checks, eligible schemes count, applications started/submitted

FR-ANALYTICS-003: Admin Analytics
Priority: Low
Description: Admin shall view system-wide analytics
Metrics: Daily active users, scheme popularity, average response time, error rates
```

## 3.3 Non-Functional Requirements

### 3.3.1 Performance Requirements

NFR-PERF-001: Response Time
• Eligibility check: < 10 seconds (P95)
• API endpoints: < 500ms (P95)
• Page load: < 3 seconds on 3G
• Voice transcription: < 3 seconds

NFR-PERF-002: Throughput
• Concurrent users: 1,000+
• Requests per second: 100+
• Database queries: < 100ms (P95)

NFR-PERF-003: Resource Usage
• Frontend bundle: < 500KB gzipped
• Data per check: < 2MB
• Memory per API instance: < 512MB
• CPU per check: < 200ms

### 3.3.2 Scalability Requirements

NFR-SCALE-001: Horizontal Scaling
• API servers: Auto-scale 2-10 instances
• Trigger: CPU > 70% for 5 minutes

NFR-SCALE-002: Database Scaling
• Read replicas: 2 minimum
• Connection pool: 100 max connections
• Sharding ready (by state)

NFR-SCALE-003: Cache Scaling
• Redis cluster mode enabled
• Hit rate target: 60%+

### 3.3.3 Reliability Requirements

```
NFR-REL-001: Availability
• Uptime: 99.5% (SLA)
• Planned maintenance: < 4 hours/month
• Max downtime per incident: 1 hour

NFR-REL-002: Fault Tolerance
• Database: Automatic failover to replica
• API: Load balancer health checks
• LLM: Fallback to alternative provider

NFR-REL-003: Data Integrity
• Database transactions: ACID compliant
• Backup frequency: Daily
• Recovery Point Objective (RPO): 24 hours
• Recovery Time Objective (RTO): 4 hours
```

### 3.3.4 Security Requirements

```
NFR-SEC-001: Authentication
• JWT with 15-minute expiry
• Refresh token: 7-day expiry
• Password: Min 8 chars, bcrypt (12 rounds)

NFR-SEC-002: Authorization
• Role-based access control (RBAC)
• API endpoints protected by role middleware
• Users can only access own data

NFR-SEC-003: Data Protection
• In transit: TLS 1.3
• At rest: AES-256 (bank details)
• PII handling: GDPR compliant

NFR-SEC-004: Input Validation
• Zod schema validation on all inputs
• SQL injection prevention
• XSS prevention (React auto-escaping)

NFR-SEC-005: Rate Limiting
• 100 requests/hour per user
• 429 status on limit exceeded
• IP-based rate limiting for unauthenticated endpoints
```

### 3.3.5 Usability Requirements

NFR-USE-001: Accessibility
• WCAG 2.1 AA compliance
• Screen reader support
• Keyboard navigation
• Minimum contrast ratio: 4.5:1

NFR-USE-002: Learnability
• First-time users complete eligibility check in < 5 minutes
• Contextual help available
• Tutorial video on homepage

NFR-USE-003: Mobile Usability
• Touch targets: Min 48x48px
• Single-column layout on mobile
• Thumb-friendly navigation

NFR-USE-004: Multilingual
• Hindi, English mandatory
• Regional languages: Marathi, Tamil, Telugu (Phase 2)
• Language switch without page reload

### 3.3.6 Maintainability Requirements

NFR-MAIN-001: Code Quality
• TypeScript strict mode: 100% coverage
• ESLint: Zero errors
• Test coverage: > 80%

NFR-MAIN-002: Documentation
• API documentation: OpenAPI 3.0
• Code comments: TSDoc format
• README with setup instructions

NFR-MAIN-003: Logging
• Structured logging (Winston)
• Log levels: debug, info, warn, error
• Retention: 30 days

### 3.3.7 Cost Requirements

```
NFR-COST-001: Operational Cost
• Infrastructure: < $200/month (10,000 checks/month)
• Cost per check: < $0.50 at scale

NFR-COST-002: LLM Cost Optimization
• Cache hit rate: > 60%
• Prompt optimization: < 1,500 tokens/check
• Batch processing where possible
```

## 3.4 System Features

### 3.4.1 Voice Interface

Description: Voice-enabled profile input using speech recognition
Priority: High
Stimulus: User taps microphone button
Response: System captures and transcribes speech
Functional Requirements: FR-VOICE-001 to FR-VOICE-004

### 3.4.2 RAG Engine

Description: Retrieval-Augmented Generation for eligibility analysis
Priority: High
Stimulus: User submits profile for eligibility check
Response: System analyzes against scheme documents
Functional Requirements: FR-ELIG-001 to FR-ELIG-005

### 3.4.3 Progressive Web App

Description: Offline-capable web application
Priority: Medium
Stimulus: User loses internet connection
Response: App continues functioning with cached data
Features: Service worker, IndexedDB, app install prompt

# 4. Data Requirements

## 4.1 Logical Data Model

Entities:
• User: Authentication and authorization
• FarmerProfile: Demographic and agricultural data
• Scheme: Government scheme metadata
• EligibilityCheck: Check history and results
• PDFDocument: Processed scheme documents
• SavedScheme: User bookmarks
• Analytics: Event tracking

Relationships:
• User 1:1 FarmerProfile
• User 1:M EligibilityCheck
• User 1:M SavedScheme
• Scheme 1:M PDFDocument
• Scheme 1:M EligibilityCheck (many-to-many through check results)

## 4.2 Data Dictionary

```
IUser:
• _id: ObjectId (Primary Key)
• email: String (Unique, Indexed)
• password_hash: String (bcrypt)
• role: Enum (farmer, admin, auditor)
• language_preference: String (default: hi)
• created_at, updated_at: Date

IFarmerProfile:
• _id: ObjectId (Primary Key)
• user_id: ObjectId (Foreign Key → users)
• full_name: String (2-100 chars)
• state: String (Indexed)
• district: String (Indexed)
• landholding: { total_area: Number, ownership_type: Enum }
• crop_types: String[] (Indexed)
• social_category: Enum (General, SC, ST, OBC)

IScheme:
• _id: ObjectId (Primary Key)
• scheme_id: String (Unique, Indexed)
• name: { en: String, hi: String }
• eligibility_rules: Object
• benefits: { financial: Object, non_financial: String[] }
• status: Enum (active, inactive, archived)
```

## 4.3 Data Retention

Policy:
• User accounts: Active until deletion requested
• Eligibility checks: 2 years, then archive
• Analytics events: Aggregate monthly, retain raw 6 months
• PDF documents: Until scheme archived + 1 year
• Cached data: TTL-based (7 days max)

# 5. Appendices

## 5.1 Glossary

• Chunking: Splitting document into smaller text segments
• Embedding: Numerical vector representation of text
• Vector Search: Semantic similarity search using embeddings
• Prompt Engineering: Crafting LLM inputs for optimal outputs
• Citation: Reference to source document supporting eligibility decision

## 5.2 Analysis Models

Use Case Diagram: Farmer → Check Eligibility → View Results → Apply
Sequence Diagram: User Input → Voice Processing → RAG Analysis → Results Display
State Diagram: Profile States (Draft → Complete → Verified)

## 5.3 To Be Determined List

• TBD-001: OCR integration for scanned documents
• TBD-002: Integration with state agriculture portals
• TBD-003: Mobile app (React Native) development
• TBD-004: Blockchain for application tracking
• TBD-005: AI-powered crop recommendation based on eligibility

