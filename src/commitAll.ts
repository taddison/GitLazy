import * as vscode from 'vscode';
import exec from './exec';

export default async function commitAll(): Promise<void> {
    let ws = vscode.workspace.workspaceFolders;
    if (ws === undefined) {
        return;
    }

    let workspaceRootAbsolutePath = ws[0].uri.fsPath;

    await process.chdir(workspaceRootAbsolutePath);

    let commitMessage = vscode.workspace.getConfiguration('gitlazy').get<string>('commitMessage') || "Update";
    
    try {
        await exec('git', ['commit', '-m', `${commitMessage}`]);
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
