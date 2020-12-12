"use strict";
import * as vscode from "vscode";
import * as semver from "semver";
import * as filesystem from "./file_manipulation/file_system";
import get from "axios";
import { getWorkspaceFolderPath, getWorkspaceFolderFsPath, getValidLatestGradleRioVersion } from "./extension";
import { createFileWithContent } from "./file_manipulation/file_generator";

export async function getGradleRIOVersionXML(): Promise<string> {
	var response: any;
	try {
		response = await get("https://plugins.gradle.org/m2/edu/wpi/first/GradleRIO/maven-metadata.xml");
	} catch (error) {
		console.log(error);
		return "";
	}
	return response.data as string;
}

export async function getLatestOnlineGradleRioVersions(): Promise<{[key: string]: string}> {
	const responseString = await getGradleRIOVersionXML();

	let resultObj = responseString.match(/<versions>(.*)<\/versions>/s);

	if (resultObj === null) {
		resultObj = ["", ""];
	}

	const allVersionsString = resultObj[0];

	const temp = allVersionsString.match(/<version>([A-Za-z0-9.\-]*)<\/version>/g);

	let allVersions: string[] = [];

	temp?.forEach(element => {
		allVersions.push(element.replace("<version>", "").replace("</version>", ""));
	});

	let x: {[key: string]: string} = {}; // TODO: Name this better

	allVersions.forEach(element => {
		let tempYear = element.match(/[0-9]{4}/);
		let year = "0000";
		if (tempYear !== null) {
			year = tempYear[0];
		}

		if (x[year] !== undefined) {
			if (semver.satisfies(element, `>${x[year]}`)) {
				x[year] = element;
			}
		} else {
			x[year] = element;
		}
	});

	return x;
}

export async function updateGradleRIOVersionCache(context: vscode.ExtensionContext) {
	const storedLastUpdate = context.globalState.get("lastGradleRioVersionUpdateTime", 0) as number;
	const currentTime = Date.now();

	if (!(currentTime > storedLastUpdate + 86400000)) {
		return;
	}

	const latestVersions: {[key: string]: string} = await getLatestOnlineGradleRioVersions();
	context.globalState.update("grvCache", JSON.stringify(latestVersions));
}

export async function getLatestGradleRioVersion(currentYear: string, context: vscode.ExtensionContext): Promise<string | undefined> {
	await updateGradleRIOVersionCache(context);

	const grvCacheValue: string | undefined = context.globalState.get("grvCache");

	if (grvCacheValue === undefined) {  // Curse you Typescript!
		return undefined;
	}

	return JSON.parse(grvCacheValue)[currentYear];
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

export async function updateGradleRioVersion() {
    var re = /id \"edu.wpi.first.GradleRIO\" version \".+\"/gi;
    var fileContent = await filesystem.readFile(getWorkspaceFolderFsPath() + "/build.gradle");
    var replacementString = `id "edu.wpi.first.GradleRIO" version "${getValidLatestGradleRioVersion()}"`;
	createFileWithContent("build.gradle", fileContent.replace(re, replacementString));
	vscode.window.showInformationMessage(`GradleRio version updated to ${getValidLatestGradleRioVersion()}`);
}
