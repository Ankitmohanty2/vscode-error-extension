"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const child_process_1 = require("child_process");
function activate(context) {
    const soundPath = path.join(context.extensionPath, 'out', 'fahhh.mp3');
    const scriptPath = path.join(context.extensionPath, 'out', 'play.ps1');
    if (!fs.existsSync(soundPath)) {
        vscode.window.showErrorMessage(`Fahhhhh: Sound file not found at ${soundPath}`);
        return;
    }
    const sub = vscode.window.onDidEndTerminalShellExecution((e) => {
        if (e.exitCode !== undefined && e.exitCode !== 0) {
            playSound(scriptPath, soundPath);
        }
    });
    context.subscriptions.push(sub);
}
function playSound(scriptPath, soundPath) {
    const child = (0, child_process_1.spawn)('powershell', [
        '-ExecutionPolicy', 'Bypass',
        '-WindowStyle', 'Hidden',
        '-File', scriptPath,
        soundPath
    ], {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();
}
function deactivate() { }
//# sourceMappingURL=extension.js.map