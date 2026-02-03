const fs = require("fs");
const crypto = require("crypto");

// Off-chain document storage configuration
const DOCUMENT_STORAGE_PATH = "./secure_storage/";
const DOCUMENT_REQUIRED_CLEARANCE = 2; // Level 2 clearance required for document access

const users = JSON.parse(fs.readFileSync("users.json", "utf8"));
const onChainLedger = "on_chain_audit_ledger.json";

// Initialize on-chain ledger if not exists
if (!fs.existsSync(onChainLedger)) {
  fs.writeFileSync(onChainLedger, JSON.stringify({ chain: [] }, null, 2));
}

function generateApprovalId() {
  return "APR-" + Math.floor(1000 + Math.random() * 9000);
}

function calculateBlockHash(block) {
  const blockString = JSON.stringify(block);
  return crypto.createHash("sha256").update(blockString).digest("hex");
}

function logToOnChainLedger(action, username, userRole, clearanceLevel, status) {
  const ledger = JSON.parse(fs.readFileSync(onChainLedger, "utf8"));
  const chain = ledger.chain;
  
  const previousHash = chain.length > 0 ? chain[chain.length - 1].currentHash : "0000000000000000";
  
  const newBlock = {
    index: chain.length + 1,
    timestamp: new Date().toISOString(),
    username: username,
    userRole: userRole,
    clearanceLevel: clearanceLevel,
    action: action,
    status: status,
    approvalId: generateApprovalId(),
    verifiedBy: "System",
    requiredClearance: DOCUMENT_REQUIRED_CLEARANCE,
    previousHash: previousHash,
    currentHash: ""
  };
  
  newBlock.currentHash = calculateBlockHash(newBlock);
  chain.push(newBlock);
  
  fs.writeFileSync(onChainLedger, JSON.stringify(ledger, null, 2));
}

function clearanceVerification(username) {
  const userProfile = users[username];

  if (!userProfile) {
    console.log("❌ Unknown user - Clearance verification failed");
    return;
  }

  const { role, clearanceLevel } = userProfile;

  // Clearance verification logic
  if (clearanceLevel < DOCUMENT_REQUIRED_CLEARANCE) {
    console.log(`❌ Access denied: ${username} (${role})`);
    console.log(`   Clearance Level: ${clearanceLevel} | Required: ${DOCUMENT_REQUIRED_CLEARANCE}`);
    console.log(`   📋 Insufficient clearance for classified document access`);
    logToOnChainLedger("VIEW_ATTEMPT", username, role, clearanceLevel, "DENIED");
  } else {
    const approvalId = generateApprovalId();
    console.log(`✅ Access granted to ${username} (${role})`);
    console.log(`   Clearance Level: ${clearanceLevel} | Required: ${DOCUMENT_REQUIRED_CLEARANCE}`);
    console.log(`   🔐 Document location: ${DOCUMENT_STORAGE_PATH}[secured]`);
    console.log(`   📜 Approval ID: ${approvalId}`);
    logToOnChainLedger("VIEW_ATTEMPT", username, role, clearanceLevel, "GRANTED");
  }
}

const user = process.argv[2];
clearanceVerification(user);