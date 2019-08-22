'use strict';
import * as vscode from 'vscode';
import * as semver from 'semver';

export var isVscodeFsAvailable = semver.satisfies(vscode.version, ">=1.37.0");

export function mkdir(uri: string) {
	// This should only be used when isVscodeFsAvailable is true
	(vscode.workspace as any).fs.createDirectory(vscode.Uri.file(uri));
}

export async function readFile(uri: string) {
	// TODO: Add sub VSCode 1.37.0 protection
	var contentFromRead = await (vscode.workspace as any).fs.readFile(vscode.Uri.file(uri));
	var content = Buffer.from(contentFromRead).toString('utf8');
	return content;	
}

export function writeToFile(uri: string, content: string) {
	// TODO: Add sub VSCode 1.37.0 protection
	const writeBytes = Buffer.from(content, 'utf8');

	(vscode.workspace as any).fs.writeFile(vscode.Uri.file(uri), writeBytes).then(() => {});
}
