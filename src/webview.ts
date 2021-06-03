import * as vscode from "vscode";

type Cats = {
  [x in 'Coding Cat' | 'Compiling Cat']: string;
};

const cats: Cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

function getWebviewContent(cat: keyof Cats) {
  return`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
        </head>
        <body>
        <img src="${cats[cat]}" width="300" />
        </body>
        </html>
    `;
}

export default function openWebview() {
  const panel = vscode.window.createWebviewPanel(
    "catCoding", // 只供内部使用，这个webview的标识
    "Cat Coding", // 给用户显示的面板标题
    vscode.ViewColumn.One, // 给新的webview面板一个编辑器视图
    {}
  );
  let iteration = 0;
  const updateWebview = () => {
    const cat: 'Coding Cat' | 'Compiling Cat' = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
    panel.title = cat;
    panel.webview.html = getWebviewContent(cat);
  };

  // 设置初始化内容
  updateWebview();

  // 每秒更新内容
  setInterval(updateWebview, 3000);
}