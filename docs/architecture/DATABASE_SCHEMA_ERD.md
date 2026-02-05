# Database Schema (ERD)

# 1. Database Overview

```
Database Type: MongoDB (NoSQL) with TypeScript ODM
ODM: Mongoose with TypeScript interfaces and schemas
Type Safety: Strict TypeScript mode with inferred types from schemas
Rationale: Flexible schema for evolving scheme structures, horizontal scalability, native support for nested documents.

Additional Storage:
• Vector Database: Pinecone/Weaviate with TypeScript SDK for document embeddings
• Cache Layer: Redis with ioredis (typed client) for session management and frequent queries
• Object Storage: AWS S3 with AWS SDK v3 (TypeScript-first) /DigitalOcean Spaces for PDFs
```

# 2. MongoDB Collections with TypeScript

## 2.1 users

Purpose: User authentication and profile management

TypeScript Interface:

```
interface IUser extends Document {
  email: string;
  password_hash: string;
  phone?: string;
  role: "farmer" | "admin" | "auditor";
  language_preference: string;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  is_active: boolean;
  email_verified: boolean;
  phone_verified: boolean;
}
```

Mongoose Schema:

```
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ["farmer", "admin", "auditor"], default: "farmer" },
  language_preference: { type: String, default: "hi" },
  is_active: { type: Boolean, default: true },
  email_verified: { type: Boolean, default: false },
  phone_verified: { type: Boolean, default: false }
}, { timestamps: true });
```

Indexes:
• email (unique)
• phone (unique, sparse)
• role
• created_at

## 2.2 farmer_profiles

Purpose: Store farmer demographic and agricultural data

TypeScript Interfaces:

```
interface ILandholding {
  total_area: number;
  irrigated_area?: number;
  ownership_type: "owned" | "leased" | "mixed";
}

interface IBankDetails {
  account_number: string;
  ifsc_code: string;
  bank_name: string;
}

interface IDocument {
  type: "aadhar" | "land_record" | "bank_passbook" | "caste_certificate";
  url: string;
  verified: boolean;
  uploaded_at: Date;
}

interface IFarmerProfile extends Document {
  user_id: Types.ObjectId;
  full_name: string;
  state: string;
  district: string;
  block?: string;
  village?: string;
  pincode: string;
  landholding: ILandholding;
  crop_types: string[];
  social_category: "General" | "SC" | "ST" | "OBC";
  annual_income?: number;
  bank_details?: IBankDetails;
  documents: IDocument[];
  created_at: Date;
  updated_at: Date;
}
```

Indexes:

user_id (unique)

state + district (compound)

crop_types (multikey)

landholding.total_area

social_category

## 2.3 schemes

Purpose: Store scheme metadata and eligibility rules

TypeScript Interfaces:

```
interface IMultilingualText {
  en: string;
  hi: string;
  regional?: Record<string, string>;
}

interface IEligibilityRules {
  states: string[] | null;
  max_landholding?: number;
  min_landholding?: number;
  crop_types: string[] | null;
  social_categories: string[] | null;
  max_income?: number;
  additional_criteria?: string;
}

interface IFinancialBenefit {
  amount: number;
  frequency: "one_time" | "annual" | "monthly";
  disbursement_mode: "DBT" | "subsidy" | "loan";
}

interface IBenefits {
  financial: IFinancialBenefit;
  non_financial: string[];
}

interface IApplicationProcess {
  portal_url: string;
  deadline?: Date;
  start_date: Date;
  is_open: boolean;
}

interface IPDFDoc {
  type: "guideline" | "application_form" | "faq";
  url: string;
  language: string;
  version: string;
  uploaded_at: Date;
  processed: boolean;
}

interface IScheme extends Document {
  scheme_id: string;
  name: IMultilingualText;
  ministry: string;
  description: IMultilingualText;
  eligibility_rules: IEligibilityRules;
  benefits: IBenefits;
  application_process: IApplicationProcess;
  required_documents: string[];
  pdf_documents: IPDFDoc[];
  budget_allocation: number;
  effective_date: Date;
  expiry_date?: Date;
  popularity_score: number;
  status: "active" | "inactive" | "archived";
}
```

Indexes:
• scheme_id (unique)
• ministry
• eligibility_rules.states (multikey)
• application_process.is_open
• effective_date
• status
• popularity_score

## 2.4 eligibility_checks

Purpose: Log all eligibility checks with results

TypeScript Interfaces:

```
interface ICitation {
  document_url: string;
  page_number: number;
  paragraph: string;
  text_excerpt: string;
}

interface ISchemeCheckResult {
  scheme_id: string;
  scheme_name: string;
  is_eligible: boolean;
  confidence_score: number;
  reasoning: string;
  citations: ICitation[];
  benefits_eligible_for: {
    financial_amount: number;
    frequency: string;
  };
}

interface IEligibilityCheck extends Document {
  user_id: Types.ObjectId;
  farmer_profile_id: Types.ObjectId;
  profile_snapshot: Record<string, any>;
  schemes_checked: ISchemeCheckResult[];
  total_schemes_analyzed: number;
  eligible_count: number;
  input_method: "voice" | "form";
  language_used: string;
  processing_time_ms: number;
  llm_provider: string;
  tokens_used: number;
  created_at: Date;
  ip_address: string;
  user_agent: string;
}
```

Indexes:
• user_id
• farmer_profile_id
• created_at (descending)
• schemes_checked.scheme_id (multikey)
• schemes_checked.is_eligible (multikey)

## 2.5 pdf_documents

Purpose: Track PDF document processing

TypeScript Interfaces:

```
interface IExtractionMetadata {
  total_chunks: number;
  extraction_method: string;
  extraction_timestamp: Date;
}

interface IEmbeddingMetadata {
  model_used: string;
  total_vectors: number;
  embedding_timestamp: Date;
  vector_db_namespace: string;
}

type ProcessingStatus = "pending" | "processing" | "completed" | "failed";
type EmbeddingStatus = "pending" | "processing" | "completed" | "failed";

interface IPDFDocument extends Document {
  document_id: string;
  scheme_id: string;
  document_type: "guideline" | "application_form" | "faq";
  title: string;
  source_url: string;
  storage_url: string;
  file_size_bytes: number;
  page_count: number;
  language: string;
  processing_status: ProcessingStatus;
  extraction_metadata?: IExtractionMetadata;
  embedding_status: EmbeddingStatus;
  embedding_metadata?: IEmbeddingMetadata;
  checksum: string;
  version: number;
  last_processed_at?: Date;
}
```

Indexes:
• document_id (unique)
• scheme_id
• processing_status
• embedding_status
• checksum

## 2.6 saved_schemes

Purpose: User bookmarks and saved schemes

TypeScript Interface:

```
interface IReminder {
  date: Date;
  message: string;
  sent: boolean;
}

type ApplicationStatus = "not_started" | "in_progress" | "submitted" | "approved" | "rejected";

interface ISavedScheme extends Document {
  user_id: Types.ObjectId;
  scheme_id: string;
  eligibility_check_id?: Types.ObjectId;
  notes?: string;
  application_status: ApplicationStatus;
  application_reference?: string;
  reminders: IReminder[];
  created_at: Date;
  updated_at: Date;
}
```

Indexes:
• user_id + scheme_id (compound unique)
• user_id
• application_status

## 2.7 analytics

Purpose: Aggregate metrics and usage data

TypeScript Interface:

```
type EventType = 
  | "profile_created"
  | "profile_updated"
  | "eligibility_check_started"
  | "eligibility_check_completed"
  | "scheme_viewed"
  | "scheme_saved"
  | "scheme_application_started"
  | "voice_input_used"
  | "form_input_used"
  | "error_occurred"
  | "page_load"
  | "language_changed";

interface IAnalytics extends Document {
  event_type: EventType;
  user_id?: Types.ObjectId;
  scheme_id?: string;
  metadata: Record<string, any>;
  timestamp: Date;
  session_id: string;
}
```

# 3. Vector Database Schema (TypeScript)

Index Name: agricultural_schemes

Vector Dimensions: 1536 (for text-embedding-ada-002)

Pinecone TypeScript Types:

```
type SectionType = "eligibility" | "benefits" | "application" | "faq" | "general";
type Language = "en" | "hi" | "mr" | "ta" | "te" | "kn";

interface VectorMetadata {
  document_id: string;
  scheme_id: string;
  scheme_name: string;
  chunk_index: number;
  section_type: SectionType;
  page_number: number;
  paragraph_index: number;
  text_content: string;
  state_applicability: string[];
  crop_relevance: string[];
  language: Language;
  created_at: number;
}

interface VectorRecord {
  id: string;
  values: number[];
  metadata: VectorMetadata;
}

interface QueryResponse {
  matches: Array<{
    id: string;
    score: number;
    metadata: VectorMetadata;
  }>;
}
```

Query Filters:
• section_type = "eligibility"
• state_applicability contains farmer.state
• crop_relevance contains farmer.crop_types

# 4. Redis Cache Schema (TypeScript)

Type-Safe Cache Keys:

```
type SessionKey = `session:${string}`;
type SchemeKey = `scheme:${string}`;
type EligibilityKey = `eligibility:${string}:${string}`;
type RateLimitKey = `rate_limit:${string}:${string}`;

interface SessionData {
  user_id: string;
  profile_id: string;
  last_activity: number;
}

interface SchemeCache {
  scheme_id: string;
  name: Record<string, string>;
  eligibility_rules: IEligibilityRules;
  benefits: IBenefits;
}

interface EligibilityCache {
  is_eligible: boolean;
  confidence_score: number;
  reasoning: string;
  citations: ICitation[];
  cached_at: number;
}
```

```
JavaScript Doc (For information only) :
“””
Key-Value Pairs:

1. Session Management:
   Key: session:{session_id}
   Value: JSON (user_id, profile_id, last_activity)
   TTL: 24 hours

2. Scheme Cache:
   Key: scheme:{scheme_id}
   Value: JSON (full scheme document)
   TTL: 1 hour

3. Eligibility Results:
   Key: eligibility:{profile_hash}:{scheme_id}
   Value: JSON (eligibility result)
   TTL: 7 days

4. Rate Limiting:
   Key: rate_limit:{user_id}:{endpoint}
   Value: Request count
   TTL: 1 hour
“””
```

# 5. Shared Types Package

Structure: packages/types/src/

```
types/
├── models/
│   ├── User.ts
│   ├── FarmerProfile.ts
│   ├── Scheme.ts
│   ├── EligibilityCheck.ts
│   └── index.ts
├── api/
│   ├── requests/
│   │   ├── auth.ts
│   │   ├── profile.ts
│   │   └── eligibility.ts
│   ├── responses/
│   │   ├── auth.ts
│   │   ├── profile.ts
│   │   └── eligibility.ts
│   └── index.ts
├── enums/
│   ├── Role.ts
│   ├── SocialCategory.ts
│   ├── ApplicationStatus.ts
│   └── index.ts
└── index.ts
```

# 6. Type Utilities

Common TypeScript Utilities:

```
// Utility Types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type AsyncResult<T> = Promise<T>;
type ID = string;

// API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

// Pagination
interface PaginatedResponse<T> {
  total: number;
  limit: number;
  offset: number;
  data: T[];
  next: string | null;
  previous: string | null;
}

// Query Filters
type FilterOperator = "$eq" | "$ne" | "$gt" | "$gte" | "$lt" | "$lte" | "$in" | "$nin";
type QueryFilter<T> = {
  [K in keyof T]?: T[K] | { [op in FilterOperator]?: T[K] };
};
```

# 7. Validation Schemas (Zod)

Runtime Type Validation:

```
import { z } from "zod";

export const FarmerProfileSchema = z.object({
  full_name: z.string().min(2).max(100),
  state: z.string(),
  district: z.string(),
  pincode: z.string().regex(/^[0-9]{6}$/),
  landholding: z.object({
    total_area: z.number().positive(),
    irrigated_area: z.number().nonnegative().optional(),
    ownership_type: z.enum(["owned", "leased", "mixed"])
  }),
  crop_types: z.array(z.string()).min(1),
  social_category: z.enum(["General", "SC", "ST", "OBC"]),
  annual_income: z.number().nonnegative().optional()
});

export type FarmerProfileInput = z.infer<typeof FarmerProfileSchema>;
```

# 8. Type Generation Strategy

```
Automated Type Generation:
1. Mongoose schemas → TypeScript interfaces (using mongoose-tsgen)
2. API routes → OpenAPI spec → TypeScript types
3. Zod schemas → TypeScript types (using z.infer)
4. Database enums → TypeScript enums

Build Process:
1. Generate types: npm run generate:types
2. Validate types: tsc --noEmit
3. Build shared package: tsc -p tsconfig.build.json
4. Publish to npm: npm publish @agri-schemes/types
```

# 9. Type Safety Best Practices

- Use strict TypeScript config (strict: true, noImplicitAny: true)
- Define interfaces for all data structures
- Use enums for fixed sets of values
- Avoid any type, use unknown instead
- Leverage union types for state management
- Use type guards for runtime type checking
- Implement discriminated unions for polymorphic data
- Use const assertions for literal types
- Prefer interfaces over type aliases for objects
- Use utility types (Partial, Pick, Omit) for derived types
# 10. Entity Relationship Diagram

```
Relationships:

users (1) ─────── (1) farmer_profiles
  │                        │
  │                        │
  └── (1:M) ──────────────┤
                           │
eligibility_checks (M) ────┘
  │
  └── references ──> schemes (M)
  │
  └── references ──> pdf_documents (M)

users (1) ───── (M) saved_schemes (M) ───── (1) schemes

schemes (1) ───── (M) pdf_documents

pdf_documents (1) ───── (M) vector_embeddings (in Pinecone/Weaviate)
```

# 11. Data Integrity Rules

- User email and phone must be unique across users collection
- farmer_profiles.user_id must reference valid users._id
- schemes.scheme_id must be unique and immutable
- eligibility_checks.profile_snapshot preserves historical data (no cascading updates)
- pdf_documents.checksum triggers re-processing if changed
- saved_schemes prevents duplicate user + scheme combinations
- All dates stored in UTC timezone
- Sensitive data (bank_details) encrypted at rest using MongoDB field-level encryption
# 12. Data Retention Policy

• eligibility_checks: Retain for 2 years, then archive
• analytics events: Aggregate monthly, retain raw for 6 months
• user accounts: Soft delete (is_active=false), hard delete after 90 days of inactivity
• pdf_documents: Retain until scheme is archived + 1 year
• Redis cache: TTL-based expiration (no manual cleanup needed)

# 13. Backup Strategy

MongoDB:
• Daily automated backups via MongoDB Atlas
• Point-in-time recovery enabled (continuous backup)
• 30-day retention for daily backups
• Weekly backups retained for 6 months

Vector Database:
• Export metadata to MongoDB monthly
• Rebuild capability from pdf_documents collection

Redis:
• Ephemeral data, no backup required
• Rebuild from primary database on failure

# 14. Migration Strategy

• Schema versioning: Track schema changes in migrations collection
• Backwards compatibility: Support N-1 schema version during rollout
• Data migration scripts: Node.js migration framework (migrate-mongo)
• Testing: Validate migrations on staging with production data snapshot
• Rollback plan: Keep previous schema version for 48 hours post-migration







