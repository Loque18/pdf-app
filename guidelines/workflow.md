# Git Workflow & Versioning Rules

This document defines the standard Git workflow, branching strategy, and versioning rules used in this project.
The goal is to ensure stability, traceability, and clean releases while allowing fast iteration.

---

## Branches Overview

### main — Production

- Represents production-ready code
- Deployed to real users
- Every commit must be stable and deployable
- Only branch that is versioned

---

### staging — Pre-Production

- Mirrors production as closely as possible
- Used for:
    - QA testing
    - Integration validation
    - Environment checks
- No official versioning
- Never developed on directly

---

### dev — Integration

- Active development integration branch
- Features are merged here first
- May temporarily break
- Never deployed to users

---

## Feature Development Workflow

### 1. Create a Feature Branch

All new features start from dev:

    git checkout dev
    git pull
    git checkout -b feature/<feature-name>

Examples:

- feature/ai-logging
- feature/payment-flow

---

### 2. Develop the Feature

- Commit frequently
- Keep commits small and meaningful
- Test locally

---

### 3. Merge Feature into dev

    git checkout dev
    git merge feature/<feature-name>

Optional but recommended:

- Pull Request
- Code review

---

## Promotion Flow

### 4. Promote dev to staging (QA Phase)

    git checkout staging
    git merge dev

At this point:

- Code is deployed to the staging environment
- QA testing happens here
- Bug fixes may be required

---

### 5. Bug Fixes During QA

Bug fixes are branched from staging:

    git checkout -b fix/<bug-name> staging

After fixing:

- Merge back into staging
- Back-merge into dev if needed

---

### 6. Release to Production (main)

Once QA approves:

    git checkout main
    git merge staging

---

## Versioning Rules

### Where Versioning Happens

- ONLY on main
- A version represents a production release

Example:

    git tag v1.6.0

---

### Where Versioning Does NOT Happen

- dev
- staging
- feature branches

Staging builds are not releases.

---

## Identifying Builds in Staging

Instead of semantic versions, use:

### Option 1 — Git Commit Hash (Recommended)

- staging-3f8a91c

### Option 2 — CI Build Number

- staging-build-248

### Optional — Release Candidates

- 1.6.0-rc.1
- 1.6.0-rc.2

---

## Hotfix Workflow (Production Bugs)

For critical production issues:

    git checkout -b hotfix/<issue-name> main

- Fix the bug
- Merge into main
- Create a patch version:

    git tag v1.6.1

- Back-merge into staging and dev

---

## Golden Rules

- Never develop directly on main or staging
- Every production release must be tagged
- If users can access it → it has a version
- If only QA can access it → it does NOT have a version

---

## Final Flow Summary

    feature/* → dev → staging → QA → main (versioned release)

---