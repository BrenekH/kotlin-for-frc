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
<h2><a href="https://github.com/BrenekH/kotlin-for-frc/tree/2021.5.1">2021.5.1</a> (2021-05-09)</h2>
<p><strong>Implemented enhancements:</strong></p>
<ul>
<li>
<p>Limited functionality in Untrusted Workspaces</p>
</li>
<li>
<p>Disable KfF in Virtual Workspaces</p>
</li>
<li>
<p>Upgrade <code>lodash</code> to mitigate possible security issue</p>
</li>
</ul>
</body>
</html>`
