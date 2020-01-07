'use strict';
import * as vscode from 'vscode';
import * as semver from 'semver';

export var isVscodeFsAvailable = semver.satisfies(vscode.version, ">=1.37.0");

export async function mkdir(uri: string) {
	if (isVscodeFsAvailable) {
		try {
			await vscode.workspace.fs.createDirectory(vscode.Uri.file(uri));
		} catch {
			console.log(uri + " already exists");
		}
	} else {
		vscode.window.showErrorMessage("Kotlin for FRC Error: For whatever reason, the code detected that you are not running VSCode version 1.37.0 or higher. Please ensure you are updated and try again. If the issue persists, open a GitHub issue at github.com/zPaw/kotlin-for-frc/issues.");
	}
}

export async function exists(uri: string): Promise<boolean> {
	if (isVscodeFsAvailable) {
		var exists = true;
		try {
			await vscode.workspace.fs.stat(vscode.Uri.file(uri));
		} catch {
			exists = false;
		}
		return exists;
	} else {
		vscode.window.showErrorMessage("Kotlin for FRC Error: For whatever reason, the code detected that you are not running VSCode version 1.37.0 or higher. Please ensure you are updated and try again. If the issue persists, open a GitHub issue at github.com/zPaw/kotlin-for-frc/issues.");
		return false;
	}
}

export async function readFile(uri: string) {
	if (isVscodeFsAvailable) {
		// Only used when VSCode is updated at or past 1.37.0
		var contentFromRead = await vscode.workspace.fs.readFile(vscode.Uri.file(uri));
		var content = contentFromRead.toString();
		return content;
	} else {
		vscode.window.showErrorMessage("Kotlin for FRC Error: For whatever reason, the code detected that you are not running VSCode version 1.37.0 or higher. Please ensure you are updated and try again. If the issue persists, open a GitHub issue at github.com/zPaw/kotlin-for-frc/issues.");
		return "";
	}
}

export async function writeToFile(uri: string, content: string) {
	if (isVscodeFsAvailable) {
		// Only used when VSCode is updated at or past 1.37.0
		const writeBytes = Buffer.from(content, 'utf8');

		await vscode.workspace.fs.writeFile(vscode.Uri.file(uri), writeBytes);
	} else {
		vscode.window.showErrorMessage("Kotlin for FRC Error: For whatever reason, the code detected that you are not running VSCode version 1.37.0 or higher. Please ensure you are updated and try again. If the issue persists, open a GitHub issue at github.com/zPaw/kotlin-for-frc/issues.");
	}
}

export function deleteFile(uri: string) {
	// Not useful because of rimraf use for getting rid of src folder
	if (isVscodeFsAvailable) {
		vscode.workspace.fs.delete(vscode.Uri.file(uri));
	} else {
		vscode.window.showErrorMessage("Kotlin for FRC Error: For whatever reason, the code detected that you are not running VSCode version 1.37.0 or higher. Please ensure you are updated and try again. If the issue persists, open a GitHub issue at github.com/zPaw/kotlin-for-frc/issues.");
	}
}
