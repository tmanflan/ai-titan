const { runCommand } = require('./utils');
const { spawn } = require('child_process');

async function run() {
  // Start backend server
  const child = spawn('node', ['index.js'], {
    cwd: '/workspace/app-builder-backend',
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let started = false;
  let logs = '';
  child.stdout.on('data', (d) => {
    logs += d.toString();
    if (logs.includes('Backend running on port')) {
      started = true;
    }
  });
  child.stderr.on('data', (d) => {
    logs += d.toString();
  });

  // Wait up to 2s for startup
  await new Promise((r) => setTimeout(r, 500));

  let curlOut = '';
  let ok = false;
  if (started) {
    const curl = await runCommand('bash', ['-lc', 'curl -sS http://localhost:4000/health'], {
      timeoutMs: 3000,
    });
    curlOut = (curl.stdout || '') + (curl.stderr || '');
    ok = curl.code === 0 && curlOut.includes('status');
  }

  // Stop server
  try { child.kill('SIGKILL'); } catch {}

  return {
    name: 'backend-smoke',
    ok: ok,
    stdout: logs + '\n' + curlOut,
    stderr: '',
    timedOut: false,
    code: ok ? 0 : 1,
  };
}

module.exports = { run };