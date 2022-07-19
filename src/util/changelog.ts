import * as vscode from "vscode"
import * as semver from "semver"

export function displayChangelog(showChangelogOnUpdate: boolean, context: vscode.ExtensionContext) {
    if (extensionWasUpdated(showChangelogOnUpdate, context)) {
        showChangelog()
    }
}

function extensionWasUpdated(showChangelogOnUpdate: boolean, context: vscode.ExtensionContext): boolean {
    const thisExtension = vscode.extensions.getExtension('brenek.kotlin-for-frc')
    if (thisExtension === undefined) {
        console.error("thisExtension was undefined, the changelog will not be displayed.")
        return false
    }

    const currentVersion = thisExtension.packageJSON["version"]
    const storedVersion = context.globalState.get("lastInitVersion", "0.0.0")

    context.globalState.update("lastInitVersion", currentVersion)

    if (!showChangelogOnUpdate) {
        return false
    }

    return semver.satisfies(currentVersion, `>${storedVersion}`)
}

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
    <h2><a href="https://github.com/BrenekH/kotlin-for-frc/releases/2022.7.1">2022.7.1</a></h2>
    <p><strong>Implemented enhancements:</strong></p>
    <ul>
        <li>
            <p>Updated upstream dependencies</p>
        </li>
        <li>
            <p>Updated base GradleRIO version to 2022.4.1</p>
        </li>
        <li>
            <p>Added support for Node 18</p>
        </li>
    </ul>
</body>
</html>
`
