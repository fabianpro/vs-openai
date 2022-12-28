import * as vscode from 'vscode';

const KEY_BASE = 'VS-GPT3';

export async function store(context: vscode.ExtensionContext, key: string, value: any) {
    await context.secrets.store(`${KEY_BASE}.${key}`, JSON.stringify(value));
}

export async function retrieve(context: vscode.ExtensionContext, key: string) {
    return await context.secrets.get(`${KEY_BASE}.${key}`);    
}