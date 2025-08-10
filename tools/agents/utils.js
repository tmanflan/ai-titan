const { spawn } = require('child_process');

function runCommand(command, args, options = {}) {
  const { cwd, timeoutMs = 120000, env = process.env } = options;
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeoutMs);

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr, timedOut });
    });
  });
}

function logAgentResult(agentName, result) {
  const status = result.timedOut ? 'TIMEOUT' : result.code === 0 ? 'OK' : 'FAIL';
  return `[$${agentName}] ${status}`;
}

module.exports = {
  runCommand,
  logAgentResult,
};