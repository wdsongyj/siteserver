var scrawl=function(e){e&&this.initOptions(e)};!function(){var e=$G("J_brushBoard"),t=e.getContext("2d"),a=[],i=0;scrawl.prototype={isScrawl:!1,brushWidth:-1,brushColor:"",initOptions:function(e){var t=this;t.originalState(e),t._buildToolbarColor(e.colorList),t._addBoardListener(e.saveNum),t._addOPerateListener(e.saveNum),t._addColorBarListener(),t._addBrushBarListener(),t._addEraserBarListener(),t._addAddImgListener(),t._addRemoveImgListenter(),t._addScalePicListenter(),t._addClearSelectionListenter(),t._originalColorSelect(e.drawBrushColor),t._originalBrushSelect(e.drawBrushSize),t._clearSelection()},originalState:function(e){this.brushWidth=e.drawBrushSize,this.brushColor=e.drawBrushColor,t.lineWidth=this.brushWidth,t.strokeStyle=this.brushColor,t.fillStyle="transparent",t.lineCap="round",t.fill()},_buildToolbarColor:function(e){var t=null,a=[];a.push("<table id='J_colorList'>");for(var i,r=0;i=e[r++];)(r-1)%5==0&&(1!=r&&a.push("</tr>"),a.push("<tr>")),t="#"+i,a.push("<td><a title='"+t+"' href='javascript:void(0)' style='background-color:"+t+"'></a></td>");a.push("</tr></table>"),$G("J_colorBar").innerHTML=a.join("")},_addBoardListener:function(r){var o,s,n=this,l=-1,c=-1,d=!1,h=!1,u=!1,p=0,g="";o=parseInt(domUtils.getComputedStyle($G("J_wrap"),"margin-left")),a.push(t.getImageData(0,0,t.canvas.width,t.canvas.height)),i+=1,domUtils.on(e,["mousedown","mousemove","mouseup","mouseout"],function(e){switch(s=browser.webkit?e.which:p,e.type){case"mousedown":p=1,g=1,d=!0,u=!1,h=!1,n.isScrawl=!0,l=e.clientX-o,c=e.clientY-o,t.beginPath();break;case"mousemove":if(!g&&0==s)return;if(!g&&s&&(l=e.clientX-o,c=e.clientY-o,t.beginPath(),g=1),u||!d)return;var a=e.clientX-o,i=e.clientY-o;t.moveTo(l,c),t.lineTo(a,i),t.stroke(),l=a,c=i,h=!0;break;case"mouseup":if(p=0,!d)return;h||(t.arc(l,c,t.lineWidth,0,2*Math.PI,!1),t.fillStyle=t.strokeStyle,t.fill()),t.closePath(),n._saveOPerate(r),d=!1,h=!1,u=!0,l=-1,c=-1;break;case"mouseout":if(g="",p=0,1==s)return;t.closePath()}})},_addOPerateListener:function(e){var r=this;domUtils.on($G("J_previousStep"),"click",function(){i>1&&(i-=1,t.clearRect(0,0,t.canvas.width,t.canvas.height),t.putImageData(a[i-1],0,0),r.btn2Highlight("J_nextStep"),1==i&&r.btn2disable("J_previousStep"))}),domUtils.on($G("J_nextStep"),"click",function(){i>0&&i<a.length&&(t.clearRect(0,0,t.canvas.width,t.canvas.height),t.putImageData(a[i],0,0),i+=1,r.btn2Highlight("J_previousStep"),i==a.length&&r.btn2disable("J_nextStep"))}),domUtils.on($G("J_clearBoard"),"click",function(){t.clearRect(0,0,t.canvas.width,t.canvas.height),a=[],r._saveOPerate(e),i=1,r.isScrawl=!1,r.btn2disable("J_previousStep"),r.btn2disable("J_nextStep"),r.btn2disable("J_clearBoard")})},_addColorBarListener:function(){var e=this;domUtils.on($G("J_colorBar"),"click",function(a){var i=e.getTarget(a),r=i.title;r&&(e._addColorSelect(i),e.brushColor=r,t.globalCompositeOperation="source-over",t.lineWidth=e.brushWidth,t.strokeStyle=r)})},_addBrushBarListener:function(){var e=this;domUtils.on($G("J_brushBar"),"click",function(a){var i=e.getTarget(a),r=browser.ie?i.innerText:i.text;r&&(e._addBESelect(i),t.globalCompositeOperation="source-over",t.lineWidth=parseInt(r),t.strokeStyle=e.brushColor,e.brushWidth=t.lineWidth)})},_addEraserBarListener:function(){var e=this;domUtils.on($G("J_eraserBar"),"click",function(a){var i=e.getTarget(a),r=browser.ie?i.innerText:i.text;r&&(e._addBESelect(i),t.lineWidth=parseInt(r),t.globalCompositeOperation="destination-out",t.strokeStyle="#FFF")})},_addAddImgListener:function(){var e=$G("J_imgTxt");window.FileReader||($G("J_addImg").style.display="none",$G("J_removeImg").style.display="none",$G("J_sacleBoard").style.display="none"),domUtils.on(e,"change",function(t){var a=e.parentNode;addMaskLayer(lang.backgroundUploading);var i=t.target||t.srcElement,r=new FileReader;r.onload=function(e){ue_callback((e.target||e.srcElement).result,"SUCCESS")},r.readAsDataURL(i.files[0]),a.reset()})},_addRemoveImgListenter:function(){var e=this;domUtils.on($G("J_removeImg"),"click",function(){$G("J_picBoard").innerHTML="",e.btn2disable("J_removeImg"),e.btn2disable("J_sacleBoard")})},_addScalePicListenter:function(){domUtils.on($G("J_sacleBoard"),"click",function(){var t=$G("J_picBoard"),a=$G("J_scaleCon"),i=t.children[0];if(i)if(a)"visible"==a.style.visibility?(a.style.visibility="hidden",t.style.position="",t.style.zIndex=""):(a.style.visibility="visible",t.style.cssText+="position:relative;z-index:999");else{t.style.cssText="position:relative;z-index:999;"+t.style.cssText,i.style.cssText="position: absolute;top:"+(e.height-i.height)/2+"px;left:"+(e.width-i.width)/2+"px;";var r=new ScaleBoy;t.appendChild(r.init()),r.startScale(i)}})},_addClearSelectionListenter:function(){var e=document;domUtils.on(e,"mousemove",function(t){browser.ie&&browser.version<11?e.selection.clear():window.getSelection().removeAllRanges()})},_clearSelection:function(){for(var e,t=["J_operateBar","J_colorBar","J_brushBar","J_eraserBar","J_picBoard"],a=0;e=t[a++];)domUtils.unSelectable($G(e))},_saveOPerate:function(e){a.length<=e?(i<a.length&&(this.btn2disable("J_nextStep"),a.splice(i)),a.push(t.getImageData(0,0,t.canvas.width,t.canvas.height)),i=a.length):(a.shift(),a.push(t.getImageData(0,0,t.canvas.width,t.canvas.height)),i=a.length),this.btn2Highlight("J_previousStep"),this.btn2Highlight("J_clearBoard")},_originalColorSelect:function(e){for(var t,a=$G("J_colorList").getElementsByTagName("td"),i=0;t=a[i++];)t.children[0].title.toLowerCase()==e&&(t.children[0].style.opacity=1)},_originalBrushSelect:function(e){for(var t,a=$G("J_brushBar").children,i=0;t=a[i++];){if("a"==t.tagName.toLowerCase())(browser.ie?t.innerText:t.text).toLowerCase()==e&&(t.style.opacity=1)}},_addColorSelect:function(e){for(var t,a=$G("J_colorList").getElementsByTagName("td"),i=$G("J_eraserBar").children,r=$G("J_brushBar").children,o=0;t=a[o++];)t.children[0].style.opacity=.3;for(var s,n=0;s=r[n++];){if("a"==s.tagName.toLowerCase())s.style.opacity=.3,(browser.ie?s.innerText:s.text).toLowerCase()==this.brushWidth&&(s.style.opacity=1)}for(var l,c=0;l=i[c++];)"a"==l.tagName.toLowerCase()&&(l.style.opacity=.3);e.style.opacity=1,e.blur()},_addBESelect:function(e){for(var t,a=$G("J_brushBar").children,i=$G("J_eraserBar").children,r=0;t=a[r++];)"a"==t.tagName.toLowerCase()&&(t.style.opacity=.3);for(var o,s=0;o=i[s++];)"a"==o.tagName.toLowerCase()&&(o.style.opacity=.3);e.style.opacity=1,e.blur()},getCanvasData:function(){var a,i,r=$G("J_picBoard"),o=r.children[0];o?("absolute"==o.style.position?(a=parseInt(o.style.left),i=parseInt(o.style.top)):(a=(r.offsetWidth-o.width)/2,i=(r.offsetHeight-o.height)/2),t.globalCompositeOperation="destination-over",t.drawImage(o,a,i,o.width,o.height)):(t.globalCompositeOperation="destination-atop",t.fillStyle="#fff",t.fillRect(0,0,e.width,e.height));try{return e.toDataURL("image/png").substring(22)}catch(e){return""}},btn2Highlight:function(e){var t=$G(e);-1==t.className.indexOf("H")&&(t.className+="H")},btn2disable:function(e){var t=$G(e);-1!=t.className.indexOf("H")&&(t.className=t.className.replace("H",""))},getTarget:function(e){return e.target||e.srcElement}}}();var ScaleBoy=function(){this.dom=null,this.scalingElement=null};function ue_callback(e,t){var a=document,i=$G("J_picBoard"),r=a.createElement("img");removeMaskLayer(),"SUCCESS"==t?(i.innerHTML="",r.onload=function(){!function(e,t,a,i){var r,o=0,s=0,n=e.width||a,l=e.height||i;(n>t||l>t)&&(n>=l?(o=n-t)&&(r=(o/n).toFixed(2),e.height=l-l*r,e.width=t):(s=l-t)&&(r=(s/l).toFixed(2),e.width=n-n*r,e.height=t))}(this,300),i.appendChild(r);var e=new scrawl;e.btn2Highlight("J_removeImg"),e.btn2Highlight("J_sacleBoard")},r.src=e):alert(t)}function removeMaskLayer(){var e=$G("J_maskLayer");e.className="maskLayerNull",e.innerHTML="",dialog.buttons[0].setDisabled(!1)}function addMaskLayer(e){var t=$G("J_maskLayer");dialog.buttons[0].setDisabled(!0),t.className="maskLayer",t.innerHTML=e}function exec(scrawlObj){if(scrawlObj.isScrawl){addMaskLayer(lang.scrawlUpLoading);var base64=scrawlObj.getCanvasData();if(base64){var options={timeout:1e5,onsuccess:function(xhr){var responseObj;if(!scrawlObj.isCancelScrawl)if(responseObj=eval("("+xhr.responseText+")"),"SUCCESS"==responseObj.state){var imgObj={},url=editor.options.scrawlUrlPrefix+responseObj.url;imgObj.src=url,imgObj._src=url,imgObj.alt=responseObj.original||"",imgObj.title=responseObj.title||"",editor.execCommand("insertImage",imgObj),dialog.close()}else alert(responseObj.state)},onerror:function(){alert(lang.imageError),dialog.close()}};options[editor.getOpt("scrawlFieldName")]=base64;var actionUrl=editor.getActionUrl(editor.getOpt("scrawlActionName")),params=utils.serializeParam(editor.queryCommandValue("serverparam"))||"",url=utils.formatUrl(actionUrl+(-1==actionUrl.indexOf("?")?"?":"&")+params);ajax.request(url,options)}}else addMaskLayer(lang.noScarwl+"&nbsp;&nbsp;&nbsp;<input type='button' value='"+lang.continueBtn+"'  onclick='removeMaskLayer()'/>")}!function(){var e=[[1,1,-1,-1],[0,1,0,-1],[0,1,1,-1],[1,0,-1,0],[0,0,1,0],[1,0,-1,1],[0,0,0,1],[0,0,1,1]];ScaleBoy.prototype={init:function(){!function(){var e=document,t=e.getElementsByTagName("head")[0],a=e.createElement("style"),i=".scale{visibility:hidden;cursor:move;position:absolute;left:0;top:0;width:100px;height:50px;background-color:#fff;font-size:0;line-height:0;opacity:.4;filter:Alpha(opacity=40);}.scale span{position:absolute;left:0;top:0;width:6px;height:6px;background-color:#006DAE;}.scale .hand0, .scale .hand7{cursor:nw-resize;}.scale .hand1, .scale .hand6{left:50%;margin-left:-3px;cursor:n-resize;}.scale .hand2, .scale .hand4, .scale .hand7{left:100%;margin-left:-6px;}.scale .hand3, .scale .hand4{top:50%;margin-top:-3px;cursor:w-resize;}.scale .hand5, .scale .hand6, .scale .hand7{margin-top:-6px;top:100%;}.scale .hand2, .scale .hand5{cursor:ne-resize;}";a.type="text/css";try{a.appendChild(e.createTextNode(i))}catch(e){a.styleSheet.cssText=i}t.appendChild(a)}();var e=this,t=e.dom=function(){var e=[],t=document.createElement("div");t.id="J_scaleCon",t.className="scale";for(var a=0;a<8;a++)e.push("<span class='hand"+a+"'></span>");return t.innerHTML=e.join(""),t}();return e.scaleMousemove.fp=e,domUtils.on(t,"mousedown",function(t){var a=t.target||t.srcElement;e.start={x:t.clientX,y:t.clientY},-1!=a.className.indexOf("hand")&&(e.dir=a.className.replace("hand","")),domUtils.on(document.body,"mousemove",e.scaleMousemove),t.stopPropagation?t.stopPropagation():t.cancelBubble=!0}),domUtils.on(document.body,"mouseup",function(a){e.start&&(domUtils.un(document.body,"mousemove",e.scaleMousemove),e.moved&&e.updateScaledElement({position:{x:t.style.left,y:t.style.top},size:{w:t.style.width,h:t.style.height}}),delete e.start,delete e.moved,delete e.dir)}),t},startScale:function(e){this.dom.style.cssText="visibility:visible;top:"+e.style.top+";left:"+e.style.left+";width:"+e.offsetWidth+"px;height:"+e.offsetHeight+"px;",this.scalingElement=e},updateScaledElement:function(e){var t=this.scalingElement,a=e.position,i=e.size;a&&(void 0!==a.x&&(t.style.left=a.x),void 0!==a.y&&(t.style.top=a.y)),i&&(i.w&&(t.style.width=i.w),i.h&&(t.style.height=i.h))},updateStyleByDir:function(t,a){var i,r=this,o=r.dom;e.def=[1,1,0,0],0!=e[t][0]&&(i=parseInt(o.style.left)+a.x,o.style.left=r._validScaledProp("left",i)+"px"),0!=e[t][1]&&(i=parseInt(o.style.top)+a.y,o.style.top=r._validScaledProp("top",i)+"px"),0!=e[t][2]&&(i=o.clientWidth+e[t][2]*a.x,o.style.width=r._validScaledProp("width",i)+"px"),0!=e[t][3]&&(i=o.clientHeight+e[t][3]*a.y,o.style.height=r._validScaledProp("height",i)+"px"),"def"===t&&r.updateScaledElement({position:{x:o.style.left,y:o.style.top}})},scaleMousemove:function(e){var t=arguments.callee.fp,a=t.start,i=t.dir||"def",r={x:e.clientX-a.x,y:e.clientY-a.y};t.updateStyleByDir(i,r),arguments.callee.fp.start={x:e.clientX,y:e.clientY},arguments.callee.fp.moved=1},_validScaledProp:function(e,t){var a=this.dom,i=$G("J_picBoard");switch(t=isNaN(t)?0:t,e){case"left":return t<0?0:t+a.clientWidth>i.clientWidth?i.clientWidth-a.clientWidth:t;case"top":return t<0?0:t+a.clientHeight>i.clientHeight?i.clientHeight-a.clientHeight:t;case"width":return t<=0?1:t+a.offsetLeft>i.clientWidth?i.clientWidth-a.offsetLeft:t;case"height":return t<=0?1:t+a.offsetTop>i.clientHeight?i.clientHeight-a.offsetTop:t}}}}();