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
    <h2><a href="https://github.com/BrenekH/kotlin-for-frc/releases/2022.10.1">2022.10.1</a></h2>
    <p><strong>Implemented enhancements:</strong></p>
    <ul>
        <li>
            <p>Automatically publish builds to <a href="https://open-vsx.org/extension/Brenek/kotlin-for-frc">open-vsx.org</a></p>
        </li>
        <li>
            <p>Put <code>wpilibsuite.vscode-wpilib</code> and <code>Brenek.kotlin-for-frc</code> in <code>.vscode/extensions.json</code> as recommended extensions</p>
        </li>
        <li>
            <p>Updated logo to match the new Kotlin logo</p>
        </li>
        <li>
            <p>Switch to <code>@vscode/test-electron</code> testing package (thanks <a href="https://github.com/anuragh2002">@anuragh2002</a>)</p>
        </li>
        <li>
            <p>New shorter extension description</p>
        </li>
    </ul>
</body>
</html>
`
