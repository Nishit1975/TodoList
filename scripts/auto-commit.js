const { exec } = require('child_process');
const chokidar = require('chokidar');

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: process.cwd() }, (err, stdout, stderr) => {
      if (err) return reject({ err, stdout, stderr });
      resolve({ stdout, stderr });
    });
  });
}

async function ensureGit() {
  try {
    await run('git --version');
  } catch (e) {
    console.error('git not found in PATH. Install Git and retry.');
    process.exit(1);
  }
}

let timer = null;
const DEBOUNCE_MS = 2000;

async function commitAndPush() {
  const ts = new Date().toISOString();
  try {
    await run('git add -A');
    // check if there is anything to commit
    const status = await run('git status --porcelain');
    if (!status.stdout.trim()) {
      console.log(`${ts} — nothing to commit`);
      return;
    }
    await run(`git commit -m "Auto-save: ${ts}"`);
    await run('git push');
    console.log(`${ts} — committed & pushed`);
  } catch (e) {
    console.error('Error during commit/push:', e.stderr || e.err || e);
  }
}

(async function main() {
  await ensureGit();
  console.log('Auto-commit watcher starting. Watching project files...');
  const watcher = chokidar.watch('.', {
    ignored: [/node_modules/, /.git/, /\.next/, /public/, /\.env/],
    ignoreInitial: true,
    persistent: true,
  });

  const schedule = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => commitAndPush().catch(() => {}), DEBOUNCE_MS);
  };

  watcher.on('all', (event, path) => {
    console.log(`${new Date().toISOString()} ${event} ${path}`);
    schedule();
  });

  // graceful shutdown
  process.on('SIGINT', () => {
    console.log('Stopping watcher...');
    watcher.close();
    process.exit(0);
  });
})();
