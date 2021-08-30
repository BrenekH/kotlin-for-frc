import * as semver from "semver"
import * as vscode from "vscode"
import axios from "axios"
import { targetGradleRIOYear } from "../constants"

export default async function updateGradleRioVersion(autoUpdateEnabled: boolean, context: vscode.ExtensionContext) {
	if (!autoUpdateEnabled) { return }

	vscode.workspace.workspaceFolders?.forEach(async (workspaceDir: vscode.WorkspaceFolder) => {
		// Ignore workspace folder if it doesn't have a Robot.kt file
		const robotKt = vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt")
		try {
			await vscode.workspace.fs.stat(robotKt)
		} catch (_) {
			return
		}

		// Get current version from workspaceDir/build.gradle
		const localVer = await getGradleRIOVersionFromWorkspace(workspaceDir)
		if (localVer === null) {
			vscode.window.showErrorMessage(`Unable to determine current GradleRIO version in ${workspaceDir.uri.toString()} workspace folder`)
			return
		}

		const currentYear = semver.parse(localVer)?.major as string | undefined

		// Get latest version from plugins.gradle.org
		const latestVer = await getLatestGradleRioVersion(currentYear === undefined ? targetGradleRIOYear : currentYear, context)
		if (latestVer === undefined) {
			return
		}

		// Set local version to latest version if update is available
		if (localVer === latestVer) {
			return
		}
		await updateWorkspaceGradleRIOVersion(latestVer, workspaceDir)

		// Notify user that GradleRIO version has been updated
		vscode.window.showInformationMessage(`GradleRIO version in ${vscode.Uri.joinPath(workspaceDir.uri, "build.gradle").toString()} updated from ${localVer} to ${latestVer}`)
	})
}

async function updateWorkspaceGradleRIOVersion(newVersion: string, workspaceDir: vscode.WorkspaceFolder) {
	const buildGradle = vscode.Uri.joinPath(workspaceDir.uri, "build.gradle")

	const currentData = await vscode.workspace.fs.readFile(buildGradle)
	const currentContents = Buffer.from(currentData).toString("utf8")

	const newContents = currentContents.replace(/id \"edu.wpi.first.GradleRIO\" version \".+\"/gi, `id "edu.wpi.first.GradleRIO" version "${newVersion}"`)

	await vscode.workspace.fs.writeFile(buildGradle, Buffer.from(newContents, "utf8"))
}

async function getGradleRIOVersionFromWorkspace(workspaceDir: vscode.WorkspaceFolder): Promise<string | null> {
	let data: Uint8Array
	try {
		data = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"))
	} catch (_) {
		return null
	}
	const contents = Buffer.from(data).toString("utf8")

	const currentVerArray = contents.match(/id\ "edu\.wpi\.first\.GradleRIO"\ version\ "(.*)"/)
	if (currentVerArray === null) {
		return ""
	}

	return currentVerArray[1]
}

async function getLatestGradleRioVersion(currentYear: string, context: vscode.ExtensionContext): Promise<string | undefined> {
	await updateGradleRIOVersionCache(context)

	const grvCacheValue: string | undefined = context.globalState.get("grvCache")

	if (grvCacheValue === undefined) {  // Curse you Typescript!
		return undefined
	}

	return JSON.parse(grvCacheValue)[currentYear]
}

async function updateGradleRIOVersionCache(context: vscode.ExtensionContext) {
	const storedLastUpdate = context.globalState.get("lastGradleRioVersionUpdateTime", 0) as number;
	const currentTime = Date.now();

	if (!(currentTime > storedLastUpdate + 86400000)) {
		return;
	}

	const latestVersions: { [key: string]: string } = await getLatestOnlineGradleRioVersions();
	context.globalState.update("grvCache", JSON.stringify(latestVersions));
}

async function getLatestOnlineGradleRioVersions(): Promise<{ [key: string]: string }> {
	const responseString = await getGradleRIOVersionXML();

	let resultObj = responseString.match(/<versions>(.*)<\/versions>/s);

	if (resultObj === null) {
		resultObj = ["", ""];
	}

	const allVersionsString = resultObj[0];

	const temp = allVersionsString.match(/<version>([A-Za-z0-9.\-]*)<\/version>/g);

	let allVersions: string[] = [];

	temp?.forEach((element: string) => {
		allVersions.push(element.replace("<version>", "").replace("</version>", ""));
	});

	let allVersionsLatest: { [key: string]: string } = {};

	allVersions.forEach((element) => {
		let tempYear = element.match(/[0-9]{4}/);
		let year = "0000";
		if (tempYear !== null) {
			year = tempYear[0];
		}

		if (allVersionsLatest[year] !== undefined) {
			if (semver.satisfies(element, `> ${allVersionsLatest[year]}`)) {
				allVersionsLatest[year] = element;
			}
		} else {
			allVersionsLatest[year] = element;
		}
	});

	return allVersionsLatest;
}

async function getGradleRIOVersionXML(): Promise<string> {
	var response: any;
	try {
		response = await axios.get("https://plugins.gradle.org/m2/edu/wpi/first/GradleRIO/maven-metadata.xml");
	} catch (error) {
		console.log(error);
		return "";
	}
	return response.data as string;
}
