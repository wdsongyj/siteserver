var $apiUrl=utils.getQueryString("apiUrl"),$siteId=utils.getQueryString("siteId"),$channelId=utils.getQueryString("channelId"),$contentId=utils.getQueryString("contentId"),$formId=utils.getQueryString("formId"),$returnUrl=utils.getQueryString("returnUrl"),data={pageConfig:null,pageLoad:!1,pageAlert:null,pageType:"list",formInfo:null,fieldInfoList:[],administratorSmsAttributeNames:null,administratorSmsNotifyKeys:null},methods={submit:function(){var t=this,i={siteId:$siteId,channelId:$channelId,contentId:$contentId,formId:$formId,type:this.pageType};"isClosed"===this.pageType?i.isClosed=this.formInfo.additional.isClosed:"title"===this.pageType?i.title=this.formInfo.title:"description"===this.pageType?i.description=this.formInfo.description:"isReply"===this.pageType?i.isReply=this.formInfo.isReply:"isTimeout"===this.pageType?(i.isTimeout=this.formInfo.additional.isTimeout,i.timeToStart=this.formInfo.additional.timeToStart,i.timeToEnd=this.formInfo.additional.timeToEnd):"isCaptcha"===this.pageType?i.isCaptcha=this.formInfo.additional.isCaptcha:"isAdministratorSmsNotify"===this.pageType&&(i.isAdministratorSmsNotify=this.formInfo.additional.isAdministratorSmsNotify,i.administratorSmsNotifyTplId=this.formInfo.additional.administratorSmsNotifyTplId,i.administratorSmsNotifyKeys=this.administratorSmsNotifyKeys.join(","),i.administratorSmsNotifyMobile=this.formInfo.additional.administratorSmsNotifyMobile),utils.loading(!0),$api.post(i,function(i,e){utils.loading(!1),i?t.pageAlert={type:"danger",html:i.message}:(t.pageType="list",alert({toast:!0,type:"success",title:"设置保存成功",showConfirmButton:!1,timer:2e3}))})},btnLayerClick:function(t){this.pageAlert=null;var i="pages/contentAddLayer"+t.name+".html?siteId="+this.site.id+"&channelId="+this.channel.id;t.contentId&&(i+="&contentId="+t.contentId),t.args&&_.forIn(t.args,function(t,e){i+="&"+e+"="+encodeURIComponent(t)}),utils.openLayer({title:t.title,url:i,full:t.full,width:t.width?t.width:700,height:t.height?t.height:500})},btnSubmitClick:function(){var t=this;this.pageAlert=null,this.$validator.validate().then(function(i){i&&t.submit()})},getAttributeText:function(t){return"AddDate"===t?"添加时间":t},btnNavClick:function(t){location.href=t+"?siteId="+$siteId+"&channelId="+$channelId+"&contentId="+$contentId+"&formId="+$formId+"&apiUrl="+encodeURIComponent($apiUrl)+"&returnUrl="+encodeURIComponent($returnUrl)}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){var t=this;ssUtils.getToken()?$ssApi.get($urlStatus).then(function(i){var e=i.data;t.pageConfig=e.value,t.pageLoad=!0}).catch(function(t){location.href="login.cshtml?returnUrl="+encodeURIComponent(location.href)}):location.href="login.cshtml?returnUrl="+encodeURIComponent(location.href)}});