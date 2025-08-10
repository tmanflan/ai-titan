const fs = require('fs');
const path = require('path');

async function run() {
  const findings = [];

  // Frontend duplicate entrypoints
  const frontendRootIndex = '/workspace/app-builder-frontend/index.js';
  const frontendSrcMain = '/workspace/app-builder-frontend/src/main.jsx';
  if (fs.existsSync(frontendRootIndex) && fs.existsSync(frontendSrcMain)) {
    findings.push('Frontend has both index.js (CRA style) and src/main.jsx (Vite). Consider removing root index.js to avoid confusion.');
  }

  // Backend checks
  const backendIndex = '/workspace/app-builder-backend/index.js';
  if (fs.existsSync(backendIndex)) {
    const content = fs.readFileSync(backendIndex, 'utf8');
    if (!content.includes('app.get(\'/health\'')) {
      findings.push('Backend missing /health endpoint.');
    }
  }

  // Scripts existence
  const backendPkg = JSON.parse(fs.readFileSync('/workspace/app-builder-backend/package.json', 'utf8'));
  if (!backendPkg.scripts || !backendPkg.scripts.start) {
    findings.push('Backend missing start script.');
  }

  const resultText = findings.length ? findings.join('\n') : 'No issues found by repo audit agent.';
  return {
    name: 'repo-audit',
    ok: findings.length === 0,
    stdout: resultText,
    stderr: '',
    timedOut: false,
    code: findings.length === 0 ? 0 : 1,
  };
}

module.exports = { run };