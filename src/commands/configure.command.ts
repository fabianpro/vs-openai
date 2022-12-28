import * as vscode from 'vscode';
import { store } from '../services/storage.service';

export const CONFIGURE_COMMAND = 'vs-openai.configure';

export async function commandHandlerConfigure(context: vscode.ExtensionContext) {

    console.log('Start execution, commandHandlerConfigure');

    const inputBox = await vscode.window.showInputBox({
        placeHolder: "Enter OPENAI_API_KEY",
        prompt: "Enter OPENAI_API_KEY"
    });

    if (!inputBox) {
        vscode.window.showErrorMessage('OPENAI_API_KEY is mandatory to use this extensión, please configure your account');
        vscode.env.openExternal(vscode.Uri.parse("https://beta.openai.com"));
        return;
    }    
    
    await store(context, `OPENAI_API_KEY`, inputBox);    
    vscode.window.showInformationMessage('Saved OPENAI_API_KEY');
}