#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import shutil
import subprocess
from pathlib import Path

# 1. 自动挂载当前 Skill 的默认 Client ID（优先使用外部显式设定的环境变量）
os.environ["CLIENT_ID"] = os.environ.get("CLIENT_ID", "rollinggoskill")

is_win = sys.platform == "win32"
script_dir = Path(__file__).parent.resolve()
skill_bin_dir = script_dir.parent / "bin"

# 2. 跨平台可执行程序路径自动探测 (Windows / macOS / Linux)
def resolve_executable():
    # 优先检测 Skill 本地 bin 目录 (如通过 python scripts/install.py 下载的单文件程序)
    if skill_bin_dir.exists():
        local_exe_name = "rgh.exe" if is_win else "rgh"
        local_path = skill_bin_dir / local_exe_name
        if local_path.exists():
            return str(local_path)

    # 寻找系统 PATH 中的 rgh 命令
    if is_win:
        rgh_cmd = shutil.which("rgh.cmd")
        if rgh_cmd:
            return rgh_cmd
        rgh_exe = shutil.which("rgh.exe")
        if rgh_exe:
            return rgh_exe
        return "rgh"
    else:
        rgh_bin = shutil.which("rgh")
        if rgh_bin:
            return rgh_bin
        return "rgh"

target_cmd = resolve_executable()

# 3. 转发参数并执行，透明透传退出码与打断信号
def main():
    args = [target_cmd] + sys.argv[1:]
    try:
        use_shell = is_win and target_cmd.endswith(".cmd")
        res = subprocess.run(args, shell=use_shell)
        sys.exit(res.returncode)
    except KeyboardInterrupt:
        sys.exit(130)
    except FileNotFoundError:
        print(f"[rgh wrapper] 无法找到或执行 rgh 命令 (OS: {sys.platform})", file=sys.stderr)
        print("请确认已通过 'npm install -g @rollinggo/hotel' 或 'python scripts/install.py' 安装 rgh 工具。", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"[rgh wrapper] 执行发生异常: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
