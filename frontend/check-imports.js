const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");
const exts = [".js", ".jsx", ".ts", ".tsx"];
const importRegex = /(?:import|export)\s+(?:[^'"]*from\s+)?['"](\.[^'"]+)['"]/g;
const requireRegex = /require\(\s*['"](\.[^'"]+)['"]\s*\)/g;

let allFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (exts.includes(path.extname(entry.name))) allFiles.push(full);
  }
}
walk(srcDir);

function resolves(fromFile, importPath) {
  const resolved = path.resolve(path.dirname(fromFile), importPath);
  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return true;
  for (const ext of exts) if (fs.existsSync(resolved + ext)) return true;
  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    for (const ext of exts) if (fs.existsSync(path.join(resolved, "index" + ext))) return true;
  }
  return false;
}

let broken = 0;
for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");
  const paths = new Set();
  let m;
  importRegex.lastIndex = 0;
  while ((m = importRegex.exec(content)) !== null) paths.add(m[1]);
  requireRegex.lastIndex = 0;
  while ((m = requireRegex.exec(content)) !== null) paths.add(m[1]);
  for (const p of paths) {
    if (!resolves(file, p)) {
      console.log(path.relative(__dirname, file) + "  ->  BROKEN: \"" + p + "\"");
      broken++;
    }
  }
}
console.log("\n" + broken + " broken import(s) found.");
