import * as vscode from 'vscode';
import { doQueryAI } from '../services/openai.service';
import { retrieve } from '../services/storage.service';

export const IA_COMMAND = 'vs-openai.ai';

export async function commandHandlerAI(
    context: vscode.ExtensionContext,
    editor: vscode.TextEditor,
    edit: vscode.TextEditorEdit
) {

    console.log('Start execution, commandHandlerAI');

    const selectedText = editor?.document.getText(editor.selection);
    const inputBox = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: selectedText ? selectedText : "Enter your query",
        prompt: selectedText ? selectedText : "Enter your query"
    });

    if (!inputBox && !selectedText) {
        vscode.window.showErrorMessage('A search query is mandatory to execute this action, or you can write in file what do you want, select and try again');
        return;
    }

    const key = await retrieve(context, `OPENAI_API_KEY`);

    if (!key) {
        vscode.window.showErrorMessage('You don´t set correctly Api key');
        return;
    }

    let doRequestAgain: boolean = false;
    let query = inputBox;
    const responses: string[] = [];
    
    do {
        if (responses.length > 0) {
            query += responses[responses.length - 1];
        }

        const data: any = await doQueryAI(key, query!
            
            );        
        responses.push(data.data);              
        doRequestAgain = data.finishReason === 'length'; 
        editor.edit((editBuilder) => editBuilder.insert(editor.selection.active, data.data!.toString()));     
    } while(doRequestAgain);  
}
