'use strict';
import * as vscode from 'vscode';
import * as commands from "./commands";


export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "kotlin-for-frc" is now active!');

    let disposable = vscode.commands.registerCommand('extension.createCommand', (file_path: any) => {
        commands.createCommand(file_path);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.createCommandGroup', (file_path: any) => {
        commands.createCommandGroup(file_path);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.createSubsystem', (file_path: any) => {
        commands.createSubsystem(file_path);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.convertJavaProject', () => {
        commands.convertJavaProject();
    });
    
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}