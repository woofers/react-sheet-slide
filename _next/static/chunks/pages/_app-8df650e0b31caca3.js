(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{6840:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return c(9407)}])},5394:function(e,d,a){"use strict";a.d(d,{f:function(){return v},F:function(){return u}});var f=a(5893),b=a(5892),c=a(7294);let g=["light","dark"],h="(prefers-color-scheme: dark)",i="undefined"==typeof window,j=(0,c.createContext)(void 0),k={setTheme(a){},themes:[]},l=()=>{var a;return null!==(a=(0,c.useContext)(j))&& void 0!==a?a:k},m=a=>(0,c.useContext)(j)?c.createElement(c.Fragment,null,a.children):c.createElement(n,a),n=({forcedTheme:a,disableTransitionOnChange:m=!1,enableSystem:d=!0,enableColorScheme:n=!0,storageKey:s="theme",themes:e=["light","dark"],defaultTheme:t=d?"system":"light",attribute:u="data-theme",value:f,children:i,nonce:v})=>{let[b,y]=(0,c.useState)(()=>p(s,t)),[k,z]=(0,c.useState)(()=>p(s)),w=f?Object.values(f):e,A=(0,c.useCallback)(e=>{let a=e;if(!a)return;"system"===e&&d&&(a=r());let c=f?f[a]:a,h=m?q():null,b=document.documentElement;if("class"===u?(b.classList.remove(...w),c&&b.classList.add(c)):c?b.setAttribute(u,c):b.removeAttribute(u),n){let i=g.includes(t)?t:null,j=g.includes(a)?a:i;b.style.colorScheme=j}null==h||h()},[]),l=(0,c.useCallback)(a=>{y(a);try{localStorage.setItem(s,a)}catch(b){}},[a]),x=(0,c.useCallback)(c=>{let e=r(c);z(e),"system"===b&&d&&!a&&A("system")},[b,a]);return(0,c.useEffect)(()=>{let a=window.matchMedia(h);return a.addListener(x),x(a),()=>a.removeListener(x)},[x]),(0,c.useEffect)(()=>{let a=a=>{a.key===s&&l(a.newValue||t)};return window.addEventListener("storage",a),()=>window.removeEventListener("storage",a)},[l]),(0,c.useEffect)(()=>{A(null!=a?a:b)},[a,b]),c.createElement(j.Provider,{value:{theme:b,setTheme:l,forcedTheme:a,resolvedTheme:"system"===b?k:b,themes:d?[...e,"system"]:e,systemTheme:d?k:void 0}},c.createElement(o,{forcedTheme:a,disableTransitionOnChange:m,enableSystem:d,enableColorScheme:n,storageKey:s,themes:e,defaultTheme:t,attribute:u,value:f,children:i,attrs:w,nonce:v}),i)},o=(0,c.memo)(({forcedTheme:f,storageKey:i,attribute:j,enableSystem:m,enableColorScheme:n,defaultTheme:b,value:d,attrs:o,nonce:p})=>{let k="system"===b,e="class"===j?`var d=document.documentElement,c=d.classList;c.remove(${o.map(a=>`'${a}'`).join(",")});`:`var d=document.documentElement,n='${j}',s='setAttribute';`,l=n?g.includes(b)&&b?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${b}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",a=(a,c=!1,h=!0)=>{let e=d?d[a]:a,f=c?a+"|| ''":`'${e}'`,b="";return n&&h&&!c&&g.includes(a)&&(b+=`d.style.colorScheme = '${a}';`),"class"===j?b+=c||e?`c.add(${f})`:"null":e&&(b+=`d[s](n,${f})`),b},q=f?`!function(){${e}${a(f)}}()`:m?`!function(){try{${e}var e=localStorage.getItem('${i}');if('system'===e||(!e&&${k})){var t='${h}',m=window.matchMedia(t);if(m.media!==t||m.matches){${a("dark")}}else{${a("light")}}}else if(e){${d?`var x=${JSON.stringify(d)};`:""}${a(d?"x[e]":"e",!0)}}${k?"":"else{"+a(b,!1,!1)+"}"}${l}}catch(e){}}()`:`!function(){try{${e}var e=localStorage.getItem('${i}');if(e){${d?`var x=${JSON.stringify(d)};`:""}${a(d?"x[e]":"e",!0)}}else{${a(b,!1,!1)};}${l}}catch(t){}}();`;return c.createElement("script",{nonce:p,dangerouslySetInnerHTML:{__html:q}})},()=>!0),p=(b,c)=>{if(i)return;let a;try{a=localStorage.getItem(b)||void 0}catch(d){}return a||c},q=()=>{let a=document.createElement("style");return a.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(a),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(a)},1)}},r=a=>(a||(a=window.matchMedia(h)),a.matches?"dark":"light");function s(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var t={light:b.rS,dark:b.$_},u=function(){var a=l(),c=a.theme,b=a.resolvedTheme,d=function(a,d){if(null==a)return{};var b,c,e=function(c,f){if(null==c)return{};var a,b,d={},e=Object.keys(c);for(b=0;b<e.length;b++)a=e[b],f.indexOf(a)>=0||(d[a]=c[a]);return d}(a,d);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(c=0;c<f.length;c++)b=f[c],!(d.indexOf(b)>=0)&&Object.prototype.propertyIsEnumerable.call(a,b)&&(e[b]=a[b])}return e}(a,["theme","resolvedTheme"]),e=t[b];return function(d){for(var a=1;a<arguments.length;a++){var c=null!=arguments[a]?arguments[a]:{},b=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(b=b.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),b.forEach(function(a){s(d,a,c[a])})}return d}({name:b,theme:e,key:c},d)},v=function(a){var c=a.children;return(0,f.jsx)(m,{disableTransitionOnChange:!0,attribute:"class",defaultTheme:"system",value:{light:"light-theme",dark:b.$_.className},children:c})}},9407:function(d,b,a){"use strict";a.r(b),a.d(b,{"default":function(){return l}});var e=a(5893),f=a(5394),g=(0,a(5892).zY)({"@import":["url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')"],body:{margin:0},"::selection":{background:"$selection"}}),h=function(a){var b=a.children;return g(),(0,e.jsx)(e.Fragment,{children:b})};a(7294);var c=a(9008),i=a.n(c),j=function(){return(0,e.jsxs)(i(),{children:[(0,e.jsx)("title",{children:"react-swipe-sheet"}),(0,e.jsx)("meta",{charSet:"utf-8"}),(0,e.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, viewport-fit=cover"}),(0,e.jsx)("link",{rel:"icon",href:"/react-swipe-sheet/favicon.ico"}),(0,e.jsx)("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),(0,e.jsx)("meta",{name:"apple-mobile-web-app-status-bar-style",content:"default"}),(0,e.jsx)("meta",{name:"theme-color",content:"#070708"}),(0,e.jsx)("meta",{name:"msapplication-navbutton-color",content:"#070708"})]})};function k(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}a(493);var l=function(a){var b=a.Component,c=a.pageProps;return(0,e.jsxs)(f.f,{children:[(0,e.jsx)(h,{}),(0,e.jsx)(j,{}),(0,e.jsx)(b,function(d){for(var a=1;a<arguments.length;a++){var c=null!=arguments[a]?arguments[a]:{},b=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(b=b.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),b.forEach(function(a){k(d,a,c[a])})}return d}({},c))]})}},5892:function(j,h,g){"use strict";g.d(h,{"$_":function(){return ad},zY:function(){return ab},zo:function(){return aa},rS:function(){return ac}});var k=g(7294),b="colors",c="sizes",a="space",l={gap:a,gridGap:a,columnGap:a,gridColumnGap:a,rowGap:a,gridRowGap:a,inset:a,insetBlock:a,insetBlockEnd:a,insetBlockStart:a,insetInline:a,insetInlineEnd:a,insetInlineStart:a,margin:a,marginTop:a,marginRight:a,marginBottom:a,marginLeft:a,marginBlock:a,marginBlockEnd:a,marginBlockStart:a,marginInline:a,marginInlineEnd:a,marginInlineStart:a,padding:a,paddingTop:a,paddingRight:a,paddingBottom:a,paddingLeft:a,paddingBlock:a,paddingBlockEnd:a,paddingBlockStart:a,paddingInline:a,paddingInlineEnd:a,paddingInlineStart:a,top:a,right:a,bottom:a,left:a,scrollMargin:a,scrollMarginTop:a,scrollMarginRight:a,scrollMarginBottom:a,scrollMarginLeft:a,scrollMarginX:a,scrollMarginY:a,scrollMarginBlock:a,scrollMarginBlockEnd:a,scrollMarginBlockStart:a,scrollMarginInline:a,scrollMarginInlineEnd:a,scrollMarginInlineStart:a,scrollPadding:a,scrollPaddingTop:a,scrollPaddingRight:a,scrollPaddingBottom:a,scrollPaddingLeft:a,scrollPaddingX:a,scrollPaddingY:a,scrollPaddingBlock:a,scrollPaddingBlockEnd:a,scrollPaddingBlockStart:a,scrollPaddingInline:a,scrollPaddingInlineEnd:a,scrollPaddingInlineStart:a,fontSize:"fontSizes",background:b,backgroundColor:b,backgroundImage:b,borderImage:b,border:b,borderBlock:b,borderBlockEnd:b,borderBlockStart:b,borderBottom:b,borderBottomColor:b,borderColor:b,borderInline:b,borderInlineEnd:b,borderInlineStart:b,borderLeft:b,borderLeftColor:b,borderRight:b,borderRightColor:b,borderTop:b,borderTopColor:b,caretColor:b,color:b,columnRuleColor:b,fill:b,outline:b,outlineColor:b,stroke:b,textDecorationColor:b,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:c,minBlockSize:c,maxBlockSize:c,inlineSize:c,minInlineSize:c,maxInlineSize:c,width:c,minWidth:c,maxWidth:c,height:c,minHeight:c,maxHeight:c,flexBasis:c,gridTemplateColumns:c,gridTemplateRows:c,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},m=(b,a)=>"function"==typeof a?{"()":Function.prototype.toString.call(a)}:a,e=()=>{let a=Object.create(null);return(c,e,...f)=>{var d;let b=(d=c,JSON.stringify(d,m));return b in a?a[b]:a[b]=e(c,...f)}},n=Symbol.for("sxs.internal"),o=(a,b)=>Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)),p=a=>{for(let b in a)return!0;return!1},{hasOwnProperty:q}=Object.prototype,r=a=>a.includes("-")?a:a.replace(/[A-Z]/g,a=>"-"+a.toLowerCase()),s=/\s+(?![^()]*\))/,f=a=>b=>a(..."string"==typeof b?String(b).split(s):[b]),t={appearance:a=>({WebkitAppearance:a,appearance:a}),backfaceVisibility:a=>({WebkitBackfaceVisibility:a,backfaceVisibility:a}),backdropFilter:a=>({WebkitBackdropFilter:a,backdropFilter:a}),backgroundClip:a=>({WebkitBackgroundClip:a,backgroundClip:a}),boxDecorationBreak:a=>({WebkitBoxDecorationBreak:a,boxDecorationBreak:a}),clipPath:a=>({WebkitClipPath:a,clipPath:a}),content:a=>({content:a.includes('"')||a.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(a)?a:`"${a}"`}),hyphens:a=>({WebkitHyphens:a,hyphens:a}),maskImage:a=>({WebkitMaskImage:a,maskImage:a}),maskSize:a=>({WebkitMaskSize:a,maskSize:a}),tabSize:a=>({MozTabSize:a,tabSize:a}),textSizeAdjust:a=>({WebkitTextSizeAdjust:a,textSizeAdjust:a}),userSelect:a=>({WebkitUserSelect:a,userSelect:a}),marginBlock:f((a,b)=>({marginBlockStart:a,marginBlockEnd:b||a})),marginInline:f((a,b)=>({marginInlineStart:a,marginInlineEnd:b||a})),maxSize:f((a,b)=>({maxBlockSize:a,maxInlineSize:b||a})),minSize:f((a,b)=>({minBlockSize:a,minInlineSize:b||a})),paddingBlock:f((a,b)=>({paddingBlockStart:a,paddingBlockEnd:b||a})),paddingInline:f((a,b)=>({paddingInlineStart:a,paddingInlineEnd:b||a}))},u=/([\d.]+)([^]*)/,v=(a,b)=>a.length?a.reduce((a,c)=>(a.push(...b.map(a=>a.includes("&")?a.replace(/&/g,/[ +>|~]/.test(c)&&/&.*&/.test(a)?`:is(${c})`:c):c+" "+a)),a),[]):b,w=(b,a)=>b in x&&"string"==typeof a?a.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,(e,a,d,c)=>a+("stretch"===d?`-moz-available${c};${r(b)}:${a}-webkit-fill-available`:`-moz-fit-content${c};${r(b)}:${a}fit-content`)+c):String(a),x={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},y=a=>a?a+"-":"",z=(a,b,c)=>a.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,(g,d,f,a,e)=>"$"==a== !!f?g:(d||"--"==a?"calc(":"")+"var(--"+("$"===a?y(b)+(e.includes("$")?"":y(c))+e.replace(/\$/g,"-"):e)+")"+(d||"--"==a?"*"+(d||"")+(f||"1")+")":"")),A=/\s*,\s*(?![^()]*\))/,B=Object.prototype.toString,C=(a,b,c,e,f)=>{let g,h,i,d=(a,c,j)=>{let k,l,b=n=>{var o;for(k in n){let m=64===k.charCodeAt(0),x=m&&Array.isArray(n[k])?n[k]:[n[k]];for(l of x){let a=/[A-Z]/.test(o=k)?o:o.replace(/-[^]/g,a=>a[1].toUpperCase()),p="object"==typeof l&&l&&l.toString===B&&(!e.utils[a]||!c.length);if(a in e.utils&&!p){let q=e.utils[a];if(q!==h){h=q,b(q(l)),h=null;continue}}else if(a in t){let s=t[a];if(s!==i){i=s,b(s(l)),i=null;continue}}if(m&&(k=(k.slice(1) in e.media?"@media "+e.media[k.slice(1)]:k).replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,(i,b,a,e,c,f)=>{let d=u.test(b),j=.0625*(d?-1:1),[g,h]=d?[e,b]:[b,e];return"("+("="===a[0]?"":">"===a[0]===d?"max-":"min-")+g+":"+("="!==a[0]&&1===a.length?h.replace(u,(d,b,c)=>Number(b)+j*(">"===a?1:-1)+c):h)+(c?") and ("+(">"===c[0]?"min-":"max-")+g+":"+(1===c.length?f.replace(u,(d,a,b)=>Number(a)+j*(">"===c?-1:1)+b):f):"")+")"})),p){let C=m?j.concat(k):[...j],F=m?[...c]:v(c,k.split(A));void 0!==g&&f(D(...g)),g=void 0,d(l,F,C)}else void 0===g&&(g=[[],c,j]),k=m||36!==k.charCodeAt(0)?k:`--${y(e.prefix)}${k.slice(1).replace(/\$/g,"-")}`,l=p?l:"number"==typeof l?l&&a in E?String(l)+"px":String(l):z(w(a,null==l?"":l),e.prefix,e.themeMap[a]),g[0].push(`${m?`${k} `:`${r(k)}:`}${l}`)}}};b(a),void 0!==g&&f(D(...g)),g=void 0};d(a,b,c)},D=(c,a,b)=>`${b.map(a=>`${a}{`).join("")}${a.length?`${a.join(",")}{`:""}${c.join(";")}${a.length?"}":""}${Array(b.length?b.length+1:0).join("}")}`,E={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},F=a=>String.fromCharCode(a+(a>25?39:97)),G=a=>(c=>{let a,b="";for(a=Math.abs(c);a>52;a=a/52|0)b=F(a%52)+b;return F(a%52)+b})(((a,b)=>{let c=b.length;for(;c;)a=33*a^b.charCodeAt(--c);return a})(5381,JSON.stringify(a))>>>0),H=["themed","global","styled","onevar","resonevar","allvar","inline"],I=a=>{if(a.href&&!a.href.startsWith(location.origin))return!1;try{return!!a.cssRules}catch(b){return!1}},J=c=>{let a,d=()=>{let{cssRules:b}=a.sheet;return[].map.call(b,(c,e)=>{let{cssText:d}=c,f="";if(d.startsWith("--sxs"))return"";if(b[e-1]&&(f=b[e-1].cssText).startsWith("--sxs")){if(!c.cssRules.length)return"";for(let g in a.rules)if(a.rules[g].group===c)return`--sxs{--sxs:${[...a.rules[g].cache].join(" ")}}${d}`;return c.cssRules.length?`${f}${d}`:""}return d}).join("")},b=()=>{if(a){let{rules:n,sheet:h}=a;if(!h.deleteRule){for(;3===Object(Object(h.cssRules)[0]).type;)h.cssRules.splice(0,1);h.cssRules=[]}for(let u in n)delete n[u]}let v=Object(c).styleSheets||[];for(let k of v)if(I(k)){for(let e=0,l=k.cssRules;l[e];++e){let o=Object(l[e]);if(1!==o.type)continue;let p=Object(l[e+1]);if(4!==p.type)continue;++e;let{cssText:q}=o;if(!q.startsWith("--sxs"))continue;let r=q.slice(14,-3).trim().split(/\s+/),s=H[r[0]];s&&(a||(a={sheet:k,reset:b,rules:{},toString:d}),a.rules[s]={group:p,index:e,cache:new Set(r)})}if(a)break}if(!a){let w=(a,b)=>({type:b,cssRules:[],insertRule(a,b){this.cssRules.splice(b,0,w(a,{import:3,undefined:1}[(a.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4))},get cssText(){return"@media{}"===a?`@media{${[].map.call(this.cssRules,a=>a.cssText).join("")}}`:a}});a={sheet:c?(c.head||c).appendChild(document.createElement("style")).sheet:w("","text/css"),rules:{},reset:b,toString:d}}let{sheet:i,rules:g}=a;for(let f=H.length-1;f>=0;--f){let m=H[f];if(!g[m]){let t=H[f+1],j=g[t]?g[t].index:i.cssRules.length;i.insertRule("@media{}",j),i.insertRule(`--sxs{--sxs:${f}}`,j),g[m]={group:i.cssRules[j+1],index:j,cache:new Set([f])}}K(g[m])}};return b(),a},K=a=>{let b=a.group,c=b.cssRules.length;a.apply=a=>{try{b.insertRule(a,c),++c}catch(d){}}},L=Symbol(),M=e(),N=(a,b)=>M(a,()=>(...e)=>{let c={type:null,composers:new Set};for(let d of e)if(null!=d){if(d[n])for(let f of(null==c.type&&(c.type=d[n].type),d[n].composers))c.composers.add(f);else d.constructor!==Object||d.$$typeof?null==c.type&&(c.type=d):c.composers.add(O(d,a))}return null==c.type&&(c.type="span"),c.composers.size||c.composers.add(["PJLV",{},[],[],{},[]]),P(a,c,b)}),O=({variants:c,compoundVariants:f,defaultVariants:h,...i},u)=>{var j,k;let v=`${y(u.prefix)}c-${G(i)}`,l=[],m=[],d=Object.create(null),n=[];for(let o in h)d[o]=String(h[o]);if("object"==typeof c&&c)for(let a in c){j=d,k=a,q.call(j,k)||(d[a]="undefined");let r=c[a];for(let g in r){let w={[a]:String(g)};"undefined"===String(g)&&n.push(a);let s=r[g],x=[w,s,!p(s)];l.push(x)}}if("object"==typeof f&&f)for(let z of f){let{css:b,...e}=z;for(let t in b="object"==typeof b&&b||{},e)e[t]=String(e[t]);let A=[e,b,!p(b)];m.push(A)}return[v,i,l,m,d,n]},P=(h,a,b)=>{let[c,d,i,j]=Q(a.composers),e="function"==typeof a.type||a.type.$$typeof?(b=>{function a(){for(let c=0;c<a[L].length;c++){let[d,e]=a[L][c];b.rules[d].apply(e)}return a[L]=[],null}return a[L]=[],a.rules={},H.forEach(b=>a.rules[b]={apply:c=>a[L].push([b,c])}),a})(b):null,k=(e||b).rules,f=`.${c}${d.length>1?`:where(.${d.slice(1).join(".")})`:""}`,g=l=>{l="object"==typeof l&&l||S;let{css:q,...u}=l,n={};for(let g in i)if(delete u[g],g in l){let m=l[g];"object"==typeof m&&m?n[g]={"@initial":i[g],...m}:(m=String(m),n[g]="undefined"!==m||j.has(g)?m:i[g])}else n[g]=i[g];let o=new Set([...d]);for(let[p,D,E,F]of a.composers){b.rules.styled.cache.has(p)||(b.rules.styled.cache.add(p),C(D,[`.${p}`],[],h,a=>{k.styled.apply(a)}));let H=R(E,n,h.media),I=R(F,n,h.media,!0);for(let v of H)if(void 0!==v)for(let[J,w,x]of v){let r=`${p}-${G(w)}-${J}`;o.add(r);let y=(x?b.rules.resonevar:b.rules.onevar).cache,M=x?k.resonevar:k.onevar;y.has(r)||(y.add(r),C(w,[`.${r}`],[],h,a=>{M.apply(a)}))}for(let z of I)if(void 0!==z)for(let[K,A]of z){let s=`${p}-${G(A)}-${K}`;o.add(s),b.rules.allvar.cache.has(s)||(b.rules.allvar.cache.add(s),C(A,[`.${s}`],[],h,a=>{k.allvar.apply(a)}))}}if("object"==typeof q&&q){let t=`${c}-i${G(q)}-css`;o.add(t),b.rules.inline.cache.has(t)||(b.rules.inline.cache.add(t),C(q,[`.${t}`],[],h,a=>{k.inline.apply(a)}))}for(let B of String(l.className||"").trim().split(/\s+/))B&&o.add(B);let L=u.className=[...o].join(" ");return{type:a.type,className:L,selector:f,props:u,toString:()=>L,deferredInjector:e}};return o(g,{className:c,selector:f,[n]:a,toString:()=>(b.rules.styled.cache.has(c)||g(),c)})},Q=j=>{let a="",e=[],b={},f=[];for(let[g,,,,h,i]of j)for(let c in""===a&&(a=g),e.push(g),f.push(...i),h){let d=h[c];(void 0===b[c]||"undefined"!==d||i.includes(d))&&(b[c]=d)}return[a,e,b,new Set(f)]},R=(o,p,i,q)=>{let e=[];e:for(let[f,g,r]of o){if(r)continue;let a,h=0,j=!1;for(a in f){let k=f[a],b=p[a];if(b!==k){if("object"!=typeof b||!b)continue e;{let l,c,m=0;for(let d in b){if(k===String(b[d])){if("@initial"!==d){let n=d.slice(1);(c=c||[]).push(n in i?i[n]:d.replace(/^@media ?/,"")),j=!0}h+=m,l=!0}++m}if(c&&c.length&&(g={["@media "+c.join(", ")]:g}),!l)continue e}}}(e[h]=e[h]||[]).push([q?"cv":`${a}-${f[a]}`,g,j])}return e},S={},T=e(),U=(a,b)=>T(a,()=>(...d)=>{let c=()=>{for(let c of d){let f=G(c="object"==typeof c&&c||{});if(!b.rules.global.cache.has(f)){if(b.rules.global.cache.add(f),"@import"in c){let g=[].indexOf.call(b.sheet.cssRules,b.rules.themed.group)-1;for(let e of[].concat(c["@import"]))e=e.includes('"')||e.includes("'")?e:`"${e}"`,b.sheet.insertRule(`@import ${e};`,g++);delete c["@import"]}C(c,[],[],a,a=>{b.rules.global.apply(a)})}}return""};return o(c,{toString:c})}),V=e(),W=(a,b)=>V(a,()=>d=>{let e=`${y(a.prefix)}k-${G(d)}`,c=()=>{if(!b.rules.global.cache.has(e)){b.rules.global.cache.add(e);let c=[];C(d,[],[],a,a=>c.push(a));let f=`@keyframes ${e}{${c.join("")}}`;b.rules.global.apply(f)}return e};return o(c,{get name(){return c()},toString:c})}),X=class{constructor(a,b,c,d){this.token=null==a?"":String(a),this.value=null==b?"":String(b),this.scale=null==c?"":String(c),this.prefix=null==d?"":String(d)}get computedValue(){return"var("+this.variable+")"}get variable(){return"--"+y(this.prefix)+y(this.scale)+this.token}toString(){return this.computedValue}},Y=e(),Z=(a,b)=>Y(a,()=>(d,e)=>{e="object"==typeof d&&d||Object(e);let j=`.${d=(d="string"==typeof d?d:"")||`${y(a.prefix)}t-${G(e)}`}`,g={},k=[];for(let c in e)for(let f in g[c]={},e[c]){let l=`--${y(a.prefix)}${c}-${f}`,h=z(String(e[c][f]),a.prefix,c);g[c][f]=new X(f,h,c,a.prefix),k.push(`${l}:${h}`)}let i=()=>{if(k.length&&!b.rules.themed.cache.has(d)){b.rules.themed.cache.add(d);let c=`${e===a.theme?":root,":""}.${d}{${k.join(";")}}`;b.rules.themed.apply(c)}return d};return{...g,get className(){return i()},selector:j,toString:i}}),$=e(),_=e(),d=(b=>{let a=(b=>{let c=!1,a=$(b,a=>{c=!0;let f="prefix"in(a="object"==typeof a&&a||{})?String(a.prefix):"",h="object"==typeof a.media&&a.media||{},i="object"==typeof a.root?a.root||null:globalThis.document||null,g="object"==typeof a.theme&&a.theme||{},d={prefix:f,media:h,theme:g,themeMap:"object"==typeof a.themeMap&&a.themeMap||{...l},utils:"object"==typeof a.utils&&a.utils||{}},b=J(i),e={css:N(d,b),globalCss:U(d,b),keyframes:W(d,b),createTheme:Z(d,b),reset(){b.reset(),e.theme.toString()},theme:{},sheet:b,config:d,prefix:f,getCssText:b.toString,toString:b.toString};return String(e.theme=e.createTheme(g)),e});return c||a.reset(),a})(b);return a.styled=(({config:a,sheet:b})=>_(a,()=>{let c=N(a,b);return(...e)=>{let b=c(...e),d=b[n].type,a=k.forwardRef((c,g)=>{let e=c&&c.as||d,{props:a,deferredInjector:f}=b(c);return delete a.as,a.ref=g,f?k.createElement(k.Fragment,null,k.createElement(e,a),k.createElement(f,null)):k.createElement(e,a)});return a.className=b.className,a.displayName=`Styled.${d.displayName||d.name||d}`,a.selector=b.selector,a.toString=()=>b.selector,a[n]=b[n],a}}))(a),a})({theme:{colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",primary:"#f92d48",primaryHover:"#e02941",secondary:"#f7f8f8",text:"#000",textHover:"#78787a",buttonText:"#fff",link:"#2878f4",background:"#f2f2f6",close:"rgba(199, 199, 208, 0.26)",closeText:"#838388",selection:"#fff9cc"},fonts:{title:'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'},space:{},sizes:{},fontSizes:{},fontWeights:{},lineHeights:{},letterSpacings:{},radii:{1:"3px",2:"4px",3:"8px",4:"16px",round:"50%",pill:"9999px"},shadows:{},zIndices:{1:"100",2:"200",3:"300",4:"400",max:"999"}},media:{xsm:"(min-width: 405px)",sm:"(min-width: 550px)",motion:"(prefers-reduced-motion)",dark:"(prefers-color-scheme: dark)",light:"(prefers-color-scheme: light)"},utils:{p:function(a){return{paddingTop:a,paddingBottom:a,paddingLeft:a,paddingRight:a}},pt:function(a){return{paddingTop:a}},pr:function(a){return{paddingRight:a}},pb:function(a){return{paddingBottom:a}},pl:function(a){return{paddingLeft:a}},px:function(a){return{paddingLeft:a,paddingRight:a}},py:function(a){return{paddingTop:a,paddingBottom:a}},m:function(a){return{marginTop:a,marginBottom:a,marginLeft:a,marginRight:a}},mt:function(a){return{marginTop:a}},mr:function(a){return{marginRight:a}},mb:function(a){return{marginBottom:a}},ml:function(a){return{marginLeft:a}},mx:function(a){return{marginLeft:a,marginRight:a}},my:function(a){return{marginTop:a,marginBottom:a}},ta:function(a){return{textAlign:a}},fd:function(a){return{flexDirection:a}},fw:function(a){return{flexWrap:a}},ai:function(a){return{alignItems:a}},ac:function(a){return{alignContent:a}},jc:function(a){return{justifyContent:a}},as:function(a){return{alignSelf:a}},fg:function(a){return{flexGrow:a}},fs:function(a){return{flexShrink:a}},fb:function(a){return{flexBasis:a}},bc:function(a){return{backgroundColor:a}},br:function(a){return{borderRadius:a}},btrr:function(a){return{borderTopRightRadius:a}},bbrr:function(a){return{borderBottomRightRadius:a}},bblr:function(a){return{borderBottomLeftRadius:a}},btlr:function(a){return{borderTopLeftRadius:a}},bs:function(a){return{boxShadow:a}},lh:function(a){return{lineHeight:a}},ox:function(a){return{overflowX:a}},oy:function(a){return{overflowY:a}},pe:function(a){return{pointerEvents:a}},us:function(a){return{WebkitUserSelect:a,userSelect:a}},size:function(a){return{width:a,height:a}},linearGradient:function(a){return{backgroundImage:"linear-gradient(".concat(a,")")}},appearance:function(a){return{WebkitAppearance:a,appearance:a}},userSelect:function(a){return{WebkitUserSelect:a,userSelect:a}},backgroundClip:function(a){return{WebkitBackgroundClip:a,backgroundClip:a}}}}),aa=d.styled,ab=(d.css,d.globalCss),ac=(d.keyframes,d.getCssText,d.theme),i=d.createTheme;d.config;var ad=i("dark-theme",{colors:{primary:"#f92d48",primaryHover:"#e02941",secondary:"#1c1c1e",text:"#fff",textHover:"#5c5750",buttonText:"#fff",link:"#2878f4",background:"#070708",close:"rgba(93, 93, 96, 0.28)",closeText:"#9f9fa6",selection:"#fff9cc"}})},493:function(){},9008:function(a,c,b){a.exports=b(3121)}},function(a){var b=function(b){return a(a.s=b)};a.O(0,[774,179],function(){return b(6840),b(880)}),_N_E=a.O()}])