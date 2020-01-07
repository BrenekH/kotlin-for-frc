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

	context.globalState.update("lastInitVersion", currentVersion);

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
	<h1>Kotlin For FRC 1.5.0 Newsletter</h1>
	<p>Hello Kotlin For FRC users!</p>
	<p>I would first like to thank you all for installing this extension; the amount of downloads is mind-boggling to me.
		This is the new changelog feature that I’m introducing to Kotlin For FRC.
		It will automatically show up after Kotlin For FRC has updated so you know what has changed and when, but for the
		1.5.0 version, I decided to use it as a newsletter to let everyone know where Kotlin For FRC is headed.</p>
	<p>As with any piece of code, Kotlin For FRC is bound to have bugs and issues lurking throughout the codebase.
		As such, I would like to invite everyone to both report and fix bugs.
		The <a href="https://github.com/zPaw/kotlin-for-frc/blob/master/CONTRIBUTING.md">CONTRIBUTING.md</a> file in the
		repository explains the basics of how to develop Kotlin For FRC for those who want to fix bugs and add features
		themselves.</p>
	<p>Speaking of new features, there are many things coming to Kotlin For FRC for the 2020 season, but they need to be
		tested in a production-like environment.
		This is why I am asking for volunteers, especially those who have access to the 2020 WPILib Beta program, to test
		out the new features.
		While it's not required to beta test Kotlin For FRC, a sign-up form can be found <a href="https://forms.gle/mXPFLX4aSKqaQU5e9">here</a> and at the bottom of this document.
		If you do not wish to get an email or similar form of communication when a new beta is released you can just
		download the latest .vsix from the GitHub releases page <a href="https://github.com/zPaw/kotlin-for-frc/releases">here</a>.</p>
	<p>One controversial feature I have been toying with in the back of my mind is adding anonymized telemetry(anonymous
		automatic data collection).
		Some metrics that I believe would be beneficial to track include Visual Studio Code version and amount of active
		users.
		More details about the proposed telemetry ideas can be found on GitHub <a href="https://github.com/zPaw/kotlin-for-frc/issues/23">here</a>.
		In order to get feedback, I have created a survey that includes telemetry questions and other general feedback type
		questions.
		The link is <a href="https://forms.gle/s4Xwqubcrz5ybRgs6">here</a> and below.</p>
	<p>Once again, I thank you for your support and wish for a great build season for everyone!</p>
	<p>Brenek Harrison</p>
	<p>Creator of Kotlin For FRC</p>
	<p>Beta Test Sign Up <a href="https://forms.gle/mXPFLX4aSKqaQU5e9">https://forms.gle/mXPFLX4aSKqaQU5e9</a></p>
	<p>Telemetry Issue on GitHub <a href="https://github.com/zPaw/kotlin-for-frc/issues/23">https://github.com/zPaw/kotlin-for-frc/issues/23</a></p>
	<p>Survey <a href="https://forms.gle/s4Xwqubcrz5ybRgs6">https://forms.gle/s4Xwqubcrz5ybRgs6</a></p>
</body>
</html>`;
}
