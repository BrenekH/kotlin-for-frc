'use strict';
import * as vscode from 'vscode';

export function mkdir(uri: string) {
	console.log(vscode.workspace.fs.createDirectory(vscode.Uri.file(uri)));
}