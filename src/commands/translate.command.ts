import * as vscode from 'vscode';
import { doCompleteQueryAI } from '../services/openai.service';
import { cleanResponse, getConfiguration, showResponse } from '../services/util.service';

export const TRANSLATE_COMMAND = 'vs-openai.translate';

export async function commandHandlerTranslate(editor: vscode.TextEditor) {

    console.log('Start execution, commandHandlerTranslate');
    const lang = getConfiguration('lang');

    const inputBox = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder:  `Enter Language (default ${lang})`,
        prompt: `Enter Language (default ${lang})`
    });
    const selectedText = editor?.document.getText(editor.selection);

    if (!selectedText) {
        vscode.window.showErrorMessage('Query is mandatory to execute this command, or you could write, select text and try again');
        return;
    }

    const text = `// Translate to ${inputBox ? inputBox : lang}\n${selectedText}:`;
    
    const data = await doCompleteQueryAI(text!);
    showResponse(editor, cleanResponse(data, {spacesStart: 1, spacesEnd: 1}), 'end', false);
}
