import Menu 	from "./lib/sage/Menu.js";
import Sage		from "./lib/sage/Sage.js";
import NodeBox	from "./lib/NodeBox.js";
import EMan		from "./lib/EditorManager.js";

import GLCanvas	from "./lib/fungiMini/GLCanvas.js";
import Quad		from "./lib/fungiMini/Quad.js";
import Shader	from "./lib/fungiMini/Shader.js";

import { FinalNode, UVNode } from "./lib/nodes/Data.js";
import { Noise2DNode } from "./lib/nodes/Noise.js";
import { FloatNode, Vec4Node } from "./lib/nodes/Vars.js";
import { MultiplyNode, SmoothStepNode } from "./lib/nodes/Math.js";

var nUV, nMulti;
var nNoise, nFloat, nVec4, nFinal, nGlobal,nMultiNode,nSmoothStep;
var gl,shader,quad;

export default class App {
	constructor(){
		this.init();
	}
	start(){
		nFinal = new FinalNode(1,700,50);
		nFloat = new FloatNode(2,40,100,"1.0").setVar("SomeVar");
		nVec4 = new Vec4Node(4,500,300);
		nUV = new UVNode(4,50,200);
		nNoise = new Noise2DNode(5,400,30);
		nMulti = new MultiplyNode(6,200,30,"40.1");
		nSmoothStep = new SmoothStepNode(7,300,200);

		nUV.connectTo( "V2", "A", nMulti );
		nMulti.connectTo( "O", "XY", nNoise );
		nNoise.connectTo( "O", "T", nSmoothStep );
		nSmoothStep.connectTo( "O", "Y", nVec4 );
		nVec4.connectTo( "V", "VEC", nFinal );

		//nFloat.connectTo("F","R",nFinal);
		//nFloat.connectTo("F","G",nFinal);
		//nFloat.connectTo("F","B",nFinal);
		////nFloat.connectTo("F","A",nFinal);
		//nVec4.connectTo("V","VEC",nFinal);
		
		setTimeout( function(){				
			let frag = EMan.processNodes( nFinal );
			EMan.preview.run( frag );
			nFinal.runPreview();
		}, 50 );
		
		window.addEventListener("keyup",function(e){
			if(e.keyCode == 32){
				var frag = EMan.processNodes(nFinal);
				EMan.preview.run(frag);

				nFinal.copyCanvas( EMan.preview.gl.canvas );
			}
		});
	}

	onLoad(){
		EMan.init();
	}

	init(){
		Menu.addItem("Float", FloatNode);
		Menu.addItem("Multiple", MultiplyNode);
		Menu.addItem("Noise2D", Noise2DNode);
		Menu.addItem("SmoothStep", SmoothStepNode);
		Menu.addItem("UVNode", UVNode);
		Menu.addItem("Vec4", Vec4Node);

		Menu.setup();
	}
}