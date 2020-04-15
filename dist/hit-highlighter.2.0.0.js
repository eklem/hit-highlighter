var highlight=function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n){const e={itemMaxWords:0,truncateStart:"",truncateEnd:"... ",hitPaddingMin:5,highlightStart:'<span class="hitHighlight">',highlightEnd:"</span>",divider:" "},r=function(t,n,e){return t>n.itemMaxWords&&0!==n.itemMaxWords},i=function(t,n,e){return t=t.map((function(t,r){const i={word:t};return n.find((function(n){return t===n}))&&(i.highlightable=!0,e.hitCount=e.hitCount+1),i}))},o=function(t,n){for(let e=0;e<t.length;e++)e>0&&t[e].highlightable&&t[e-1].highlightable&&(t[e].word=t[e-1].word+n.divider+t[e].word,t.splice(e-1,1),e-=1),t[e].highlightable&&(t[e].index=e);return t},d=function(t,n){return t=t.map((function(t,e){return t.highlightable&&(t.word=n.highlightStart+t.word+n.highlightEnd),t}))},l=function(t,n,e){for(let r=0;r<t.length;r++)t[r].paddStart=Math.max(t[r].index-e.hitPaddingMin,0),t[r].paddEnd=Math.min(t[r].index+e.hitPaddingMin+1,n);return t},u=function(t,n){return!(t.length*(2*n.hitPaddingMin+1)>n.itemMaxWords)},a=function(t,n){const e=t.length*(2*n.hitPaddingMin+1),r=2*n.hitPaddingMin+1,i=e-n.itemMaxWords,o=t.length-Math.ceil(i/r);return t=t.slice(0,o)},h=function(t,n,e){return Math.floor((e.itemMaxWords-(t*(2*e.hitPaddingMin)+1))/t/2)},c=function(t){for(let n=0;n<t.length;n++)n>0&&t[n].paddStart<=t[n-1].paddEnd&&(t[n].paddStart=t[n-1].paddStart,console.log("Debugging joinOverlappingPadding"),console.log(t[n]),console.log(n),console.log("hitArr.paddEnd: "+t[n].paddEnd),t.splice(n-1,1),n-=1);return t},g=function(t,n,e){for(let r=0;r<t.length;r++)e[r]=n.slice(t[r].paddStart,t[r].paddEnd);return e},f=function(t,n){let e="";for(let r=0;r<t.length;r++)e+=t[r].word+n;return e},s=function(t,n,e,r){let i=[];for(let o=0;o<t.length;o++){let d="";for(let n=0;n<t[o].length;n++)d+=t[o][n].word+r;i+=n+d+e}return i};t.exports=function(t,n,p){p={...e,...p};const M={hitCount:0,truncate:!1,keepAllQueryWords:!0,toLittlePadding:!1};let b=[],y=[],m="";return M.truncate=r(n.length,p),n=i(n,t,M),n=o(n,p),b=(n=d(n,p)).filter(t=>t.highlightable),M.keepAllQueryWords=u(b,p),M.truncate?M.truncate&&M.keepAllQueryWords?(console.log("### Case - Truncat but keep all query word hits ###"),p.hitPaddingMin=p.hitPaddingMin+h(b.length,n.length,p),b=l(b,n.length,p),b=c(b),y=g(b,n,y),m=s(y,p.truncateStart,p.truncateEnd,p.divider),m):M.truncate&&!M.keepAllQueryWords?(console.log("### Case - Truncat and cut off some query word hits ###"),b=a(b,p),b=l(b,n.length,p),b=c(b),y=g(b,n,y),m=s(y,p.truncateStart,p.truncateEnd,p.divider),m):void 0:(console.log("### Case - Just highlight ###"),m=f(n,p.divider),m)}}]);