require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs' }});
		
let editor; // 定义全局变量
let editorReady = new Promise(resolve => {
    require(['vs/editor/editor.main'], async () => {

        addExtraLibToMonaco('./lib/typescriptlang.org.d.ts', 'THREE');

        // 添加智能提示 只需要有 d.ts 文件即可
        monaco.languages.typescript.javascriptDefaults.addExtraLib(
            'const test = "test";'
        );

        monaco.languages.typescript.javascriptDefaults.addExtraLib([
            'declare class SomeEventType {',
            '    /**',
            '     * Heres the doco for someProperty',
            '     */',
            '    someProperty: string',
            '}',
            ].join('\n')
        );



        editor = monaco.editor.create(editorDOM, {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript',
            theme: 'vs-dark'
        });
        resolve(); // editor初始化完成，resolve这个promise
    });
});
getEditorContent().then(content => console.log(content));
// 在其他地方获取editor的内容
async function getEditorContent() {
    await editorReady; // 等待editor初始化完成
    if (editor) {
        return editor.getValue();
    }
    return null;
}
async function addExtraLibToMonaco(path, moduleName) {
    const response = await fetch(path);
    const libContent = await response.text();
    let lib = `module ${moduleName} {${libContent}}`;
    monaco.languages.typescript.javascriptDefaults.addExtraLib(lib);
}