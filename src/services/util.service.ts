import * as vscode from 'vscode';
import mapLanguages from '../data/languages';

interface Conf {
    lang: string;
    start: string;
    end: string;
}

export async function showResponse(editor: vscode.TextEditor, data: string, location: string, deductTypeFile: boolean = true) {
    const configuration = vscode.workspace.getConfiguration('vs-openai');
    const showResult: string = <string>configuration.get("showResult");

    const el = vscode.window.activeTextEditor?.document.fileName;   
    const ext = el!.split('.').pop()!;     
    const language = el && deductTypeFile ? mapLanguages.get(ext) : 'plaintext';

    if (showResult !== 'inline') {
        const doc = await vscode.workspace.openTextDocument({ language: language, content: data });
        await vscode.window.showTextDocument(doc, { preview: true });    
        if (showResult === 'side') {
            await vscode.commands.executeCommand("workbench.action.moveEditorToNextGroup");        
        }
    } else {
        const position: vscode.Position = location === 'start' ? editor.selection.start : 
            location === 'end' ? editor.selection.end : editor.selection.active;
        editor.edit((editBuilder) => editBuilder.insert(position, data));
    }         
}

export function buildQuestion(text: string, conf: Conf[]) {
    const configuration = vscode.workspace.getConfiguration('vs-openai');
    const lang: string = <string>configuration.get('lang');
    const confLang = conf.find(item => item.lang === lang);
    return `${confLang?.start}\n${text}\n${confLang?.end}`;
}

export function cleanResponse(data: string, {spacesStart, spacesEnd}: {spacesStart: number, spacesEnd: number}): string {
    data = data.replace(/&gt;/g, '>').replace(/<\/code>/g, '');
    const start = "\n".repeat(spacesStart);
    const end = "\n".repeat(spacesEnd);
    return `${start}${data}${end}`;    
}

export function getConfiguration(value: string) {
    const configuration = vscode.workspace.getConfiguration('vs-openai');
    const conf = configuration.get(value);
    return conf;
}
