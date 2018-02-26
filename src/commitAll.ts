import * as vscode from 'vscode';
import changeDirectory from './changeDirectory';
import exec from './exec';

export default async function commitAll(): Promise<void> {
    let ws = vscode.workspace.workspaceFolders;
    if (ws === undefined) {
        return;
    }

    const workspaceRootAbsolutePath = ws[0].uri.fsPath;

    try {
        await changeDirectory(workspaceRootAbsolutePath);
    }
    catch (err) {
        vscode.window.showErrorMessage(err);
        console.error(err);

        return;
    }

    try {
        let message = "Update journal";
        await exec('git', ['commit', '-m', `${message}`]);
    }
    catch (err) {
        // Git warnings are also caught here, so let's ignore them
        if (typeof err !== 'string' || err.substr(0, 7) !== 'warning') {
            vscode.window.showErrorMessage(err);
            console.error(err);

            return;
        }
    }
}
