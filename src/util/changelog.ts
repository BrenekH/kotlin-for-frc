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
<h2><a href="https://github.com/BrenekH/kotlin-for-frc/tree/2021.1.1">2021.1.1</a> (2020-01-06)</h2>
<p><strong>Implemented enhancements:</strong></p>
<ul>
	<li>
		<p>Updated templates for the 2021 FRC season <a
				href="https://github.com/BrenekH/kotlin-for-frc/issues/60">#60</a></p>
	</li>
	<li>
		<p>GradleRIO version is now pulled from plugins.gradle.org, ensuring robot code is up-to-date without a new
			extension release <a href="https://github.com/BrenekH/kotlin-for-frc/issues/41">#41</a></p>
	</li>
	<li>
		<p>Kotlin for FRC settings are now handled through the native VSCode API instead of a custom JSON file
			(<code>.kotlin-for-frc/kotlin-frc-preferences.json</code>) <a
				href="https://github.com/BrenekH/kotlin-for-frc/issues/55">#55</a></p>
	</li>
	<li>
		<p>New settings:</p>
		<ul>
			<li><code>kotlinForFRC.gradleRioVersion.autoUpdate</code> - Whether or not to automatically update the
				Gradle RIO Version when the Kotlin for FRC extension is loaded.</li>
			<li><code>kotlinForFRC.changelog.showOnUpdate</code> - Whether or not to show the changelog when Kotlin for
				FRC has been updated.</li>
			<li><code>kotlinForFRC.simulate.javaHome</code> - Defines a custom JAVA_HOME for Kotlin for FRC to use when
				simulating FRC Kotlin code.</li>
		</ul>
	</li>
	<li>
		<p>Added new command: <code>Kotlin-FRC: Simulate FRC Kotlin Code</code> <a
				href="https://github.com/BrenekH/kotlin-for-frc/issues/63">#63</a></p>
	</li>
	<li>
		<p>This command just calls the <code>simulateJava</code> gradle task but is necessary because the WPILib
			extension also attempts to attach a debugger, but fails because there is no Java code to attach to.</p>
	</li>
	<li>
		<p>Templates are now configurable <a href="https://github.com/BrenekH/kotlin-for-frc/issues/30">#30</a></p>
	</li>
	<li>Check the <a href="https://github.com/BrenekH/kotlin-for-frc/wiki/Custom-Templates">wiki page</a> for more
		information on how to use them.</li>
</ul>
<p><strong>Fixed bugs:</strong></p>
<ul>
	<li>PIDCommand needs a wrapper in order to operate properly <a
			href="https://github.com/BrenekH/kotlin-for-frc/issues/35">#35</a></li>
	<li>The 2021 templates include examples of using the Kotlin types <code>DoubleSupplier</code>,
		<code>BiConsumer</code> and others needed to use the inline PID commands.</li>
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
