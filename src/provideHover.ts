import * as  vscode from  'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * 鼠标悬停提示，当鼠标停在package.json的dependencies或者devDependencies时，
 * 自动显示对应包的名称、版本号和许可协议
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
export default function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
	const fileName	= document.fileName;
	const workDir	 = path.dirname(fileName);
	const word		= document.getText(document.getWordRangeAtPosition(position));

	if (/\/package\.json$/.test(fileName)) {
		console.log('进入provideHover方法');
		const json = document.getText();
    console.log('json', json);
		if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
			let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
      console.log('destPath', destPath);
      console.log('fs.existsSync(destPath', fs.existsSync(destPath));
			if (true) {
				const content = require(destPath);
        console.log('content', content);
				console.log('hover已生效');
				// hover内容支持markdown语法
				return new vscode.Hover(`* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`);
			}
		}
	}
}