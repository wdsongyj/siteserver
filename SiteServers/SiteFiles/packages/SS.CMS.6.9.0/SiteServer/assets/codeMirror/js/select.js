var select={};!function(){function e(e,t){for(;e&&e.parentNode!=t;)e=e.parentNode;return e}function t(t,n){for(;!t.previousSibling&&t.parentNode!=n;)t=t.parentNode;return e(t.previousSibling,n)}select.ie_selection=document.selection&&document.selection.createRangeCollection;var n=null;if(select.snapshotChanged=function(){n&&(n.changed=!0)},select.snapshotReplaceNode=function(e,t,o,r){function l(n){e==n.node&&(o&&n.offset>o?n.offset-=o:(n.node=t,n.offset+=r||0))}n&&(n.changed=!0,l(n.start),l(n.end))},select.snapshotMove=function(e,t,o,r,l){function c(n){e!=n.node||l&&0!=n.offset||(n.node=t,n.offset=r?Math.max(0,n.offset+o):o)}n&&(n.changed=!0,c(n.start),c(n.end))},select.ie_selection){function o(e,t){var n=e.document.selection.createRange();function o(e){for(var t=null;!t&&e;)t=e.nextSibling,e=e.parentNode;return r(t)}function r(e){for(;e&&e.firstChild;)e=e.firstChild;return{node:e,offset:0}}n.collapse(t);var l=n.parentElement();if(!isAncestor(e.document.body,l))return null;if(!l.firstChild)return r(l);var c=n.duplicate();c.moveToElementText(l),c.collapse(!0);for(var s=l.firstChild;s;s=s.nextSibling){if(3==s.nodeType){var a=s.nodeValue.length;c.move("character",a)}else c.moveToElementText(s),c.collapse(!1);var i=n.compareEndPoints("StartToStart",c);if(0==i)return o(s);if(1!=i)return 3!=s.nodeType?r(s):(c.setEndPoint("StartToEnd",n),{node:s,offset:a-c.text.length})}return o(l)}function r(e,t){var n=e.document.selection;if(n){var o=n.createRange();o.pasteHTML(t),o.collapse(!1),o.select()}}select.markSelection=function(e){if(n=null,e.document.selection){var t=o(e,!0),r=o(e,!1);t&&r&&(n={start:t,end:r,window:e,changed:!1})}},select.selectMarked=function(){if(n&&n.changed){var e=o(n.start),t=o(n.end);e.setEndPoint("StartToEnd",t),e.select()}function o(e){var t=n.window.document.body.createTextRange(),o=e.node;if(o)if(3==o.nodeType){t.moveToElementText(o.parentNode);for(var r=e.offset;o.previousSibling;)r+=((o=o.previousSibling).innerText||"").length;t.move("character",r)}else t.moveToElementText(o),t.collapse(!0);else t.moveToElementText(n.window.document.body),t.collapse(!1);return t}},select.selectionTopNode=function(n,o){var r=n.ownerDocument.selection;if(!r)return!1;var l=r.createRange();l.collapse(o);var c=l.parentElement();if(c&&isAncestor(n,c)){var s=l.duplicate();if(s.moveToElementText(c),-1==l.compareEndPoints("StartToStart",s))return e(c,n)}try{l.pasteHTML("<span id='xxx-temp-xxx'></span>")}catch(e){return!1}var a=n.ownerDocument.getElementById("xxx-temp-xxx");if(a){var i=t(a,n);return removeElement(a),i}return!1},select.focusAfterNode=function(e,t){var n=t.ownerDocument.body.createTextRange();n.moveToElementText(e||t),n.collapse(!e),n.select()},select.somethingSelected=function(e){var t=e.document.selection;return t&&""!=t.createRange().text},select.insertNewlineAtCursor=function(e){r(e,"<br>")},select.insertTabAtCursor=function(e){r(e,"    ")},select.cursorPos=function(e,t){var n=e.ownerDocument.selection;if(!n)return null;for(var o=select.selectionTopNode(e,t);o&&"BR"!=o.nodeName;)o=o.previousSibling;var r=n.createRange(),l=r.duplicate();if(r.collapse(t),o)l.moveToElementText(o),l.collapse(!1);else{try{l.moveToElementText(e)}catch(e){return null}l.collapse(!0)}return r.setEndPoint("StartToStart",l),{node:o,offset:r.text.length}},select.setCursorPos=function(e,t,n){function o(t){var n=e.ownerDocument.body.createTextRange();return t.node?(n.moveToElementText(t.node),n.collapse(!1)):(n.moveToElementText(e),n.collapse(!0)),n.move("character",t.offset),n}var r=o(t);n&&n!=t&&r.setEndPoint("EndToEnd",o(n)),r.select()},select.scrollToCursor=function(e){var t=e.ownerDocument.selection;if(!t)return null;t.createRange().scrollIntoView()},select.scrollToNode=function(e){e&&e.scrollIntoView()},select.selectionCoords=function(e){var t=e.document.selection;if(!t)return null;var n=t.createRange(),o=n.duplicate();n.collapse(!0),o.collapse(!1);var r=e.document.body;return{start:{x:n.boundingLeft+r.scrollLeft-1,y:n.boundingTop+r.scrollTop},end:{x:o.boundingLeft+r.scrollLeft-1,y:o.boundingTop+r.scrollTop}}},select.selectCoords=function(e,t){if(t){var n=e.document.body.createTextRange(),o=n.duplicate();try{n.moveToPoint(t.start.x,t.start.y),o.moveToPoint(t.end.x,t.end.y),n.setEndPoint("EndToStart",o),n.select()}catch(e){alert(e.message)}}}}else{function l(e,t){var n=t.getSelection();n.removeAllRanges(),n.addRange(e)}function c(e){var t=e.getSelection();return!(!t||0==t.rangeCount)&&t.getRangeAt(0)}function s(e,t){var n=c(e);n&&(n.deleteContents(),n.insertNode(t),webkitLastLineHack(e.document.body),(n=e.document.createRange()).selectNode(t),n.collapse(!1),l(n,e))}select.markSelection=function(e){var t=e.getSelection();if(!t||0==t.rangeCount)return n=null;var o=t.getRangeAt(0);function r(e){for(;3!=e.node.nodeType&&"BR"!=e.node.nodeName;){var t=e.node.childNodes[e.offset]||e.node.nextSibling;for(e.offset=0;!t&&e.node.parentNode;)e.node=e.node.parentNode,t=e.node.nextSibling;if(e.node=t,!t)break}}r((n={start:{node:o.startContainer,offset:o.startOffset},end:{node:o.endContainer,offset:o.endOffset},window:e,changed:!1}).start),r(n.end)},select.selectMarked=function(){if(n&&n.changed){var e=n.window,t=e.document.createRange();o(n.end,"End"),o(n.start,"Start"),l(t,e)}function o(n,o){n.node?0==n.offset?t["set"+o+"Before"](n.node):t["set"+o](n.node,n.offset):t.setStartAfter(e.document.body.lastChild||e.document.body)}},select.selectionTopNode=function(n,o){var r=c(n.ownerDocument.defaultView);if(!r)return!1;var l=o?r.startContainer:r.endContainer,s=o?r.startOffset:r.endOffset;return window.opera&&!o&&r.endContainer==n&&r.endOffset==r.startOffset+1&&n.childNodes[r.startOffset]&&"BR"==n.childNodes[r.startOffset].nodeName&&s--,3==l.nodeType?s>0?e(l,n):t(l,n):"HTML"==l.nodeName?1==s?null:n.lastChild:l==n?0==s?null:l.childNodes[s-1]:s==l.childNodes.length?e(l,n):0==s?t(l,n):e(l.childNodes[s-1],n)},select.focusAfterNode=function(e,t){var n=t.ownerDocument.defaultView,o=n.document.createRange();o.setStartBefore(t.firstChild||t),e&&!e.firstChild?o.setEndAfter(e):e?o.setEnd(e,e.childNodes.length):o.setEndBefore(t.firstChild||t),o.collapse(!1),l(o,n)},select.somethingSelected=function(e){var t=c(e);return t&&!t.collapsed},select.insertNewlineAtCursor=function(e){s(e,e.document.createElement("BR"))},select.insertTabAtCursor=function(e){s(e,e.document.createTextNode("    "))},select.cursorPos=function(e,t){var n=c(window);if(n){for(var o=select.selectionTopNode(e,t);o&&"BR"!=o.nodeName;)o=o.previousSibling;return(n=n.cloneRange()).collapse(t),o?n.setStartAfter(o):n.setStartBefore(e),{node:o,offset:n.toString().length}}},select.setCursorPos=function(e,t,n){var o=e.ownerDocument.defaultView,r=o.document.createRange();function c(t,n,o){if(t=t?t.nextSibling:e.firstChild){if(0==n)return r["set"+o+"Before"](t),!0;for(var l=[];;){for(;t&&!l.length;)a(t),t=t.nextSibling;var c=l.shift();if(!c)return!1;var s=c.nodeValue.length;if(s>=n)return r["set"+o](c,n),!0;n-=s}}function a(e){3==e.nodeType?l.push(e):forEach(e.childNodes,a)}}c((n=n||t).node,n.offset,"End")&&c(t.node,t.offset,"Start")&&l(r,o)},select.scrollToNode=function(e){if(e){for(var t=e.ownerDocument,n=t.body,o=t.defaultView,r=t.documentElement;e&&!e.offsetTop;)e=e.previousSibling;for(var l=0,c=e;c&&c.offsetParent;)l+=c.offsetTop,c=c.offsetParent;var s=l-(n.scrollTop||r.scrollTop||0);(s<0||s>o.innerHeight-30)&&o.scrollTo(n.scrollLeft||r.scrollLeft||0,l)}},select.scrollToCursor=function(e){select.scrollToNode(select.selectionTopNode(e,!0)||e.firstChild)}}}();