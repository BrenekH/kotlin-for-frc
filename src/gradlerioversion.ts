"use strict";
import * as vscode from "vscode";
import * as filesystem from "./file_manipulation/file_system";
import get from "axios";
import { getWorkspaceFolderPath } from "./extension";

export async function queryOnlineGradleRioVersion(): Promise<string> {
	var response: any;
	try {
		response = await get("https://plugins.gradle.org/m2/edu/wpi/first/GradleRIO/maven-metadata.xml");

	} catch (error) {
		console.log(error);
		return "";
	}

	var resultObj = (response.data as String).match(/<version>(.*)<\/version/);
	
	if (resultObj === null) {
		resultObj = ["", ""];
	}

	console.log("Grabbed online GradleRIO version: " + resultObj[1]);

	return resultObj[1];
}

export async function getLatestGradleRioVersion(context: vscode.ExtensionContext): Promise<string> {
	const storedVersion = context.globalState.get("latestGradleRioVersion", "") as string;
	const storedLastUpdate = context.globalState.get("lastGradleRioVersionUpdateTime", 0) as number;
	const currentTime = Date.now();
	var latestVersion = "";

	if (storedVersion === "") {
		latestVersion = await queryOnlineGradleRioVersion();
	} else if (currentTime > storedLastUpdate + 86400000) {
		latestVersion = await queryOnlineGradleRioVersion();
	}

	if (latestVersion !== "") {
		await context.globalState.update("latestGradleRioVersion", latestVersion);
		await context.globalState.update("lastGradleRioVersionUpdateTime", currentTime);
		return latestVersion;
	}	

	return storedVersion as string;
}

export async function getCurrentGradleRioVersion(): Promise<string> {
	const buildGradleUri = `${getWorkspaceFolderPath()}/build.gradle`;
	if (await filesystem.exists(buildGradleUri)) {
		var fileContents = await filesystem.readFile(buildGradleUri);
		var currentVersionArray = fileContents.match(/id\ "edu\.wpi\.first\.GradleRIO"\ version\ "(.*)"/);
		if (currentVersionArray === null) {
			return "";
		}
		return currentVersionArray[1];
	}
	return "";
}
