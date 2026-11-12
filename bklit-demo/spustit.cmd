@echo off
rem Spusti vyvojovy server webu. Node.js neni v systemu nainstalovany,
rem proto se pouzije prenosna verze ze slozky ..\.tools.
set "PATH=%~dp0..\.tools\node-v24.22.3-win-x64;%PATH%"
cd /d "%~dp0"
echo Web pobezi na http://localhost:3000 (ukonceni: Ctrl+C)
call npm run dev
