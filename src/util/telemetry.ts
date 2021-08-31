"use strict"
import * as vscode from "vscode"
import * as os from "os"
import axios from "axios"
import { RobotType } from "../commands/models"
import { TemplateType } from "../template/models"

export class TelemetryReporter {
	private postUrl: string = "https://kff-data-server.herokuapp.com/postdata"
	private inDebugExtensionHost: boolean
	private extensionVersion: string
	private botNoStealingKeys: string

	constructor() {
		this.inDebugExtensionHost = (vscode.env.machineId === "someValue.machineId")
		const extensionId = "brenek.kotlin-for-frc"
		this.extensionVersion = vscode.extensions.getExtension(extensionId)!.packageJSON.version
		this.botNoStealingKeys = Buffer.from("aHFqNzF0Z2phOWE0dmI2dQ==", "base64").toString()
	}

	recordActivationEvent(autoShowChangelogEnabled: boolean, autoUpdateGradleRioEnabled: boolean) {
		this.sendEvent(100, { autoShowChangelog: autoShowChangelogEnabled, autoUpdateGradleRio: autoUpdateGradleRioEnabled })
	}

	recordCommandRan(commandId: string) {
		this.sendEvent(110, { commandId })
	}

	recordConversionEvent(type: RobotType) {
		this.sendEvent(120, { robotType: type.toString() })
	}

	private sendEvent(eventId: number, eventData: object) {
		if (!(vscode.workspace.getConfiguration("kotlinForFRC.telemetry").get<boolean>("enable")) || this.inDebugExtensionHost) {
			return
		}
		let payloadJSON: object = {
			"machine_id": vscode.env.machineId,
			"session_id": vscode.env.sessionId,
			"extension_version": this.extensionVersion,
			"vscode_version": vscode.version,
			"event_id": eventId,
			"event": eventData,
			"os": os.platform(),
			"os_version": os.release()
		}
		axios({
			method: "post",
			url: this.postUrl,
			data: payloadJSON,
			headers: {
				"Content-Type": "application/json",
				"Authorization": this.botNoStealingKeys
			}
		}).then(() => {
			console.log("Post request complete")
		}).catch((reason: any) => {
			console.error("Post request failed because of following error")
			console.error(reason)
		})
	}
}
