-- CreateTable
CREATE TABLE "AiSearchLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "organizationId" TEXT,
    "query" TEXT NOT NULL,
    "filters" JSONB NOT NULL,
    "success" BOOLEAN NOT NULL,
    "fallbackApplied" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiSearchLog_pkey" PRIMARY KEY ("id")
);
