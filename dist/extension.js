/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const provideHover_1 = __webpack_require__(2);
const provideDefinition_1 = __webpack_require__(6);
const webview_1 = __webpack_require__(10);
const editActiveText_1 = __webpack_require__(11);
function activate(context) {
    console.log('Congratulations, your extension "plugin-demo" is now active!');
    let disposable = vscode.commands.registerCommand("plugin-demo.helloWorld", () => {
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
    });
    context.subscriptions.push(disposable);
    const catCoding = vscode.commands.registerCommand("plugin-demo.catCoding", () => {
        webview_1.default();
    });
    context.subscriptions.push(catCoding);
    const hoverProvider = vscode.languages.registerHoverProvider("json", {
        provideHover: provideHover_1.default,
    });
    context.subscriptions.push(hoverProvider);
    const jumpDefinition = vscode.languages.registerDefinitionProvider("json", {
        provideDefinition: provideDefinition_1.default,
    });
    context.subscriptions.push(jumpDefinition);
    const editActiveText = vscode.commands.registerTextEditorCommand("plugin-demo.editText", () => {
        editActiveText_1.default();
    });
    context.subscriptions.push(editActiveText);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
const path = __webpack_require__(3);
const fs = __webpack_require__(4);
/**
 * 鼠标悬停提示，当鼠标停在package.json的dependencies或者devDependencies时，
 * 自动显示对应包的名称、版本号和许可协议
 * @param {*} document
 * @param {*} position
 * @param {*} token
 */
function provideHover(document, position, token) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    if (/\/package\.json$/.test(fileName)) {
        console.log('进入provideHover方法');
        const json = document.getText();
        console.log('json', json);
        if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
            let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
            console.log('destPath', destPath);
            console.log('fs.existsSync(destPath', fs.existsSync(destPath));
            if (true) {
                const content = __webpack_require__(5)(destPath);
                console.log('content', content);
                console.log('hover已生效');
                // hover内容支持markdown语法
                return new vscode.Hover(`* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`);
            }
        }
    }
}
exports.default = provideHover;


/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),
/* 5 */
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 5;
module.exports = webpackEmptyContext;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
const path = __webpack_require__(3);
const fs = __webpack_require__(4);
const util = __webpack_require__(7);
function provideDefinition(document, position, token) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);
    const projectPath = util.getProjectPath(document);
    console.log('====== 进入 provideDefinition 方法 ======');
    console.log('fileName: ' + fileName); // 当前文件完整路径
    console.log('workDir: ' + workDir); // 当前文件所在目录
    console.log('word: ' + word); // 当前光标所在单词
    console.log('line: ' + line.text); // 当前光标所在行
    console.log('projectPath: ' + projectPath); // 当前工程目录
    // 只处理package.json文件
    if (/\/package\.json$/.test(fileName)) {
        console.log(word, line.text);
        const json = document.getText();
        if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
            let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
            if (fs.existsSync(destPath)) {
                // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
                return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
            }
        }
    }
}
exports.default = provideDefinition;


/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(4);
const os = __webpack_require__(8);
const path = __webpack_require__(3);
const vscode = __webpack_require__(1);
const exec = __webpack_require__(9).exec;

const util = {
    /**
     * 获取当前所在工程根目录，有3种使用方法：<br>
     * getProjectPath(uri) uri 表示工程内某个文件的路径<br>
     * getProjectPath(document) document 表示当前被打开的文件document对象<br>
     * getProjectPath() 会自动从 activeTextEditor 拿document对象，如果没有拿到则报错
     * @param {*} document 
     */
    getProjectPath(document) {
        if (!document) {
            document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : null;
        }
        if (!document) {
            this.showError('当前激活的编辑器不是文件或者没有文件被打开！');
            return '';
        }
        const currentFile = (document.uri ? document.uri : document).fsPath;
        let projectPath = null;

        let workspaceFolders = vscode.workspace.workspaceFolders.map(item => item.uri.path);
        // 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断
        // 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
        if (workspaceFolders.length == 1 && workspaceFolders[0] === vscode.workspace.rootPath) {
            const rootPath = workspaceFolders[0];
            var files = fs.readdirSync(rootPath);
            workspaceFolders = files.filter(name => !/^\./g.test(name)).map(name => path.resolve(rootPath, name));
            // vscode.workspace.rootPath会不准确，且已过时
            // return vscode.workspace.rootPath + '/' + this._getProjectName(vscode, document);
        }
        workspaceFolders.forEach(folder => {
            if (currentFile.indexOf(folder) === 0) {
                projectPath = folder;
            }
        });
        if (!projectPath) {
            this.showError('获取工程根路径异常！');
            return '';
        }
        return projectPath;
    },
    /**
     * 获取当前工程名
     */
    getProjectName: function(projectPath) {
        return path.basename(projectPath);
    },
    getPluginPath() {

    },
    /**
     * 将一个单词首字母大写并返回
     * @param {*} word 某个字符串
     */
    upperFirstLetter: function(word) {
        return (word || '').replace(/^\w/, m => m.toUpperCase());
    },
    /**
     * 将一个单词首字母转小写并返回
     * @param {*} word 某个字符串
     */
    lowerFirstLeter: function(word) {
        return (word || '').replace(/^\w/, m => m.toLowerCase());
    },
    /**
     * 全局日志开关，发布时可以注释掉日志输出
     */
    log: function(...args) {
        console.log(...args);
    },
    /**
     * 全局日志开关，发布时可以注释掉日志输出
     */
    error: function(...args) {
        console.error(...args);
    },
    /**
     * 弹出错误信息
     */
    showError: function(info) {
        vscode.window.showErrorMessage(info);
    },
    /**
     * 弹出提示信息
     */
    showInfo: function(info) {
        vscode.window.showInformationMessage(info);
    },
    findStrInFolder: function(folderPath, str) {

    },
    /**
     * 从某个文件里面查找某个字符串，返回第一个匹配处的行与列，未找到返回第一行第一列
     * @param filePath 要查找的文件
     * @param reg 正则对象，最好不要带g，也可以是字符串
     */
    findStrInFile: function(filePath, reg) {
        const content = fs.readFileSync(filePath, 'utf-8');
        reg = typeof reg === 'string' ? new RegExp(reg, 'm') : reg;
        // 没找到直接返回
        if (content.search(reg) < 0) {return {row: 0, col: 0};}
        const rows = content.split(os.EOL);
        // 分行查找只为了拿到行
        for(let i = 0; i < rows.length; i++) {
            let col = rows[i].search(reg);
            if(col >= 0) {
                return {row: i, col};
            }
        }
        return {row: 0, col: 0};
    },
    /**
     * 获取某个字符串在文件里第一次出现位置的范围，
     */
    getStrRangeInFile: function(filePath, str) {
        var pos = this.findStrInFile(filePath, str);
        return new vscode.Range(new vscode.Position(pos.row, pos.col), new vscode.Position(pos.row, pos.col + str.length));
    },
    /**
     * 简单的检测版本大小
     */
    checkVersion: function(version1, version2) {
        version1 = parseInt(version1.replace(/\./g, ''));
        version2 = parseInt(version2.replace(/\./g, ''));
        return version1 > version2;
    },
    /**
     * 获取某个扩展文件绝对路径
     * @param context 上下文
     * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
     */
    getExtensionFileAbsolutePath: function(context, relativePath) {
        return path.join(context.extensionPath, relativePath);
    },
    /**
     * 获取某个扩展文件相对于webview需要的一种特殊路径格式
     * 形如：vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
     * @param context 上下文
     * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
     */
    getExtensionFileVscodeResource: function(context, relativePath) {
        const diskPath = vscode.Uri.file(path.join(context.extensionPath, relativePath));
        return diskPath.with({ scheme: 'vscode-resource' }).toString();
    },
    /**
     * 在Finder中打开某个文件或者路径
     */
    openFileInFinder: function(filePath) {
        if (!fs.existsSync(filePath)) {
            this.showError('文件不存在：' + filePath);
        }
        // 如果是目录，直接打开就好
        if (fs.statSync(filePath).isDirectory()) {
            exec(`open ${filePath}`);
        } else {
            // 如果是文件，要分开处理
            const fileName = path.basename(filePath);
            filePath = path.dirname(filePath);
            // 这里有待完善，还不知道如何finder中如何选中文件
            exec(`open ${filePath}`);
        }
    },
    /**
     * 在vscode中打开某个文件
     * @param {*} path 文件绝对路径
     * @param {*} text 可选，如果不为空，则选中第一处匹配的对应文字
     */
    openFileInVscode: function(path, text) {
        let options = undefined;
        if (text) {
            const selection = this.getStrRangeInFile(path, text);
            options = { selection };
        }
        vscode.window.showTextDocument(vscode.Uri.file(path), options);
    },
    /**
     * 用JD-GUI打开jar包
     */
    openJarByJdGui: function(jarPath) {
        // 如何选中文件有待完善
        const jdGuiPath = vscode.workspace.getConfiguration().get('eggHelper.jdGuiPath');
        if (!jdGuiPath) {
            this.showError('JD-GUI路径不能为空！');
            return;
        }
        if (!fs.existsSync(jdGuiPath)) {
            this.showError('您还没有安装JD-GUI，请安装完后到vscode设置里面找到HSF助手并进行路径配置。');
            return;
        }
        if (!fs.existsSync(jarPath)) {
            this.showError('jar包未找到：' + jarPath);
            return;
        }
        exec(`open ${jarPath} -a ${jdGuiPath}`);
    },
    /**
     * 使用默认浏览器中打开某个URL
     */
    openUrlInBrowser: function(url) {
        exec(`open '${url}'`);
    },
    /**
     * 递归遍历清空某个资源的require缓存
     * @param {*} absolutePath
     */
    clearRequireCache(absolutePath) {
        const root = __webpack_require__.c[absolutePath];
        if (!root) {return;}
        if (root.children) {
            // 如果有子依赖项，先清空依赖项的缓存
            root.children.forEach(item => {
                this.clearRequireCache(item.id);
            });
        }
        delete __webpack_require__.c[absolutePath];
    },
    /**
     * 动态require，和普通require不同的是，加载之前会先尝试删除缓存
     * @param {*} modulePath 
     */
    dynamicRequire(modulePath) {
        this.clearRequireCache(modulePath);
        return __webpack_require__(5)(modulePath);
    },
    /**
     * 读取properties文件
     * @param {*} filePath 
     */
    readProperties(filePath) {
        const content =  fs.readFileSync(filePath, 'utf-8');
        let rows = content.split(os.EOL);
        rows = rows.filter(row => row && row.trim() && !/^#/.test(row));
        const result = {};
        rows.forEach(row => {
            let temp = row.split('=');
            result[temp[0].trim()] = temp[1].trim();
        });
        return result;
    },
    /**
     * 比较2个对象转JSON字符串后是否完全一样
     * 特别注意，由于JS遍历对象的无序性（部分浏览器是按照添加顺序遍历的）导致同样的对象，
     * 转成JSON串之后反而不一样，所以这里采用其它方式实现。
     * @param {*} obj1 
     * @param {*} obj2 
     */
    jsonEquals(obj1, obj2) {
        let s1 = this.formatToSpecialJSON(obj1, '', true);
        let s2 = this.formatToSpecialJSON(obj2, '', true);
        return s1 === s2;
    }
};

module.exports = util;

/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = require("child_process");;

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};
function getWebviewContent(cat) {
    return `
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
function openWebview() {
    const panel = vscode.window.createWebviewPanel("catCoding", // 只供内部使用，这个webview的标识
    "Cat Coding", // 给用户显示的面板标题
    vscode.ViewColumn.One, // 给新的webview面板一个编辑器视图
    {});
    let iteration = 0;
    const updateWebview = () => {
        const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
    };
    // 设置初始化内容
    updateWebview();
    // 每秒更新内容
    setInterval(updateWebview, 3000);
}
exports.default = openWebview;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
function editActiveText() {
    var _a;
    (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.edit(editBuilder => {
        var _a, _b;
        // 从开始到结束，全量替换
        const end = new vscode.Position((((_b = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.lineCount) || 0) + 1, 0);
        const text = '新替换的内容';
        editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
    });
}
exports.default = editActiveText;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map