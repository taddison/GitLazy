import * as vscode from 'vscode';
import commitAll from './commitAll';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('gitlazy.addCommitPush', () => {
        return vscode.commands.executeCommand('git.stageAll').then(() => {
            return commitAll().then(() => {
                return vscode.commands.executeCommand('git.push');
            });
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}