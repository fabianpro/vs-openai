import * as vscode from 'vscode';
import { doCompleteQueryAI } from '../services/openai.service';
import { cleanResponse, showResponse } from '../services/util.service';

export const TRANSFORM_COMMAND = 'vs-openai.transform';

export async function commandHandlerTransform(editor: vscode.TextEditor) {

    console.log('Start execution, commandHandlerTransform');

    const inputBox = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder:  "Enter Language",
        prompt: "Enter Language"
    });
    const selectedText = editor?.document.getText(editor.selection);

    if (!selectedText) {
        vscode.window.showErrorMessage('Query is mandatory to execute this action, or you can write and select in file what do you want, select and try again');
        return;
    }

    const text = `// Convert to ${inputBox}\n${selectedText}`;
    
    const data = await doCompleteQueryAI(text!);
    showResponse(editor, cleanResponse(data, {spacesStart: 1, spacesEnd: 1}), 'end', false);
}
