var pageUtils={getQueryStringByName:function(e){var t=location.search.match(new RegExp("[?&]"+e+"=([^&]+)","i"));return!t||t.length<1?"":decodeURIComponent(t[1])},loading:function(e){if(e)return layer.load(1,{shade:[.2,"#000"]});layer.close(layer.index)},closeLayer:function(){return parent.layer.closeAll(),!1},openLayer:function(e){return!(!e||!e.url)&&(e.width||(e.width=$(window).width()-50),e.height||(e.height=$(window).height()-50),layer.open({type:2,btn:null,title:e.title,area:[e.width+"px",e.height+"px"],fixed:!1,maxmin:!0,shadeClose:!0,content:e.url}),!1)},alertDelete:function(e){return!!e&&(swal({title:e.title,text:e.text,icon:"warning",buttons:{cancel:{text:"取 消",visible:!0,className:"btn"},confirm:{text:"确认删除",visible:!0,className:"btn btn-danger"}}}).then(function(t){t&&e.callback()}),!1)}};