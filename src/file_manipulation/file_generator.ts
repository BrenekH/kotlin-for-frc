import * as vscode from 'vscode';
import * as path from 'path';
import * as customfs from "./file_system";
import * as kotlinExt from "../extension";

export function createFileWithContent(name: string, content: string) {
  var filePath = path.join(String(kotlinExt.getWorkspaceFolderFsPath()), name);
  customfs.writeToFile(filePath, content);
  return filePath;
}

export function createFileWithContentAndFullPath(full_path: string, content: string) {
    customfs.writeToFile(full_path, content);
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
  var workspace_path = kotlinExt.getWorkspaceFolderPath();
  var path_to_main_folder = workspace_path + "/src/main/kotlin/";
  console.log(path_to_main_folder);
  var package_string = filePath.path.replace(path_to_main_folder, "").replace(/\//g, ".");
  console.log(package_string);
  return package_string;
}
