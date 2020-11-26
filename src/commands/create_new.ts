"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/file_generator";
import * as templateinterpreter from "../templates/template_interpreter";
import * as kotlinExt from "../extension";
import { templateType } from "../templates/template_interpreter";
import { createCommandBased } from "./create_command_based";
import { oldCommandBased } from "./create_old_command_based";

export function parseAndSaveTemplateToDocument(filePath: any, packageName: string, templateType: templateType) {
	console.log(filePath);
	vscode.window.showInputBox({
		placeHolder: "Name your " + templateType.toString()
	}).then((value) => {
		if (!value) { return; }
		var userData = value;
		var workspaceFolderPath = kotlinExt.getWorkspaceFolderFsPath();
		var pathToPass = filePath.fsPath.replace(workspaceFolderPath, "");
		templateinterpreter.parseTemplate(userData, packageName, templateType).then((value: string) => { filegenerator.showDocumentInViewer(filegenerator.createFileWithContent(pathToPass + "/" + userData + ".kt", value)); });
	});
}

export function createNew(filePath: any) {
	vscode.window.showQuickPick(["New Command Based Classes", "Old Command Based Classes", "Empty Class"]).then((option: any) => {
		switch(option) {
			case "New Command Based Classes":
				createCommandBased(filePath);
				break;
			case "Old Command Based Classes":
				oldCommandBased(filePath);
				break;
			case "Empty Class":
				createEmptyClass(filePath);
				break;
			default:
				return;
		}
	});
}

function createEmptyClass(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.emptyClass);
}
