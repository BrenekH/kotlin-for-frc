'use strict';
import * as vscode from 'vscode';
import * as semver from 'semver';

export var isVscodeFsAvailable = semver.satisfies(vscode.version, ">=1.37.0");

export function mkdir(uri: string) {
	vscode.workspace.fs.createDirectory(vscode.Uri.file(uri));
}
