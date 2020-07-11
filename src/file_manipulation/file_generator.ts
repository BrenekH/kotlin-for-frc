import * as vscode from 'vscode';
import * as path from 'path';
import * as customfs from "./file_system";
import * as kotlinExt from "../extension";

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export function createFileWithContent(name: string, content: string) {
  var filePath = path.join(String(kotlinExt.getWorkspaceFolderFsPath()), name);
  customfs.writeToFile(filePath, content);
  return filePath;
}

export function createFileWithContentAndFullPath(fullPath: string, content: string) {
    customfs.writeToFile(fullPath, content);
    return fullPath;
}

export async function showDocumentInViewer(filePath: string | undefined) {
  if (typeof filePath === 'undefined') {
    return;
  }

  await sleep(500);
  var openPath = vscode.Uri.file(filePath);
  vscode.workspace.openTextDocument(openPath).then((doc) => {
    vscode.window.showTextDocument(doc, vscode.ViewColumn.Active);
  });
}

export function generatePackage(filePath: any) {
  if (typeof vscode.workspace.workspaceFolders === "undefined") {
    vscode.window.showErrorMessage("Kotlin for FRC: Could not auto detect package");
    return "frc.robot";
  }
  var workspacePath = kotlinExt.getWorkspaceFolderPath();
  var pathToMainFolder = workspacePath + "/src/main/kotlin/";
  console.log(pathToMainFolder);
  var packageString = filePath.path.replace(pathToMainFolder, "").replace(/\//g, ".");
  console.log(packageString);
  return packageString;
}
