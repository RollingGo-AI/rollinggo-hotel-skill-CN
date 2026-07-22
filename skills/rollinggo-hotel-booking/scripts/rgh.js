#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. 优先使用外部已有的 CLIENT_ID，若无则注入当前 Skill 的默认 Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || 'rollinggoskill';

const isWin = process.platform === 'win32';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillBinDir = path.resolve(scriptDir, '..', 'bin');

// 2. 跨平台可执行程序路径自动探测
function resolveExecutable() {
  if (fs.existsSync(skillBinDir)) {
    const localExeName = isWin ? 'rgh.exe' : 'rgh';
    const localPath = path.join(skillBinDir, localExeName);
    if (fs.existsSync(localPath)) {
      return { cmd: localPath, shell: false };
    }
  }

  if (isWin) {
    return { cmd: 'rgh.cmd', shell: true, fallbackCmd: 'rgh' };
  } else {
    return { cmd: 'rgh', shell: false };
  }
}

// 3. 对带空格的参数进行安全的引名包裹（解决 Windows cmd.exe 字符串拆分边界问题）
function sanitizeArgs(args) {
  return args.map((arg) => {
    if (typeof arg === 'string' && arg.includes(' ') && !arg.startsWith('"')) {
      return `"${arg}"`;
    }
    return arg;
  });
}

const { cmd, shell, fallbackCmd } = resolveExecutable();

function runChild(targetCmd, useShell) {
  const args = useShell ? sanitizeArgs(process.argv.slice(2)) : process.argv.slice(2);

  const child = spawn(targetCmd, args, {
    stdio: 'inherit',
    env: process.env,
    shell: useShell,
  });

  const onSignal = (sig) => {
    if (child && !child.killed) child.kill(sig);
  };
  process.on('SIGINT', () => onSignal('SIGINT'));
  process.on('SIGTERM', () => onSignal('SIGTERM'));

  child.on('error', (err) => {
    if (err.code === 'ENOENT' && fallbackCmd && targetCmd !== fallbackCmd) {
      runChild(fallbackCmd, true);
    } else {
      console.error(`[rgh wrapper] 无法执行 rgh 命令 (OS: ${process.platform}):`, err.message);
      console.error('请确认已通过 "npm install -g @rollinggo/hotel" 或 "python scripts/install.py" 安装 rgh 工具。');
      process.exit(1);
    }
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
    } else {
      process.exit(code || 0);
    }
  });
}

runChild(cmd, shell);
