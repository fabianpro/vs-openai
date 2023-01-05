import * as vscode from 'vscode';
import { doCompleteQueryAI } from '../services/openai.service';
import { showResponse } from '../services/util.service';

export const IA_COMMAND = 'vs-openai.ai';

export async function commandHandlerAI(editor: vscode.TextEditor) {

    console.log('Start execution, commandHandlerAI');

    let text = '';
    const selectedText = editor?.document.getText(editor.selection);

    if (!selectedText) {
        const inputBox = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: "Enter your query",
            prompt: "Enter your query"
        });
        text = <string>inputBox;
    } else {
        text = selectedText;
    }

    if (!text) {
        vscode.window.showErrorMessage('Query is mandatory to execute this action, or you can write and select in file what do you want, select and try again');
        return;
    }
    
    const data = await doCompleteQueryAI(text!);
    showResponse(editor, transformResponse(data), 'end');
}

function transformResponse(data: string) {   
    return `\n${data}\n`;     
}
