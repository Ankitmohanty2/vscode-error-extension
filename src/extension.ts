import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { spawn } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    const soundPath = path.join(context.extensionPath, 'out', 'fahhh.mp3');
    const scriptPath = path.join(context.extensionPath, 'out', 'play.ps1');

    if (!fs.existsSync(soundPath)) {
        vscode.window.showErrorMessage(`Fahhhhh: Sound file not found at ${soundPath}`);
        return;
    }

    const sub = vscode.window.onDidEndTerminalShellExecution((e: vscode.TerminalShellExecutionEndEvent) => {
        if (e.exitCode !== undefined && e.exitCode !== 0) {
            playSound(scriptPath, soundPath);
        }
    });

    context.subscriptions.push(sub);
}

function playSound(scriptPath: string, soundPath: string) {
    const child = spawn('powershell', [
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

export function deactivate() { }
