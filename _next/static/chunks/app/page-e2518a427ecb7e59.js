(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{254:(e,t,s)=>{Promise.resolve().then(s.bind(s,1992))},1992:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>E});var l=s(8081),n=s(2149);function r(e){let t=function(e){let t=Number.parseInt(e=e.replace(/^#/,""),16);return{r:t>>16&255,g:t>>8&255,b:255&t}}(e),s=t.r/255,l=t.g/255,n=t.b/255;return .2126*(s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4))+.7152*(l<=.03928?l/12.92:Math.pow((l+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))}function o(e){return r(e)>.5?"#000000":"#ffffff"}function i(e){let{tile:t,isSelected:s,isDragging:r=!1,backgroundColor:i,onClick:a,onDragStart:c}=e,[d,u]=(0,n.useState)(!1),[h,x]=(0,n.useState)(!1),[m,f]=(0,n.useState)({x:0,y:0}),p=(0,n.useRef)(null),g=(0,n.useRef)(null),{id:j,label:v,description:b,color:y,x:w,y:N,width:C,height:k}=t,S=o(i),M=o(i);return(0,n.useEffect)(()=>(d&&!r&&""!==b.trim()?p.current=setTimeout(()=>{x(!0)},1e3):(p.current&&(clearTimeout(p.current),p.current=null),x(!1)),()=>{p.current&&clearTimeout(p.current)}),[d,r,b]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"absolute text-center text-sm select-none",style:{left:"".concat(w,"px"),top:"".concat(N-20,"px"),width:"".concat(C,"px"),color:S},children:v}),(0,l.jsx)("div",{className:"absolute cursor-move flex items-center justify-center select-none rounded-lg",style:{left:"".concat(w,"px"),top:"".concat(N,"px"),width:"".concat(C,"px"),height:"".concat(k,"px"),backgroundColor:y,boxShadow:"0 2px 4px rgba(0,0,0,0.1)",outline:s?"2px solid ".concat(M):"none",outlineOffset:"2px",zIndex:r?20:s?10:1},onClick:a,onMouseDown:c,onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)},onMouseMove:e=>{f({x:e.clientX,y:e.clientY})}}),h&&""!==b.trim()&&(0,l.jsx)("div",{ref:g,className:"fixed z-50 p-2 rounded-lg shadow-lg text-sm",style:{left:"".concat(m.x,"px"),top:"".concat(m.y-10,"px"),transform:"translate(-50%, -100%)",backgroundColor:"#ffffff"===S?"#ffffff":"#333333",color:"#ffffff"===S?"#333333":"#ffffff",borderRadius:"8px",maxWidth:"250px",pointerEvents:"none"},children:b})]})}let a=(0,n.forwardRef)((e,t)=>{let{tiles:s,selectedIds:r,backgroundColor:a,onCreateTile:c,onTileMove:d,onSelectionChange:u,onTileReorder:h,onMultiTileMove:x,onKeyDown:m,onClick:f,onMoveEnd:p}=e,g=(0,n.useRef)(null),[j,v]=(0,n.useState)(!1),[b,y]=(0,n.useState)(null),[w,N]=(0,n.useState)({x:0,y:0}),[C,k]=(0,n.useState)(!1),[S,M]=(0,n.useState)(!1),[R,E]=(0,n.useState)(null),[L,U]=(0,n.useState)(!1),[I,F]=(0,n.useState)({x:0,y:0}),[T,D]=(0,n.useState)({x:0,y:0});(0,n.useEffect)(()=>{let e=e=>{"Control"===e.key&&k(!0)},t=e=>{"Control"===e.key&&k(!1)};return window.addEventListener("keydown",e),window.addEventListener("keyup",t),()=>{window.removeEventListener("keydown",e),window.removeEventListener("keyup",t)}},[]);let A=e=>{if(!g.current)return{x:0,y:0};let t=g.current.getBoundingClientRect();return{x:e.clientX-t.left+g.current.scrollLeft,y:e.clientY-t.top+g.current.scrollTop}},z=e=>{if(L){let t=Math.min(I.x,T.x),l=Math.min(I.y,T.y),n=Math.max(I.x,T.x),o=Math.max(I.y,T.y),i=s.filter(e=>e.x<n&&e.x+e.width>t&&e.y<o&&e.y+e.height>l);if(i.length>0){let t=i.map(e=>e.id);e.ctrlKey||C?u([...r.filter(e=>!t.includes(e)),...t]):u(t)}U(!1)}j&&!S&&R&&O(R,e.ctrlKey||C),j&&S&&p&&p(),v(!1),y(null),M(!1),E(null)},O=(e,t)=>{h(e),t?r.includes(e)||u([...r,e]):r.includes(e)||u([e])},G=(e,t)=>{t.stopPropagation(),j||O(e,t.ctrlKey||C)},K=(e,t)=>{if(0!==t.button)return;t.stopPropagation(),E(e),M(!1);let l=s.find(t=>t.id===e);if(l){let s=A(t);N({x:s.x-l.x,y:s.y-l.y}),v(!0),y(e),r.includes(e)||(t.ctrlKey||C?u([...r,e]):u([e])),h(e)}},$={left:Math.min(I.x,T.x),top:Math.min(I.y,T.y),width:Math.abs(T.x-I.x),height:Math.abs(T.y-I.y)},H=o(a);return(0,l.jsx)("div",{ref:e=>{"function"==typeof t?t(e):t&&(t.current=e),g.current=e},className:"flex-1 overflow-auto relative",style:{backgroundColor:a},onContextMenu:e=>{e.preventDefault();let{x:t,y:s}=A(e);c(t,s,e.ctrlKey||C)},onMouseDown:e=>{var t;if(0===e.button&&(f&&f(),e.target===g.current||e.target===(null===(t=g.current)||void 0===t?void 0:t.firstChild))){let t=A(e);F(t),D(t),U(!0),e.ctrlKey||C||u([])}},onMouseMove:e=>{let t=A(e);if(L&&D(t),j&&b){M(!0);let e=t.x-w.x,l=t.y-w.y;if(r.includes(b)&&r.length>1){let t=s.find(e=>e.id===b);t&&x(r,e-t.x,l-t.y)}else d(b,e,l)}},onMouseUp:z,onMouseLeave:z,onKeyDown:m,tabIndex:0,children:(0,l.jsxs)("div",{className:"relative w-[3000px] h-[3000px]",children:[s.map(e=>(0,l.jsx)(i,{tile:e,isSelected:r.includes(e.id),isDragging:b===e.id,backgroundColor:a,onClick:t=>G(e.id,t),onDragStart:t=>K(e.id,t)},e.id)),L&&$.width>5&&$.height>5&&(0,l.jsx)("div",{className:"absolute pointer-events-none z-[1000]",style:{left:"".concat($.left,"px"),top:"".concat($.top,"px"),width:"".concat($.width,"px"),height:"".concat($.height,"px"),border:"1px dashed ".concat(H),backgroundColor:"".concat(H,"10")}})]})})});a.displayName="Canvas";var c=s(5160),d=s(7890),u=s(7037),h=s(5192);function x(){let[e,t]=(0,n.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.$,{variant:"ghost",size:"icon",onClick:()=>t(!0),className:"rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200",children:(0,l.jsx)("span",{className:"text-base font-semibold",children:"?"})}),(0,l.jsx)(h.lG,{open:e,onOpenChange:t,children:(0,l.jsxs)(h.Cf,{className:"max-w-3xl max-h-[80vh] overflow-y-auto",children:[(0,l.jsxs)(h.c7,{children:[(0,l.jsx)(h.L3,{children:"Gloss - Color Palette Designer"}),(0,l.jsx)(h.rr,{children:"A tool for designing color palettes with precision and accessibility"})]}),(0,l.jsxs)("div",{className:"space-y-4 mt-4",children:[(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-medium mb-2",children:"About Gloss"}),(0,l.jsx)("p",{children:"Gloss is a tool for manually designing color palettes with precise control. Unlike automated palette generators, Gloss gives you complete control over your colors while providing helpful tools to ensure harmony and accessibility."})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Color Picker Modes"}),(0,l.jsx)("p",{className:"mb-2",children:"The color picker has two main modes:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"Wheel Mode:"})," In this mode, all colors share the same lightness value, but can have different hue and saturation values. This is useful for creating colors that have the same perceived brightness."]}),(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"Slider Mode:"})," In this mode, all colors share the same hue and saturation values, but can have different lightness values. This is useful for creating shades and tints of the same color."]})]})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Color Spaces"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"HSL:"})," The standard Hue, Saturation, Lightness color space. Simple but not perceptually uniform."]}),(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"OKHSL:"})," A perceptually uniform color space that provides more consistent visual results across the entire color spectrum."]})]})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Keyboard Modifiers"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsxs)("li",{children:["Hold ",(0,l.jsx)("kbd",{className:"px-1 py-0.5 bg-gray-100 border rounded",children:"Shift"})," to constrain movement along hue"]}),(0,l.jsxs)("li",{children:["Hold ",(0,l.jsx)("kbd",{className:"px-1 py-0.5 bg-gray-100 border rounded",children:"Ctrl"})," to constrain movement along saturation"]})]})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Mouse & Keyboard Controls"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsx)("li",{children:"Right-click: Create a new tile"}),(0,l.jsx)("li",{children:"Left-click: Select a tile"}),(0,l.jsx)("li",{children:"Ctrl+click: Add to selection"}),(0,l.jsx)("li",{children:"Click and drag: Select or move tiles"}),(0,l.jsx)("li",{children:"Delete/Backspace: Remove selected tiles"}),(0,l.jsx)("li",{children:"Undo (Ctrl+Z or undo button): Revert the last action"}),(0,l.jsx)("li",{children:"Redo (Ctrl+Y or redo button): Restore the last undone action"})]})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Contrast Analysis"}),(0,l.jsx)("p",{children:"When you select two tiles or a tile and the background, Gloss automatically calculates the contrast ratio between them and shows WCAG accessibility compliance information."})]})]})]})})]})}var m=s(1018);let f=(0,m.A)("Undo2",[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]),p=(0,m.A)("Redo2",[["path",{d:"m15 14 5-5-5-5",key:"12vg1m"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",key:"6uklza"}]]);function g(e){let{backgroundColor:t,onBackgroundColorChange:s,onBackgroundSelect:r,onReset:o,getExportData:i,getUrlEncodedState:a,onUndo:m,onRedo:g,canUndo:j=!1,canRedo:v=!1,showUndoRedo:b=!1,hasTiles:y=!1}=e,[w,N]=(0,n.useState)(!1),[C,k]=(0,n.useState)(!1),[S,M]=(0,n.useState)(""),[R,E]=(0,n.useState)(""),{showToast:L,ToastContainer:U}=(0,u.d)(),I=e=>{navigator.clipboard.writeText(e).then(()=>{L("Copied to clipboard!")}).catch(e=>{console.error("Failed to copy: ",e)})};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"h-14 border-b bg-white flex items-center px-4 justify-between",children:[(0,l.jsxs)("div",{className:"flex items-center gap-2",children:[(0,l.jsx)("h1",{className:"font-bold text-lg",children:"Gloss"}),(0,l.jsx)(x,{}),(0,l.jsx)("div",{className:"h-6 w-px bg-gray-300 mx-2"}),(0,l.jsxs)("div",{className:"flex items-center gap-2",children:[(0,l.jsx)(d.J,{htmlFor:"bg-color",className:"text-sm",children:"Background:"}),(0,l.jsx)("div",{className:"w-8 h-8 rounded border border-gray-300 cursor-pointer",style:{backgroundColor:t},onClick:r,title:"Click to edit background color"})]}),m&&g&&b&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"h-6 w-px bg-gray-300 mx-2"}),(0,l.jsxs)("div",{className:"flex items-center gap-1",children:[(0,l.jsx)(c.$,{variant:"ghost",size:"icon",onClick:m,disabled:!j,className:"h-8 w-8",title:"Undo color change",children:(0,l.jsx)(f,{className:"h-4 w-4"})}),(0,l.jsx)(c.$,{variant:"ghost",size:"icon",onClick:g,disabled:!v,className:"h-8 w-8",title:"Redo color change",children:(0,l.jsx)(p,{className:"h-4 w-4"})})]})]})]}),(0,l.jsx)("div",{className:"flex items-center gap-2",children:y&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.$,{variant:"outline",size:"sm",onClick:o,children:"Reset"}),(0,l.jsx)(c.$,{variant:"outline",size:"sm",onClick:()=>{let e=i();M(JSON.stringify({background:e.background,items:e.items.map(e=>{let{label:t,description:s,color:l}=e;return{label:t,description:s,color:l}})},null,2)),N(!0)},children:"Export JSON"}),(0,l.jsx)(c.$,{variant:"outline",size:"sm",onClick:()=>{E("".concat(window.location.origin).concat(window.location.pathname,"#").concat(a())),k(!0)},children:"Copy URL"})]})})]}),(0,l.jsx)(h.lG,{open:w,onOpenChange:N,children:(0,l.jsxs)(h.Cf,{className:"max-w-2xl","aria-describedby":"export-dialog-description",children:[(0,l.jsxs)(h.c7,{children:[(0,l.jsx)(h.L3,{children:"Export JSON"}),(0,l.jsx)(h.rr,{id:"export-dialog-description",children:"Copy this JSON data to use in your application"})]}),(0,l.jsx)("div",{className:"bg-gray-100 p-4 rounded-md overflow-auto max-h-[60vh] mb-4",children:(0,l.jsx)("pre",{className:"text-sm",children:S})}),(0,l.jsx)(h.Es,{children:(0,l.jsx)(c.$,{onClick:()=>I(S),children:"Copy to Clipboard"})})]})}),(0,l.jsx)(h.lG,{open:C,onOpenChange:k,children:(0,l.jsxs)(h.Cf,{className:"max-w-2xl","aria-describedby":"url-dialog-description",children:[(0,l.jsxs)(h.c7,{children:[(0,l.jsx)(h.L3,{children:"Share URL"}),(0,l.jsx)(h.rr,{id:"url-dialog-description",children:"Copy this URL to share your color palette"})]}),(0,l.jsx)("div",{className:"bg-gray-100 p-4 rounded-md overflow-auto mb-4",children:(0,l.jsx)("p",{className:"text-sm break-all",children:R})}),(0,l.jsx)(h.Es,{children:(0,l.jsx)(c.$,{onClick:()=>I(R),children:"Copy to Clipboard"})})]})}),(0,l.jsx)(U,{})]})}var j=s(900),v=s(7687);let b=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,l.jsx)("textarea",{className:(0,v.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...n})});b.displayName="Textarea";var y=s(1006);function w(e){let{selectedTiles:t,onUpdateTiles:s,colors:r,onUpdateColors:o,onRemoveSelected:i,onClearSelection:a,onConfirmNormalization:u}=e,[h,x]=(0,n.useState)(""),[m,f]=(0,n.useState)("");return((0,n.useEffect)(()=>{if(0===t.length){x(""),f("");return}let e=t.every(e=>e.label===t[0].label),s=t.every(e=>e.description===t[0].description);x(e?t[0].label:"(varied)"),f(s?t[0].description:"(varied)")},[t]),0===t.length&&0===r.length)?(0,l.jsx)("div",{className:"w-96 border-l p-4 bg-white flex flex-col h-full items-center justify-center",children:(0,l.jsxs)("div",{className:"flex flex-col items-center gap-2 text-gray-500",children:[(0,l.jsx)("div",{className:"rounded-full bg-gray-100 p-3",children:(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M16 2v5h5"}),(0,l.jsx)("path",{d:"M21 6v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12l5 3Z"}),(0,l.jsx)("path",{d:"M9.5 10.5 6 14h12l-3.5-3.5-2 2-3-3Z"})]})}),(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsx)("p",{className:"text-sm font-medium mb-1",children:"Right-click to create a new tile"}),(0,l.jsx)("p",{className:"text-sm font-medium",children:"Left-click to select a tile"})]})]})}):(0,l.jsxs)("div",{className:"w-96 border-l p-4 bg-white overflow-y-auto flex flex-col h-full",children:[r.length>0&&(0,l.jsx)("div",{className:"mb-3",children:(0,l.jsx)(y.l,{colors:r,onChange:o,confirmNormalization:u})}),t.length>0&&(0,l.jsx)("div",{className:"mb-6",children:(0,l.jsxs)("div",{className:"space-y-4",children:[(0,l.jsxs)("div",{className:"space-y-2",children:[(0,l.jsx)(d.J,{htmlFor:"label",children:"Label"}),(0,l.jsx)(j.p,{id:"label",value:h,onChange:e=>{x(e.target.value),s({label:e.target.value})},placeholder:"Enter label"})]}),(0,l.jsxs)("div",{className:"space-y-2",children:[(0,l.jsx)(d.J,{htmlFor:"description",children:"Description"}),(0,l.jsx)(b,{id:"description",value:m,onChange:e=>{f(e.target.value),s({description:e.target.value})},placeholder:"Enter description",rows:3})]}),(0,l.jsx)("div",{className:"w-full",children:(0,l.jsx)(c.$,{variant:"destructive",onClick:i,className:"w-full",children:"Remove Selected"})})]})})]})}function N(e){let{color1:t,color2:s}=e;if(!t||!s)return null;let n=function(e,t){let s=r(e),l=r(t);return(Math.max(s,l)+.05)/(Math.min(s,l)+.05)}(t,s);return(0,l.jsxs)("div",{className:"h-14 border-t bg-white flex items-center px-4 gap-4",children:[(0,l.jsxs)("div",{className:"flex h-8 w-32 rounded overflow-hidden",children:[(0,l.jsx)("div",{className:"flex-1 flex items-center justify-center",style:{backgroundColor:t,color:s},children:(0,l.jsx)("span",{className:"text-xs",children:"Sample"})}),(0,l.jsx)("div",{className:"flex-1 flex items-center justify-center",style:{backgroundColor:s,color:t},children:(0,l.jsx)("span",{className:"text-xs",children:"Sample"})})]}),(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"text-sm font-medium mr-2",children:"Contrast:"}),(0,l.jsxs)("span",{className:"text-sm font-bold",children:[n.toFixed(2),":1"]})]}),(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"text-sm font-medium mr-2",children:"WCAG AA:"}),(0,l.jsx)("span",{className:"text-sm font-medium ".concat(n>=4.5?"text-green-600":"text-red-600"),children:n>=4.5?"Pass":"Fail"})]}),(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"text-sm font-medium mr-2",children:"WCAG AAA:"}),(0,l.jsx)("span",{className:"text-sm font-medium ".concat(n>=7?"text-green-600":"text-red-600"),children:n>=7?"Pass":"Fail"})]})]})}function C(e){let{isOpen:t,onClose:s,onConfirm:n,title:r,message:o}=e;return(0,l.jsx)(h.lG,{open:t,onOpenChange:s,children:(0,l.jsxs)(h.Cf,{"aria-describedby":"confirmation-dialog-description",children:[(0,l.jsxs)(h.c7,{children:[(0,l.jsx)(h.L3,{children:r}),(0,l.jsx)(h.rr,{id:"confirmation-dialog-description",children:o})]}),(0,l.jsxs)(h.Es,{children:[(0,l.jsx)(c.$,{variant:"outline",onClick:s,children:"Cancel"}),(0,l.jsx)(c.$,{onClick:n,children:"Confirm"})]})]})})}function k(e){return{past:[],present:e,future:[]}}function S(e,t){var s,l;return(s=e.present,l=t,s.length===l.length&&s.every((e,t)=>e===l[t]))?e:{past:[...e.past,e.present],present:t,future:[]}}function M(e){return e.past.length>0}function R(e){return e.future.length>0}function E(){let[e,t]=(0,n.useState)([]),[s,r]=(0,n.useState)([]),[o,i]=(0,n.useState)("#f0f0f0"),[c,d]=(0,n.useState)(!1),u=(0,n.useRef)(null),[h,x]=(0,n.useState)(!1),[m,f]=(0,n.useState)(void 0),[p,j]=(0,n.useState)(void 0),[v,b]=(0,n.useState)(k([])),[y,E]=(0,n.useState)(0),[L,U]=(0,n.useState)(!1),[I,F]=(0,n.useState)("initialization"),[T,D]=(0,n.useState)(null),[A,z]=(0,n.useState)([]);(0,n.useEffect)(()=>{let e=window.location.hash.substring(1);if(e)try{x(!0);let s=function(e){try{let t=atob(e);console.log("Decoded string:",t);let s=t.split("|"),l=s[0],n=decodeURIComponent(l.split("=")[1]),r=[];for(let e=1;e<s.length;e++){let t=s[e].split(":");if(t.length>=5){let e="tile-".concat(t[0],"-").concat(t[1],"-").concat(t[3],"-").concat(t[4]);r.push({id:e,label:decodeURIComponent(t[0]),color:decodeURIComponent(t[1]),description:decodeURIComponent(t[2]),x:Number.parseInt(t[3],10),y:Number.parseInt(t[4],10),width:90,height:90})}}return console.log("Decoded items:",r),{background:n,items:r}}catch(e){return console.error("Error decoding state:",e),{background:"#f0f0f0",items:[]}}}(e);console.log("Decoded state:",s);let l=s.items.map(e=>({...e,width:90,height:90}));t(l),i(s.background),setTimeout(()=>{let e=document.querySelector(".relative.overflow-auto.flex-1");e&&e.focus()},100)}catch(e){console.error("Failed to decode state from URL:",e)}finally{x(!1)}},[]),(0,n.useEffect)(()=>{!(s.length>0&&s.every(t=>e.some(e=>e.id===t)))&&b(k(c?[o]:s.map(t=>{let s=e.find(e=>e.id===t);return s?s.color:"#000000"})))},[s,c,e]),(0,n.useEffect)(()=>{if(1===s.length){let t=e.find(e=>e.id===s[0]);t&&(f(t.color),j(o))}else if(2===s.length){let t=e.find(e=>e.id===s[0]),l=e.find(e=>e.id===s[1]);t&&l&&(f(t.color),j(l.color))}else f(void 0),j(void 0)},[s,e,o]);let O=()=>{t(e.filter(e=>!s.includes(e.id))),r([])},G=l=>{if(c)l.length>0&&i(l[0]);else{let n=[...e];s.forEach((e,t)=>{if(t<l.length){let s=n.findIndex(t=>t.id===e);-1!==s&&(n[s]={...n[s],color:l[t]})}}),t(n),1===s.length&&l.length>0?(f(l[0]),j(o)):2===s.length&&l.length>=2&&(f(l[0]),j(l[1]))}},K=c?[o]:s.map(t=>{let s=e.find(e=>e.id===t);return s?s.color:"#000000"}),$=e=>{("Delete"===e.key||"Backspace"===e.key)&&s.length>0&&O()},H=c||s.length>0,B=e=>{U(!1),T&&(T(e),D(null)),e||(r([]),d(!1))},P=e=>{let t=parseInt(e.slice(1,3),16),s=parseInt(e.slice(3,5),16);return(.299*t+.587*s+.114*parseInt(e.slice(5,7),16))/255>.5?"#000000":"#FFFFFF"};return h?(0,l.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"}),(0,l.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):(0,l.jsxs)("div",{className:"flex flex-col h-screen",children:[(0,l.jsx)(g,{backgroundColor:o,onBackgroundColorChange:i,onBackgroundSelect:()=>{d(!0),r([])},onReset:()=>{t([]),r([]),i("#f0f0f0"),d(!1)},getExportData:()=>({background:o,items:[...e].sort((e,t)=>e.label.localeCompare(t.label)).map(e=>{let{id:t,x:s,y:l,width:n,height:r,...o}=e;return{...o,id:t,x:s,y:l,width:n,height:r}})}),getUrlEncodedState:()=>(function(e){try{let t="background=".concat(encodeURIComponent(e.background));return e.items.forEach(e=>{t+="|".concat(encodeURIComponent(e.label),":").concat(encodeURIComponent(e.color),":").concat(encodeURIComponent(e.description),":").concat(e.x,":").concat(e.y)}),btoa(t)}catch(e){return console.error("Error encoding state:",e),""}})({background:o,items:e}),onUndo:()=>{if(M(v)){let e=function(e){if(0===e.past.length)return e;let t=e.past[e.past.length-1];return{past:e.past.slice(0,e.past.length-1),present:t,future:[e.present,...e.future]}}(v);b(e),G(e.present),E(e=>e+1)}},onRedo:()=>{if(R(v)){let e=function(e){if(0===e.future.length)return e;let t=e.future[0],s=e.future.slice(1);return{past:[...e.past,e.present],present:t,future:s}}(v);b(e),G(e.present),E(e=>e+1)}},canUndo:M(v),canRedo:R(v),showUndoRedo:H,hasTiles:e.length>0}),(0,l.jsxs)("div",{className:"flex flex-1 overflow-hidden",children:[(0,l.jsx)("div",{className:"relative overflow-auto flex-1",onKeyDown:$,tabIndex:0,children:(0,l.jsx)(a,{ref:u,tiles:e,selectedIds:s,backgroundColor:o,onCreateTile:(l,n,o)=>{c&&d(!1);let i={id:"tile-".concat(Date.now()),label:"color ".concat(e.length+1),description:"",color:"#"+Math.floor(0xffffff*Math.random()).toString(16).padStart(6,"0"),x:20*Math.round(l/20),y:20*Math.round(n/20),width:90,height:90};t([...e,i]),o?r([...s,i.id]):r([i.id])},onTileMove:(s,l,n)=>{t(e.map(e=>e.id===s?{...e,x:20*Math.round(l/20),y:20*Math.round(n/20)}:e))},onSelectionChange:t=>{r(t),d(!1),b(k(t.map(t=>{let s=e.find(e=>e.id===t);return s?s.color:"#000000"})))},onTileReorder:s=>{let l=[...e],n=l.findIndex(e=>e.id===s);if(-1!==n){let[e]=l.splice(n,1);l.push(e),t(l)}},onMultiTileMove:(s,l,n)=>{t(e.map(e=>s.includes(e.id)?{...e,x:20*Math.round((e.x+l)/20),y:20*Math.round((e.y+n)/20)}:e))},onKeyDown:$,onClick:()=>{c&&d(!1)},onMoveEnd:()=>{}})}),(0,l.jsx)(w,{selectedTiles:s.map(t=>e.find(e=>e.id===t)).filter(Boolean),onUpdateTiles:l=>{t(e.map(e=>s.includes(e.id)?{...e,...l}:e))},colors:K,onUpdateColors:(l,n)=>{if(0===s.length)(i(l[0]),n)?b(k([l[0]])):b(S(v,[o]));else{let r=e.map(e=>{if(s.includes(e.id)){let t=s.indexOf(e.id);return{...e,color:l[t]}}return e});(t(r),n)?b(k(l)):b(S(v,r.filter(e=>s.includes(e.id)).map(e=>e.color)))}if(z(l.map(e=>P(e))),n){let e=document.querySelector(".relative.overflow-auto.flex-1");e&&e.focus()}},onRemoveSelected:O,onClearSelection:()=>r([]),onConfirmNormalization:e=>new Promise(t=>{U(!0),F(e),D(()=>t)})},y)]}),(0,l.jsx)(N,{color1:m,color2:p}),(0,l.jsx)(C,{isOpen:L,onClose:()=>B(!1),onConfirm:()=>B(!0),title:"Confirm Color Normalization",message:"This action will normalize the selected colors. Do you want to proceed?"})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[839,567,497,954,358],()=>t(254)),_N_E=e.O()}]);