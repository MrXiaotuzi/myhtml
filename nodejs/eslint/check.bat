@echo off

set ROOT_PATH=%~dp0..
set NODE_PATH=%~dp0..\node_modules

set project=%1
set dirs=

if "%project%" == "framework" (
	set dirs=framework
) else (
	set dirs=project\%project%
)

set fix=%2

echo Start eslint check......

%ROOT_PATH%\nodejs\node.exe %ROOT_PATH%\eslint\index %ROOT_PATH%\eslint %dirs% %fix%