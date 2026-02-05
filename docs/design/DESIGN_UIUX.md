# UI/UX Design Document

# 1. Design Principles

- Mobile-First: Designed for smartphones with low bandwidth (2G/3G networks)
- Accessibility: Voice interface, high contrast, large touch targets, screen reader support
- Simplicity: Minimal steps to eligibility check, progressive disclosure of information
- Trust & Transparency: Show document citations, explain decisions, build confidence
- Multilingual: Hindi, English, and regional languages with easy switching
- Low Literacy Friendly: Icons, visual cues, voice guidance, minimal text
# 2. User Personas

## Persona 1: Ramesh - Small Farmer

• Age: 45, Education: 8th grade
• Landholding: 1.2 acres
• Tech: Basic smartphone, limited data
• Language: Hindi preferred
• Goals: Find schemes quickly, understand eligibility, avoid application errors
• Pain Points: Can't read English PDFs, unsure about documentation

## Persona 2: Priya - Young Progressive Farmer

```
• Age: 28, Education: 12th grade
• Landholding: 3 acres
• Tech: Comfortable with apps, 4G smartphone
• Language: Bilingual (Hindi/English)
• Goals: Compare schemes, maximize benefits, track applications
• Pain Points: Too many schemes, unclear differences, time-consuming research
```

# 3. Key User Journeys

## 3.1 Primary Journey: Eligibility Check

1. Land on homepage → See hero message: "Check your scheme eligibility in 2 minutes"
2. Choose input method: "Voice" or "Form"
3. Voice path: Tap microphone → Speak profile details → System confirms
4. Form path: Fill 5 fields (State, District, Land, Crop, Category)
5. Submit → Loading screen (8-10 seconds) with reassuring messages
6. Results page: Cards for each applicable scheme
7. Tap card → See full eligibility proof with PDF citations
8. Action buttons: "Start Application", "Save for Later", "Share"

## 3.2 Secondary Journey: Application Assistance

1. From eligibility card → Tap "Start Application"
2. See required documents checklist
3. Download pre-filled application form
4. Upload supporting documents
5. Review and submit
6. Receive confirmation and tracking number

# 4. Information Architecture

```
Site Structure:

Home
├── Get Started (Profile Input)
│   ├── Voice Input
│   └── Form Input
├── Results Dashboard
│   ├── Eligible Schemes
│   ├── Not Eligible (with reasons)
│   └── Scheme Comparison
├── Scheme Detail
│   ├── Eligibility Proof
│   ├── Benefits Overview
│   ├── Document Requirements
│   └── Application Form
├── My Profile
│   ├── Farmer Details
│   ├── Saved Schemes
│   └── Check History
└── Help & Support
    ├── FAQs
    ├── Tutorial Video
    └── Contact Support
```

# 5. Screen Wireframes

## Homepage

- Hero section: "Know Your Scheme Eligibility"
- Tagline: "Voice-enabled. Instant. Proof-backed."
- Language selector: हिं | EN | ಕನ್ನಡ
- CTA button: "Check Eligibility Now"
- Trust indicators: "100+ schemes | 10,000+ farmers helped"
- How it works: 3-step visual (Voice → AI Analysis → Results)
## Profile Input Screen

- Toggle: Voice / Form
- Voice mode: Large microphone button, live transcription display
- Form mode: 5 fields with dropdowns and autocomplete
- - State (dropdown)
- - District (auto-populated based on state)
- - Landholding (number input with unit selector)
- - Crop Type (multi-select)
- - Social Category (dropdown: General/SC/ST/OBC)
- Submit button: "Find My Schemes"
- Progress indicator: "Step 1 of 2"
## Loading Screen

- Animated loader: "Analyzing 100+ schemes..."
- Progress messages:
- "Reading scheme documents..."
- "Matching your profile..."
- "Verifying eligibility rules..."
- "Generating proof..."
- Expected time: 8-10 seconds
## Results Dashboard

- Summary card: "You're eligible for 3 schemes"
- Total potential benefits: ₹12,000/year
- Scheme cards (grid layout):
- - Scheme name and ministry
- - Eligibility status (✓ or ✗ with color coding)
- - Benefit amount
- - Quick proof excerpt
- - CTA: "View Details"
- Filters: By ministry, benefit amount, application deadline
- Sorting: Relevance, Benefit amount, Deadline
## Scheme Detail Page

- Scheme header: Name, ministry, logo
- Eligibility status badge: "✓ You Qualify"
- Proof section:
- - Heading: "Why You Qualify"
- - Citation cards with PDF screenshot
- - Page and paragraph reference
- - Highlighted text: "Farmers with <2 hectares..."
- Benefits section:
- - Financial: ₹6,000/year direct transfer
- - Non-financial: Subsidized inputs
- Document requirements:
- - Checklist: Aadhar, Land records, Bank passbook
- - Upload interface
- Action buttons:
- - "Start Application" (primary)
- - "Download Form"
- - "Save Scheme"
- - "Share"
## Voice Input Interface

- Large microphone icon (center)
- Animation: Sound waves during recording
- Live transcription box: Shows recognized text in real-time
- Language indicator: "Speaking in: Hindi"
- Controls:
- - Stop recording button
- - Replay button
- - Edit transcription
- - Confirm button
- Guidance text: "Say your details clearly. Example: I have 2 acres of land in Bhopal district..."
- Fallback: "Having trouble? Use form instead"
# 6. Visual Design System

## 6.1 Color Palette

Primary Colors:
• Green #2E7D32 (agriculture, success, growth)
• Light Green #81C784 (highlights, secondary actions)

Status Colors:
• Success: #4CAF50 (eligible schemes)
• Warning: #FF9800 (pending, action needed)
• Error: #F44336 (not eligible)
• Info: #2196F3 (informational messages)

Neutral Colors:
• Text: #212121 (primary text)
• Secondary Text: #757575
• Background: #FAFAFA
• Card Background: #FFFFFF
• Borders: #E0E0E0

## 6.2 Typography

```
Fonts:
• Primary: Inter (Latin), Noto Sans (Hindi, regional)
• Fallback: System fonts for performance

Scale:
• H1: 32px/40px (page titles)
• H2: 24px/32px (section headers)
• H3: 20px/28px (card titles)
• Body: 16px/24px (readable on mobile)
• Small: 14px/20px (metadata, captions)

Weights:
• Regular: 400 (body text)
• Medium: 500 (emphasis)
• Bold: 700 (headings, CTAs)
```

## 6.3 Iconography

```
• Icon set: Material Design Icons (universal recognition)
• Size: 24px standard, 48px for primary actions
• Style: Filled for active/selected, outlined for inactive
• Key icons:
  - Microphone (voice input)
  - Check circle (eligible)
  - Cancel (not eligible)
  - Document (proof/citation)
  - Download (forms)
  - Share (social sharing)
  - Language (multilingual)
```

## 6.4 Components

Button Styles:
• Primary: Filled green, white text, 48px height (thumb-friendly)
• Secondary: Outlined green, green text
• Text: No border, green text (tertiary actions)
• Disabled: Gray with 0.4 opacity

Card Design:
• Elevated with 2dp shadow
• 16px padding, 8px border radius
• Tap target: Minimum 48x48px

Form Inputs:
• Outlined style with floating labels
• Large touch targets (56px height)
• Clear error states with red underline and message
• Autocomplete with dropdown suggestions

# 7. Responsive Breakpoints

Mobile (320px - 767px):
• Single column layout
• Full-width cards
• Stacked navigation
• Bottom navigation bar (5 items max)

Tablet (768px - 1023px):
• 2-column grid for scheme cards
• Side navigation drawer
• Optimized for landscape orientation

Desktop (1024px+):
• 3-column grid
• Persistent side navigation
• Multi-column forms
• Enhanced data visualization (charts, comparisons)

# 8. Accessibility Features

- WCAG 2.1 AA compliance
- Minimum contrast ratio: 4.5:1 for text, 3:1 for large text
- Screen reader support: ARIA labels on all interactive elements
- Keyboard navigation: Tab order, focus indicators
- Voice commands: "Check eligibility", "Read proof", "Start application"
- Text scaling: Supports 200% zoom without horizontal scrolling
- Touch targets: Minimum 48x48px (AAA standard)
- Alternative text: All images and icons
- Captions: Video tutorials
- High contrast mode: Toggle for low vision users
# 9. Voice Interface (VUI) Design

## 9.1 Voice Commands

```
Supported phrases:
• "Check my eligibility"
• "I have [X] acres of land in [district]"
• "My crop is [wheat/rice/cotton]"
• "I belong to [SC/ST/OBC] category"
• "Read the proof"
• "Start application"
• "Go back / Cancel"
```

## 9.2 Voice Feedback

System responses (Text-to-Speech):
• Confirmation: "I heard you have 2 acres in Bhopal. Is that correct?"
• Progress: "Analyzing schemes. This will take about 10 seconds."
• Results: "Good news! You qualify for 3 schemes worth ₹12,000 per year."
• Guidance: "To check a different profile, say 'start over'"
• Error handling: "Sorry, I didn't catch that. Please speak clearly or use the form."

## 9.3 Language Support

```
Speech-to-Text:
• Hindi, English, Marathi, Tamil, Telugu, Kannada
• Code-mixed input: "Mere paas 2 acres land hai"
• Automatic language detection

Text-to-Speech Output:
• Same language as input
• Natural voice (Google WaveNet/Azure Neural voices)
• Adjustable speed: 0.75x to 1.5x
```

# 10. Loading States & Empty States

## 10.1 Loading Indicators

• Skeleton screens: Show content structure while loading
• Progress indicators: Linear for determinate tasks, circular for indeterminate
• Optimistic UI: Show action feedback immediately, confirm in background
• Timeouts: Error message after 30 seconds with retry option

## 10.2 Empty States

• No schemes found: "No schemes match your profile. Try updating your details."
• No saved schemes: "You haven't saved any schemes yet. Start by checking eligibility."
• No check history: Illustration + "Check your first scheme eligibility"

# 11. Error States & Messages

- Network error: Friendly message: "Connection lost. Results saved. Retry when online."
- Voice not recognized: "I couldn't understand. Please speak clearly or use the form."
- Incomplete profile: Highlight missing fields with inline messages
- PDF unavailable: "This scheme document is currently unavailable. Try again later."
- LLM timeout: "Taking longer than usual. Please wait or check back in a few minutes."
- Session expired: "Your session expired for security. Please log in again."
# 12. Performance & Data Efficiency

• Page load: <3 seconds on 3G
• Time to Interactive: <5 seconds
• Image optimization: WebP format, lazy loading
• Code splitting: Load only essential JS initially
• Service worker: Cache static assets for offline
• Data usage: <2MB per eligibility check
• Bundle size: <500KB total JS (gzipped)
• Progressive enhancement: Core functionality without JS

# 13. Multilingual UI/UX

```
Text Directionality:
• RTL support: For future Urdu/Arabic support
• Language-specific fonts: Noto Sans family
• Dynamic text expansion: Hindi text ~20% longer than English

Content Strategy:
• Professional translation (not machine translation)
• Cultural adaptation: Use local examples, currency (₹)
• Consistent terminology: Scheme names in official language + translation

Language Switching:
• Persistent across sessions
• Reload-free switching
• Visual indicator: Flag or language code
```

# 14. PWA Capabilities

• Installable: Add to home screen prompt
• Offline mode: View saved schemes, check history
• Push notifications: Scheme deadline reminders, new schemes
• Background sync: Queue eligibility checks, sync when online
• App shell: Instant loading on repeat visits
• Splash screen: Branded loading experience

# 15. Analytics Integration

Events to Track:
• Profile completion rate
• Voice vs Form usage split
• Eligibility check success rate
• Time to result
• Schemes viewed per session
• Application starts vs completions
• Error frequencies
• Language preferences
• Device types and network speeds

User Feedback:
• In-app rating: After successful check
• Feedback form: Report issues, suggest schemes
• NPS survey: Quarterly

