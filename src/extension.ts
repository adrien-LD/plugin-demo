
import * as vscode from "vscode";
import provideHover from "./provideHover";
import provideDefinition from "./provideDefinition";
import openWebview from "./webview";
import aditActiveText from "./editActiveText";
import { exec } from "child_process";

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "plugin-demo" is now active!');

  let disposable = vscode.commands.registerCommand(
    "plugin-demo.helloWorld",
    () => {
      // vscode.window.showInformationMessage("我是info信息！");
      // vscode.window.showErrorMessage("我是错误信息！");
      // vscode.window
      //   .showInformationMessage(
      //     "是否要打开百度？",
      //     "是",
      //     "否",
      //     "不再提示"
      //   )
      //   .then((result) => {
      //     if (result === "是") {
      //       exec(`open 'https://www.baidu.com'`);
      //     } else if (result === "不再提示") {
      //       // 其它操作
      //     }
      //   });

				vscode.window.setStatusBarMessage('你好，前端艺术家！');

				// vscode.window.showInformationMessage("Hello World from plugin-demo!");

    }
  );

  context.subscriptions.push(disposable);

  const catCoding = vscode.commands.registerCommand(
    "plugin-demo.catCoding",
    () => {
      openWebview();
    }
  );
  context.subscriptions.push(catCoding);

  const hoverProvider = vscode.languages.registerHoverProvider("json", {
    provideHover,
  });
  context.subscriptions.push(hoverProvider);

  const jumpDefinition = vscode.languages.registerDefinitionProvider("json", {
    provideDefinition,
  });

  context.subscriptions.push(jumpDefinition);

  const editActiveText = vscode.commands.registerTextEditorCommand(
    "plugin-demo.editText",
    () => {
      aditActiveText();
    }
  );

  context.subscriptions.push(editActiveText);
}

// this method is called when your extension is deactivated
export function deactivate() {}
