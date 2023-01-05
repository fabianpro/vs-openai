import * as vscode from 'vscode';

import { doCompleteQueryAI } from '../services/openai.service';
import { buildQuestion, cleanResponse, showResponse } from '../services/util.service';
import CONF_TEST from '../data/testsuite';

export const TEST_COMMAND = 'vs-openai.test';

export async function commandHandlerTest(editor: vscode.TextEditor) {

    console.log('Start execution, commandHandlerTest');

    const selectedText = editor?.document.getText(editor.selection);  
    
    if (!selectedText) {
        vscode.window.showErrorMessage('Select some part and try again');
        return;
    }

    const question = buildQuestion(selectedText, CONF_TEST);   
    const data = await doCompleteQueryAI(question);
    showResponse(editor, cleanResponse(data, {spacesStart: 1, spacesEnd: 0}), 'end');
}
