import * as vscode from 'vscode';

import { doCompleteQueryAI } from '../services/openai.service';
import { buildQuestion, cleanResponse, showResponse } from '../services/util.service';
import CONF_DOCUMENTATION from '../data/documentation';

export const DOCUMENTATION_COMMAND = 'vs-openai.documentation';

export async function commandHandlerDocumentation(editor: vscode.TextEditor) {

    console.log('Start execution, commandHandlerDocumentation');

    const selectedText = editor?.document.getText(editor.selection);  
    
    if (!selectedText) {
        vscode.window.showErrorMessage('Select some part and try again');
        return;
    }

    const question = buildQuestion(selectedText, CONF_DOCUMENTATION);   
    const data = await doCompleteQueryAI(question);
    const result = cleanResponse(data, {spacesStart: 0, spacesEnd: 1});
    showResponse(editor, result.slice(0, -4), 'start');
}
