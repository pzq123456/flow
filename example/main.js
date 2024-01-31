import * as Flow from '../jsm/Flow.js';
import { BaseNodeEditor } from './BaseNodeEditor.js';

const node = new BaseNodeEditor( 'code editor' );
node.setWidth( 500 );
node.setPosition( 10, 10 );
let editor ;
node.add( editor = new Flow.CodeEditorElement() );		
node.setResizable( true );	

const canvas = new Flow.Canvas();
canvas.setSize( window.innerWidth, window.innerHeight );
canvas.add( node );


const node2 = new Flow.Node(); // 创建一个节点
node2.setWidth( 500 );
node2.setPosition( 100, 100 );
const button = new Flow.ButtonInput( 'Button' );
button.onClick( () => {
    // console.log(canvas.clear());
    console.log(canvas.getLinks());
} );

node2.add( new Flow.TitleElement( '' ).setColor( 'purple' ).setOutput( 1 ).setOutputColor( 'fuchsia' ).setInput( 1 ).setInputColor( 'fuchsia' ).add(button));
canvas.add( node2 );

 // 移除canvas的dom元素

window.onresize = () => canvas.setSize( window.innerWidth, window.innerHeight ); // 每当浏览器窗口的大小改变时，canvas的大小也会相应地改变。

const dom = document.querySelector( 'flow' );

dom.appendChild( canvas.dom );