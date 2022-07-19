"use strict";
import { homedir } from "os";
import * as vscode from "vscode";
import { registerCommands } from "./commands/commands";
import { FileSystemTemplateProvider, IntegratedTemplateProvider, TemplateProviderAggregator } from "./template/providers";
import { displayChangelog } from "./util/changelog";
import updateGradleRioVersion from "./util/gradleRioUpdate";
import { addCurrentWorkspaceDirsToAggregator, alertForMissingWPILibExt, setIsKFFProject } from "./util/util";

export async function activate(context: vscode.ExtensionContext) {
	// Setup
	setIsKFFProject()

	// Read updateGradleRIOVer and showChangelogOnUpdate from vscode settings, taking care to set them to default values in case of an undefined value.
	let temp: boolean | undefined = vscode.workspace.getConfiguration("kotlinForFRC.gradleRioVersion").get<boolean>("autoUpdate")
	const updateGradleRIOVer: boolean = temp !== undefined ? temp : true
	temp = vscode.workspace.getConfiguration("kotlinForFRC.changelog").get<boolean>("showOnUpdate")
	const showChangelogOnUpdate: boolean = temp !== undefined ? temp : true

	// Setup template providers
	const integratedTemplateProv = new IntegratedTemplateProvider()
	const userTemplateProv = new FileSystemTemplateProvider(vscode.Uri.joinPath(vscode.Uri.file(homedir()), ".kfftemplates"))
	const templateProvAgg = new TemplateProviderAggregator(integratedTemplateProv, userTemplateProv)
	addCurrentWorkspaceDirsToAggregator(templateProvAgg)

	// Register handlers
	registerCommands(context, templateProvAgg)

	// Register workspace change handler for adding/removing template providers
	vscode.workspace.onDidChangeWorkspaceFolders((e: vscode.WorkspaceFoldersChangeEvent) => {
		e.added.forEach((workspaceDir: vscode.WorkspaceFolder) => {
			templateProvAgg.setWorkspaceProvider(workspaceDir.uri, new FileSystemTemplateProvider(vscode.Uri.joinPath(workspaceDir.uri, ".kfftemplates")))
		})

		e.removed.forEach((workspaceDir: vscode.WorkspaceFolder) => {
			templateProvAgg.deleteWorkspaceProvider(workspaceDir.uri)
		})
	})

	// Startup
	alertForMissingWPILibExt()
	updateGradleRioVersion(updateGradleRIOVer, context)
	displayChangelog(showChangelogOnUpdate, context)
}

export function deactivate() { }
