define("echarts/chart/heatmap",["require","./base","../layer/heatmap","../config","../util/ecData","zrender/tool/util","zrender/tool/color","zrender/shape/Image","../chart"],function(t){function e(t,e,a,o,r){i.call(this,t,e,a,o,r),this.refresh(o)}var i=t("./base"),a=t("../layer/heatmap"),o=t("../config"),r=(t("../util/ecData"),t("zrender/tool/util")),n=(t("zrender/tool/color"),t("zrender/shape/Image"));return o.heatmap={zlevel:0,z:2,clickable:!0},e.prototype={type:o.CHART_TYPE_HEATMAP,refresh:function(t){this.clear(),t&&(this.option=t,this.series=t.series),this._init()},_init:function(){var t=this.series;this.backupShapeList();for(var e=t.length,i=0;e>i;++i)if(t[i].type===o.CHART_TYPE_HEATMAP){t[i]=this.reformOption(t[i]);var r=new a(t[i]),h=r.getCanvas(t[i].data,this.zr.getWidth(),this.zr.getHeight()),s=new n({position:[0,0],scale:[1,1],hoverable:this.option.hoverable,style:{x:0,y:0,image:h,width:h.width,height:h.height}});this.shapeList.push(s)}this.addShapeList()}},r.inherits(e,i),t("../chart").define("heatmap",e),e}),define("echarts/layer/heatmap",["require"],function(){function t(t){if(this.option=t,t)for(var i in e)this.option[i]=void 0!==t[i]?t[i]:e[i];else this.option=e}var e={blurSize:30,gradientColors:["blue","cyan","lime","yellow","red"],minAlpha:.05,valueScale:1,opacity:1};return t.prototype={getCanvas:function(t,e,i){var a=this._getBrush(),o=this._getGradient(),r=20+this.option.blurSize,n=document.createElement("canvas");n.width=e,n.height=i;for(var h=n.getContext("2d"),s=t.length,l=0;s>l;++l){var d=t[l],g=d[0],p=d[1],c=d[2],u=Math.min(1,Math.max(c*this.option.valueScale||this.option.minAlpha,this.option.minAlpha));h.globalAlpha=u,h.drawImage(a,g-r,p-r)}for(var f=h.getImageData(0,0,n.width,n.height),v=f.data,s=v.length/4;s--;){var m=4*s+3,u=v[m]/256,C=Math.floor(255*u);v[m-3]=o[4*C],v[m-2]=o[4*C+1],v[m-1]=o[4*C+2],v[m]*=this.option.opacity}return h.putImageData(f,0,0),n},_getBrush:function(){if(!this._brushCanvas){this._brushCanvas=document.createElement("canvas");var t=20+this.option.blurSize,e=2*t;this._brushCanvas.width=e,this._brushCanvas.height=e;var i=this._brushCanvas.getContext("2d");i.shadowOffsetX=e,i.shadowBlur=this.option.blurSize,i.shadowColor="black",i.beginPath(),i.arc(-t,t,20,0,2*Math.PI,!0),i.closePath(),i.fill()}return this._brushCanvas},_getGradient:function(){if(!this._gradientPixels){var t=256,e=document.createElement("canvas");e.width=1,e.height=t;for(var i=e.getContext("2d"),a=i.createLinearGradient(0,0,0,t),o=this.option.gradientColors.length,r=0;o>r;++r)"string"==typeof this.option.gradientColors[r]?a.addColorStop((r+1)/o,this.option.gradientColors[r]):a.addColorStop(this.option.gradientColors[r].offset,this.option.gradientColors[r].color);i.fillStyle=a,i.fillRect(0,0,1,t),this._gradientPixels=i.getImageData(0,0,1,t).data}return this._gradientPixels}},t}),define("echarts/layer/heatmap",["require"],function(){function t(t){if(this.option=t,t)for(var i in e)this.option[i]=void 0!==t[i]?t[i]:e[i];else this.option=e}var e={blurSize:30,gradientColors:["blue","cyan","lime","yellow","red"],minAlpha:.05,valueScale:1,opacity:1};return t.prototype={getCanvas:function(t,e,i){var a=this._getBrush(),o=this._getGradient(),r=20+this.option.blurSize,n=document.createElement("canvas");n.width=e,n.height=i;for(var h=n.getContext("2d"),s=t.length,l=0;s>l;++l){var d=t[l],g=d[0],p=d[1],c=d[2],u=Math.min(1,Math.max(c*this.option.valueScale||this.option.minAlpha,this.option.minAlpha));h.globalAlpha=u,h.drawImage(a,g-r,p-r)}for(var f=h.getImageData(0,0,n.width,n.height),v=f.data,s=v.length/4;s--;){var m=4*s+3,u=v[m]/256,C=Math.floor(255*u);v[m-3]=o[4*C],v[m-2]=o[4*C+1],v[m-1]=o[4*C+2],v[m]*=this.option.opacity}return h.putImageData(f,0,0),n},_getBrush:function(){if(!this._brushCanvas){this._brushCanvas=document.createElement("canvas");var t=20+this.option.blurSize,e=2*t;this._brushCanvas.width=e,this._brushCanvas.height=e;var i=this._brushCanvas.getContext("2d");i.shadowOffsetX=e,i.shadowBlur=this.option.blurSize,i.shadowColor="black",i.beginPath(),i.arc(-t,t,20,0,2*Math.PI,!0),i.closePath(),i.fill()}return this._brushCanvas},_getGradient:function(){if(!this._gradientPixels){var t=256,e=document.createElement("canvas");e.width=1,e.height=t;for(var i=e.getContext("2d"),a=i.createLinearGradient(0,0,0,t),o=this.option.gradientColors.length,r=0;o>r;++r)"string"==typeof this.option.gradientColors[r]?a.addColorStop((r+1)/o,this.option.gradientColors[r]):a.addColorStop(this.option.gradientColors[r].offset,this.option.gradientColors[r].color);i.fillStyle=a,i.fillRect(0,0,1,t),this._gradientPixels=i.getImageData(0,0,1,t).data}return this._gradientPixels}},t});