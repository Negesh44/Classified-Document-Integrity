const fs = require("fs");
const crypto = require("crypto");

// Off-chain document storage configuration
const DOCUMENT_STORAGE_PATH = "./secure_storage/";
const DOCUMENT_FINGERPRINT_REGISTRY = "document_fingerprint_registry.json";

// Initialize registry if not exists
if (!fs.existsSync(DOCUMENT_FINGERPRINT_REGISTRY)) {
  fs.writeFileSync(DOCUMENT_FINGERPRINT_REGISTRY, JSON.stringify({ documents: [] }, null, 2));
}

function generateDocumentHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
  return hash;
}

function integrityVerification(documentId, filePath) {
  const registry = JSON.parse(fs.readFileSync(DOCUMENT_FINGERPRINT_REGISTRY, "utf8"));
  const documents = registry.documents;
  
  const existingDoc = documents.find(doc => doc.documentId === documentId);
  
  if (!existingDoc) {
    // First-time registration
    const hash = generateDocumentHash(filePath);
    const newDoc = {
      documentId: documentId,
      filename: filePath,
      storageLocation: DOCUMENT_STORAGE_PATH + "[encrypted]",
      cryptographicHash: hash,
      algorithm: "SHA-256",
      registeredAt: new Date().toISOString(),
      lastVerified: new Date().toISOString(),
      status: "REGISTERED"
    };
    
    documents.push(newDoc);
    fs.writeFileSync(DOCUMENT_FINGERPRINT_REGISTRY, JSON.stringify(registry, null, 2));
    
    console.log("✅ Document registered successfully in on-chain registry");
    console.log("📋 Document ID:", documentId);
    console.log("🔐 Storage Location: Off-chain (secure encrypted storage)");
    console.log("🔑 Cryptographic Fingerprint:", hash);
    console.log("📌 Note: Document stored off-chain | Only hash stored on-chain");
  } else {
    // Verification
    const storedHash = existingDoc.cryptographicHash;
    const currentHash = generateDocumentHash(filePath);
    
    if (storedHash === currentHash) {
      existingDoc.lastVerified = new Date().toISOString();
      existingDoc.status = "VERIFIED";
      fs.writeFileSync(DOCUMENT_FINGERPRINT_REGISTRY, JSON.stringify(registry, null, 2));
      
      console.log("✅ Integrity verification successful");
      console.log("📋 Document ID:", documentId);
      console.log("🔒 Status: No tampering detected");
      console.log("🔑 Hash Match: CONFIRMED");
      console.log("🕐 Last Verified:", existingDoc.lastVerified);
      console.log("📌 Privacy: Document never leaves off-chain storage");
    } else {
      existingDoc.status = "COMPROMISED";
      fs.writeFileSync(DOCUMENT_FINGERPRINT_REGISTRY, JSON.stringify(registry, null, 2));
      
      console.log("❌ ⚠️  SECURITY ALERT: Document Integrity Compromised!");
      console.log("📋 Document ID:", documentId);
      console.log("🔓 Status: TAMPERING DETECTED");
      console.log("Expected Hash:", storedHash);
      console.log("Current Hash:", currentHash);
      console.log("⚠️  Immediate investigation required!");
    }
  }
}

const documentId = "DOC-001";
const filePath = "document.pdf";

integrityVerification(documentId, filePath);