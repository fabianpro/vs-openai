/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { Configuration, OpenAIApi } from 'openai';

async function executeAI(key: string, text: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Window,
            cancellable: false,
            title: 'Loading response OpenAI Please wait ...'
        }, async (progress) => {
            
            progress.report({  increment: 0 });

            const configuration = new Configuration({ apiKey: key });
            const openai = new OpenAIApi(configuration);
        
            try {
                const completion = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: text,
                    temperature: 0,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: ["\"\"\""],
                });
        
                if (completion.status === 200) {              
                    resolve(completion.data);
                } else {
                    reject(completion);
                }                       
            } catch (e) {
                reject(e);                
            } finally {
                await Promise.resolve();
                progress.report({ increment: 100 });                    
            }       
        });
    });      
}

export async function doQueryAI(key: string, inputBox: string) {
    return new Promise((resolve, reject) => {
        executeAI(key, inputBox)
            .then((result) => {
                let finishReason: string = '';
                const str = result?.choices.map((item: any) => {
                    finishReason = item.finish_reason;
                    return item.text;
                });
                resolve({
                    finishReason: finishReason,
                    data: str
                });                
            })
            .catch(e => {
                vscode.window.showErrorMessage('something was wrong.');
                vscode.window.activeTerminal?.sendText(JSON.stringify(e), true);
                console.error(JSON.stringify(e));
                reject(e);
            });
    });    
}
