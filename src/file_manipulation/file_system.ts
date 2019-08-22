'use strict';
import * as vscode from 'vscode';
import * as semver from 'semver';
import * as fs from 'fs';

export var isVscodeFsAvailable = semver.satisfies(vscode.version, ">=1.37.0");

export function mkdir(uri: string) {
	// This should only be used when isVscodeFsAvailable is true
	(vscode.workspace as any).fs.createDirectory(vscode.Uri.file(uri));
}

export async function readFile(uri: string) {
	if (isVscodeFsAvailable) {
		// Only used when VSCode is updated at or past 1.37.0
		var contentFromRead = await (vscode.workspace as any).fs.readFile(vscode.Uri.file(uri));
		var content = Buffer.from(contentFromRead).toString('utf8');
		return content;	
	} else {
		return fs.readFileSync(uri, 'utf-8');
	}
}

export function writeToFile(uri: string, content: string) {
	if (isVscodeFsAvailable) {
		// Only used when VSCode is updated at or past 1.37.0
		const writeBytes = Buffer.from(content, 'utf8');

		(vscode.workspace as any).fs.writeFile(vscode.Uri.file(uri), writeBytes).then(() => {});
	} else {
		fs.writeFileSync(uri, content);
	}
}
