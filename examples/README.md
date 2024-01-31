# Flow.js Examples
## 0. 页面代码
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../css/flow.css" type="text/css"/>
    <link rel="stylesheet" href="css/page.css" type="text/css"/>
</head>
<body>
    <!-- your code -->
</body>
</html>

```
## 1. Loader 加载 JSON 数据
- 从 JSON URL 异步加载数据:
    ```js
    import * as Flow from '../jsm/Flow.js';

    ( async () => {
        const loader = new Flow.Loader();
        const canvas = await loader.load( './json/test.json' );
        document.body.appendChild( canvas.dom );
        canvas.centralize();
    } )();
    ```
- 使用 Canvas 创建 JSON:
    ```js
    const json = canvas.toJSON();
    console.log( JSON.stringify( json ) );
    ```
- 直接加载 JSON
    ```js
    let loader = new Flow.Loader();
    let loadercanvas = loader.parse( json );
    dom.appendChild( loadercanvas.dom );
    ```

## 2. Inputs
### 1. Tips
```js
const dom = document.querySelector( 'flow' ); // 直接向 flow 中添加

const tip = new Flow.Tips();
tip.tip( 'Needed a Material. (1)', 'error' ); // 对应 tip 的底色变为红色
tip.tip( 'Message box!!! (4)' ); // 一般的提示信息
setTimeout( () => tip.tip( 'Message box!!! (5)' ), 1000 ); // 1s 后显示

dom.appendChild( tip.dom );
```
### 2. Search 搜索框（带有自动补全）
```js
const dom = document.querySelector( 'flow' ); // 直接向 flow 标签中添加

const search = new Flow.Search();
search.add( new Flow.ButtonInput( 'Node 333' ).setIcon( 'ti ti-box-multiple-2' ) );
search.forceAutoComplete = true;
search.onSubmit( () => {
    console.log( search.getValue() );
} );

dom.appendChild( search.dom );
```

## 3. 右键菜单
```js
// context-menu
const context = new Flow.ContextMenu( document.body );
context.setWidth( 300 );
// 向右键菜单中添加按钮 点击该按钮后会添加一个节点 并关闭该菜单
context.add( new Flow.ButtonInput( 'Float' ).setToolTip( 'Min / Max' ).setIcon( 'ti ti-box-multiple-1' ).onClick( () => {
    const node3 = new Flow.Node();
    node3.setWidth( 350 );
    node3.setPosition( canvas.relativeClientX - ( 350 / 2 ), canvas.relativeClientY - 20 );
    node3.add( new Flow.TitleElement( 'Dynamic' ).setStyle( 'green' ).setOutput( 1 ).setInput( 1 ).addButton( new Flow.ButtonInput( '✖' ).onClick( () => {
        canvas.remove( node3 );
    } ) ) );
    node3.add( new Flow.LabelElement( 'Numbers' ).add( new Flow.SliderInput( .5, 0, 1 ) ).setOutput( 1 ).setInput( 1 ) );

    canvas.add( node3 );
    canvas.select( node3 );
    
    context.hide();
} ) );


// 指定页面右键菜单
document.body.oncontextmenu = ( event ) => {
    event.preventDefault();
    context.open( event.clientX, event.clientY );
};
```
