AUI.add("aui-tree-data",function(o){var i=o.Lang,n=i.isArray,l=i.isBoolean,m=i.isObject,c=i.isUndefined,z="boundingBox",g="children",p="container",r=".",j="id",x="index",u="lazyLoad",e="leaf",w="nextSibling",C="node",d="ownerTree",h="parentNode",t="prevSibling",q="previousSibling",v="tree",s="tree-node",b="tree-data",k=function(A){return(o.instanceOf(A,o.TreeNode));},f=function(A){return(o.instanceOf(A,o.TreeView));},y=o.getClassName,a=y(v,C);var B=function(){};B.ATTRS={container:{setter:o.one},children:{value:[],validator:n,setter:"_setChildren"},index:{value:{}}};o.mix(B.prototype,{childrenLength:0,initializer:function(){var A=this;A.publish("move");A.publish("append",{defaultFn:A._appendChild});A.publish("remove",{defaultFn:A._removeChild});},destructor:function(){var A=this;A.eachChildren(function(D){D.destroy();},true);},getNodeById:function(D){var A=this;return A.get(x)[D];},isRegistered:function(D){var A=this;return !!(A.get(x)[D.get(j)]);},updateReferences:function(F,G,J){var K=this;var I=F.get(h);var A=F.get(d);var H=I&&(I!==G);if(I){if(H){var D=I.get(g);o.Array.removeItem(D,F);I.set(g,D);}I.unregisterNode(F);}if(A){A.unregisterNode(F);}F.set(h,G);F.set(d,J);if(G){G.registerNode(F);}if(J){J.registerNode(F);}if(A!=J){F.eachChildren(function(L){K.updateReferences(L,L.get(h),J);});}if(H){var E=K.getEventOutputMap(F);if(!I.get("children").length){I.collapse();I.hideHitArea();}E.tree.oldParent=I;E.tree.oldOwnerTree=A;K.bubbleEvent("move",E);}},refreshIndex:function(){var A=this;A.updateIndex({});A.eachChildren(function(D){A.registerNode(D);},true);},registerNode:function(F){var A=this;var E=F.get(j);var D=A.get(x);if(E){D[E]=F;}if(f(A)){F.addTarget(A);F.set(d,A);}F._inheritOwnerTreeAttrs();A.updateIndex(D);},updateIndex:function(D){var A=this;if(D){A.set(x,D);}},unregisterNode:function(E){var A=this;var D=A.get(x);delete D[E.get(j)];if(f(A)){E.removeTarget(A);}A.updateIndex(D);},collapseAll:function(){var A=this;A.eachChildren(function(D){D.collapse();},true);},expandAll:function(){var A=this;A.eachChildren(function(D){D.expand();},true);},selectAll:function(){var A=this;A.eachChildren(function(D){D.select();},true);},unselectAll:function(){var A=this;A.eachChildren(function(D){D.unselect();},true);},eachChildren:function(F,D){var A=this;var E=A.getChildren(D);o.Array.each(E,function(G){if(G){F.apply(A,arguments);}});},eachParent:function(E){var D=this;var A=D.get(h);while(A){if(A){E.call(D,A);}A=A.get(h);}},bubbleEvent:function(G,F,H,E){var D=this;D.fire(G,F);if(!H){var A=D.get(h);F=F||{};if(c(E)){E=true;}F.stopActionPropagation=E;while(A){A.fire(G,F);A=A.get(h);}}},createNode:function(D){var A=this;var E=o.TreeNode.nodeTypes[m(D)?D.type:D]||o.TreeNode;return new E(m(D)?D:{});},appendChild:function(F,E){var A=this;var D=A.getEventOutputMap(F);A.bubbleEvent("append",D,E);},_appendChild:function(J){if(J.stopActionPropagation){return false;}var A=this;var I=J.tree.node;var D=A.get(d);var G=A.get(g);A.updateReferences(I,A,D);var H=G.push(I);A.set(g,G);var F=H-2;var E=A.item(F);I._nextSibling=null;I._prevSibling=E;I.render(A.get(p));},item:function(D){var A=this;return A.get(g)[D];},indexOf:function(D){var A=this;return o.Array.indexOf(A.get(g),D);},hasChildNodes:function(){var A=this;return(A.getChildrenLength()>0);},getChildren:function(D){var A=this;var F=[];var E=A.get(g);F=F.concat(E);if(D){A.eachChildren(function(G){F=F.concat(G.getChildren(D));});}return F;},getChildrenLength:function(){var A=this;return(A.childrenLength||A.get(g).length);},getEventOutputMap:function(D){var A=this;return{tree:{instance:A,node:D||A}};},removeChild:function(E){var A=this;var D=A.getEventOutputMap(E);A.bubbleEvent("remove",D);},_removeChild:function(G){if(G.stopActionPropagation){return false;}var A=this;var F=G.tree.node;var D=A.get(d);if(A.isRegistered(F)){F.set(h,null);A.unregisterNode(F);F.set(d,null);if(D){D.unregisterNode(F);}F.get(z).remove();var E=A.get(g);o.Array.removeItem(E,F);A.set(g,E);}},empty:function(){var A=this;A.eachChildren(function(E){var D=E.get(h);if(D){D.removeChild(E);}});},insert:function(J,G,H){var N=this;G=G||this;if(G===J){return false;}var A=G.get(h);if(J&&A){var I=J.get(z);var O=G.get(z);var M=G.get(d);if(H==="before"){O.placeBefore(I);}else{if(H==="after"){O.placeAfter(I);}}var D=[];var L=A.get(z).all("> ul > li");L.each(function(P){D.push(P.getData(s));});var K=I.get(w);J.set(w,K&&K.getData(s));var F=I.get(q);J.set(t,F&&F.getData(s));G.updateReferences(J,A,M);A.set(g,D);}J.render();var E=G.getEventOutputMap(J);E.tree.refTreeNode=G;G.bubbleEvent("insert",E);},insertAfter:function(E,D){var A=this;A.insert(E,D,"after");},insertBefore:function(E,D){var A=this;A.insert(E,D,"before");},getNodeByChild:function(E){var A=this;var D=E.ancestor(r+a);if(D){return D.getData(s);}return null;},_inheritOwnerTreeAttrs:i.emptyFn,_setChildren:function(F){var D=this;var I=[];var E=D.get(p);if(!E){E=D._createNodeContainer();}var G=D;if(k(D)){G=D.get(d);}var A=f(G);var H=true;if(A){H=G.get(u);}D.updateIndex({});if(F.length>0){D.set(e,false);}o.Array.each(F,function(M,K){if(M){if(!k(M)&&m(M)){var L=M[g];var J=L&&L.length;M[d]=G;M[h]=D;if(J&&H){delete M[g];}M=D.createNode(M);if(J&&H){M.childrenLength=L.length;o.setTimeout(function(){M.set(g,L);},50);}}if(A){G.registerNode(M);}M.render(E);if(o.Array.indexOf(I,M)===-1){I.push(M);}}});return I;}});o.TreeData=B;},"@VERSION@",{requires:["aui-base","aui-task-manager"],skinnable:false});AUI.add("aui-tree-node",function(af){var U=af.Lang,aP=U.isString,aF=U.isBoolean,aY="alwaysShowHitArea",Q="",s="boundingBox",g="children",aL="clearfix",x="collapsed",a="container",ad="content",v="contentBox",j="expanded",p="helper",X="hidden",f="hitAreaEl",J="hitarea",V="icon",aX="iconEl",av="id",al="label",Y="labelEl",T="lastSelected",aK="leaf",q="node",an="over",aa="ownerTree",e="parentNode",aB="radio",aV="rendered",aJ="selected",t=" ",h="tree",K="tree-node",aT=function(){return Array.prototype.slice.call(arguments).join(t);},ar=function(A){return(A instanceof af.TreeNode);
},aR=function(A){return(A instanceof af.TreeView);},H=af.getClassName,ai=H(p,aL),B=H(h,x),b=H(h,a),aE=H(h,v),aZ=H(h,j),u=H(h,X),ax=H(h,J),G=H(h,V),k=H(h,al),aH=H(h,q),F=H(h,q,ad),ay=H(h,q,X,J),i=H(h,q,aK),aO=H(h,q,an),L=H(h,q,aJ),ae='<div class="'+ax+'"></div>',r='<div class="'+G+'"></div>',d='<div class="'+k+'"></div>',aW="<ul></ul>",w='<li class="'+aH+'"></li>',ab='<div class="'+aT(ai,F)+'"></div>';var O=af.Component.create({NAME:K,ATTRS:{boundingBox:{valueFn:function(){return af.Node.create(w);}},contentBox:{valueFn:function(){return af.Node.create(ab);}},draggable:{value:true,validator:aF},ownerTree:{value:null},label:{value:Q,validator:aP},expanded:{value:false,validator:aF},id:{validator:aP,valueFn:function(){return af.guid();}},leaf:{value:true,setter:function(A){if(A&&this.get(g).length){return false;}return A;},validator:aF},nextSibling:{getter:"_getSibling",value:null,validator:ar},prevSibling:{getter:"_getSibling",value:null,validator:ar},parentNode:{value:null,validator:function(A){return ar(A)||aR(A);}},labelEl:{setter:af.one,valueFn:function(){var A=this.get(al);return af.Node.create(d).html(A).unselectable();}},hitAreaEl:{setter:af.one,valueFn:function(){return af.Node.create(ae);}},alwaysShowHitArea:{value:true,validator:aF},iconEl:{setter:af.one,valueFn:function(){return af.Node.create(r);}},tabIndex:{value:null},rendered:{validator:aF,value:false}},AUGMENTS:[af.TreeData],EXTENDS:af.Base,prototype:{BOUNDING_TEMPLATE:w,CONTENT_TEMPLATE:ab,initializer:function(){var A=this;var a2=A.get(s);a2.setData(K,A);A._syncTreeNodeBBId();A._uiSetExpanded(A.get(j));A._uiSetLeaf(A.get(aK));},bindUI:function(){var A=this;A.after("childrenChange",af.bind(A._afterSetChildren,A));A.after("expandedChange",af.bind(A._afterExpandedChange,A));A.after("idChange",A._afterSetId,A);A.after("leafChange",af.bind(A._afterLeafChange,A));},render:function(a2){var A=this;if(!A.get(aV)){A.renderUI();A.bindUI();A.syncUI();A.set(aV,true);}if(a2){A.get(s).appendTo(a2);}},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(g));},_afterExpandedChange:function(a2){var A=this;A._uiSetExpanded(a2.newVal);},_afterLeafChange:function(a2){var A=this;A._uiSetLeaf(a2.newVal);},_afterSetChildren:function(a2){var A=this;A._syncHitArea(a2.newVal);},_renderContentBox:function(a4){var A=this;var a2=A.get(v);if(!A.isLeaf()){var a3=A.get(j);a2.addClass(a3?aZ:B);if(a3){A.expand();}}return a2;},_renderBoundingBox:function(){var A=this;var a3=A.get(s);var a2=A.get(v);var a4=null;a2.append(A.get(aX));a2.append(A.get(Y));a3.append(a2);var a4=A.get(a);if(a4){if(!A.get(j)){a4.addClass(u);}a3.append(a4);}return a3;},_createNodeContainer:function(){var A=this;var a2=A.get(a)||af.Node.create(aW);a2.addClass(b);A.set(a,a2);return a2;},_syncHitArea:function(a2){var A=this;if(A.get(aY)||a2.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){af.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;af.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;af.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var a2=this;var a3=0;var A=a2.get(e);while(A){++a3;A=A.get(e);}return a3;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&af.TreeNode.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(v).hasClass(L);},isLeaf:function(){var A=this;return A.get(aK);},isAncestor:function(a3){var a2=this;var A=a2.get(e);while(A){if(A===a3){return true;}A=A.get(e);}return false;},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},select:function(){var A=this;var a2=A.get(aa);if(a2){a2.set(T,A);}A.get(v).addClass(L);A.fire("select");},unselect:function(){var A=this;A.get(v).removeClass(L);A.fire("unselect");},over:function(){this.get(v).addClass(aO);},out:function(){this.get(v).removeClass(aO);},showHitArea:function(){var A=this;var a2=A.get(f);a2.removeClass(ay);},hideHitArea:function(){var A=this;var a2=A.get(f);a2.addClass(ay);},_syncTreeNodeBBId:function(a2){var A=this;A.get(s).attr(av,A.get(av));},_getSibling:function(a5,a2){var A=this;var a4="_"+a2;var a3=A[a4];if(a3!==null&&!ar(a3)){a3=null;A[a4]=a3;}return a3;},_uiSetExpanded:function(a4){var A=this;if(!A.isLeaf()){var a3=A.get(a);var a2=A.get(v);if(a4){a2.replaceClass(B,aZ);if(a3){a3.removeClass(u);}}else{a2.replaceClass(aZ,B);if(a3){a3.addClass(u);}}}},_uiSetLeaf:function(a3){var A=this;var a2=A.get(v);if(a3){A.get(a).remove();A.get(f).remove();}else{a2.prepend(A.get(f));A._createNodeContainer();A._uiSetExpanded(A.get(j));}a2.toggleClass(i,a3);}}});af.TreeNode=O;var aA=U.isFunction,I=U.isObject,ag=U.isValue,aQ="cache",aw="end",am="io",aG="limit",aU="loaded",a0="loading",aC="Load more results",ak="paginator",ap="start",au="tree-node-io",c="paginatorClick",aD=H(h,q,ak),z=H(h,q,am,a0),az='<a class="'+aD+'" href="javascript:void(0);">{moreResultsLabel}</a>';var N=af.Component.create({NAME:au,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:aF},loaded:{value:false,validator:aF},cache:{value:true,validator:aF},leaf:{value:false,validator:aF},paginator:{setter:function(a3){var a2=this;var A=af.Node.create(U.sub(az,{moreResultsLabel:a3.moreResultsLabel||aC}));return af.merge({alwaysVisible:false,autoFocus:true,element:A,endParam:aw,limitParam:aG,start:0,startParam:ap},a3);},validator:I}},EXTENDS:af.TreeNode,prototype:{bindUI:function(){var A=this;af.TreeNodeIO.superclass.bindUI.apply(this,arguments);A._bindPaginatorUI();A._createEvents();},syncUI:function(){var A=this;af.TreeNodeIO.superclass.syncUI.apply(this,arguments);A._syncPaginatorUI();},_bindPaginatorUI:function(){var A=this;var a3=A.get(ak);
if(a3){var a2=af.bind(A._handlePaginatorClickEvent,A);a3.element.on("click",a2);}},createNodes:function(a2){var A=this;af.Array.each(af.Array(a2),function(a4){var a3=A.createNode.call(A,a4);A.appendChild(a3);});A._syncPaginatorUI(a2);},expand:function(){var A=this;var a2=A.get(aQ);var a5=A.get(am);var a3=A.get(aU);var a4=A.get(a0);if(!a2){A.set(aU,false);}if(a5&&!a3&&!a4&&!this.hasChildNodes()){if(!a2){A.empty();}A.initIO();}else{af.TreeNodeIO.superclass.expand.apply(this,arguments);}},initIO:function(){var a2=this;var a3=a2.get(am);if(aA(a3.cfg.data)){a3.cfg.data=a3.cfg.data.call(a2,a2);}a2._syncPaginatorIOData(a3);if(aA(a3.loader)){var A=af.bind(a3.loader,a2);A(a3.url,a3.cfg,a2);}else{af.io.request(a3.url,a3.cfg);}},ioStartHandler:function(){var A=this;var a2=A.get(v);A.set(a0,true);a2.addClass(z);},ioCompleteHandler:function(){var A=this;var a2=A.get(v);A.set(a0,false);A.set(aU,true);a2.removeClass(z);},ioSuccessHandler:function(){var A=this;var a8=A.get(am);var a3=Array.prototype.slice.call(arguments);var a5=a3.length;var a2=a3[1];if(a5>=3){var a7=a3[2];try{a2=af.JSON.parse(a7.responseText);}catch(a6){}}var a4=a8.formatter;if(a4){a2=a4(a2);}A.createNodes(a2);A.expand();},ioFailureHandler:function(){var A=this;A.set(a0,false);A.set(aU,false);},_createEvents:function(){var A=this;A.publish(c,{defaultFn:A._defPaginatorClickFn,prefix:au});},_defPaginatorClickFn:function(a2){var A=this;var a3=A.get(ak);if(ag(a3.limit)){a3.start+=a3.limit;}if(A.get(am)){A.initIO();}},_handlePaginatorClickEvent:function(a4){var A=this;var a3=A.get(aa);var a2=A.getEventOutputMap(A);A.fire(c,a2);if(a3){a3.fire(c,a2);}a4.halt();},_inheritOwnerTreeAttrs:function(){var a2=this;var a3=a2.get(aa);if(a3){if(!a2.get(am)){a2.set(am,af.clone(a3.get(am)));}if(!a2.get(ak)){var A=a3.get(ak);if(A&&A.element){A.element=A.element.clone();}a2.set(ak,A);}}},_setIO:function(a3){var A=this;if(!a3){return null;}else{if(aP(a3)){a3={url:a3};}}a3=a3||{};a3.cfg=a3.cfg||{};a3.cfg.on=a3.cfg.on||{};var a2={start:af.bind(A.ioStartHandler,A),complete:af.bind(A.ioCompleteHandler,A),success:af.bind(A.ioSuccessHandler,A),failure:af.bind(A.ioFailureHandler,A)};af.each(a2,function(a6,a4){var a7=a3.cfg.on[a4];if(aA(a7)){var a5=function(){a6.apply(A,arguments);a7.apply(A,arguments);};a3.cfg.on[a4]=af.bind(a5,A);}else{a3.cfg.on[a4]=a6;}});return a3;},_syncPaginatorIOData:function(a4){var A=this;var a3=A.get(ak);if(a3&&ag(a3.limit)){var a2=a4.cfg.data||{};a2[a3.limitParam]=a3.limit;a2[a3.startParam]=a3.start;a2[a3.endParam]=(a3.start+a3.limit);a4.cfg.data=a2;}},_syncPaginatorUI:function(a4){var a8=this;var a2=a8.get(g);var a9=a8.get(ak);if(a9){var a7=true;if(a4){a7=(a4.length>0);}var a3=a8.getChildrenLength();var A=a9.start;var a6=a9.total||a3;var ba=a7&&(a6>a3);if(a9.alwaysVisible||ba){a8.get(a).append(a9.element.show());if(a9.autoFocus){try{a9.element.focus();}catch(a5){}}}else{a9.element.hide();}}}}});af.TreeNodeIO=N;var l="checkbox",o="checked",ac="checkContainerEl",aM="checkEl",P="checkName",Z=".",m="name",C="tree-node-check",aj=H(h,q,l),aq=H(h,q,l,a),at=H(h,q,o),S='<div class="'+aq+'"></div>',ao='<input class="'+aj+'" type="checkbox" />';var aI=af.Component.create({NAME:C,ATTRS:{checked:{value:false,validator:aF},checkName:{value:C,validator:aP},checkContainerEl:{setter:af.one,valueFn:function(){return af.Node.create(S);}},checkEl:{setter:af.one,valueFn:function(){var A=this.get(P);return af.Node.create(ao).attr(m,A);}}},EXTENDS:af.TreeNodeIO,prototype:{initializer:function(){var A=this;A._uiSetChecked(A.get(o));},renderUI:function(){var a2=this;af.TreeNodeCheck.superclass.renderUI.apply(a2,arguments);var a3=a2.get(Y);var A=a2.get(aM);var a4=a2.get(ac);A.hide();a4.append(A);a3.placeBefore(a4);if(a2.isChecked()){a2.check();}},bindUI:function(){var A=this;var a2=A.get(v);var a3=A.get(Y);af.TreeNodeCheck.superclass.bindUI.apply(A,arguments);A.after("checkedChange",af.bind(A._afterCheckedChange,A));a2.delegate("click",af.bind(A.toggleCheck,A),Z+aq);a2.delegate("click",af.bind(A.toggleCheck,A),Z+k);a3.swallowEvent("dblclick");},check:function(a2){var A=this;A.set(o,true,{originalTarget:a2});},uncheck:function(a2){var A=this;A.set(o,false,{originalTarget:a2});},toggleCheck:function(){var a2=this;var A=a2.get(aM);var a3=A.attr(o);if(!a3){a2.check();}else{a2.uncheck();}},isChecked:function(){var A=this;return A.get(o);},_afterCheckedChange:function(a2){var A=this;A._uiSetChecked(a2.newVal);},_uiSetChecked:function(a2){var A=this;if(a2){A.get(v).addClass(at);A.get(aM).attr(o,o);}else{A.get(v).removeClass(at);A.get(aM).attr(o,Q);}}}});af.TreeNodeCheck=aI;var D="child",R="tree-node-task",M="unchecked",aN=function(A){return A instanceof af.TreeNodeCheck;},ah=H(h,q,D,M);var a1=af.Component.create({NAME:R,EXTENDS:af.TreeNodeCheck,prototype:{check:function(a3){var A=this;var a2=A.get(v);a3=a3||A;if(!A.isLeaf()){A.eachChildren(function(a4){if(aN(a4)){a4.check(a3);}});}A.eachParent(function(a4){if(aN(a4)&&!a4.isChecked()){a4.get(v).addClass(ah);}});a2.removeClass(ah);af.TreeNodeTask.superclass.check.call(this,a3);},uncheck:function(a3){var A=this;var a2=A.get(v);a3=a3||A;if(!A.isLeaf()){A.eachChildren(function(a4){if(a4 instanceof af.TreeNodeCheck){a4.uncheck(a3);}});}A.eachParent(function(a4){if(aN(a4)&&!a4.isChecked()){a4.get(v).removeClass(ah);}});a2.removeClass(ah);af.TreeNodeTask.superclass.uncheck.call(this,a3);}}});af.TreeNodeTask=a1;var E="tree-node-radio",n=function(A){return A instanceof af.TreeNodeRadio;},y=H(h,q,aB),W=H(h,q,aB,o);var aS=af.Component.create({NAME:E,EXTENDS:af.TreeNodeTask,prototype:{renderUI:function(){var A=this;af.TreeNodeRadio.superclass.renderUI.apply(A,arguments);A.get(v).addClass(y);},check:function(){var A=this;A._uncheckNodesRadio();af.TreeNodeRadio.superclass.check.apply(this,arguments);},_uiSetChecked:function(a2){var A=this;if(a2){A.get(v).addClass(W);A.get(aM).attr(o,o);}else{A.get(v).removeClass(W);A.get(aM).attr(o,Q);}},_uncheckNodesRadio:function(a4){var A=this;var a3;if(a4){a3=a4.get(g);}else{var a2=A.get(aa);if(a2){a3=a2.get(g);
}else{return;}}af.Array.each(a3,function(a6,a5,a7){if(!a6.isLeaf()){A._uncheckNodesRadio(a6);}if(n(a6)){a6.uncheck();}});}}});af.TreeNodeRadio=aS;af.TreeNode.nodeTypes={radio:af.TreeNodeRadio,task:af.TreeNodeTask,check:af.TreeNodeCheck,node:af.TreeNode,io:af.TreeNodeIO};},"@VERSION@",{requires:["aui-tree-data","aui-io","json","querystring-stringify"],skinnable:false});AUI.add("aui-tree-view",function(ab){var T=ab.Lang,aq=T.isBoolean,aw=T.isString,ar=ab.UA,q="boundingBox",d="children",a="container",Y="content",s="contentBox",R=".",ao="file",z="hitarea",P="icon",af="label",N="lastSelected",au="leaf",p="node",V="ownerTree",F="root",S="selectOnToggle",r=" ",f="tree",B="tree-node",K="tree-view",e="type",x="view",ax=function(){return Array.prototype.slice.call(arguments).join(r);},ak=function(A){return(A instanceof ab.TreeNode);},y=ab.getClassName,an=y(f,z),w=y(f,P),i=y(f,af),u=y(f,p,Y),l=y(f,F,a),ag=y(f,x,Y);var O=ab.Component.create({NAME:K,ATTRS:{type:{value:ao,validator:aw},lastSelected:{value:null,validator:ak},lazyLoad:{validator:aq,value:true},io:{value:null},paginator:{value:null},selectOnToggle:{validator:aq,value:false}},AUGMENTS:[ab.TreeData],prototype:{CONTENT_TEMPLATE:"<ul></ul>",initializer:function(){var A=this;var L=A.get(q);L.setData(K,A);},bindUI:function(){var A=this;A._delegateDOM();},renderUI:function(){var A=this;A._renderElements();},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(aD){var aC=aD.one("> *").remove();var aB=aC.outerHTML();var aA=aD.one("> ul");var aE=new ab.TreeNode({boundingBox:aD,container:aA,label:aB,leaf:!aA,ownerTree:A});if(aA){aE.render();A._createFromHTMLMarkup(aA);}else{aE.render();}var az=aD.get(c).get(c);var aF=az.getData(B);if(!ab.instanceOf(aF,ab.TreeNode)){aF=az.getData(K);}aF.appendChild(aE);});},_createNodeContainer:function(){var A=this;var L=A.get(s);A.set(a,L);return L;},_renderElements:function(){var A=this;var L=A.get(s);var az=A.get(d);var aA=A.get(e);var aB=y(f,aA);L.addClass(ag);L.addClass(ax(aB,l));if(!az.length){A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(q);L.delegate("click",ab.bind(A._onClickNodeEl,A),R+u);L.delegate("dblclick",ab.bind(A._onClickHitArea,A),R+w);L.delegate("dblclick",ab.bind(A._onClickHitArea,A),R+i);L.delegate("mouseenter",ab.bind(A._onMouseEnterNodeEl,A),R+u);L.delegate("mouseleave",ab.bind(A._onMouseLeaveNodeEl,A),R+u);},_onClickNodeEl:function(L){var A=this;var aA=A.getNodeByChild(L.currentTarget);if(aA){if(L.target.test(R+an)){aA.toggle();if(!A.get(S)){return;}}if(!aA.isSelected()){var az=A.get(N);if(az){az.unselect();}aA.select();}}},_onMouseEnterNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.out();}},_onClickHitArea:function(L){var A=this;var az=A.getNodeByChild(L.currentTarget);if(az){az.toggle();}}}});ab.TreeView=O;var J=T.isNumber,ac="above",b="append",ae="below",am="block",ah="body",av="clearfix",aa="default",t="display",aj="down",v="drag",m="draggable",X="dragCursor",ap="dragNode",h="expanded",n="helper",at="insert",D="offsetHeight",c="parentNode",ay="scrollDelay",M="state",ai="tree-drag-drop",al="up",I=ab.DD.DDM,ad=y(n,av),j=y(P),Z=y(f,v,n),o=y(f,v,n,Y),H=y(f,v,n,af),E=y(f,v,at,ac),W=y(f,v,at,b),G=y(f,v,at,ae),k=y(f,v,M,b),Q=y(f,v,M,at,ac),U=y(f,v,M,at,ae),C='<div class="'+Z+'">'+'<div class="'+[o,ad].join(r)+'">'+'<span class="'+j+'"></span>'+'<span class="'+H+'"></span>'+"</div>"+"</div>";var g=ab.Component.create({NAME:ai,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:J}},EXTENDS:ab.TreeView,prototype:{direction:ae,dropAction:null,lastY:0,node:null,nodeContent:null,destructor:function(){var A=this;var L=A.get(n);if(L){L.remove(true);}if(A.ddDelegate){A.ddDelegate.destroy();}},bindUI:function(){var A=this;ab.TreeViewDD.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;ab.TreeViewDD.superclass.renderUI.apply(this,arguments);var L=ab.Node.create(C).hide();ab.one(ah).append(L);A.set(n,L);I.set(X,aa);},_bindDragDrop:function(){var A=this;var az=A.get(q);var L=null;A._createDragInitHandler=function(){A.ddDelegate=new ab.DD.Delegate({bubbleTargets:A,container:az,nodes:R+u,target:true});var aA=A.ddDelegate.dd;aA.plug(ab.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(ab.Plugin.DDNodeScroll,{scrollDelay:A.get(ay),node:az});aA.removeInvalid("a");if(L){L.detach();}};if(!ar.touch){L=az.on(["focus","mousedown","mousemove"],A._createDragInitHandler);}else{A._createDragInitHandler();}A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.after("drop:hit",A._afterDropHit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=b;A.get(n).addClass(k);L.addClass(W);},_goingDownState:function(L){var A=this;A.dropAction=ae;A.get(n).addClass(U);L.addClass(G);},_goingUpState:function(L){var A=this;A.dropAction=ac;A.get(n).addClass(Q);L.addClass(E);},_resetState:function(L){var A=this;var az=A.get(n);az.removeClass(k);az.removeClass(Q);az.removeClass(U);if(L){L.removeClass(E);L.removeClass(W);L.removeClass(G);}},_updateNodeState:function(A){var aI=this;var aE=A.drag;var aB=A.drop;var L=aB.get(p);var aH=L.get(c);var aD=aE.get(p).get(c);var aA=aH.getData(B);aI._resetState(aI.nodeContent);if(!aD.contains(aH)){var aJ=L.get(D)/3;var az=L.getY();var aG=az+aJ;var aF=az+aJ*2;var aC=aE.mouseXY[1];if((aC>az)&&(aC<aG)){aI._goingUpState(L);}else{if(aC>aF){aI._goingDownState(L);}else{if((aC>aG)&&(aC<aF)){if(aA&&!aA.isLeaf()){aI._appendState(L);}else{if(aI.direction===al){aI._goingUpState(L);}else{aI._goingDownState(L);}}}}}}aI.nodeContent=L;},_afterDropHit:function(aB){var A=this;var aD=A.dropAction;var aC=aB.drag.get(p).get(c);var az=aB.drop.get(p).get(c);var aE=az.getData(B);var aA=aC.getData(B);var L=A.getEventOutputMap(A);L.tree.dropNode=aE;L.tree.dragNode=aA;
if(aD===ac){aE.insertBefore(aA);A.bubbleEvent("dropInsert",L);}else{if(aD===ae){aE.insertAfter(aA);A.bubbleEvent("dropInsert",L);}else{if(aD===b){if(aE&&!aE.isLeaf()){aE.appendChild(aA);if(!aE.get(h)){aE.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);A.dropAction=null;},_onDragAlign:function(az){var A=this;var L=A.lastY;var aA=az.target.lastXY[1];if(aA!==L){A.direction=(aA<L)?al:aj;}A.lastY=aA;},_onDragStart:function(aC){var A=this;var aA=aC.target;var aE=aA.get(p).get(c);var az=aE.getData(B);var aD=A.get(N);if(aD){aD.unselect();}az.select();var aB=A.get(n);var L=aB.one(R+H);aB.setStyle(t,am).show();L.html(az.get(af));aA.set(ap,aB);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(L){var A=L.drop.get(p).get(c);var az=A.getData(B);if(!ak(az)){L.preventDefault();}},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}}});ab.TreeViewDD=g;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","dd-delegate","dd-proxy"]});AUI.add("aui-tree",function(a){},"@VERSION@",{skinnable:true,use:["aui-tree-data","aui-tree-node","aui-tree-view"]});