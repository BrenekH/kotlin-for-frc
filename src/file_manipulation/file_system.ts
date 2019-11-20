'use strict';
import * as vscode from 'vscode';
import * as semver from 'semver';
import * as fs from 'fs';

export var isVscodeFsAvailable = semver.satisfies(vscode.version, ">=1.37.0");

export function mkdir(uri: string) {
	if (isVscodeFsAvailable) {
		(vscode.workspace as any).fs.createDirectory(vscode.Uri.file(uri));
	} else {
		fs.mkdirSync(uri);
	}
}

export function exists(uri: string): Boolean {
	if (isVscodeFsAvailable) {
		var exists = true;
		try {
			(vscode.workspace as any).fs.stat(vscode.Uri.file(uri));
		} catch {
			exists = false;
		}
		return exists;
	} else {
		return fs.existsSync(uri);
	}
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

export function deleteFile(uri: string) {
	// Not useful because of rimraf use for getting rid of src folder
	if (isVscodeFsAvailable) {
		(vscode.workspace as any).fs.delete(vscode.Uri.file(uri));
	} else {

	}
}
