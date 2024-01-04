import * as vscode from "vscode"
import * as semver from "semver"

/**
 * displays the changelog using a webview only if the extension was updated and showChangelogOnUpdate is true.
 *
 * @param showChangelogOnUpdate Whether or not to show the changelog when the extension is updated
 * @param context VSCode extension context
 */
export function displayChangelog(showChangelogOnUpdate: boolean, context: vscode.ExtensionContext) {
    if (showChangelogOnUpdate && extensionWasUpdated(context)) {
        showChangelog()
    }
}

/**
 * extensionWasUpdated uses VSCode's global states to determine if the last version that was run on this
 * machine was older than the current running extension.
 *
 * @param context VSCode extension context, used to remember the last version run on the current machine
 * @returns Whether or not the extension was updated
 */
function extensionWasUpdated(context: vscode.ExtensionContext): boolean {
    const thisExtension = vscode.extensions.getExtension('brenek.kotlin-for-frc')
    if (thisExtension === undefined) {
        console.error("thisExtension was undefined, the changelog will not be displayed.")
        return false
    }

    const currentVersion = thisExtension.packageJSON["version"]
    const storedVersion = context.globalState.get("lastInitVersion", "0.0.0")

    context.globalState.update("lastInitVersion", currentVersion)

    return semver.satisfies(currentVersion, `>${storedVersion}`)
}

/**
 * showChangelog displays the latest release notes (stored in the webviewContent constant) using a VSCode webview panel.
 */
export function showChangelog() {
    const panel = vscode.window.createWebviewPanel('kotlin-for-frcChangelog', 'Kotlin For FRC Changelog', vscode.ViewColumn.One, {})

    panel.webview.html = webviewContent
}

const webviewContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kotlin For FRC Changelog</title>
</head>
<body>
    <h1>Kotlin for FRC Changelog</h1>
    <h2><a href="https://github.com/BrenekH/kotlin-for-frc/releases/2024.1.1">2024.1.1</a></h2>
    <p><strong>Enhancements:</strong></p>
    <ul>
        <li>Update templates for 2024</li>
        <li>Add Command Based Skeleton template and remove Robot Base template</li>
        <li>Report projects as Kotlin instead of Java (<a href="https://github.com/BrenekH/kotlin-for-frc/issues/151">#151</a>)</li>
    </ul>
</body>
</html>
`
