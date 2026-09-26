-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CITIZEN',
    "phone" TEXT,
    "designation" TEXT,
    "department" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CitizenProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "aadhaarMasked" TEXT,
    "village" TEXT,
    "tehsil" TEXT,
    "district" TEXT,
    "state" TEXT DEFAULT 'Madhya Pradesh',
    "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CitizenProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "department" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'Madhya Pradesh',
    "totalAreaHa" REAL NOT NULL DEFAULT 0.0,
    "budgetINR" REAL NOT NULL DEFAULT 0.0,
    "geometryGeoJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Parcel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "surveyNumber" TEXT NOT NULL,
    "khasraNumber" TEXT,
    "village" TEXT NOT NULL,
    "tehsil" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'Madhya Pradesh',
    "recordedAreaHa" REAL NOT NULL,
    "landType" TEXT NOT NULL DEFAULT 'Agricultural',
    "currentStatus" TEXT NOT NULL DEFAULT 'Under Verification',
    "coordinatesJson" TEXT,
    "centroidLat" REAL,
    "centroidLng" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AcquisitionCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseReference" TEXT NOT NULL,
    "parcelId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "citizenId" TEXT NOT NULL,
    "stage" TEXT NOT NULL DEFAULT 'VERIFICATION',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notificationSection" TEXT NOT NULL DEFAULT 'Section 11(1)',
    "noticeDate" DATETIME,
    "estimatedCompensationINR" REAL NOT NULL DEFAULT 0.0,
    "disbursedCompensationINR" REAL NOT NULL DEFAULT 0.0,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AcquisitionCase_parcelId_fkey" FOREIGN KEY ("parcelId") REFERENCES "Parcel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AcquisitionCase_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AcquisitionCase_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AcquisitionEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "documentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AcquisitionEvent_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "AcquisitionCase" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AcquisitionEvent_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT,
    "parcelId" TEXT,
    "uploaderId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "documentType" TEXT NOT NULL DEFAULT 'ACQUISITION_NOTICE',
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL DEFAULT 0,
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "extractedDataJson" TEXT,
    "rawText" TEXT,
    "plainLanguageExplanation" TEXT,
    "hasDiscrepancy" BOOLEAN NOT NULL DEFAULT false,
    "discrepancySummary" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Document_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "AcquisitionCase" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Document_parcelId_fkey" FOREIGN KEY ("parcelId") REFERENCES "Parcel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Document_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompensationRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "landAssessmentINR" REAL NOT NULL DEFAULT 0.0,
    "assetAssessmentINR" REAL NOT NULL DEFAULT 0.0,
    "solatiumINR" REAL NOT NULL DEFAULT 0.0,
    "interestINR" REAL NOT NULL DEFAULT 0.0,
    "totalAssessedINR" REAL NOT NULL DEFAULT 0.0,
    "assessmentStatus" TEXT NOT NULL DEFAULT 'ASSESSED',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PROCESSING',
    "assessmentDate" DATETIME,
    "paymentDate" DATETIME,
    "pfmsReference" TEXT,
    "bankAccountMasked" TEXT,
    "ifscCode" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CompensationRecord_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "AcquisitionCase" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RRRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "familyMembersCount" INTEGER NOT NULL DEFAULT 1,
    "displacedStatus" TEXT NOT NULL DEFAULT 'NOT_DISPLACED',
    "assessmentStatus" TEXT NOT NULL DEFAULT 'ELIGIBLE',
    "housingAssistanceINR" REAL NOT NULL DEFAULT 0.0,
    "livelihoodGrantINR" REAL NOT NULL DEFAULT 0.0,
    "resettlementSiteName" TEXT,
    "allottedPlotNumber" TEXT,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RRRecord_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "AcquisitionCase" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grievance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "referenceNumber" TEXT NOT NULL,
    "caseId" TEXT,
    "parcelId" TEXT,
    "citizenId" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'WRONG_AREA',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detectedDiscrepancy" TEXT,
    "attachmentUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "officerResponse" TEXT,
    "reviewedBy" TEXT,
    "resolvedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Grievance_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "AcquisitionCase" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Grievance_parcelId_fkey" FOREIGN KEY ("parcelId") REFERENCES "Parcel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Grievance_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActionItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "citizenId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "actionType" TEXT NOT NULL DEFAULT 'IDENTITY_VERIFICATION',
    "status" TEXT NOT NULL DEFAULT 'ACTION_REQUIRED',
    "deadline" DATETIME,
    "documentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ActionItem_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "AcquisitionCase" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ActionItem_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActionItem_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "caseId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'STATUS_UPDATE',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Notification_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "AcquisitionCase" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "details" TEXT,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "CitizenProfile_userId_key" ON "CitizenProfile"("userId");

-- CreateIndex
CREATE INDEX "CitizenProfile_village_idx" ON "CitizenProfile"("village");

-- CreateIndex
CREATE INDEX "CitizenProfile_district_idx" ON "CitizenProfile"("district");

-- CreateIndex
CREATE UNIQUE INDEX "Project_code_key" ON "Project"("code");

-- CreateIndex
CREATE INDEX "Project_code_idx" ON "Project"("code");

-- CreateIndex
CREATE INDEX "Project_district_idx" ON "Project"("district");

-- CreateIndex
CREATE INDEX "Parcel_surveyNumber_idx" ON "Parcel"("surveyNumber");

-- CreateIndex
CREATE INDEX "Parcel_village_idx" ON "Parcel"("village");

-- CreateIndex
CREATE INDEX "Parcel_district_idx" ON "Parcel"("district");

-- CreateIndex
CREATE UNIQUE INDEX "AcquisitionCase_caseReference_key" ON "AcquisitionCase"("caseReference");

-- CreateIndex
CREATE INDEX "AcquisitionCase_caseReference_idx" ON "AcquisitionCase"("caseReference");

-- CreateIndex
CREATE INDEX "AcquisitionCase_parcelId_idx" ON "AcquisitionCase"("parcelId");

-- CreateIndex
CREATE INDEX "AcquisitionCase_projectId_idx" ON "AcquisitionCase"("projectId");

-- CreateIndex
CREATE INDEX "AcquisitionCase_citizenId_idx" ON "AcquisitionCase"("citizenId");

-- CreateIndex
CREATE INDEX "AcquisitionCase_stage_idx" ON "AcquisitionCase"("stage");

-- CreateIndex
CREATE INDEX "AcquisitionCase_status_idx" ON "AcquisitionCase"("status");

-- CreateIndex
CREATE INDEX "AcquisitionEvent_caseId_idx" ON "AcquisitionEvent"("caseId");

-- CreateIndex
CREATE INDEX "AcquisitionEvent_stage_idx" ON "AcquisitionEvent"("stage");

-- CreateIndex
CREATE INDEX "Document_caseId_idx" ON "Document"("caseId");

-- CreateIndex
CREATE INDEX "Document_parcelId_idx" ON "Document"("parcelId");

-- CreateIndex
CREATE INDEX "Document_uploaderId_idx" ON "Document"("uploaderId");

-- CreateIndex
CREATE INDEX "Document_documentType_idx" ON "Document"("documentType");

-- CreateIndex
CREATE UNIQUE INDEX "CompensationRecord_caseId_key" ON "CompensationRecord"("caseId");

-- CreateIndex
CREATE INDEX "CompensationRecord_caseId_idx" ON "CompensationRecord"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "RRRecord_caseId_key" ON "RRRecord"("caseId");

-- CreateIndex
CREATE INDEX "RRRecord_caseId_idx" ON "RRRecord"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "Grievance_referenceNumber_key" ON "Grievance"("referenceNumber");

-- CreateIndex
CREATE INDEX "Grievance_referenceNumber_idx" ON "Grievance"("referenceNumber");

-- CreateIndex
CREATE INDEX "Grievance_caseId_idx" ON "Grievance"("caseId");

-- CreateIndex
CREATE INDEX "Grievance_citizenId_idx" ON "Grievance"("citizenId");

-- CreateIndex
CREATE INDEX "Grievance_status_idx" ON "Grievance"("status");

-- CreateIndex
CREATE INDEX "ActionItem_caseId_idx" ON "ActionItem"("caseId");

-- CreateIndex
CREATE INDEX "ActionItem_citizenId_idx" ON "ActionItem"("citizenId");

-- CreateIndex
CREATE INDEX "ActionItem_status_idx" ON "ActionItem"("status");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_idx" ON "AuditLog"("entityType");
