!function(t,i){function a(t,i,a){this.init.call(this,t,i,a)}function e(t,i,a){t.call(this,i,a),this.chart.polar&&(this.closeSegment=function(t){var i=this.xAxis.center;t.push("L",i[0],i[1])},this.closedStacks=!0)}function o(t,i){var a=this.chart,e=this.options.animation,o=this.group,n=this.markerGroup,r=this.xAxis.center,s=a.plotLeft,l=a.plotTop;a.polar?a.renderer.isSVG&&(!0===e&&(e={}),i?(a={translateX:r[0]+s,translateY:r[1]+l,scaleX:.001,scaleY:.001},o.attr(a),n&&(n.attrSetters=o.attrSetters,n.attr(a))):(a={translateX:s,translateY:l,scaleX:1,scaleY:1},o.animate(a,e),n&&n.animate(a,e),this.animate=null)):t.call(this,i)}var n=t.arrayMin,r=t.arrayMax,s=t.each,l=t.extend,h=t.merge,p=t.map,c=t.pick,d=t.pInt,u=t.getOptions().plotOptions,g=t.seriesTypes,f=t.extendClass,m=t.splat,y=t.wrap,x=t.Axis,b=t.Tick,A=t.Series,w=g.column.prototype,P=Math,v=P.round,L=P.floor,M=P.max,k=function(){};l(a.prototype,{init:function(t,i,a){var e=this,o=e.defaultOptions;e.chart=i,i.angular&&(o.background={}),e.options=t=h(o,t),(t=t.background)&&s([].concat(m(t)).reverse(),function(t){var i=t.backgroundColor,t=h(e.defaultBackgroundOptions,t);i&&(t.backgroundColor=i),t.color=t.backgroundColor,a.options.plotBands.unshift(t)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:Number.MIN_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});var C=x.prototype,b=b.prototype,S={getOffset:k,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:k,setCategories:k,setTitle:k},R={isRadial:!0,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,plotBands:[],tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,plotBands:[],showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},plotBands:[],showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(t){this.options=h(this.defaultOptions,this.defaultRadialOptions,t)},getOffset:function(){C.getOffset.call(this),this.chart.axisOffset[this.side]=0},getLinePath:function(t,i){var a=this.center,i=c(i,a[2]/2-this.offset);return this.chart.renderer.symbols.arc(this.left+a[0],this.top+a[1],i,i,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0})},setAxisTranslation:function(){C.setAxisTranslation.call(this),this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.isXAxis)&&(this.minPixelPadding=this.transA*this.minPointOffset+(this.reversed?(this.endAngleRad-this.startAngleRad)/4:0))},beforeSetTickPositions:function(){this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0)},setAxisSize:function(){C.setAxisSize.call(this),this.isRadial&&(this.center=this.pane.center=g.pie.prototype.getCenter.call(this.pane),this.len=this.width=this.height=this.isCircular?this.center[2]*(this.endAngleRad-this.startAngleRad)/2:this.center[2]/2)},getPosition:function(t,i){return this.isCircular||(i=this.translate(t),t=this.min),this.postTranslate(this.translate(t),c(i,this.center[2]/2)-this.offset)},postTranslate:function(t,i){var a=this.chart,e=this.center,t=this.startAngleRad+t;return{x:a.plotLeft+e[0]+Math.cos(t)*i,y:a.plotTop+e[1]+Math.sin(t)*i}},getPlotBandPath:function(t,i,a){var e,o=this.center,n=this.startAngleRad,r=o[2]/2,s=[c(a.outerRadius,"100%"),a.innerRadius,c(a.thickness,10)],l=/%$/,h=this.isCircular;return"polygon"===this.options.gridLineInterpolation?o=this.getPlotLinePath(t).concat(this.getPlotLinePath(i,!0)):(h||(s[0]=this.translate(t),s[1]=this.translate(i)),s=p(s,function(t){return l.test(t)&&(t=d(t,10)*r/100),t}),"circle"!==a.shape&&h?(t=n+this.translate(t),i=n+this.translate(i)):(t=-Math.PI/2,i=1.5*Math.PI,e=!0),o=this.chart.renderer.symbols.arc(this.left+o[0],this.top+o[1],s[0],s[0],{start:t,end:i,innerR:c(s[1],s[0]-s[2]),open:e})),o},getPlotLinePath:function(t,i){var a,e,o,n=this.center,r=this.chart,l=this.getPosition(t);return this.isCircular?o=["M",n[0]+r.plotLeft,n[1]+r.plotTop,"L",l.x,l.y]:"circle"===this.options.gridLineInterpolation?(t=this.translate(t))&&(o=this.getLinePath(0,t)):(a=r.xAxis[0],o=[],t=this.translate(t),n=a.tickPositions,a.autoConnect&&(n=n.concat([n[0]])),i&&(n=[].concat(n).reverse()),s(n,function(i,n){e=a.getPosition(i,t),o.push(n?"L":"M",e.x,e.y)})),o},getTitlePosition:function(){var t=this.center,i=this.chart,a=this.options.title;return{x:i.plotLeft+t[0]+(a.x||0),y:i.plotTop+t[1]-{high:.5,middle:.25,low:0}[a.align]*t[2]+(a.y||0)}}};y(C,"init",function(t,e,o){var n,r,s,p=e.angular,d=e.polar,u=o.isX,g=p&&u;s=e.options;var f=o.pane||0;p?(l(this,g?S:R),(r=!u)&&(this.defaultRadialOptions=this.defaultRadialGaugeOptions)):d&&(l(this,R),this.defaultRadialOptions=(r=u)?this.defaultRadialXOptions:h(this.defaultYAxisOptions,this.defaultRadialYOptions)),t.call(this,e,o),g||!p&&!d||(t=this.options,e.panes||(e.panes=[]),this.pane=(n=e.panes[f]=e.panes[f]||new a(m(s.pane)[f],e,this),f=n),f=f.options,e.inverted=!1,s.chart.zoomType=null,this.startAngleRad=e=(f.startAngle-90)*Math.PI/180,this.endAngleRad=s=(c(f.endAngle,f.startAngle+360)-90)*Math.PI/180,this.offset=t.offset||0,(this.isCircular=r)&&o.max===i&&s-e==2*Math.PI&&(this.autoConnect=!0))}),y(b,"getPosition",function(t,i,a,e,o){var n=this.axis;return n.getPosition?n.getPosition(a):t.call(this,i,a,e,o)}),y(b,"getLabelPosition",function(t,i,a,e,o,n,r,s,l){var h=this.axis,p=n.y,u=n.align,g=(h.translate(this.pos)+h.startAngleRad+Math.PI/2)/Math.PI*180%360;return h.isRadial?(t=h.getPosition(this.pos,h.center[2]/2+c(n.distance,-25)),"auto"===n.rotation?e.attr({rotation:g}):null===p&&(p=.9*d(e.styles.lineHeight)-e.getBBox().height/2),null===u&&(u=h.isCircular?g>20&&g<160?"left":g>200&&g<340?"right":"center":"center",e.attr({align:u})),t.x+=n.x,t.y+=p):t=t.call(this,i,a,e,o,n,r,s,l),t}),y(b,"getMarkPath",function(t,i,a,e,o,n,r){var s=this.axis;return s.isRadial?(t=s.getPosition(this.pos,s.center[2]/2+e),i=["M",i,a,"L",t.x,t.y]):i=t.call(this,i,a,e,o,n,r),i}),u.arearange=h(u.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:!0,dataLabels:{verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}}),g.arearange=t.extendClass(g.area,{type:"arearange",pointArrayMap:["low","high"],toYData:function(t){return[t.low,t.high]},pointValKey:"low",getSegments:function(){var t=this;s(t.points,function(i){t.options.connectNulls||null!==i.low&&null!==i.high?null===i.low&&null!==i.high&&(i.y=i.high):i.y=null}),A.prototype.getSegments.call(this)},translate:function(){var t=this.yAxis;g.area.prototype.translate.apply(this),s(this.points,function(i){var a=i.low,e=i.high,o=i.plotY;null===e&&null===a?i.y=null:null===a?(i.plotLow=i.plotY=null,i.plotHigh=t.translate(e,0,1,0,1)):null===e?(i.plotLow=o,i.plotHigh=null):(i.plotLow=o,i.plotHigh=t.translate(e,0,1,0,1))})},getSegmentPath:function(t){var i,a,e,o=[],n=t.length,r=A.prototype.getSegmentPath;e=this.options;var s=e.step;for(i=HighchartsAdapter.grep(t,function(t){return null!==t.plotLow});n--;)a=t[n],null!==a.plotHigh&&o.push({plotX:a.plotX,plotY:a.plotHigh});return t=r.call(this,i),s&&(!0===s&&(s="left"),e.step={left:"right",center:"center",right:"left"}[s]),o=r.call(this,o),e.step=s,e=[].concat(t,o),o[0]="L",this.areaPath=this.areaPath.concat(t,o),e},drawDataLabels:function(){var t,i,a=this.data,e=a.length,o=[],n=A.prototype,r=this.options.dataLabels,s=this.chart.inverted;if(r.enabled||this._hasPointLabels){for(t=e;t--;)i=a[t],i.y=i.high,i.plotY=i.plotHigh,o[t]=i.dataLabel,i.dataLabel=i.dataLabelUpper,i.below=!1,s?(r.align="left",r.x=r.xHigh):r.y=r.yHigh;for(n.drawDataLabels.apply(this,arguments),t=e;t--;)i=a[t],i.dataLabelUpper=i.dataLabel,i.dataLabel=o[t],i.y=i.low,i.plotY=i.plotLow,i.below=!0,s?(r.align="right",r.x=r.xLow):r.y=r.yLow;n.drawDataLabels.apply(this,arguments)}},alignDataLabel:g.column.prototype.alignDataLabel,getSymbol:g.column.prototype.getSymbol,drawPoints:k}),u.areasplinerange=h(u.arearange),g.areasplinerange=f(g.arearange,{type:"areasplinerange",getPointSpline:g.spline.prototype.getPointSpline}),u.columnrange=h(u.column,u.arearange,{lineWidth:1,pointRange:null}),g.columnrange=f(g.arearange,{type:"columnrange",translate:function(){var t,i=this,a=i.yAxis;w.translate.apply(i),s(i.points,function(e){var o,n=e.shapeArgs,r=i.options.minPointLength;e.plotHigh=t=a.translate(e.high,0,1,0,1),e.plotLow=e.plotY,o=t,e=e.plotY-t,e<r&&(r-=e,e+=r,o-=r/2),n.height=e,n.y=o})},trackerGroups:["group","dataLabels"],drawGraph:k,pointAttrToOptions:w.pointAttrToOptions,drawPoints:w.drawPoints,drawTracker:w.drawTracker,animate:w.animate,getColumnMetrics:w.getColumnMetrics}),u.gauge=h(u.line,{dataLabels:{enabled:!0,y:15,borderWidth:1,borderColor:"silver",borderRadius:3,style:{fontWeight:"bold"},verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1}),b={type:"gauge",pointClass:t.extendClass(t.Point,{setState:function(t){this.state=t}}),angular:!0,drawGraph:k,fixedBox:!0,trackerGroups:["group","dataLabels"],translate:function(){var t=this.yAxis,i=this.options,a=t.center;this.generatePoints(),s(this.points,function(e){var o=h(i.dial,e.dial),n=d(c(o.radius,80))*a[2]/200,r=d(c(o.baseLength,70))*n/100,s=d(c(o.rearLength,10))*n/100,l=o.baseWidth||3,p=o.topWidth||1,u=t.startAngleRad+t.translate(e.y,null,null,null,!0);!1===i.wrap&&(u=Math.max(t.startAngleRad,Math.min(t.endAngleRad,u))),u=180*u/Math.PI,e.shapeType="path",e.shapeArgs={d:o.path||["M",-s,-l/2,"L",r,-l/2,n,-p/2,n,p/2,r,l/2,-s,l/2,"z"],translateX:a[0],translateY:a[1],rotation:u},e.plotX=a[0],e.plotY=a[1]})},drawPoints:function(){var t=this,i=t.yAxis.center,a=t.pivot,e=t.options,o=e.pivot,n=t.chart.renderer;s(t.points,function(i){var a=i.graphic,o=i.shapeArgs,r=o.d,s=h(e.dial,i.dial);a?(a.animate(o),o.d=r):i.graphic=n[i.shapeType](o).attr({stroke:s.borderColor||"none","stroke-width":s.borderWidth||0,fill:s.backgroundColor||"black",rotation:o.rotation}).add(t.group)}),a?a.animate({translateX:i[0],translateY:i[1]}):t.pivot=n.circle(0,0,c(o.radius,5)).attr({"stroke-width":o.borderWidth||0,stroke:o.borderColor||"silver",fill:o.backgroundColor||"black"}).translate(i[0],i[1]).add(t.group)},animate:function(t){var i=this;t||(s(i.points,function(t){var a=t.graphic;a&&(a.attr({rotation:180*i.yAxis.startAngleRad/Math.PI}),a.animate({rotation:t.shapeArgs.rotation},i.options.animation))}),i.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup),g.pie.prototype.render.call(this),this.group.clip(this.chart.clipRect)},setData:g.pie.prototype.setData,drawTracker:g.column.prototype.drawTracker},g.gauge=t.extendClass(g.line,b),u.boxplot=h(u.column,{fillColor:"#FFFFFF",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},threshold:null,tooltip:{pointFormat:'<span style="color:{series.color};font-weight:bold">{series.name}</span><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",whiskerWidth:2}),g.boxplot=f(g.column,{type:"boxplot",pointArrayMap:["low","q1","median","q3","high"],toYData:function(t){return[t.low,t.q1,t.median,t.q3,t.high]},pointValKey:"high",pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth"},drawDataLabels:k,translate:function(){var t=this.yAxis,i=this.pointArrayMap;g.column.prototype.translate.apply(this),s(this.points,function(a){s(i,function(i){null!==a[i]&&(a[i+"Plot"]=t.translate(a[i],0,1,0,1))})})},drawPoints:function(){var t,a,e,o,n,r,l,h,p,d,u,g,f,m,y,x,b,A,w,P,M,k,C=this,S=C.points,R=C.options,X=C.chart.renderer,Y=!1!==C.doQuartiles,T=parseInt(C.options.whiskerLength,10)/100;s(S,function(s){p=s.graphic,M=s.shapeArgs,u={},m={},x={},k=s.color||C.color,s.plotY!==i&&(t=s.pointAttr[s.selected?"selected":""],b=M.width,A=L(M.x),w=A+b,P=v(b/2),a=L(Y?s.q1Plot:s.lowPlot),e=L(Y?s.q3Plot:s.lowPlot),o=L(s.highPlot),n=L(s.lowPlot),u.stroke=s.stemColor||R.stemColor||k,u["stroke-width"]=c(s.stemWidth,R.stemWidth,R.lineWidth),u.dashstyle=s.stemDashStyle||R.stemDashStyle,m.stroke=s.whiskerColor||R.whiskerColor||k,m["stroke-width"]=c(s.whiskerWidth,R.whiskerWidth,R.lineWidth),x.stroke=s.medianColor||R.medianColor||k,x["stroke-width"]=c(s.medianWidth,R.medianWidth,R.lineWidth),l=u["stroke-width"]%2/2,h=A+P+l,d=["M",h,e,"L",h,o,"M",h,a,"L",h,n,"z"],Y&&(l=t["stroke-width"]%2/2,h=L(h)+l,a=L(a)+l,e=L(e)+l,A+=l,w+=l,g=["M",A,e,"L",A,a,"L",w,a,"L",w,e,"L",A,e,"z"]),T&&(l=m["stroke-width"]%2/2,o+=l,n+=l,f=["M",h-P*T,o,"L",h+P*T,o,"M",h-P*T,n,"L",h+P*T,n]),l=x["stroke-width"]%2/2,r=v(s.medianPlot)+l,y=["M",A,r,"L",w,r,"z"],p?(s.stem.animate({d:d}),T&&s.whiskers.animate({d:f}),Y&&s.box.animate({d:g}),s.medianShape.animate({d:y})):(s.graphic=p=X.g().add(C.group),s.stem=X.path(d).attr(u).add(p),T&&(s.whiskers=X.path(f).attr(m).add(p)),Y&&(s.box=X.path(g).attr(t).add(p)),s.medianShape=X.path(y).attr(x).add(p)))})}}),u.errorbar=h(u.boxplot,{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:u.arearange.tooltip.pointFormat},whiskerWidth:null}),g.errorbar=f(g.boxplot,{type:"errorbar",pointArrayMap:["low","high"],toYData:function(t){return[t.low,t.high]},pointValKey:"high",doQuartiles:!1,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||g.column.prototype.getColumnMetrics.call(this)}}),u.waterfall=h(u.column,{lineWidth:1,lineColor:"#333",dashStyle:"dot",borderColor:"#333"}),g.waterfall=f(g.column,{type:"waterfall",upColorProp:"fill",pointArrayMap:["low","y"],pointValKey:"y",init:function(t,i){i.stacking=!0,g.column.prototype.init.call(this,t,i)},translate:function(){var t,i,a,e,o,n,r,s,l,h=this.options,p=this.yAxis;for(t=h.threshold,h=h.borderWidth%2/2,g.column.prototype.translate.apply(this),s=t,a=this.points,i=0,t=a.length;i<t;i++)e=a[i],o=e.shapeArgs,n=this.getStack(i),l=n.points[this.index],isNaN(e.y)&&(e.y=this.yData[i]),r=M(s,s+e.y)+l[0],o.y=p.translate(r,0,1),e.isSum||e.isIntermediateSum?(o.y=p.translate(l[1],0,1),o.height=p.translate(l[0],0,1)-o.y):s+=n.total,o.height<0&&(o.y+=o.height,o.height*=-1),e.plotY=o.y=v(o.y)-h,o.height=v(o.height),e.yBottom=o.y+o.height},processData:function(t){var i,a,e,o,n,r,s,l=this.yData,h=this.points,p=l.length,c=this.options.threshold||0;for(e=a=o=n=c,s=0;s<p;s++)r=l[s],i=h&&h[s]?h[s]:{},"sum"===r||i.isSum?l[s]=e:"intermediateSum"===r||i.isIntermediateSum?(l[s]=a,a=c):(e+=r,a+=r),o=Math.min(e,o),n=Math.max(e,n);A.prototype.processData.call(this,t),this.dataMin=o,this.dataMax=n},toYData:function(t){return t.isSum?"sum":t.isIntermediateSum?"intermediateSum":t.y},getAttribs:function(){g.column.prototype.getAttribs.apply(this,arguments);var i=this.options,a=i.states,e=i.upColor||this.color,i=t.Color(e).brighten(.1).get(),o=h(this.pointAttr),n=this.upColorProp;o[""][n]=e,o.hover[n]=a.hover.upColor||i,o.select[n]=a.select.upColor||e,s(this.points,function(t){t.y>0&&!t.color&&(t.pointAttr=o,t.color=e)})},getGraphPath:function(){var t,i,a,e=this.data,o=e.length,n=v(this.options.lineWidth+this.options.borderWidth)%2/2,r=[];for(a=1;a<o;a++)i=e[a].shapeArgs,t=e[a-1].shapeArgs,i=["M",t.x+t.width,t.y+n,"L",i.x,t.y+n],e[a-1].y<0&&(i[2]+=t.height,i[5]+=t.height),r=r.concat(i);return r},getExtremes:k,getStack:function(t){var i=this.yAxis.stacks,a=this.stackKey;return this.processedYData[t]<this.options.threshold&&(a="-"+a),i[a][t]},drawGraph:A.prototype.drawGraph}),u.bubble=h(u.scatter,{dataLabels:{inside:!0,style:{color:"white",textShadow:"0px 0px 3px black"},verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0}),g.bubble=f(g.scatter,{type:"bubble",pointArrayMap:["y","z"],trackerGroups:["group","dataLabelsGroup"],pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(i){var a=this.options.marker,e=c(a.fillOpacity,.5),i=i||a.fillColor||this.color;return 1!==e&&(i=t.Color(i).setOpacity(e).get("rgba")),i},convertAttribs:function(){var t=A.prototype.convertAttribs.apply(this,arguments);return t.fill=this.applyOpacity(t.fill),t},getRadii:function(t,i,a,e){var o,n,r,s=this.zData,l=[];for(n=0,o=s.length;n<o;n++)r=i-t,r=r>0?(s[n]-t)/(i-t):.5,l.push(P.ceil(a+r*(e-a))/2);this.radii=l},animate:function(t){var i=this.options.animation;t||(s(this.points,function(t){var a=t.graphic,t=t.shapeArgs;a&&t&&(a.attr("r",1),a.animate({r:t.r},i))}),this.animate=null)},translate:function(){var t,a,e,o=this.data,n=this.radii;for(g.scatter.prototype.translate.call(this),t=o.length;t--;)a=o[t],e=n?n[t]:0,a.negative=a.z<(this.options.zThreshold||0),e>=this.minPxSize/2?(a.shapeType="circle",a.shapeArgs={x:a.plotX,y:a.plotY,r:e},a.dlBox={x:a.plotX-e,y:a.plotY-e,width:2*e,height:2*e}):a.shapeArgs=a.plotY=a.dlBox=i},drawLegendSymbol:function(t,i){var a=d(t.itemStyle.fontSize)/2;i.legendSymbol=this.chart.renderer.circle(a,t.baseline-a,a).attr({zIndex:3}).add(i.legendGroup),i.legendSymbol.isMarker=!0},drawPoints:g.column.prototype.drawPoints,alignDataLabel:g.column.prototype.alignDataLabel}),x.prototype.beforePadding=function(){var t=this,a=this.len,e=this.chart,o=0,l=a,h=this.isXAxis,p=h?"xData":"yData",u=this.min,g={},f=P.min(e.plotWidth,e.plotHeight),m=Number.MAX_VALUE,y=-Number.MAX_VALUE,x=this.max-u,b=a/x,A=[];this.tickPositions&&(s(this.series,function(i){var a=i.options;"bubble"===i.type&&i.visible&&(t.allowZoomOutside=!0,A.push(i),h)&&(s(["minSize","maxSize"],function(t){var i=a[t],e=/%$/.test(i),i=d(i);g[t]=e?f*i/100:i}),i.minPxSize=g.minSize,i=i.zData,i.length&&(m=P.min(m,P.max(n(i),!1===a.displayNegative?a.zThreshold:-Number.MAX_VALUE)),y=P.max(y,r(i))))}),s(A,function(t){var i,a=t[p],e=a.length;if(h&&t.getRadii(m,y,g.minSize,g.maxSize),x>0)for(;e--;)i=t.radii[e],o=Math.min((a[e]-u)*b-i,o),l=Math.max((a[e]-u)*b+i,l)}),A.length&&x>0&&c(this.options.min,this.userMin)===i&&c(this.options.max,this.userMax)===i&&(l-=a,b*=(a+o-l)/a,this.min+=o/b,this.max+=l/b))};var X=A.prototype,u=t.Pointer.prototype;X.toXY=function(t){var i,a=this.chart;i=t.plotX;var e=t.plotY;t.rectPlotX=i,t.rectPlotY=e,t.clientX=(i/Math.PI*180+this.xAxis.pane.options.startAngle)%360,i=this.xAxis.postTranslate(t.plotX,this.yAxis.len-e),t.plotX=t.polarPlotX=i.x-a.plotLeft,t.plotY=t.polarPlotY=i.y-a.plotTop},X.orderTooltipPoints=function(t){this.chart.polar&&(t.sort(function(t,i){return t.clientX-i.clientX}),t[0])&&(t[0].wrappedClientX=t[0].clientX+360,t.push(t[0]))},y(g.area.prototype,"init",e),y(g.areaspline.prototype,"init",e),y(g.spline.prototype,"getPointSpline",function(t,i,a,e){var o,n,r,s,l,h,p;return this.chart.polar?(o=a.plotX,n=a.plotY,t=i[e-1],r=i[e+1],this.connectEnds&&(t||(t=i[i.length-2]),r||(r=i[1])),t&&r&&(s=t.plotX,l=t.plotY,i=r.plotX,h=r.plotY,s=(1.5*o+s)/2.5,l=(1.5*n+l)/2.5,r=(1.5*o+i)/2.5,p=(1.5*n+h)/2.5,i=Math.sqrt(Math.pow(s-o,2)+Math.pow(l-n,2)),h=Math.sqrt(Math.pow(r-o,2)+Math.pow(p-n,2)),s=Math.atan2(l-n,s-o),l=Math.atan2(p-n,r-o),p=Math.PI/2+(s+l)/2,Math.abs(s-p)>Math.PI/2&&(p-=Math.PI),s=o+Math.cos(p)*i,l=n+Math.sin(p)*i,r=o+Math.cos(Math.PI+p)*h,p=n+Math.sin(Math.PI+p)*h,a.rightContX=r,a.rightContY=p),e?(a=["C",t.rightContX||t.plotX,t.rightContY||t.plotY,s||o,l||n,o,n],t.rightContX=t.rightContY=null):a=["M",o,n]):a=t.call(this,i,a,e),a}),y(X,"translate",function(t){if(t.call(this),this.chart.polar&&!this.preventPostTranslate)for(var t=this.points,i=t.length;i--;)this.toXY(t[i])}),y(X,"getSegmentPath",function(t,i){var a=this.points;return this.chart.polar&&!1!==this.options.connectEnds&&i[i.length-1]===a[a.length-1]&&null!==a[0].y&&(this.connectEnds=!0,i=[].concat(i,[a[0]])),t.call(this,i)}),y(X,"animate",o),y(w,"animate",o),y(X,"setTooltipPoints",function(t,i){return this.chart.polar&&l(this.xAxis,{tooltipLen:360}),t.call(this,i)}),y(w,"translate",function(t){var i,a,e=this.xAxis,o=this.yAxis.len,n=e.center,r=e.startAngleRad,s=this.chart.renderer;if(this.preventPostTranslate=!0,t.call(this),e.isRadial)for(e=this.points,a=e.length;a--;)i=e[a],t=i.barX+r,i.shapeType="path",i.shapeArgs={d:s.symbols.arc(n[0],n[1],o-i.plotY,null,{start:t,end:t+i.pointWidth,innerR:o-c(i.yBottom,o)})},this.toXY(i)}),y(w,"alignDataLabel",function(t,i,a,e,o,n){this.chart.polar?(t=i.rectPlotX/Math.PI*180,null===e.align&&(e.align=t>20&&t<160?"left":t>200&&t<340?"right":"center"),null===e.verticalAlign&&(e.verticalAlign=t<45||t>315?"bottom":t>135&&t<225?"top":"middle"),X.alignDataLabel.call(this,i,a,e,o,n)):t.call(this,i,a,e,o,n)}),y(u,"getIndex",function(t,i){var a,e,o=this.chart;return o.polar?(e=o.xAxis[0].center,a=i.chartX-e[0]-o.plotLeft,o=i.chartY-e[1]-o.plotTop,a=180-Math.round(Math.atan2(a,o)/Math.PI*180)):a=t.call(this,i),a}),y(u,"getCoordinates",function(t,i){var a=this.chart,e={xAxis:[],yAxis:[]};return a.polar?s(a.axes,function(t){var o=t.isXAxis,n=t.center,r=i.chartX-n[0]-a.plotLeft,n=i.chartY-n[1]-a.plotTop;e[o?"xAxis":"yAxis"].push({axis:t,value:t.translate(o?Math.PI-Math.atan2(r,n):Math.sqrt(Math.pow(r,2)+Math.pow(n,2)),!0)})}):e=t.call(this,i),e})}(Highcharts);