var $api=new apiUtils.Api(apiUrl+"/pages/cms/contentsLayerImport"),$uploadUrl=apiUrl+"/pages/cms/contentsLayerImport",data={siteId:parseInt(pageUtils.getQueryString("siteId")),channelId:parseInt(pageUtils.getQueryString("channelId")),pageLoad:!1,pageAlert:null,checkedLevels:null,importType:"zip",file:null,files:[],checkedLevel:null,isOverride:!1},methods={loadConfig:function(){var e=this;e.pageLoad=!0,$api.get({siteId:e.siteId,channelId:e.channelId},function(t,a){!t&&a&&a.value&&(e.checkedLevels=a.checkedLevels,e.checkedLevel=a.value,e.loadUploader())})},loadUploader:function(){var e=this,t=Q.event,a=Q.Uploader,i=document.getElementById("drop-area"),n=new a({url:$uploadUrl+"/actions/upload?siteId="+e.siteId+"&channelId="+e.channelId,target:document.getElementById("drop-area"),allows:".zip,.csv,.txt",on:{add:function(t){if(t.ext!="."+e.importType)return alert({title:"文件错误！",text:"允许上传的文件格式为：."+e.importType,type:"error",showConfirmButton:!1}),!1},complete:function(t){var a=t.json;if(!a||1!=a.ret)return alert({title:"文件上传失败！",type:"error",showConfirmButton:!1});a&&a.fileName&&e.files.push(a)}}});a.support.html5&&n.html5?(t.add(i,"dragleave",t.stop),t.add(i,"dragenter",t.stop),t.add(i,"dragover",t.stop),t.add(i,"drop",function(e){t.stop(e);var a=e.dataTransfer.files;n.addList(a)})):i.innerHTML="点击批量上传文件"},del:function(e){this.files.splice(this.files.indexOf(e),1)},getFileNames:function(){for(var e=[],t=0;t<this.files.length;t++)e.push(this.files[t].fileName);return e},btnSubmitClick:function(){var e=this;if(this.pageAlert=null,!this.getFileNames().join(","))return alert({title:"请选择需要导入的文件！",type:"warning",showConfirmButton:!1});parent.pageUtils.loading(!0),$api.post({siteId:e.siteId,channelId:e.channelId,importType:e.importType,fileNames:e.getFileNames(),checkedLevel:e.checkedLevel,isOverride:e.isOverride},function(t,a){if(parent.pageUtils.loading(!1),t)return e.pageAlert={type:"danger",html:a.message};parent.location.reload(!0)})}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.loadConfig()}});