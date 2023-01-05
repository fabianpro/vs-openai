import * as vscode from 'vscode';

import { doCompleteQueryAI } from '../services/openai.service';
import { buildQuestion, cleanResponse, showResponse } from '../services/util.service';
import CONF_PROBLEMS from '../data/problem';

export const PROBLEM_COMMAND = 'vs-openai.problem';

export async function commandHandlerProblem(editor: vscode.TextEditor) {

    console.log('Start execution, commandHandlerProblem');
    
    const selectedText = editor?.document.getText(editor.selection);  
    
    if (!selectedText) {
        vscode.window.showErrorMessage('Select some part and try again');
        return;
    }

    const question = buildQuestion(selectedText, CONF_PROBLEMS);   
    const data = await doCompleteQueryAI(question);
    showResponse(editor, cleanResponse(data, {spacesStart: 0, spacesEnd: 1}), 'start');
}
