// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { IA_COMMAND, commandHandlerAI } from './commands/ai.command';
import { EXPLAIN_COMMAND, commandHandlerExplain } from './commands/explain.command';
import { PROBLEM_COMMAND, commandHandlerProblem } from './commands/problem.command';
import { DOCUMENTATION_COMMAND, commandHandlerDocumentation } from './commands/documentation.command';
import { REFACTOR_COMMAND, commandHandlerRefactor } from './commands/refactor.command';
import { TEST_COMMAND, commandHandlerTest } from './commands/testing.command';
import { TRANSFORM_COMMAND, commandHandlerTransform } from './commands/transform.command';
import { TRANSLATE_COMMAND, commandHandlerTranslate } from './commands/translate.command';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Start execution, extension vs-openai');	
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(IA_COMMAND, (editor) => commandHandlerAI(editor)));	
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(EXPLAIN_COMMAND, (editor) => commandHandlerExplain(editor)));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(PROBLEM_COMMAND, (editor) => commandHandlerProblem(editor)));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(DOCUMENTATION_COMMAND, (editor) => commandHandlerDocumentation(editor)));	
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(REFACTOR_COMMAND, (editor) => commandHandlerRefactor(editor)));	
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(TEST_COMMAND, (editor) => commandHandlerTest(editor)));		
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(TRANSFORM_COMMAND, (editor) => commandHandlerTransform(editor)));		
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(TRANSLATE_COMMAND, (editor) => commandHandlerTranslate(editor)));		
}

// This method is called when your extension is deactivated
export function deactivate() { }
