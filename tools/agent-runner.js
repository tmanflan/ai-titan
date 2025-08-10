const { logAgentResult } = require('./agents/utils');
const frontendLint = require('./agents/frontendLintAgent');
const frontendBuild = require('./agents/frontendBuildAgent');
const backendSmoke = require('./agents/backendSmokeAgent');
const repoAudit = require('./agents/repoAuditAgent');

async function main() {
  const agents = [frontendLint, frontendBuild, backendSmoke, repoAudit];
  const runs = agents.map((a) => a.run());
  const results = await Promise.all(runs);

  let exitCode = 0;
  for (const r of results) {
    const status = r.timedOut ? 'TIMEOUT' : r.ok ? 'OK' : 'FAIL';
    console.log(`[${r.name}] ${status}`);
    if (!r.ok) {
      exitCode = 1;
    }
  }

  // Print details for failures
  for (const r of results) {
    if (!r.ok) {
      console.log(`\n--- ${r.name} output ---`);
      if (r.stdout) console.log(r.stdout.trim());
      if (r.stderr) console.error(r.stderr.trim());
      console.log(`--- end ${r.name} ---\n`);
    }
  }

  process.exit(exitCode);
}

main().catch((err) => {
  console.error('Agent runner error:', err);
  process.exit(1);
});