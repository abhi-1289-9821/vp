🏛️ SAHAAY — Citizen-First Land Acquisition Companion

Sahaay is a citizen-centric platform designed to simplify the land acquisition journey for affected landowners. The platform helps citizens understand acquisition notices, track acquisition progress, monitor compensation and rehabilitation status, identify discrepancies in land records, and raise grievances through a single unified interface.
Instead of requiring citizens to navigate multiple government departments and complex legal documents, Sahaay presents acquisition-related information in a simple, understandable, and actionable format.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
✨ Key Features
1. 🌾 Find My Land
Search land parcels using survey numbers and acquisition references.
View parcel details associated with acquisition projects.
Access acquisition case information from a single dashboard.

2. 🗺️ GIS-Based Parcel Visualization
Interactive parcel visualization using digital maps.
Spatial understanding of affected land parcels.
Easy identification of acquisition boundaries and locations.

3. ⏳ Acquisition Timeline Tracking
View the complete lifecycle of an acquisition case.
Track important milestones and status updates.
Understand the current stage of acquisition.

4. 📄 Document Intelligence
Upload acquisition-related documents.
Extract important information from uploaded records.
Convert complex information into citizen-friendly summaries.

5. 🔍 Discrepancy Detection
Compare uploaded document information with system records.
Highlight mismatches in survey numbers, village details, and land area.
Help citizens identify potential record inconsistencies.

6. 💰 Compensation & Rehabilitation Tracking
View compensation details associated with acquisition cases.
Monitor rehabilitation and resettlement information.
Improve transparency throughout the compensation process.

7. 📝 Grievance Management
Raise grievances directly through the platform.
Track grievance status and officer responses.
Maintain a clear communication channel between citizens and authorities.

8. 🔔 Notifications & Action Center
Receive important updates regarding acquisition cases.
View pending actions requiring attention.
Stay informed throughout the acquisition lifecycle.

9. 👨‍💼 Officer Dashboard
Case monitoring and management.
Grievance review and response workflows.
Acquisition status updates and tracking.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🚀 User Journey

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

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🏗️ System Architecture
Frontend (React + TypeScript)
            │
            ▼
Backend API (Node.js + Express)
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼

Database   AI Layer   Storage
(SQLite)   (Mock AI)  Documents

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🛠️ Technology Stack
Frontend
React 18
TypeScript
Vite
Tailwind CSS
React Router
Zustand
TanStack Query
Leaflet
Backend
Node.js
Express.js
Prisma ORM
JWT Authentication
Zod Validation
Multer
Database
SQLite (Current Implementation)
PostgreSQL/PostGIS (Future Migration Ready)
AI Layer
Mock AI Service
OpenAI Integration Support

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🌟 Impact
Sahaay empowers citizens affected by land acquisition by making information transparent, understandable, and actionable.
The platform reduces confusion, improves visibility into acquisition proceedings, enables quicker issue resolution, and strengthens citizen engagement throughout the land acquisition process.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🔮 Future Scope
PostgreSQL + PostGIS Integration
Government Land Record API Integration
OCR-Based Document Processing
Multilingual Support
SMS & WhatsApp Notifications
Voice-Based Citizen Assistance
Advanced GIS Analytics
▶️ Quick Start
npm run install:all
npm run db:push
npm run db:seed
npm run dev

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🎯 One-Line Summary
Sahaay helps citizens understand, track, and act on land acquisition information through parcel discovery, document intelligence, discrepancy detection, compensation tracking, and grievance management.
