// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CONFIGURE_COMMAND, commandHandlerConfigure } from './commands/configure.command';
import { IA_COMMAND, commandHandlerAI } from './commands/ai.command';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Start execution, extension vs-openai');	
	context.subscriptions.push(vscode.commands.registerCommand(CONFIGURE_COMMAND, () => commandHandlerConfigure(context)));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(IA_COMMAND, (editor, edit) => commandHandlerAI(context, editor, edit)));	
}

// This method is called when your extension is deactivated
export function deactivate() { }
