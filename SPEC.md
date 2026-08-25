# Art&Make - Art + Maker Class Website Specification

## 1. Project Overview

**Project Name:** Art&Make
**Owner:** Maker Sphere
**Type:** Full-stack web application (Frontend + Backend)
**Core Functionality:** Single-page landing site for art and maker classes, featuring program info and contact form
**Target Users:** Parents looking for art education for their children (ages 4-18)

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
- **Headings:** "Playfair Display", serif
- **Body:** "DM Sans", sans-serif
- **Accent/Logo:** "Righteous", cursive

### Layout Structure
- **Max Width:** 1200px centered
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 3. Page Structure (Single Page)

### 3.1 Header
- Logo (left): "Art&Make" with paint brush icon
- Navigation (right): Programs, Contact
- Mobile: Hamburger menu

### 3.2 Hero Section
- Headline: "Where Creativity Takes Shape"
- CTA buttons: "Explore Programs" / "Contact Us"

### 3.3 Programs Section
- Grid of 4 program cards: Fine Art, Art and Tech, One-time Workshop, Portfolio
- Pricing shown per program

### 3.4 Why Choose Us
- 3-column feature list: Expert Instructors, Hands-on Learning, Portfolio Building

### 3.5 Testimonials
- 3 parent testimonials with star ratings

### 3.6 Contact Section
- Left: Contact info (WeChat, Email, Phone, Location)
- Right: Contact form

### 3.7 Footer
- Copyright notice

## 4. Backend Specification

### Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (file-based)
- **API:** RESTful JSON API

### API Endpoints

**Programs:**
- `GET /api/programs` - List all programs

**Contact:**
- `POST /api/contact` - Submit contact form (sends email)

### Data Models

**Program:**
```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "icon": "string",
  "color": "string"
}
```

**Contact:**
```json
{
  "id": "integer",
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "created_at": "datetime"
}
```

## 5. Functionality

- Single-page design with smooth scroll
- Contact form with email notification
- Programs loaded from API
- Responsive design (mobile-first)
- Scroll animations
- Mobile navigation

## 6. Contact Info

- **WeChat:** artandmake
- **Email:** artandmakestudio@gmail.com
- **Phone:** (408) 818-8818
- **Location:** Fill address here

## 7. Programs

| Program | Price |
|---------|-------|
| Fine Art | $35/session |
| Art and Tech | $35/session |
| One-time Workshop | Contact for Price |
| Portfolio | Contact for Price |
