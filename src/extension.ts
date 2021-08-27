"use strict";
import * as vscode from "vscode";
import { TelemetryReporter } from "./util/telemetry"

export async function activate(context: vscode.ExtensionContext) {
	// TODO: Setup (telemetry, template providers, set isKFFProject variable, is workspace KfF project)
	const telemetry = new TelemetryReporter()

	// Read updateGradleRIOVer and showChangelogOnUpdate from vscode settings, taking care to set them to default values in case of an undefined value.
	let temp: boolean | undefined = vscode.workspace.getConfiguration("kotlinForFRC.gradleRioVersion").get<boolean>("autoUpdate")
	const updateGradleRIOVer: boolean = temp !== undefined ? temp : true
	temp = vscode.workspace.getConfiguration("kotlinForFRC.changelog").get<boolean>("showOnUpdate")
	const showChangelogOnUpdate: boolean = temp !== undefined ? temp : true

	// TODO: Startup (GradleRIO updates, check for WPILib extension, display changelog after update, send telemetry startup event)
	telemetry.recordActivationEvent(showChangelogOnUpdate, updateGradleRIOVer)

	// TODO: Register commands and other on demand stuff
}

export function deactivate() {}
