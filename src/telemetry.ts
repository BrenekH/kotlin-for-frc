"use strict";
import * as vscode from "vscode";
import * as os from "os";
import axios from "axios";
import { robotType } from "./templates/template_interpreter";

export class TelemetryReporter {
	private postUrl: string = "https://kff-data-staging.herokuapp.com/postdata";
	private inExtensionHost: boolean;
	private extensionVersion: string;
	private botNoStealingKeys: string;

	constructor() {
		this.inExtensionHost = (vscode.env.machineId === "someValue.machineId");
		this.inExtensionHost = false;
		const extensionId = "brenek.kotlin-for-frc";
		this.extensionVersion = vscode.extensions.getExtension(extensionId)!.packageJSON.version;
		this.botNoStealingKeys = Buffer.from("eWRzYm15NGVhdzQ2eXQydA==", "base64").toString();
	}

	sendCommandRun(commandName: string) {
		if (!this.inExtensionHost) {
			this.sendEvent(100, {"commandName": commandName});
		}
	}

	sendRobotType(type: robotType) {
		if (!this.inExtensionHost) {
			this.sendEvent(110, {"robotType": type.toString()});
		}
	}

	sendEvent(eventId: number, eventData: object) {
		let payloadJSON: object = {"machine_id": vscode.env.machineId,
									"session_id": vscode.env.sessionId,
									"extension_version": this.extensionVersion,
									"vscode_version": vscode.version,
									"event_id": eventId,
									"event": eventData,
									"os": os.platform(),
									"os_version": os.release()};
		axios({
			method: "post",
			url: this.postUrl,
			data: payloadJSON,
			headers: {
				"Content-Type": "application/json",
				"Authorization": this.botNoStealingKeys
			}
		}).then(() => {
			console.log("Post request complete");
		}).catch((reason: any) => {
			console.error("Post request failed because of following error");
			console.error(reason);
		});
	}
}
