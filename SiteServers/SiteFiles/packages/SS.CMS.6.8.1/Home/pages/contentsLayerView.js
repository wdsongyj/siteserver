var $api=new utils.Api("/home/contentsLayerView");Object.defineProperty(Object.prototype,"getProp",{value:function(t){var e;for(e in this)if(e.toLowerCase()==t.toLowerCase())return this[e]}});var data={siteId:parseInt(utils.getQueryString("siteId")),channelId:parseInt(utils.getQueryString("channelId")),contentId:parseInt(utils.getQueryString("contentId")),pageLoad:!1,pageAlert:null,content:null,channelName:null,attributes:null},methods={loadConfig:function(){var t=this;$api.get({siteId:t.siteId,channelId:t.channelId,contentId:t.contentId},function(e,n){!e&&n&&n.value&&(t.content=n.value,t.channelName=n.channelName,t.attributes=n.attributes,t.pageLoad=!0)})}};new Vue({el:"#main",data:data,methods:methods,created:function(){this.loadConfig()}});