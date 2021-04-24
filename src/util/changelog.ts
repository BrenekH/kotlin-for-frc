import * as vscode from 'vscode';
import * as semver from 'semver';

function getWebviewContent() {
	// Webview body content is generated using the batch file in the main directory.
	// Only copy the latest release and add any special notes you want to send the end user.
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Kotlin For FRC Changelog</title>
</head>
<body>
<h1>Kotlin for FRC Changelog</h1>
<h2><a href="https://github.com/BrenekH/kotlin-for-frc/tree/2021.4.1">2021.4.1</a> (2021-04-24)</h2>
<p><strong>Implemented enhancements:</strong></p>
<ul>
<li>Just some various dependency upgrades to mitigate potential security issues</li>
</ul>
</body>
</html>`;
}

export function showChangelog() {
	const panel = vscode.window.createWebviewPanel('kotlin-for-frcChangelog', 'Kotlin For FRC Changelog', vscode.ViewColumn.One, {});

	panel.webview.html = getWebviewContent();
}

function extensionWasUpdated(context: vscode.ExtensionContext): boolean {
	let thisExtension = vscode.extensions.getExtension('brenek.kotlin-for-frc');
	if (thisExtension === undefined) {
		console.log("thisExtension was undefined, the changelog will not be displayed.");
		return false;
	}
	let currentVersion = thisExtension.packageJSON["version"];
	let storedVersion = context.globalState.get("lastInitVersion", "0.0.0");

	context.globalState.update("lastInitVersion", currentVersion);

	// @ts-ignore Note: This shouldn't be needed because true is a default value but it's here anyways
	if (vscode.workspace.getConfiguration("kotlinForFRC.changelog").get("showOnUpdate") === false) {
		return false;
	}

	return semver.satisfies(currentVersion, `>${storedVersion}`);
}

export function displayChangelog(context: vscode.ExtensionContext) {
	if (extensionWasUpdated(context)) {
		showChangelog();
	}
}
