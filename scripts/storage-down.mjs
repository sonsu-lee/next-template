import { spawnSync } from 'node:child_process';

const scriptArguments = process.argv.slice(2);
const composeArguments = scriptArguments[0] === '--' ? scriptArguments.slice(1) : scriptArguments;

const result = spawnSync('docker', ['compose', 'down', ...composeArguments], {
  env: {
    ...process.env,
    RUSTFS_ACCESS_KEY: 'cleanup-only',
    RUSTFS_SECRET_KEY: 'cleanup-only',
  },
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}

process.exitCode = result.status ?? 1;
