@echo off

set ROOT_PATH=%~dp0
set NODE_PATH=%ROOT_PATH%\node_modules
echo Start nodejs server......

%ROOT_PATH%\nodejs\node.exe %ROOT_PATH%\server\socket.js