# BrushBuild - Art + Maker Class Website Specification

## 1. Project Overview

**Project Name:** BrushBuild
**Type:** Full-stack web application (Frontend + Backend)
**Core Functionality:** Art and maker class website for children and teens, featuring class listings, registration, trial bookings, and program information
**Target Users:** Parents looking for art education for their children (ages 4-18), teenagers interested in creative arts

## 2. Design Specification

### Color Palette
- **Primary:** `#1a1a2e` (Deep Navy)
- **Secondary:** `#16213e` (Dark Blue)
- **Accent:** `#e94560` (Coral Red)
- **Accent Secondary:** `#0f3460` (Royal Blue)
- **Highlight:** `#f8b500` (Golden Yellow)
- **Light:** `#f5f5f5` (Off White)
- **Text Primary:** `#1a1a2e`
- **Text Light:** `#ffffff`
- **Text Muted:** `#6b7280`

### Typography
- **Headings:** "Playfair Display", serif - elegant, artistic feel
- **Body:** "DM Sans", sans-serif - clean, modern readability
- **Accent/Logo:** "Righteous", cursive - creative, hand-crafted feel

### Layout Structure
- **Max Width:** 1200px centered
- **Spacing Scale:** 8px base (0.5rem)
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Visual Elements
- **Border Radius:** 12px for cards, 8px for buttons, 50% for avatars
- **Shadows:**
  - Light: `0 4px 20px rgba(0,0,0,0.08)`
  - Medium: `0 8px 30px rgba(0,0,0,0.12)`
  - Heavy: `0 15px 50px rgba(0,0,0,0.15)`
- **Animations:**
  - Page load: fade-in with slide up (0.6s ease-out)
  - Hover transitions: 0.3s ease
  - Staggered card reveals: 0.1s delay increments

## 3. Page Structure

### 3.1 Header
- Logo (left): "BrushBuild" with paint brush icon
- Navigation (center): Home, Programs, About, Teachers, Gallery, Contact
- CTA Button (right): "Book Free Trial"
- Mobile: Hamburger menu with slide-in drawer

### 3.2 Footer
- 4 columns: About, Programs, Contact, Newsletter
- Social media icons
- Copyright notice

## 4. Pages Detail

### 4.1 Home Page (index.html)
**Hero Section:**
- Large headline: "Where Creativity Takes Shape"
- Subtext: "Inspiring young artists and makers through innovative art education"
- Two CTA buttons: "Explore Programs" / "Book Free Trial"
- Animated paint splatter background effect

**Stats Section:**
- 98% Student Satisfaction
- 50+ Creative Classes
- 1000+ Students Taught
- 15+ Expert Instructors

**Programs Preview:**
- Grid of 4 program cards with hover effects
- Programs: Fine Art (Kids), Fine Art (Teens), Digital Art, Maker Lab

**Why Choose Us:**
- 3-column feature list with icons
- Features: Expert Instructors, Hands-on Learning, Portfolio Building

**Testimonials:**
- Carousel of parent testimonials
- Star ratings
- Student artwork background

**CTA Section:**
- "Start Your Creative Journey Today"
- Form to sign up for updates

### 4.2 Programs Page (programs.html)
- Filterable grid of all classes
- Filter by: Age group, Category, Level, Location
- Class cards with:
  - Thumbnail image
  - Class name
  - Age range
  - Schedule
  - Price
  - "Learn More" button

### 4.3 About Page (about.html)
- Mission statement section
- Our story/history
- Values (Creativity, Confidence, Community)
- Achievements/stats
- Team preview

### 4.4 Teachers Page (teachers.html)
- Grid of teacher cards
- Each card: Photo, Name, Title, Specialization, Bio excerpt
- Expandable bio on click

### 4.5 Gallery Page (gallery.html)
- Masonry-style image grid
- Filter by: Program type, Age group
- Lightbox on click for full view

### 4.6 Contact Page (contact.html)
- Contact form (Name, Email, Phone, Message)
- Location info with embedded map placeholder
- Phone/email info
- Business hours

### 4.7 Registration Page (register.html)
- Multi-step registration form
- Step 1: Select Program
- Step 2: Select Class Schedule
- Step 3: Student Information
- Step 4: Parent/Guardian Information
- Step 5: Confirmation

## 5. Backend Specification

### Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (file-based, simple setup)
- **API:** RESTful JSON API

### API Endpoints

**Classes:**
- `GET /api/classes` - List all classes (with filters)
- `GET /api/classes/:id` - Get single class details

**Programs:**
- `GET /api/programs` - List all programs

**Teachers:**
- `GET /api/teachers` - List all teachers

**Registrations:**
- `POST /api/register` - Submit registration
- `GET /api/register/:id` - Get registration status

**Contact:**
- `POST /api/contact` - Submit contact form

### Data Models

**Class:**
```json
{
  "id": "string",
  "name": "string",
  "program": "string",
  "ageRange": "string",
  "level": "string",
  "duration": "string",
  "schedule": "string",
  "price": "number",
  "description": "string",
  "image": "string",
  "location": "string"
}
```

**Registration:**
```json
{
  "id": "string",
  "classId": "string",
  "studentName": "string",
  "studentAge": "number",
  "parentName": "string",
  "parentEmail": "string",
  "parentPhone": "string",
  "status": "pending|confirmed|cancelled",
  "createdAt": "datetime"
}
```

## 6. Functionality Specification

### Frontend Features
- Responsive design (mobile-first)
- Smooth scroll navigation
- Form validation (client-side)
- Image lazy loading
- Animated UI elements on scroll
- Mobile navigation drawer
- Class filtering and search

### Backend Features
- RESTful API endpoints
- Form data validation
- Data persistence (SQLite)
- CORS support
- Error handling

## 7. Acceptance Criteria

1. All pages load without errors
2. Responsive design works on mobile, tablet, desktop
3. All navigation links work correctly
4. Forms submit and display success messages
5. API endpoints return proper JSON responses
6. Animations play smoothly
7. Colors and typography match spec
8. All images load or have placeholders