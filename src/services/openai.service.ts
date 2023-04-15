/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { Configuration, OpenAIApi } from 'openai';

async function executeAI(text: string): Promise<any> {
    const configuration = vscode.workspace.getConfiguration('vs-openai');
    const apiKey: string = <string>configuration.get('apiKey');
    const model: string = <string>configuration.get("model");
    const temperature: number = <number>configuration.get("temperature");
    const maxTokens: number = <number>configuration.get("maxTokens");
    const topP: number = <number>configuration.get("topP");
    const frequencyPenalty: number = <number>configuration.get("frequencyPenalty");
    const presencePenalty: number = <number>configuration.get("presencePenalty");

    return new Promise<any>(async (resolve, reject) => {
        vscode.window.showInformationMessage('Loading...');        

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Window,
            cancellable: false,
            title: 'Loading OpenAI...'
        }, async (progress) => {

            progress.report({ increment: 0 });

            const confAI = new Configuration({ apiKey: apiKey });
            const openai = new OpenAIApi(confAI);

            try {
                const completion = await openai.createCompletion({
                    model: model,
                    prompt: text,
                    temperature: temperature,
                    max_tokens: maxTokens,
                    top_p: topP,
                    frequency_penalty: frequencyPenalty,
                    presence_penalty: presencePenalty,
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

function createQuery(inputBox: string) {
    return new Promise((resolve, reject) => {
        executeAI(inputBox)
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
                if (e.response.status === 429) {
                    vscode.window.showErrorMessage('Rate limit reached for requests.');
                } else {
                    vscode.window.showErrorMessage('Something was wrong, please be more specific.');
                }
                //vscode.window.activeTerminal?.sendText(JSON.stringify(e), true);
                console.error(JSON.stringify(e));
                reject(e);
            });
    });
}


export function doCompleteQueryAI(inputBox: string) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            let doRequestAgain: boolean = false;
            let query = inputBox;
            const responses: string[] = [];

            do {
                if (responses.length > 0) {
                    query += responses[responses.length - 1];
                }

                const data: any = await createQuery(query!);
                responses.push(data.data);
                doRequestAgain = data.finishReason === 'length';
            } while (doRequestAgain);

            resolve(responses.join(''));
        } catch (e) {
            reject(e);
        }
    });
}
