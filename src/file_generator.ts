import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function createFileWithContent(name: string, content: string) {
  if (typeof vscode.workspace.workspaceFolders === 'undefined') {
    return;
  }
  var filePath = path.join(String(vscode.workspace.workspaceFolders[0].uri.fsPath), name);
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

export function createFileWithContentAndFullPath(full_path: string, content: string) {
    fs.writeFileSync(full_path, content, 'utf8');
    return full_path;
}

export function showDocumentInViewer(filePath: string | undefined) {
  if (typeof filePath === 'undefined') {
    return;
  }
  var openPath = vscode.Uri.file(filePath);
  vscode.workspace.openTextDocument(openPath).then(doc => {
    vscode.window.showTextDocument(doc);
  });
}

export function generatePackage(filePath: string) {
  return "frc.robot";
}