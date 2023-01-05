import * as vscode from 'vscode';

import { doCompleteQueryAI } from '../services/openai.service';
import { buildQuestion, cleanResponse, showResponse } from '../services/util.service';
import CONF_REFACTOR from '../data/refactor';

export const REFACTOR_COMMAND = 'vs-openai.refactor';

export async function commandHandlerRefactor(editor: vscode.TextEditor) {

    console.log('Start execution, commandHandlerRefactor');

    const selectedText = editor?.document.getText(editor.selection);  
    
    if (!selectedText) {
        vscode.window.showErrorMessage('Select some part and try again');
        return;
    }

    const question = buildQuestion(selectedText, CONF_REFACTOR);   
    const data = await doCompleteQueryAI(question);
    showResponse(editor, cleanResponse(data, {spacesStart: 2, spacesEnd: 0}), 'end');
}
