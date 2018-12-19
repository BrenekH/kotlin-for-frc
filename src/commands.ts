'use strict';
import * as vscode from "vscode";
import * as filegenerator from "./file_generator";
import * as templateinterpreter from "./template_interpreter";
import * as rimraf from "rimraf";
import * as fs from "fs";

export function createCommand(file_path: any) {
    console.log(file_path);
        vscode.window.showInputBox({
            placeHolder: "Name your command"
        }).then(value => {
            if (!value) { return; }
            var user_data = value;
            if (typeof vscode.workspace.workspaceFolders === 'undefined') {
                return;
            }
            var workspace_folder_path = vscode.workspace.workspaceFolders[0].uri.fsPath;
            var path_to_pass = file_path.fsPath.replace(workspace_folder_path, "");
            filegenerator.showDocumentInViewer(filegenerator.createFileWithContent(path_to_pass + "/" + user_data + ".kt", templateinterpreter.parseTemplate(user_data, templateinterpreter.templateType.command)));
        });
}