const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "secure_storage");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    cb(null, `${timestamp}-${randomStr}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Helper function to generate file hash
function generateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
  return hash;
}

// Helper function to register document in registry
function registerDocumentInRegistry(filename, filepath, hash) {
  const registryPath = path.join(__dirname, "document_fingerprint_registry.json");
  let registry = { documents: [] };
  
  if (fs.existsSync(registryPath)) {
    registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  }
  
  const documentId = `DOC-${Date.now()}`;
  const newDoc = {
    documentId: documentId,
    filename: filename,
    storageLocation: "./secure_storage/[encrypted]",
    cryptographicHash: hash,
    algorithm: "SHA-256",
    registeredAt: new Date().toISOString(),
    lastVerified: new Date().toISOString(),
    status: "REGISTERED"
  };
  
  registry.documents.push(newDoc);
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  
  return documentId;
}

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Document Upload endpoint
app.post("/upload", upload.single("document"), (req, res) => {
  if (!req.file) {
    return res.json({ 
      success: false, 
      message: "❌ No file provided" 
    });
  }

  const filePath = req.file.path;
  const originalName = req.file.originalname;
  
  try {
    // Generate hash
    const hash = generateFileHash(filePath);
    
    // Register in document fingerprint registry
    const documentId = registerDocumentInRegistry(originalName, filePath, hash);
    
    res.json({
      success: true,
      message: "✅ Document uploaded and registered successfully",
      documentId: documentId,
      filename: originalName,
      cryptographicHash: hash,
      storageLocation: "./secure_storage/[encrypted]",
      registeredAt: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      success: false,
      message: "❌ Error uploading document: " + error.message
    });
  }
});

// Integrity Verification endpoint
app.get("/verify", (req, res) => {
  exec("node verify.js", { cwd: __dirname }, (err, stdout, stderr) => {
    if (err) {
      res.send("❌ Error:\n" + stderr);
    } else {
      res.send(stdout);
    }
  });
});

// Clearance Verification endpoint
app.get("/access/:user", (req, res) => {
  const user = req.params.user;

  exec(`node access.js ${user}`, { cwd: __dirname }, (err, stdout, stderr) => {
    if (err) {
      res.send("❌ Error:\n" + stderr);
    } else {
      res.send(stdout);
    }
  });
});

// On-chain audit ledger viewer
app.get("/audit-ledger", (req, res) => {
  const ledgerPath = path.join(__dirname, "on_chain_audit_ledger.json");
  
  if (fs.existsSync(ledgerPath)) {
    const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
    res.json(ledger);
  } else {
    res.json({ chain: [], message: "No audit records yet" });
  }
});

// Document fingerprint registry viewer
app.get("/registry", (req, res) => {
  const registryPath = path.join(__dirname, "document_fingerprint_registry.json");
  
  if (fs.existsSync(registryPath)) {
    const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
    res.json(registry);
  } else {
    res.json({ documents: [], message: "No documents registered yet" });
  }
});

app.listen(3000, () => {
  console.log("✅ Classified Document Integrity & Clearance Verification Platform");
  console.log("🔒 Server running at http://localhost:3000");
  console.log("📊 API Endpoints:");
  console.log("   - GET /verify → Integrity Verification");
  console.log("   - GET /access/:user → Clearance Verification");
  console.log("   - GET /audit-ledger → On-Chain Audit Records");
  console.log("   - GET /registry → Document Fingerprint Registry");
});