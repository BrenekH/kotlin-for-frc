import * as vscode from 'vscode';
import * as semver from 'semver';

export function displayChangelog(context: vscode.ExtensionContext) {
	if (extensionWasUpdated(context)) {
		showChangelog();
	}
}

function extensionWasUpdated(context: vscode.ExtensionContext): boolean {
	let thisExtension = vscode.extensions.getExtension('brenek.kotlin-for-frc');
	if (thisExtension === undefined) {
		console.log("thisExtension was undefined, the changelog will not be displayed.");
		return false;
	}
	let currentVersion = thisExtension.packageJSON["version"];
	let storedVersion = context.globalState.get("lastInitVersion");

	context.globalState.update("lastInitVersion", "0.0.0");

	if (semver.satisfies(currentVersion, `>${storedVersion}`)) {
		return true;
	} else {
		return false;
	}
}

function showChangelog() {console.log("Show changelog");}
