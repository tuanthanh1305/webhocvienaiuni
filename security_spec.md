# Security Specification - AIUNI Firestore Security

This document outlines the security invariants, validation rules, and the "Dirty Dozen" malicious payloads designed to test our Zero-Trust Attribute-Based Access Control (ABAC) system in Firestore.

## 1. Data Invariants & Authorization Logic

*   **Public Access**: Anyone (unauthenticated guests) can read `/blogs`, `/reports`, and `/content` documents to view course paths, blogs, and landing configurations.
*   **Public Enrollments**: Unauthenticated or authenticated users can create enrollment documents in `/enrollments` to submit registration tickets. Since this is a public education site, visitors do not need an account to register, but their phone, email, and name must be clean, structured, and securely formatted.
*   **Administrative Access**: Only the verified administrator with the email `tuanthanhtt1305@gmail.com` (verified via Google Sign-In) has full write privileges (create, update, delete) on `/blogs`, `/reports`, `/content`, and the ability to update or delete student `/enrollments`.

---

## 2. Invalidation & Zero-Trust Checks

We prevent malicious activities by validating schema fields, document IDs, size constraints, and identity claims on all writes.

### Primary Global Helpers

```javascript
function isValidId(id) {
  return id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$');
}

function isSignedIn() {
  return request.auth != null;
}

function isAdmin() {
  return isSignedIn() &&
         request.auth.token.email_verified == true &&
         request.auth.token.email == 'tuanthanhtt1305@gmail.com';
}
```

---

## 3. The "Dirty Dozen" Malicious Payloads

The following test payloads will be blocked by our security rules:

1.  **Unauthorized Blog Write**: Attempting to write a blog post as a guest. (Expected result: `PERMISSION_DENIED`)
2.  **Unauthorized Blog Edit by other signed-in user**: A signed-in user who is not `tuanthanhtt1305@gmail.com` trying to change a blog. (Expected result: `PERMISSION_DENIED`)
3.  **Spoofed Admin Email**: A user signs in with email `tuanthanhtt1305@gmail.com` but with `email_verified = false` or a fake JWT token of a mock provider. (Expected result: `PERMISSION_DENIED`)
4.  **PII Data Harvest via Blanket Lists**: Authenticated generic users trying to list `/enrollments` search queries without filtering. (Expected result: `PERMISSION_DENIED`)
5.  **Malicious Web-Content Modification**: Direct guest update request to rearrange sections or change hero banners on `/content/main`. (Expected result: `PERMISSION_DENIED`)
6.  **Massive Document ID Injection**: Attempt to create a blog post using a 2MB binary string as the document ID path parameter. (Expected result: `PERMISSION_DENIED` via `isValidId()`)
7.  **Ghost Field Injection in Blog**: Admin creating a blog post with an unrequested field like `{ isHacked: true, score: 9999 }`. (Expected result: `PERMISSION_DENIED` via `keys().size() == 11` check)
8.  **Immutable Data Manipulation**: Attempting to change `createdAt` of a blog post or report during an update. (Expected result: `PERMISSION_DENIED` since `incoming().createdAt == existing().createdAt`)
9.  **Poisoned Enrollment Payload**: Creating an enrollment document with a 10MB string as the phone number or name (DoW attack). (Expected result: `PERMISSION_DENIED` via `.size() <= 100` constraints)
10. **Terminal State Lock Bypass**: Modifying a finished enrollment's status back to pending, bypassing core workflow. (Expected result: `PERMISSION_DENIED`)
11. **Orphaned Report Creation**: Creating a report with an invalid ID structure. (Expected result: `PERMISSION_DENIED`)
12. **Client-side Timestamp Override**: Setting a future custom date as `createdAt` rather than utilizing the server time `request.time`. (Expected result: `PERMISSION_DENIED` via validation `createdAt == request.time`)

---

## 4. Test Runner Specifications

The rules will be evaluated continuously and deployed securely using the Firebase CLI deployment wrapper.
All guest reads and public sign-ups are allowed, while administrative tasks are strictly locked behindVerified Email credentials.
