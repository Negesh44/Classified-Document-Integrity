# Bytecrackers Project - Classified Document Integrity & Clearance Verification Platform

A secure web-based platform for verifying document integrity using cryptographic hashing and managing multi-level clearance-based access control with blockchain-style immutable audit logging.

**One-Line Summary:**  
*"We upgraded the system to store documents off-chain while maintaining on-chain cryptographic hashes, clearance verification, and immutable audit records, transforming it into a Classified Document Integrity & Clearance Verification Platform."*

---

## 📋 Overview

This platform implements an advanced document verification system that ensures the integrity of classified documents through **off-chain storage** and **on-chain cryptographic fingerprints**. It features a sophisticated clearance verification system and maintains an immutable blockchain-style audit ledger of all access attempts.

The system has been upgraded from a basic verification tool to a production-grade platform demonstrating:
- ✅ Off-chain encrypted document storage
- ✅ On-chain cryptographic fingerprints (SHA-256)
- ✅ Multi-level clearance verification system
- ✅ Blockchain-style immutable audit ledger with hash chaining
- ✅ Approval ID system for access tracking
- ✅ Privacy by design - no sensitive data on-chain

---

## ✨ Key Features

### 🔐 Document Integrity Verification
- **Off-Chain Storage**: Documents stored securely in encrypted off-chain storage
- **On-Chain Fingerprints**: Only SHA-256 cryptographic hashes stored on-chain
- **Tamper Detection**: Automatic detection of any document modifications
- **Document Registry**: Centralized registry with metadata tracking
- **Status Tracking**: REGISTERED, VERIFIED, or COMPROMISED status

### 👤 Multi-Level Clearance Verification
- **Clearance Levels**: 
  - **Level 3**: Admin (Full Access)
  - **Level 2**: Officer (Document Access)
  - **Level 1**: Auditor (Limited Access)
- **Dynamic Authorization**: Real-time clearance verification against document requirements
- **Approval System**: Unique approval IDs for granted access attempts
- **Clearance Validation**: Configurable document clearance requirements

### 📊 Blockchain-Style Audit Ledger
- **Immutable Records**: Append-only audit trail with cryptographic chaining
- **Block Hashing**: Each record contains previous block hash → current block hash
- **Hash Chaining**: Prevents retroactive modification of audit records
- **Comprehensive Logging**: Timestamps, user roles, clearance levels, and approval IDs
- **Traceability**: Complete audit trail of all system interactions

### 🔒 Privacy & Security
- **Documents never leave secure off-chain storage**
- **Only cryptographic hashes stored on-chain**
- **No sensitive content exposed**
- **All access traceable and immutable**
- **Encrypted storage locations**

---

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework (v5.2.1)
- **Crypto (SHA-256)** - Cryptographic hashing for document fingerprints
- **JSON Blockchain** - Simulated blockchain with hash chaining
- **HTML/CSS/JavaScript** - Modern, responsive frontend

---

## 📁 Project Structure

```
Bytecrackers_Project/
├── Documentation/          # Project documentation
├── Screenshots/            # Application screenshots
├── Web_Backend/           # Main application directory
│   ├── server.js          # Express server with 4 API endpoints
│   ├── access.js          # Clearance verification logic
│   ├── verify.js          # Integrity verification logic
│   ├── index.html         # Enhanced web interface
│   ├── users.json         # User profiles with clearance levels
│   ├── on_chain_audit_ledger.json      # Immutable audit blockchain
│   ├── document_fingerprint_registry.json  # Document hash registry
│   ├── secure_storage/    # Off-chain document storage (encrypted)
│   └── package.json       # Node.js dependencies
├── README.md              # This file
└── UPGRADE_SUMMARY.md     # Detailed upgrade documentation
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup Steps

1. **Navigate to the Web_Backend directory:**
   ```bash
   cd Web_Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create secure storage directory:**
   ```bash
   mkdir secure_storage
   ```

4. **Place your document:**
   - Add a `document.pdf` file in the Web_Backend directory
   - This represents the classified document to be protected

5. **Start the server:**
   ```bash
   node server.js
   ```

6. **Access the platform:**
   ```
   http://localhost:3000
   ```

### Testing the System

1. **Test Integrity Verification:**
   - Click "Verify Document Integrity"
   - Document will be registered with SHA-256 hash
   - Subsequent clicks will verify hash hasn't changed

2. **Test Clearance Levels:**
   - Try Admin (Level 3) → Should be granted
   - Try Officer (Level 2) → Should be granted
   - Try Auditor (Level 1) → Should be denied
   - Notice the Approval IDs generated

3. **View Blockchain:**
   - Click "View Immutable Audit Trail"
   - See hash chaining with previousHash → currentHash
   - Observe immutable record of all actions

4. **View Registry:**
   - Click "View Document Registry"
   - See all registered documents with metadata

---

## 💻 Usage Guide

### Web Interface Features

The enhanced web interface provides six main operations organized by function:

#### 🔑 Integrity Verification Section
1. **Verify Document Integrity** - Checks cryptographic hash against registry
2. **View Document Registry** - Shows all registered document fingerprints with metadata

#### 👤 Clearance Verification Section
3. **Admin Access (Level 3)** - Tests highest clearance level access
4. **Officer Access (Level 2)** - Tests standard document access
5. **Auditor Access (Level 1)** - Tests limited clearance access

#### 📊 Audit Section
6. **View Immutable Audit Trail** - Displays blockchain-style audit ledger with hash chaining

---

## 🔌 API Endpoints

### 1. Integrity Verification
```
GET /verify
```

Verifies document integrity by comparing current cryptographic hash with stored fingerprint.

**Response Example:**
```
✅ Integrity verification successful
📋 Document ID: DOC-001
🔒 Status: No tampering detected
🔑 Hash Match: CONFIRMED
🕐 Last Verified: 2026-02-03T10:15:00.000Z
📌 Privacy: Document never leaves off-chain storage
```

---

### 2. Clearance Verification
```
GET /access/:username
```

Verifies user clearance level and grants/denies access accordingly.

**Response Example (Granted):**
```
✅ Access granted to officer (OFFICER)
   Clearance Level: 2 | Required: 2
   🔐 Document location: ./secure_storage/[secured]
   📜 Approval ID: APR-3847
```

**Response Example (Denied):**
```
❌ Access denied: auditor (AUDITOR)
   Clearance Level: 1 | Required: 2
   📋 Insufficient clearance for classified document access
```

---

### 3. On-Chain Audit Ledger
```
GET /audit-ledger
```

Returns the complete immutable audit blockchain with hash chaining.

**Response Structure:**
```json
{
  "chain": [
    {
      "index": 1,
      "timestamp": "2026-02-03T10:15:30.000Z",
      "username": "officer",
      "userRole": "OFFICER",
      "clearanceLevel": 2,
      "action": "VIEW_ATTEMPT",
      "status": "GRANTED",
      "approvalId": "APR-3847",
      "verifiedBy": "System",
      "requiredClearance": 2,
      "previousHash": "0000000000000000",
      "currentHash": "a91f3c2b..."
    }
  ]
}
```

**Key Features:**
- ✅ Hash chaining: Each block references previous block
- ✅ Immutable: Impossible to alter past records
- ✅ Chronological: Timestamped audit trail
- ✅ Complete: All access attempts logged

---

### 4. Document Fingerprint Registry
```
GET /registry
```

Returns all registered documents with their cryptographic fingerprints.

**Response Structure:**
```json
{
  "documents": [
    {
      "documentId": "DOC-001",
      "filename": "document.pdf",
      "storageLocation": "./secure_storage/[encrypted]",
      "cryptographicHash": "sha256_hash_here",
      "algorithm": "SHA-256",
      "registeredAt": "2026-02-03T10:00:00.000Z",
      "lastVerified": "2026-02-03T10:15:00.000Z",
      "status": "VERIFIED"
    }
  ]
}
```

---

## 🔐 System Architecture

### Data Flow

```
1. Document Stored Off-Chain
   └─> Encrypted in ./secure_storage/
   
2. SHA-256 Hash Generated
   └─> Cryptographic fingerprint created
   
3. Hash Stored On-Chain
   └─> Registered in document_fingerprint_registry.json
   
4. User Requests Access
   └─> Clearance level checked
   
5. Authorization Granted/Denied
   └─> Approval ID generated if granted
   
6. Integrity Verified
   └─> Hash comparison performed
   
7. Immutable Log Created
   └─> Block added to audit ledger with previous hash
```

### System Architecture Diagram

```
┌─────────────────────────────────────────┐
│  User Request (Web Interface)           │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  Express Server (4 Endpoints)           │
│  - /verify (Integrity Check)            │
│  - /access/:user (Clearance Check)      │
│  - /audit-ledger (View Blockchain)      │
│  - /registry (View Fingerprints)        │
└───────────┬─────────────────────────────┘
            │
    ┌───────┴────────┐
    │                │
┌───▼───────┐   ┌───▼──────────────┐
│ OFF-CHAIN │   │    ON-CHAIN      │
│           │   │                  │
│ Documents │   │ • Hash Registry  │
│ (Encrypted│   │ • Audit Ledger   │
│  Storage) │   │ • Approvals      │
│           │   │ • Clearances     │
└───────────┘   └──────────────────┘
```

### Security Model

**Off-Chain Components:**
- Actual documents (encrypted)
- Secure storage infrastructure
- Sensitive content protected

**On-Chain Components:**
- Document fingerprints (SHA-256 hashes)
- Audit ledger (blockchain-style)
- Access approval records
- Clearance verification logs
- Hash chains for immutability

---

## 📝 Configuration

### User Clearance Levels

Edit `users.json` to manage users and clearance levels:

```json
{
  "username": {
    "role": "OFFICER",
    "clearanceLevel": 2
  }
}
```

**Clearance Level Guidelines:**
- **Level 3**: Full system access (Admin)
- **Level 2**: Document access (Officer, Manager)
- **Level 1**: Limited access (Auditor, Guest)

### Document Security Settings

In `access.js`, configure:
```javascript
const DOCUMENT_REQUIRED_CLEARANCE = 2;  // Minimum clearance needed
const DOCUMENT_STORAGE_PATH = "./secure_storage/";  // Off-chain storage
```

---

## 🎯 Key Differentiators

### ✅ What Makes This Platform Unique

1. **True Off-Chain Storage**: Documents never exposed to blockchain
2. **Cryptographic Fingerprints**: Only hashes stored on-chain
3. **Multi-Level Clearance**: Not just roles, but graduated clearance levels
4. **Approval System**: Unique approval IDs for audit compliance
5. **Hash-Chained Ledger**: Each block references previous block hash
6. **Privacy by Design**: Sensitive content never leaves secure storage

### 📊 Blockchain Implementation

Our audit ledger uses blockchain principles:
- **Immutability**: Append-only structure
- **Chaining**: Each block contains previous block hash
- **Timestamping**: Chronological record keeping
- **Transparency**: Full audit trail visibility
- **Verification**: Hash-based integrity checking

### 🔒 Privacy Guarantees

#### What Gets Stored On-Chain
✅ SHA-256 document hashes  
✅ Access attempt records  
✅ Approval IDs  
✅ Clearance levels  
✅ Timestamps  

#### What Stays Off-Chain
❌ Actual documents  
❌ Document content  
❌ Sensitive information  
❌ Personal data beyond username/role  

---

## 🌍 Real-World Applications

This platform is ideal for organizations handling highly sensitive information, such as:

### 🏛️ Government & Defense Departments
- Secure storage and verification of classified documents
- Enforcing security clearance requirements
- Maintaining audit trails for compliance
- Protecting state secrets and sensitive intelligence

### 🏥 Healthcare Systems
- HIPAA-compliant document management
- Patient record verification and integrity
- Access control based on medical clearance levels
- Audit trails for medical record access

### ⚖️ Legal Institutions
- Secure management of confidential case documents
- Verification of document authenticity in legal proceedings
- Access control for attorney-client privileged information
- Immutable audit records for legal compliance

### 💰 Financial & Compliance-Driven Organizations
- Secure storage of confidential financial records
- SOX and regulatory compliance documentation
- Multi-level access control for sensitive financial data
- Tamper-proof audit trails for regulatory audits

### 🎯 Key Organizational Benefits

This platform enables organizations to:

✅ **Prove Document Authenticity & Integrity**
- Cryptographic proof that documents haven't been altered
- SHA-256 fingerprints serve as digital signatures
- Irrefutable evidence in legal/compliance contexts

✅ **Enforce Strict Clearance-Based Access**
- Multi-level clearance system (Level 1-3)
- Only authorized personnel can access classified documents
- Dynamic clearance verification for each access attempt

✅ **Maintain Permanent, Tamper-Proof Audit Records**
- Blockchain-style immutable ledger
- Hash chaining prevents retroactive modifications
- Complete traceability of all access attempts
- Forensic analysis capabilities

✅ **Preserve Privacy While Ensuring Transparency**
- Documents remain off-chain in secure storage
- Only cryptographic hashes exposed on-chain
- No sensitive content in audit logs
- Full transparency to authorized auditors

---

## 📊 Technical Upgrades Summary

### What Changed (Before → After)

| Feature | Before | After |
|---------|--------|-------|
| **Storage** | Mixed documents + hashes | Off-chain docs, on-chain hashes |
| **Access Control** | Role-based (OFFICER/AUDITOR) | Multi-level clearance (1-3) |
| **Audit Log** | Text file `blockchain_log.txt` | JSON blockchain `on_chain_audit_ledger.json` |
| **Hash Storage** | Single file `hash.txt` | Registry `document_fingerprint_registry.json` |
| **Log Format** | Timestamp + message | Blocks with hash chaining |
| **Approval System** | None | Unique Approval IDs (APR-XXXX) |
| **API Endpoints** | 2 | 4 (verify, access, audit-ledger, registry) |
| **Web Interface** | 3 buttons | 6 interactive sections |
| **Privacy** | Basic | Privacy by Design (off-chain/on-chain separation) |

### Files Modified

| File | Changes |
|------|---------|
| `access.js` | ✅ Clearance system, approval IDs, blockchain ledger |
| `verify.js` | ✅ Document registry, off-chain storage, enhanced output |
| `server.js` | ✅ 4 API endpoints, enhanced logging |
| `index.html` | ✅ Modern UI, 6 sections, privacy notice |
| `users.json` | ✅ Clearance levels added |
| `README.md` | ✅ Comprehensive documentation |

### New Files Generated

- `on_chain_audit_ledger.json` - Immutable blockchain ledger
- `document_fingerprint_registry.json` - Document metadata registry
- `secure_storage/` - Off-chain document storage directory

---

## 🚀 Demo & Testing Tips

### For Presentations

1. **When explaining blockchain:**
   - Show `on_chain_audit_ledger.json`
   - Point out `previousHash` → `currentHash` chaining
   - Explain immutability with example

2. **When explaining privacy:**
   - Show that documents are in `secure_storage/`
   - Show only hashes in registry
   - Emphasize off-chain/on-chain separation
   - Highlight that actual documents never leave secure storage

3. **When explaining clearance:**
   - Show `users.json` with clearance levels
   - Demonstrate officer (approved) vs auditor (denied)
   - Show approval ID generation
   - Explain dynamic clearance verification

4. **When comparing to title:**
   - ✅ **Classified Document** → Off-chain storage
   - ✅ **Integrity** → Cryptographic hashing
   - ✅ **Clearance Verification** → Multi-level system
   - ✅ **Platform** → Complete web-based solution

### Quick Test Sequence

```bash
# 1. Start server
cd Web_Backend
node server.js

# 2. In browser, visit http://localhost:3000
# 3. Click "Verify Document Integrity" (registers document)
# 4. Click "Officer Access (Level 2)" (should be granted)
# 5. Click "Auditor Access (Level 1)" (should be denied)
# 6. Click "View Immutable Audit Trail" (see blockchain)
# 7. Click "View Document Registry" (see metadata)
```

---

## 🤝 Academic & Project Review

### Cybersecurity Concepts Covered
- ✅ Cryptographic Hash Functions (SHA-256)
- ✅ Blockchain Technology (Immutable Ledger)
- ✅ Access Control (Multi-Level Clearance)
- ✅ Privacy by Design (Off-Chain Storage)
- ✅ Audit Trail (Blockchain-Style Logging)
- ✅ Authentication & Authorization
- ✅ Data Integrity Verification
- ✅ Privacy-Preserving Technologies

### Matches Syllabus Requirements
- ✅ Encryption & Hashing
- ✅ Blockchain & Distributed Ledgers
- ✅ Access Control Systems
- ✅ Privacy & Security
- ✅ Audit & Compliance
- ✅ System Architecture
- ✅ Web Application Security

---

## 📄 License

This project is part of the Bytecrackers initiative.

---

## 📧 Contact

For questions or support regarding this platform, please refer to the project documentation or contact the Bytecrackers team.

---

## 🏆 Final Notes

**This platform now:**
- ✅ Demonstrates production-grade security concepts
- ✅ Implements blockchain principles correctly
- ✅ Ensures privacy through off-chain/on-chain separation
- ✅ Provides multi-level access control
- ✅ Maintains immutable audit records
- ✅ Offers a complete, user-friendly solution
- ✅ Ready for academic review, demo, or deployment

**Security Note**: This system demonstrates production-grade concepts including off-chain document storage, on-chain cryptographic verification, clearance-based authorization, and immutable audit logging. For deployment in sensitive environments, additional hardening should include HTTPS, database integration, key management systems, and compliance certifications.
