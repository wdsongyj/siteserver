layer.use("skin/layer.ext.css",function(){layer.ext&&layer.ext()}),layer.extv="1.3",layer.prompt=function(e,t,i){var a={},n={area:["auto","auto"],offset:[(e=e||{}).top||"200px",""],title:e.title||"信息",dialog:{btns:2,type:-1,msg:'<input type="'+(1===e.type?"password":2===e.type?"file":"text")+'" class="xubox_prompt xubox_form" id="xubox_prompt" value="" />',yes:function(i){var n=a.prompt.val();""===n?a.prompt.focus():n.replace(/\s/g,"").length>(e.length||1e3)?layer.tips("最多输入"+(e.length||1e3)+"个字数","#xubox_prompt",2):(layer.close(i),t&&t(n))},no:i},success:function(){a.prompt=$("#xubox_prompt")}};return 3===e.type&&(n.dialog.msg='<textarea class="xubox_prompt xubox_form xubox_formArea" id="xubox_prompt"></textarea>'),$.layer(n)},layer.tab=function(e){var t=(e=e||{}).data||[],i={type:1,border:[0],area:["auto","auto"],title:!1,shade:e.shade,offset:e.offset,move:".xubox_tabmove",closeBtn:!1,page:{html:'<div class="xubox_tab" style="'+(e.area=e.area||[],"width:"+(e.area[0]||"500px")+"; height:"+(e.area[1]||"300px")+'">')+'<span class="xubox_tabmove"></span><div class="xubox_tabtit">'+function(){var e=t.length,i=1,a="";if(e>0)for(a='<span class="xubox_tabnow">'+t[0].title+"</span>";i<e;i++)a+="<span>"+t[i].title+"</span>";return a}()+'</div><ul class="xubox_tab_main">'+function(){var e=t.length,i=1,a="";if(e>0)for(a='<li class="xubox_tabli xubox_tab_layer">'+(t[0].content||"content未传入")+"</li>";i<e;i++)a+='<li class="xubox_tabli">'+(t[i].content||"content未传入")+"</li>";return a}()+'</ul><span class="xubox_tabclose" title="关闭">X</span></div>'},success:function(e){var t=$(".xubox_tabtit").children(),i=$(".xubox_tab_main").children(),a=$(".xubox_tabclose");t.on("click",function(){var e=$(this),t=e.index();e.addClass("xubox_tabnow").siblings().removeClass("xubox_tabnow"),i.eq(t).show().siblings().hide()}),a.on("click",function(){layer.close(e.attr("times"))})}};return $.layer(i)},layer.photos=function(e){e=e||{};var t={imgIndex:1,end:null,html:$("html")},i=$(window),a=e.json,n=e.page;if(a){var s=a.data;if(1!==a.status)return void layer.msg("未请求到数据",2,8);if(t.imgLen=s.length,!(s.length>0))return void layer.msg("没有任何图片",2,8);t.thissrc=s[a.start].src,t.pid=s[a.start].pid,t.imgsname=a.title||"",t.name=s[a.start].name,t.imgIndex=a.start+1}else{var r=$(n.parent).find("img"),o=r.eq(n.start);t.thissrc=o.attr("layer-img")||o.attr("src"),t.pid=o.attr("pid"),t.imgLen=r.length,t.imgsname=n.title||"",t.name=o.attr("layer-pname"),t.imgIndex=n.start+1}var l={type:1,border:[0],area:[(e.html?915:600)+"px","auto"],title:!1,shade:[.9,"#000",!0],shadeClose:!0,offset:["25px",""],bgcolor:"",page:{html:'<div class="xubox_bigimg"><img src="'+t.thissrc+'" alt="'+(t.name||"")+'" layer-pid="'+(t.pid||"")+'"><div class="xubox_imgsee">'+(t.imgLen>1?'<a href="" class="xubox_iconext xubox_prev"></a><a href="" class="xubox_iconext xubox_next"></a>':"")+'<div class="xubox_imgbar"><span class="xubox_imgtit"><a href="javascript:;">'+t.imgsname+" </a><em>"+t.imgIndex+"/"+t.imgLen+"</em></span></div></div></div>"+(e.html?'<div class="xubox_intro">'+e.html+"</div>":"")},success:function(i){t.bigimg=i.find(".xubox_bigimg"),t.imgsee=t.bigimg.find(".xubox_imgsee"),t.imgbar=t.imgsee.find(".xubox_imgbar"),t.imgtit=t.imgbar.find(".xubox_imgtit"),t.layero=i;var s=t.imgs=t.bigimg.find("img");clearTimeout(t.timerr),t.timerr=setTimeout(function(){$("html").css("overflow","hidden").attr("layer-full",t.index)},10),s.load(function(){t.imgarea=[s.outerWidth(),s.outerHeight()],t.resize(i),e.success&&e.success(a||n)}),t.event()},end:function(){layer.closeAll(),t.end=!0}};return t.event=function(){t.bigimg.hover(function(){t.imgsee.show()},function(){t.imgsee.hide()}),l.imgprev=function(){t.imgIndex--,t.imgIndex<1&&(t.imgIndex=t.imgLen),t.tabimg()},t.bigimg.find(".xubox_prev").on("click",function(e){e.preventDefault(),l.imgprev()}),l.imgnext=function(){t.imgIndex++,t.imgIndex>t.imgLen&&(t.imgIndex=1),t.tabimg()},t.bigimg.find(".xubox_next").on("click",function(e){e.preventDefault(),l.imgnext()}),$(document).keyup(function(e){if(!t.end){var i=e.keyCode;e.preventDefault(),37===i?l.imgprev():39===i?l.imgnext():27===i&&layer.close(t.index)}}),t.tabimg=function(){var e,i,n;if(t.imgs.removeAttr("style"),a){var o=s[t.imgIndex-1];e=o.src,i=o.pid,n=o.name}else{var l=r.eq(t.imgIndex-1);e=l.attr("layer-img")||l.attr("src"),i=l.attr("layer-pid")||"",n=l.attr("layer-pname")||""}t.imgs.attr({src:e,"layer-pid":i,alt:n}),t.imgtit.find("em").text(t.imgIndex+"/"+t.imgLen),t.imgsee.show()}},t.resize=function(a){var n={},s=[i.width(),i.height()];n.limit=s[0]-s[0]/s[1]*(60*s[0]/s[1]),n.limit<600&&(n.limit=600);var r=[n.limit,s[1]>400?s[1]-50:400];r[0]=e.html?r[0]:r[0]-300,layer.area(t.index,{width:r[0]+(e.html?15:0),height:r[1]}),n.flwidth=r[0]-(e.html?300:0),t.imgarea[0]>n.flwidth?t.imgs.css({width:n.flwidth}):t.imgs.css({width:t.imgarea[0]}),t.imgs.outerHeight()<r[1]&&t.imgs.css({top:(r[1]-t.imgs.outerHeight())/2}),t.imgs.css({visibility:"visible"}),t.bigimg.css({width:n.flwidth,height:r[1],"background-color":e.bgcolor}),e.html&&a.find(".xubox_intro").css({height:r[1]}),n=null,s=null,r=null},i.on("resize",function(){t.end||(t.timer&&clearTimeout(t.timer),t.timer=setTimeout(function(){t.resize(t.layero)},200))}),t.index=$.layer(l),t.index},layer.photosPage=function(e){var t={run:function(t){layer.photos({html:e.html,success:e.success,page:{title:e.title,id:e.id,start:t,parent:e.parent}})}};e=e||{},$(e.parent).find("img").each(function(e){$(this).on("click",function(){t.run(e)})})};