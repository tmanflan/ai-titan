const { runCommand } = require('./utils');

async function run() {
  const result = await runCommand('npm', ['run', 'build', '--silent'], {
    cwd: '/workspace/app-builder-frontend',
    timeoutMs: 180000,
  });
  return {
    name: 'frontend-build',
    ok: !result.timedOut && result.code === 0,
    stdout: result.stdout,
    stderr: result.stderr,
    timedOut: result.timedOut,
    code: result.code,
  };
}

module.exports = { run };