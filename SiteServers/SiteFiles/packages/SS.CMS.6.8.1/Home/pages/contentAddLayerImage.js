var $api=new utils.Api("/home/contentAddLayerImage"),$uploadUrl=utils.getApiUrl("/home/contentAddLayerImage"),data={siteId:parseInt(utils.getQueryString("siteId")),channelId:parseInt(utils.getQueryString("channelId")),attributeName:utils.getQueryString("attributeName"),inputType:utils.getQueryString("inputType"),pageLoad:!1,pageAlert:null,file:null,files:[],isFix:!0,fixWidth:"300",fixHeight:"",isEditor:!0,editorIsFix:!0,editorFixWidth:"500",editorFixHeight:"",editorIsLinkToOriginal:!1},methods={loadConfig:function(){var i=this;i.pageLoad=!0,$api.get({siteId:i.siteId,channelId:i.channelId},function(t,e){!t&&e&&e.value&&(i.isFix=e.value.configImageIsFix,i.fixWidth=e.value.configImageFixWidth,i.fixHeight=e.value.configImageFixHeight,i.isEditor=e.value.configImageIsEditor,i.editorIsFix=e.value.configImageEditorIsFix,i.editorFixWidth=e.value.configImageEditorFixWidth,i.editorFixHeight=e.value.configImageEditorFixHeight,i.editorIsLinkToOriginal=e.value.configImageEditorIsLinkToOriginal,i.loadUploader())})},loadUploader:function(){var i=this,t=Q.event,e=Q.Uploader,n=document.getElementById("drop-area"),o=new e({url:$uploadUrl+"/actions/upload?siteId="+i.siteId+"&channelId="+i.channelId+"&userToken="+utils.getToken(),target:document.getElementById("drop-area"),allows:".gif,.jpg,.jpeg,.bmp,.png,.pneg,.webp",multiple:"TextEditor"===i.inputType,on:{select:function(){return!("TextEditor"!==i.inputType&&i.files.length>0)},add:function(i){if(i.disabled)return alert({title:"文件错误！",text:"允许上传的文件格式为："+this.ops.allows,type:"error",showConfirmButton:!1})},complete:function(t){var e=t.json;if(!(e&&e.path&&e.url))return alert({title:"图片传失败！",type:"error",showConfirmButton:!1});i.files.push(e)}}});e.support.html5&&o.html5?(t.add(n,"dragleave",t.stop),t.add(n,"dragenter",t.stop),t.add(n,"dragover",t.stop),t.add(n,"drop",function(i){t.stop(i);var e=i.dataTransfer.files;o.addList(e)})):n.innerHTML="点击批量上传图片"},del:function(i){this.files.splice(this.files.indexOf(i),1)},getFilePaths:function(){for(var i=[],t=0;t<this.files.length;t++)i.push(this.files[t].path);return i},btnSubmitClick:function(){var i=this,t=this.getFilePaths().join(",");if(!t)return alert({title:"请选择需要上传的图片！",type:"warning",showConfirmButton:!1});top.utils.loading(!0),$api.post({siteId:i.siteId,channelId:i.channelId,isFix:i.isFix,fixWidth:i.fixWidth,fixHeight:i.fixHeight,isEditor:i.isEditor,editorIsFix:i.editorIsFix,editorFixWidth:i.editorFixWidth,editorFixHeight:i.editorFixHeight,editorIsLinkToOriginal:i.editorIsLinkToOriginal,filePaths:t},function(t,e){if(top.utils.loading(!1),!t&&e&&e.value){var n=top.getContentWindow(),o=i.attributeName;if("TextEditor"!=i.inputType){o="Content";for(var a=0;a<e.value.length;a++){var r=e.value[a];n.setValue(i.attributeName,r)}}var d=n.UE.getEditor(o);if(d&&"function"==typeof d.execCommand)for(a=0;a<e.editors.length;a++){var l=e.editors[a],s='<img src="'+l.imageUrl+'" border="0" />';i.editorIsFix&&i.editorIsLinkToOriginal&&(s='<a href="'+l.originalUrl+'" target="_blank">'+s+"</a>"),d.execCommand("insertHTML",s)}top.layer.closeAll()}})}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.loadConfig()}});