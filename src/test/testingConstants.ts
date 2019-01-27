import * as vscode from "vscode";
import * as kotlinExt from "../extension";

export function setupWorkspace() {
    if (typeof vscode.workspace.workspaceFolders === 'undefined') {
        console.log("Whoops");
        return;
    }
    var uri = vscode.Uri.parse(vscode.workspace.workspaceFolders[0].uri.path.replace("/out/test", "/testing-workspace/workspace"));
    kotlinExt.setWorkspaceFolderFsPath(uri.fsPath);
    kotlinExt.setWorkspaceFolderPath(uri.path);
}

export function resetWorkspace() {
    kotlinExt.resetWorkspaceFolderPaths();
}