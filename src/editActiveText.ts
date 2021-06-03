import * as vscode from 'vscode';

export default function  editActiveText() {
  vscode.window.activeTextEditor?.edit(editBuilder => {
    // 从开始到结束，全量替换
    const end = new vscode.Position((vscode.window.activeTextEditor?.document?.lineCount || 0) + 1, 0);
    const text = '新替换的内容';
    editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
  });
}