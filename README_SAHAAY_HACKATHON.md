# 🏛️ SAHAAY — Citizen-First Land Acquisition Companion

> **Understand your land. Track your case. Know what to do next.**

---

## 📌 Problem Statement

Land acquisition is a critical component of infrastructure development, including highways, railways, industrial corridors, renewable energy projects, and urban expansion.

While government agencies maintain records and workflows for acquisition projects, the citizens affected by these projects often struggle to understand what is happening to their land.

A typical landowner may receive multiple notices, compensation records, legal documents, and acquisition updates containing complex administrative terminology. Information is usually spread across different departments and systems, making it difficult to answer basic questions:

- Is my land affected?
- What stage has my acquisition case reached?
- What compensation has been approved?
- Are the details in my documents correct?
- What action do I need to take next?
- Where can I report an issue?

As a result, citizens face confusion, lack of transparency, delayed action, and limited visibility into the status of their land acquisition cases.

---

## 💡 Our Solution

**Sahaay** is a citizen-first digital companion designed to simplify the land acquisition journey for affected landowners.

Instead of requiring citizens to navigate complex government systems, Sahaay presents acquisition information in a simple, understandable, and actionable format.

The platform combines:

- Land Parcel Information
- Acquisition Case Tracking
- GIS-Based Visualization
- Compensation & R&R Information
- Document Analysis
- Discrepancy Detection
- Grievance Management
- Notifications & Action Tracking

into a single unified experience.

### Our Goal

> Help citizens understand what is happening to their land, what actions they need to take, and how they can raise concerns when information appears incorrect.

---

## ✨ Key Features

### 🌾 Find My Land
Search and identify land parcels associated with acquisition cases.

### 🗺️ GIS-Based Parcel Visualization
Interactive parcel visualization helping citizens understand land location and acquisition impact.

### ⏳ Acquisition Timeline Tracking
Track acquisition milestones and understand the current stage of a case.

### 📄 Document Intelligence
Upload acquisition-related documents and receive structured information extraction.

### 🔍 Discrepancy Detection
Compare uploaded document information against system records and identify mismatches.

### 💰 Compensation & Rehabilitation Tracking
Monitor compensation records and rehabilitation & resettlement information.

### 📝 Grievance Management
Raise issues directly through the platform and track their resolution status.

### 🔔 Notifications & Action Center
Receive important updates, reminders, and officer responses.

### 👨‍💼 Officer Dashboard
Review cases, manage grievances, and update acquisition status.

---

## 🚀 User Journey

```text
Citizen Login
      ↓
Find My Land
      ↓
View Parcel & Case Details
      ↓
Track Acquisition Timeline
      ↓
Upload Acquisition Document
      ↓
Document Analysis
      ↓
Discrepancy Detection
      ↓
Raise Grievance
      ↓
Officer Review
      ↓
Status Update & Notification
```

---

## 🏗️ System Architecture

```text
Frontend (React + TypeScript)
            │
            ▼
Backend API (Node.js + Express)
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼

Database   AI Layer   Storage
(SQLite)   (Mock AI)  Documents
```

---

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Leaflet

### Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- Zod Validation
- Multer

### Database
- SQLite (Current Implementation)
- PostgreSQL/PostGIS (Future Migration Ready)

### AI Layer
- Mock AI Service
- OpenAI Integration Support

---

## 🌟 Impact

Sahaay empowers citizens affected by land acquisition by making information transparent, understandable, and actionable.

The platform reduces confusion, improves visibility into acquisition proceedings, enables quicker issue resolution, and strengthens citizen engagement throughout the land acquisition process.

---

## 🔮 Future Scope

- PostgreSQL + PostGIS Integration
- Government Land Record API Integration
- OCR-Based Document Processing
- Multilingual Support
- SMS & WhatsApp Notifications
- Voice-Based Citizen Assistance
- Advanced GIS Analytics

---

## ▶️ Quick Start

```bash
npm run install:all
npm run db:push
npm run db:seed
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

---

## 🎯 One-Line Summary

**Sahaay helps citizens understand, track, and act on land acquisition information through parcel discovery, document intelligence, discrepancy detection, compensation tracking, and grievance management.**
