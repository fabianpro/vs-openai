import * as vscode from 'vscode';

import { doCompleteQueryAI } from '../services/openai.service';
import { buildQuestion, cleanResponse, showResponse } from '../services/util.service';
import CONF_EXPLAIN from '../data/explain';

export const EXPLAIN_COMMAND = 'vs-openai.explain';

export async function commandHandlerExplain(editor: vscode.TextEditor) {

    console.log('Start execution, commandHandlerExplain');

    const selectedText = editor?.document.getText(editor.selection);  
    
    if (!selectedText) {
        vscode.window.showErrorMessage('Select some part and try again');
        return;
    }

    const question = buildQuestion(selectedText, CONF_EXPLAIN);   
    const data = await doCompleteQueryAI(question);
    showResponse(editor, cleanResponse(data, {spacesStart: 1, spacesEnd: 0}), 'end');
}
