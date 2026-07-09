const fs = require("fs");
const path = require("path");

const cnamePath = path.join(__dirname, "..", "dist", "CNAME");

if (fs.existsSync(cnamePath)) {
  fs.unlinkSync(cnamePath);
  console.log("Removed dist/CNAME for staging deploy.");
} else {
  console.log("No dist/CNAME found. Nothing to remove.");
}
