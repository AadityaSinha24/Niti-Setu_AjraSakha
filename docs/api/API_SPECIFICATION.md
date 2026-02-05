# API Specification

# 1. API Overview

```
Base URL: https://api.agri-schemes.gov.in/v1
Protocol: HTTPS only
Authentication: JWT Bearer tokens
Content-Type: application/json
Rate Limiting: 100 requests/hour per user
Type System: Full TypeScript type definitions
Validation: Zod runtime validation
API Version: 1.0
```

# 2. TypeScript Type Definitions

## 2.1 Request/Response Base Types

```
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

interface PaginatedResponse<T> {
  total: number;
  limit: number;
  offset: number;
  data: T[];
  next: string | null;
  previous: string | null;
}
```

# 3. Authentication Endpoints

## POST /auth/register

Description: Register new farmer account

TypeScript Types:

```
interface RegisterRequest {
  email: string;
  password: string;
  phone?: string;
  language_preference?: "hi" | "en" | "mr";
}

interface RegisterResponse {
  user_id: string;
  message: string;
}

type RegisterApiResponse = ApiResponse<RegisterResponse>;
```

```
Request Body Example:
{
  "email": "farmer@example.com",
  "password": "SecurePass123!",
  "phone": "+919876543210",
  "language_preference": "hi"
}
```

```
Response (201):
{
  "success": true,
  "user_id": "507f1f77bcf86cd799439011",
  "message": "Account created. Verify email."
}
```

Error Responses:
400 - Invalid input
409 - Email already exists

## POST /auth/login

TypeScript Types:

```
interface LoginRequest {
  email: string;
  password: string;
}

interface UserInfo {
  user_id: string;
  email: string;
  role: "farmer" | "admin" | "auditor";
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: UserInfo;
}

type LoginApiResponse = ApiResponse<LoginResponse>;
```

```
Request Body:
{"email": "farmer@example.com", "password": "SecurePass123!"}

Response (200):
{
  "success": true,
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
  "expires_in": 900,
  "user": {
    "user_id": "507f1f77bcf86cd799439011",
    "email": "farmer@example.com",
    "role": "farmer"
  }
}
```

## POST /auth/refresh

TypeScript Types:

```
interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

type RefreshTokenApiResponse = ApiResponse<RefreshTokenResponse>;
```

```
Headers: Cookie: refresh_token=...

Response (200):
{"access_token": "...", "expires_in": 900}
```

# 4. Profile Endpoints

## POST /profiles

Description: Create farmer profile
Auth: Required

TypeScript Types:

```
interface Landholding {
  total_area: number;
  irrigated_area?: number;
  ownership_type: "owned" | "leased" | "mixed";
}

interface CreateProfileRequest {
  full_name: string;
  state: string;
  district: string;
  pincode: string;
  landholding: Landholding;
  crop_types: string[];
  social_category: "General" | "SC" | "ST" | "OBC";
  annual_income?: number;
}

interface CreateProfileResponse {
  profile_id: string;
}

type CreateProfileApiResponse = ApiResponse<CreateProfileResponse>;
```

```
Request Body:
{
  "full_name": "Ramesh Kumar",
  "state": "Madhya Pradesh",
  "district": "Bhopal",
  "pincode": "462001",
  "landholding": {"total_area": 2.5, "irrigated_area": 1.0, "ownership_type": "owned"},
  "crop_types": ["wheat", "soybean"],
  "social_category": "OBC",
  "annual_income": 150000
}

Response (201):
{"success": true, "profile_id": "507f1f77bcf86cd799439012"}
```

## GET /profiles/{profile_id}

Auth: Required

TypeScript Types:

```
interface FarmerProfile {
  profile_id: string;
  user_id: string;
  full_name: string;
  state: string;
  district: string;
  pincode: string;
  landholding: Landholding;
  crop_types: string[];
  social_category: "General" | "SC" | "ST" | "OBC";
  annual_income?: number;
  created_at: string;
  updated_at: string;
}

type GetProfileApiResponse = ApiResponse<FarmerProfile>;
```

```
Response (200): {farmer profile object}
```

## PUT /profiles/{profile_id}

Auth: Required

Request: Partial profile update
Response (200): Updated profile


# 5. Voice Processing Endpoints

## POST /voice/transcribe

Description: Convert speech to text
Auth: Required
Content-Type: multipart/form-data

TypeScript Types:

```
interface TranscribeRequest {
  audio: File;
  language: "hi" | "en" | "mr";
}

interface TranscribeResponse {
  transcript: string;
  confidence: number;
  language_detected: string;
}

type TranscribeApiResponse = ApiResponse<TranscribeResponse>;
```

```
Request:
- audio: File (MP3/WAV, max 10MB)
- language: String (hi/en)

Response (200):
{
  "success": true,
  "transcript": "मेरे पास दो एकड़ जमीन है भोपाल में",
  "confidence": 0.95,
  "language_detected": "hi"
}
```

## POST /voice/extract-profile

Description: Extract structured data from voice transcript
Auth: Required

TypeScript Types:

```
interface ExtractProfileRequest {
  transcript: string;
}

interface ExtractedData {
  landholding?: Partial<Landholding>;
  district?: string;
  state?: string;
  crop_types?: string[];
  confidence: Record<string, number>;
}

interface ExtractProfileResponse {
  extracted_data: ExtractedData;
  missing_fields: string[];
}

type ExtractProfileApiResponse = ApiResponse<ExtractProfileResponse>;
```

```
Request Body:
{"transcript": "मेरे पास दो एकड़ जमीन है भोपाल में"}

Response (200):
{
  "success": true,
  "extracted_data": {
    "landholding": {"total_area": 2},
    "district": "Bhopal",
    "confidence": {"landholding": 0.9, "district": 0.95}
  },
  "missing_fields": ["state", "crop_types", "social_category"]
}
```

# 6. Eligibility Check Endpoints

## POST /eligibility/check

Description: Check eligibility for all applicable schemes
Auth: Required

TypeScript Types:

```
interface SchemesFilter {
  states?: string[];
  max_results?: number;
}

interface EligibilityCheckRequest {
  profile_id: string;
  schemes_filter?: SchemesFilter;
}

interface Citation {
  document_url: string;
  page_number: number;
  paragraph: number;
  text_excerpt: string;
}

interface FinancialBenefit {
  financial_amount: number;
  frequency: "one_time" | "annual" | "monthly";
  disbursement_mode: "DBT" | "subsidy" | "loan";
}

interface SchemeResult {
  scheme_id: string;
  scheme_name: string;
  is_eligible: boolean;
  confidence_score: number;
  reasoning: string;
  citations: Citation[];
  benefits: FinancialBenefit;
  required_documents: string[];
  application_url: string;
}

interface EligibilityCheckResponse {
  check_id: string;
  total_schemes_analyzed: number;
  eligible_count: number;
  processing_time_ms: number;
  results: SchemeResult[];
}

type EligibilityCheckApiResponse = ApiResponse<EligibilityCheckResponse>;
```

```
Request Body:
{
  "profile_id": "507f1f77bcf86cd799439012",
  "schemes_filter": {"states": ["Madhya Pradesh"], "max_results": 20}
}

Response (200):
{
  "success": true,
  "check_id": "507f1f77bcf86cd799439013",
  "total_schemes_analyzed": 47,
  "eligible_count": 3,
  "processing_time_ms": 8420,
  "results": [
    {
      "scheme_id": "PM_KISAN_2024",
      "scheme_name": "PM-KISAN",
      "is_eligible": true,
      "confidence_score": 0.98,
      "reasoning": "Farmer owns 2.5 acres (<2 hectares), meets landholding criteria.",
      "citations": [
        {
          "document_url": "https://pmkisan.gov.in/guidelines.pdf",
          "page_number": 4,
          "paragraph": 3,
          "text_excerpt": "All farmers with landholding up to 2 hectares are eligible for income support of ₹6,000/year."
        }
      ],
      "benefits": {"financial_amount": 6000, "frequency": "annual", "disbursement_mode": "DBT"},
      "required_documents": ["Aadhar", "Land records", "Bank account"],
      "application_url": "https://pmkisan.gov.in/apply"
    }
  ]
}
```

## GET /eligibility/check/{check_id}

Auth: Required

TypeScript Types:

```
interface FullEligibilityCheck extends EligibilityCheckResponse {
  profile_snapshot: FarmerProfile;
  created_at: string;
  input_method: "voice" | "form";
  language_used: string;
}

type GetEligibilityCheckApiResponse = ApiResponse<FullEligibilityCheck>;
```

Response (200): Full eligibility check result

## GET /eligibility/history

Description: Get user's eligibility check history
Auth: Required

TypeScript Types:

```
interface EligibilityCheckSummary {
  check_id: string;
  eligible_count: number;
  total_schemes_analyzed: number;
  created_at: string;
}

interface EligibilityHistoryParams {
  limit?: number;
  offset?: number;
}

type EligibilityHistoryResponse = PaginatedResponse<EligibilityCheckSummary>;
```

```
Query Parameters:
- limit: Number (default 20)
- offset: Number (default 0)

Response (200):
{
  "success": true,
  "total": 15,
  "checks": [{check summaries}]
}
```

# 7. Schemes Endpoints

## GET /schemes

Description: List all active schemes
Auth: Optional

TypeScript Types:

```
interface SchemeQueryParams {
  state?: string;
  ministry?: string;
  crop_type?: string;
  sort?: "popularity" | "deadline" | "benefits";
  limit?: number;
  offset?: number;
}

interface MultilingualText {
  en: string;
  hi: string;
  regional?: Record<string, string>;
}

interface SchemeSummary {
  scheme_id: string;
  name: MultilingualText;
  ministry: string;
  benefit_amount: number;
  application_deadline?: string;
  is_open: boolean;
}

type GetSchemesResponse = PaginatedResponse<SchemeSummary>;
```

```
Query Parameters:
- state: String (filter by state)
- ministry: String
- crop_type: String
- sort: String (popularity, deadline, benefits)
- limit: Number (default 20)
- offset: Number (default 0)

Response (200):
{
  "success": true,
  "total": 112,
  "schemes": [{scheme objects}]
}
```

## GET /schemes/{scheme_id}

Auth: Optional

TypeScript Types:

```
interface EligibilityRules {
  states: string[] | null;
  max_landholding?: number;
  min_landholding?: number;
  crop_types: string[] | null;
  social_categories: string[] | null;
  max_income?: number;
}
```

Response (200): Full scheme details with eligibility rules

## GET /schemes/{scheme_id}/pdf

```
Description: Get scheme guideline PDF
Auth: Optional

interface SchemeDetail {
  scheme_id: string;
  name: MultilingualText;
  ministry: string;
  description: MultilingualText;
  eligibility_rules: EligibilityRules;
  benefits: FinancialBenefit;
  required_documents: string[];
  application_url: string;
  effective_date: string;
  expiry_date?: string;
}

type GetSchemeDetailApiResponse = ApiResponse<SchemeDetail>;
```

Query Parameters:
- language: String (default: en)

Response (200): PDF file stream

# 8. Saved Schemes Endpoints

## POST /saved-schemes

Description: Save scheme for later
Auth: Required

TypeScript Types:

```
interface SaveSchemeRequest {
  scheme_id: string;
  notes?: string;
}

interface SaveSchemeResponse {
  saved_id: string;
}

type SaveSchemeApiResponse = ApiResponse<SaveSchemeResponse>;
```

```
Request Body:
{"scheme_id": "PM_KISAN_2024", "notes": "Apply before March"}

Response (201): {"success": true, "saved_id": "..."}
```

## GET /saved-schemes

Auth: Required

TypeScript Types:

```
type ApplicationStatus = "not_started" | "in_progress" | "submitted" | "approved" | "rejected";

interface SavedScheme {
  saved_id: string;
  scheme_id: string;
  scheme_name: string;
  notes?: string;
  application_status: ApplicationStatus;
  application_reference?: string;
  created_at: string;
}

type GetSavedSchemesApiResponse = ApiResponse<SavedScheme[]>;
```

Response (200): List of saved schemes with status

## PUT /saved-schemes/{saved_id}

```
Description: Update application status
Auth: Required

Request Body:
{"application_status": "submitted", "application_reference": "PMK12345"}

Response (200): Updated saved scheme
```

## DELETE /saved-schemes/{saved_id}

Auth: Required

Response (204): No content

# 9. Document Generation Endpoints

## POST /documents/generate-checklist

Description: Generate document checklist for scheme
Auth: Required

TypeScript Types:

```
interface GenerateChecklistRequest {
  scheme_id: string;
  profile_id: string;
}

interface DocumentItem {
  document: string;
  required: boolean;
  status: "uploaded" | "pending" | "verified";
}

interface ChecklistResponse {
  checklist: DocumentItem[];
}

type GenerateChecklistApiResponse = ApiResponse<ChecklistResponse>;
```

```
Request Body:
{"scheme_id": "PM_KISAN_2024", "profile_id": "..."}

Response (200):
{
  "success": true,
  "checklist": [
    {"document": "Aadhar Card", "required": true, "status": "uploaded"},
    {"document": "Land Records", "required": true, "status": "pending"}
  ]
}
```

## POST /documents/prefill-form

Description: Generate pre-filled application form
Auth: Required

TypeScript Types:

```
interface PrefillFormRequest {
  scheme_id: string;
  profile_id: string;
}

interface PrefillFormResponse {
  document_url: string;
  expires_at: string;
}

type PrefillFormApiResponse = ApiResponse<PrefillFormResponse>;
```

```
Request Body:
{"scheme_id": "PM_KISAN_2024", "profile_id": "..."}

Response (200):
{
  "success": true,
  "document_url": "https://cdn.agri-schemes.gov.in/forms/PMK_prefilled_123.pdf",
  "expires_at": "2025-02-10T12:00:00Z"
}
```

# 10. Analytics Endpoints

## GET /analytics/dashboard

Description: Get user dashboard metrics
Auth: Required

TypeScript Types:

```
interface ActivityLog {
  event_type: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface DashboardMetrics {
  total_checks: number;
  eligible_schemes_count: number;
  applications_started: number;
  applications_submitted: number;
  total_benefits_eligible: number;
  recent_activity: ActivityLog[];
}

type GetDashboardApiResponse = ApiResponse<DashboardMetrics>;
```

```
Response (200):
{
  "total_checks": 15,
  "eligible_schemes_count": 8,
  "applications_started": 3,
  "applications_submitted": 1,
  "total_benefits_eligible": 45000,
  "recent_activity": [{activity logs}]
}
```

## POST /analytics/events

Description: Log user events
Auth: Required

TypeScript Types:

```
type EventType = 
  | "scheme_viewed"
  | "scheme_saved"
  | "application_started"
  | "form_filled"
  | "voice_used";

interface TrackEventRequest {
  event_type: EventType;
  scheme_id?: string;
  metadata?: Record<string, any>;
}

Response: 204 No Content
```

```
Request Body:
{
  "event_type": "scheme_viewed",
  "scheme_id": "PM_KISAN_2024",
  "metadata": {"duration_seconds": 45}
}
```

# 11. Admin Endpoints

## POST /admin/schemes

Description: Create new scheme
Auth: Required (admin role)

TypeScript Types:

```
interface CreateSchemeRequest {
  scheme_id: string;
  name: MultilingualText;
  ministry: string;
  description: MultilingualText;
  eligibility_rules: EligibilityRules;
  benefits: FinancialBenefit;
  required_documents: string[];
  application_url: string;
}

type CreateSchemeApiResponse = ApiResponse<SchemeDetail>;
```

Request Body: Full scheme object

Response (201): Created scheme

## POST /admin/pdf/ingest

```
Description: Ingest PDF for RAG processing
Auth: Required (admin role)
Content-Type: multipart/form-data

Request:
- pdf: File
- scheme_id: String
- document_type: String
- language: String

TypeScript Types:
```

```
interface IngestPDFRequest {
  pdf: File;
  scheme_id: string;
  document_type: "guideline" | "application_form" | "faq";
  language: string;
}

type ProcessingStatus = "queued" | "processing" | "completed" | "failed";

interface IngestPDFResponse {
  document_id: string;
  processing_status: ProcessingStatus;
  estimated_time_minutes: number;
}

type IngestPDFApiResponse = ApiResponse<IngestPDFResponse>;
```

```
Response (202):
{
  "success": true,
  "document_id": "...",
  "processing_status": "queued",
  "estimated_time_minutes": 5
}
```

## GET /admin/pdf/{document_id}/status

```
Auth: Required (admin role)

Response (200):
{
  "document_id": "...",
  "processing_status": "completed",
  "extraction_metadata": {"total_chunks": 45},
  "embedding_status": "completed",
  "embedding_metadata": {"total_vectors": 45}
}
```

# 12. Error Types

TypeScript Error Definitions:

```
type ErrorCode = 
  | "INVALID_INPUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | "SERVICE_UNAVAILABLE";

interface ApiError {
  code: ErrorCode;
  message: string;
  details?: Record<string, any>;
}

interface ErrorResponse {
  success: false;
  error: ApiError;
}
```

```
All error responses follow this structure From JavaScript Doc:
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {additional context}
  }
}

Common Error Codes:
• INVALID_INPUT - 400
• UNAUTHORIZED - 401
• FORBIDDEN - 403
• NOT_FOUND - 404
• RATE_LIMIT_EXCEEDED - 429
• INTERNAL_ERROR - 500
• SERVICE_UNAVAILABLE - 503
```

# 13. Type-Safe Client SDK

Generated TypeScript SDK Example:

```
import { ApiClient } from "@agri-schemes/sdk";

const client = new ApiClient({
  baseUrl: "https://api.agri-schemes.gov.in/v1",
  apiKey: process.env.API_KEY
});

// Type-safe API calls
const profile: FarmerProfile = await client.profiles.get(profileId);

const checkResult: EligibilityCheckResponse = 
  await client.eligibility.check({ profile_id: profileId });

// Full IntelliSense support
checkResult.results.forEach((result) => {
  console.log(result.scheme_name, result.is_eligible);
});
```

# 14. Zod Validation Schemas

Runtime Validation:

```
import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const CreateProfileRequestSchema = z.object({
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
  social_category: z.enum(["General", "SC", "ST", "OBC"])
});

// Type inference
type CreateProfileRequest = z.infer<typeof CreateProfileRequestSchema>;
```

# 15. Rate Limiting

```
Headers:
• X-RateLimit-Limit: 100
• X-RateLimit-Remaining: 95
• X-RateLimit-Reset: 1704110400

Limits:
• Standard users: 100 requests/hour
• Premium users: 500 requests/hour
• Admin users: 1000 requests/hour

Response when exceeded (429):
{"error": {"code": "RATE_LIMIT_EXCEEDED", "message": "Try again in 15 minutes"}}
```

# 16. Pagination

```
Query Parameters:
• limit: Number (max 100, default 20)
• offset: Number (default 0)

Response Format:
{
  "total": 250,
  "limit": 20,
  "offset": 0,
  "data": [{items}],
  "next": "/api/v1/schemes?limit=20&offset=20",
  "previous": null
}
```

# 17. Webhooks

```
Supported Events:
• scheme.created
• scheme.updated
• eligibility.checked
• application.status_changed
• pdf.processing_completed

Webhook Payload:
{
  "event_type": "eligibility.checked",
  "event_id": "evt_123",
  "timestamp": "2025-02-03T10:30:00Z",
  "data": {event-specific data}
}
```

# 18. API Versioning

```
Version Format: /v1, /v2, etc.

Current Version: v1

Deprecation Policy:
• New versions announced 3 months in advance
• Old versions supported for 6 months post-deprecation
• Breaking changes only in major versions
• Response headers include: X-API-Version: 1.0
```


