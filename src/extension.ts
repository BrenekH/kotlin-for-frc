"use strict";
import { homedir } from "os";
import * as vscode from "vscode";
import { registerCommands } from "./commands/commands";
import { FileSystemTemplateProvider, IntegratedTemplateProvider, TemplateProviderAggregator } from "./template/providers";
import { displayChangelog } from "./util/changelog";
import updateGradleRioVersion from "./util/gradleRioUpdate";
import { TelemetryReporter } from "./util/telemetry"
import { alertForMissingWPILibExt, setIsKFFProject } from "./util/util";

export async function activate(context: vscode.ExtensionContext) {
	// Setup
	setIsKFFProject()

	const telemetry = new TelemetryReporter()

	// Read updateGradleRIOVer and showChangelogOnUpdate from vscode settings, taking care to set them to default values in case of an undefined value.
	let temp: boolean | undefined = vscode.workspace.getConfiguration("kotlinForFRC.gradleRioVersion").get<boolean>("autoUpdate")
	const updateGradleRIOVer: boolean = temp !== undefined ? temp : true
	temp = vscode.workspace.getConfiguration("kotlinForFRC.changelog").get<boolean>("showOnUpdate")
	const showChangelogOnUpdate: boolean = temp !== undefined ? temp : true

	// Setup template providers
	const integratedTemplateProv = new IntegratedTemplateProvider()
	const userTemplateProv = new FileSystemTemplateProvider(vscode.Uri.joinPath(vscode.Uri.file(homedir()), ".kfftemplates"))
	const templateProvAgg = new TemplateProviderAggregator(integratedTemplateProv, userTemplateProv)
	// TODO: Add workspace template providers to templateProvAgg

	// TODO: Set is workspace KfF project
	//? Does this even need to be a thing? I find it hard to believe that detecting if a workspace is a KfF project is super useful.

	// Startup
	alertForMissingWPILibExt()
	updateGradleRioVersion(updateGradleRIOVer, context)
	displayChangelog(showChangelogOnUpdate, context)

	telemetry.recordActivationEvent(showChangelogOnUpdate, updateGradleRIOVer)

	// Register handlers
	registerCommands(context, telemetry)
}

export function deactivate() { }
