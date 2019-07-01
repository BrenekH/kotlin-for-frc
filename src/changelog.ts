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
	let storedVersion = context.globalState.get("lastInitVersion", "0.0.0");

	context.globalState.update("lastInitVersion", "0.0.0");

	// @ts-ignore Note: This shouldn't be needed because true is a default value but it's here anyways
	if (context.globalState.get("toggleChangelog", true) === false) {
		return false;
	}

	if (semver.satisfies(currentVersion, `>${storedVersion}`)) {
		return true;
	} else {
		return false;
	}
}

export function showChangelog() {
	const panel = vscode.window.createWebviewPanel('kotlin-for-frcChangelog', 'Kotlin For FRC Changelog', vscode.ViewColumn.One, {});

	panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Kotlin For FRC Changelog</title>
</head>
<body>
	<h1>Change Log</h1>
	<h2>1.4.0</h2>
	<ul>
		<li>Faster extension loading times using webpack</li>
	</ul>
</body>
</html>`;
}
