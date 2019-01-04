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

export function generatePackage(filePath: any) {
  if (typeof vscode.workspace.workspaceFolders === "undefined") {
    vscode.window.showErrorMessage("Kotlin for FRC: Could not auto detect package");
    return "frc.robot";
  }
  var workspace_path = vscode.workspace.workspaceFolders[0].uri.path;
  var path_to_main_folder = workspace_path + "/src/main/kotlin/";
  console.log(path_to_main_folder);
  var package_string = filePath.path.replace(path_to_main_folder, "").replace(/\//g, ".");
  console.log(package_string);
  return package_string;
}