import * as vscode from 'vscode';

/**
 * ensureExtensionsRecommended will ensure that the provided extensions are recommended through the
 * workspaceDir.uri/.vscode/extensions.json file.
 *
 * This has only been tested on a non-multi-root workspace. Support for .code-workspace files is a not
 * implemented.
 *
 * @param workspaceDir The parent folder of the target .vscode/extensions.json
 * @param extensions The extensions to make sure exist in .vscode/extensions.json
 */
export async function ensureExtensionsRecommended(workspaceDir: vscode.WorkspaceFolder, extensions: string[]) {
	// TODO: Make sure this function works with .code-workspace files and multi-root workspaces

	const targetURI = vscode.Uri.joinPath(workspaceDir.uri, ".vscode", "extensions.json")

	let extJSON: { recommendations: string[] }
	try {
		const extJSONData = await vscode.workspace.fs.readFile(targetURI)

		extJSON = JSON.parse(Buffer.from(extJSONData).toString("utf8")) as { recommendations: string[] }
	} catch {
		extJSON = { recommendations: [] }
	}

	extensions.forEach(extID => {
		if (extJSON.recommendations.indexOf(extID) === -1) {
			extJSON.recommendations.push(extID)
		}
	});

	const extJSONStr = JSON.stringify(extJSON, null, 2)

	await vscode.workspace.fs.writeFile(targetURI, Buffer.from(extJSONStr, 'utf-8'))
}
