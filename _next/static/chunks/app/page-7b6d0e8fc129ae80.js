(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1992:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>E});var l=s(8081),n=s(2149);function i(e){let t=function(e){let t=Number.parseInt(e=e.replace(/^#/,""),16);return{r:t>>16&255,g:t>>8&255,b:255&t}}(e),s=t.r/255,l=t.g/255,n=t.b/255;return .2126*(s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4))+.7152*(l<=.03928?l/12.92:Math.pow((l+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))}function r(e){return i(e)>.5?"#000000":"#ffffff"}function o(e){let{tile:t,isSelected:s,isDragging:i=!1,backgroundColor:o,onClick:a,onDragStart:c}=e,[d,h]=(0,n.useState)(!1),[u,x]=(0,n.useState)(!1),[m,p]=(0,n.useState)({x:0,y:0}),f=(0,n.useRef)(null),g=(0,n.useRef)(null),{id:j,label:b,description:v,color:y,x:w,y:N,width:C,height:k}=t,S=r(o),M=r(o);return(0,n.useEffect)(()=>(d&&!i&&""!==v.trim()?f.current=setTimeout(()=>{x(!0)},1e3):(f.current&&(clearTimeout(f.current),f.current=null),x(!1)),()=>{f.current&&clearTimeout(f.current)}),[d,i,v]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"absolute text-center text-sm select-none",style:{left:"".concat(w,"px"),top:"".concat(N-20,"px"),width:"".concat(C,"px"),color:S},children:b}),(0,l.jsx)("div",{className:"absolute cursor-move flex items-center justify-center select-none rounded-lg",style:{left:"".concat(w,"px"),top:"".concat(N,"px"),width:"".concat(C,"px"),height:"".concat(k,"px"),backgroundColor:y,boxShadow:"0 2px 4px rgba(0,0,0,0.1)",outline:s?"2px solid ".concat(M):"none",outlineOffset:"2px",zIndex:i?20:s?10:1},onClick:a,onMouseDown:c,onMouseEnter:()=>{h(!0)},onMouseLeave:()=>{h(!1)},onMouseMove:e=>{p({x:e.clientX,y:e.clientY})}}),u&&""!==v.trim()&&(0,l.jsx)("div",{ref:g,className:"fixed z-50 p-2 rounded-lg shadow-lg text-sm",style:{left:"".concat(m.x,"px"),top:"".concat(m.y-10,"px"),transform:"translate(-50%, -100%)",backgroundColor:"#ffffff"===S?"#ffffff":"#333333",color:"#ffffff"===S?"#333333":"#ffffff",borderRadius:"8px",maxWidth:"250px",pointerEvents:"none"},children:v})]})}let a=(0,n.forwardRef)((e,t)=>{let{tiles:s,selectedIds:i,backgroundColor:a,onCreateTile:c,onTileMove:d,onSelectionChange:h,onTileReorder:u,onMultiTileMove:x,onKeyDown:m,onClick:p,onMoveEnd:f,onUpdateContrastColors:g}=e,j=(0,n.useRef)(null),[b,v]=(0,n.useState)(!1),[y,w]=(0,n.useState)(null),[N,C]=(0,n.useState)({x:0,y:0}),[k,S]=(0,n.useState)(!1),[M,R]=(0,n.useState)(!1),[E,L]=(0,n.useState)(null),[I,U]=(0,n.useState)(!1),[T,A]=(0,n.useState)({x:0,y:0}),[F,z]=(0,n.useState)({x:0,y:0});(0,n.useEffect)(()=>{let e=e=>{"Control"===e.key&&S(!0)},t=e=>{"Control"===e.key&&S(!1)};return window.addEventListener("keydown",e),window.addEventListener("keyup",t),()=>{window.removeEventListener("keydown",e),window.removeEventListener("keyup",t)}},[]);let D=e=>{if(!j.current)return{x:0,y:0};let t=j.current.getBoundingClientRect();return{x:e.clientX-t.left+j.current.scrollLeft,y:e.clientY-t.top+j.current.scrollTop}},G=e=>{if(I){let t=Math.min(T.x,F.x),l=Math.min(T.y,F.y),n=Math.max(T.x,F.x),r=Math.max(T.y,F.y),o=s.filter(e=>e.x<n&&e.x+e.width>t&&e.y<r&&e.y+e.height>l);if(o.length>0){let t=o.map(e=>e.id);e.ctrlKey||k?h([...i.filter(e=>!t.includes(e)),...t]):h(t)}U(!1)}b&&!M&&E&&O(E,e.ctrlKey||k),b&&M&&f&&f(),v(!1),w(null),R(!1),L(null)},O=(e,t)=>{u(e),t?i.includes(e)||h([...i,e]):i.includes(e)||h([e])},H=(e,t)=>{t.stopPropagation(),b||O(e,t.ctrlKey||k)},$=(e,t)=>{if(0!==t.button)return;t.stopPropagation(),L(e),R(!1);let l=s.find(t=>t.id===e);if(l){let s=D(t);C({x:s.x-l.x,y:s.y-l.y}),v(!0),w(e),i.includes(e)||(t.ctrlKey||k?h([...i,e]):h([e])),u(e)}},B={left:Math.min(T.x,F.x),top:Math.min(T.y,F.y),width:Math.abs(F.x-T.x),height:Math.abs(F.y-T.y)},K=r(a);return(0,l.jsx)("div",{ref:e=>{"function"==typeof t?t(e):t&&(t.current=e),j.current=e},className:"flex-1 overflow-auto relative",style:{backgroundColor:a},onContextMenu:e=>{e.preventDefault();let{x:t,y:l}=D(e),n=s.find(e=>t>=e.x&&t<=e.x+e.width&&l>=e.y&&l<=e.y+e.height);if(n&&1===i.length&&g){let e=s.find(e=>e.id===i[0]);e&&g(e.color,n.color)}else c(t,l,e.ctrlKey||k)},onMouseDown:e=>{var t;if(0===e.button&&(p&&p(),e.target===j.current||e.target===(null===(t=j.current)||void 0===t?void 0:t.firstChild))){let t=D(e);A(t),z(t),U(!0),e.ctrlKey||k||h([])}},onMouseMove:e=>{let t=D(e);if(I&&z(t),b&&y){R(!0);let e=t.x-N.x,l=t.y-N.y;if(i.includes(y)&&i.length>1){let t=s.find(e=>e.id===y);t&&x(i,e-t.x,l-t.y)}else d(y,e,l)}},onMouseUp:G,onMouseLeave:G,onKeyDown:m,tabIndex:0,children:(0,l.jsxs)("div",{className:"relative w-[3000px] h-[3000px]",children:[s.map(e=>(0,l.jsx)(o,{tile:e,isSelected:i.includes(e.id),isDragging:y===e.id,backgroundColor:a,onClick:t=>H(e.id,t),onDragStart:t=>$(e.id,t)},e.id)),I&&B.width>5&&B.height>5&&(0,l.jsx)("div",{className:"absolute pointer-events-none z-[1000]",style:{left:"".concat(B.left,"px"),top:"".concat(B.top,"px"),width:"".concat(B.width,"px"),height:"".concat(B.height,"px"),border:"1px dashed ".concat(K),backgroundColor:"".concat(K,"10")}})]})})});a.displayName="Canvas";var c=s(5160),d=s(7890),h=s(7037),u=s(5192);function x(){let[e,t]=(0,n.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.$,{variant:"ghost",size:"icon",onClick:()=>t(!0),className:"rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200",children:(0,l.jsx)("span",{className:"text-base font-semibold",children:"?"})}),(0,l.jsx)(u.lG,{open:e,onOpenChange:t,children:(0,l.jsxs)(u.Cf,{className:"max-w-3xl max-h-[80vh] overflow-y-auto",children:[(0,l.jsxs)(u.c7,{children:[(0,l.jsx)(u.L3,{children:"Gloss - Color Palette Designer"}),(0,l.jsx)(u.rr,{children:"A tool for designing color palettes with precision and accessibility"})]}),(0,l.jsxs)("div",{className:"space-y-6 mt-4",children:[(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-bold mb-2",children:"About Gloss"}),(0,l.jsx)("p",{children:"Gloss is a minimal tool to handcraft color palettes with precision. It helps you design and fine-tune individual colors while ensuring consistency and harmony across a full palette. Gloss offers fine-grained HSL control, smart multi-selection behavior, and built-in contrast checking for accessibility."})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-bold mb-2",children:"Interface Overview"}),(0,l.jsx)("p",{className:"mb-2",children:"Gloss is composed of four main zones:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"Canvas (left)"})," — your main workspace where you create and organize color tiles."]}),(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"Sidebar (right)"})," — a color picker and metadata editor for selected tiles."]}),(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"Topbar (top)"})," — general controls: canvas background, reset, export, and share."]}),(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"Bottombar (bottom)"})," — contrast ratio checker for accessibility."]})]})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-bold mb-2",children:"Canvas Basics"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsx)("li",{children:"Right-click on empty space to create a new tile with a random color."}),(0,l.jsx)("li",{children:"Left-click and drag a tile to move it freely around the canvas."}),(0,l.jsx)("li",{children:"Left-click a tile to select it and open it in the sidebar for editing."})]})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-bold mb-2",children:"Sidebar: Single Color Editing"}),(0,l.jsx)("h4",{className:"text-base font-bold mb-2",children:"When a tile is selected:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsxs)("li",{children:["The color picker allows precise editing using HSL:",(0,l.jsxs)("ul",{className:"list-disc pl-5 mt-2",children:[(0,l.jsx)("li",{children:"Hue & saturation via the wheel"}),(0,l.jsx)("li",{children:"Lightness via the slider"})]})]}),(0,l.jsx)("li",{children:"You can also input values directly in hex, h, s, or l fields."}),(0,l.jsx)("li",{children:"Click the preview tile to copy the current color's hex value to the clipboard."}),(0,l.jsx)("li",{children:"The tile's label and description can be edited below the picker."})]}),(0,l.jsx)("h4",{className:"text-base font-bold mt-4 mb-2",children:"In the wheel:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsxs)("li",{children:["Hold ",(0,l.jsx)("kbd",{className:"px-1.5 py-0.5 bg-gray-100 border rounded text-sm",children:"Ctrl"})," to lock saturation while moving markers."]}),(0,l.jsxs)("li",{children:["Hold ",(0,l.jsx)("kbd",{className:"px-1.5 py-0.5 bg-gray-100 border rounded text-sm",children:"Shift"})," to lock hue."]})]}),(0,l.jsx)("p",{className:"mt-4",children:"You can also switch to okHSL mode using the toolbar toggle. okHSL is a perceptually uniform color space that preserves consistent visual lightness, which can be useful when designing with contrast in mind."})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-bold mb-2",children:"Multiple Selection & Group Editing"}),(0,l.jsx)("h4",{className:"text-base font-bold mb-2",children:"You can edit multiple tiles at once:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsxs)("li",{children:[(0,l.jsx)("kbd",{className:"px-1.5 py-0.5 bg-gray-100 border rounded text-sm",children:"Ctrl"}),"+Click to add or remove tiles from a selection."]}),(0,l.jsx)("li",{children:"Click and drag to draw a selection box."}),(0,l.jsxs)("li",{children:[(0,l.jsx)("kbd",{className:"px-1.5 py-0.5 bg-gray-100 border rounded text-sm",children:"Ctrl"}),"+Right-click on empty space to create a new tile inside the current selection."]})]}),(0,l.jsx)("p",{className:"mt-4 mb-2",children:"When multiple tiles are selected, a virtual group is formed. The picker enforces a shared constraint across the selection:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsx)("li",{children:"Wheel mode: all colors share the same lightness."}),(0,l.jsx)("li",{children:"Slider mode: all colors share the same hue and saturation."})]}),(0,l.jsx)("p",{className:"mt-4",children:"The mode is automatically selected based on the current colors but can be changed manually via the toolbar."}),(0,l.jsx)("h4",{className:"text-base font-bold mt-4 mb-2",children:"While in group mode:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsx)("li",{children:"You'll see multiple markers on the wheel or slider, depending on the mode."}),(0,l.jsxs)("li",{children:["Use the spread controls to evenly distribute the selection by:",(0,l.jsxs)("ul",{className:"list-disc pl-5 mt-2",children:[(0,l.jsx)("li",{children:"Hue"}),(0,l.jsx)("li",{children:"Saturation"}),(0,l.jsx)("li",{children:"Lightness"})]})]}),(0,l.jsx)("li",{children:"Changes to label or description will apply to all selected tiles."})]})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-bold mb-2",children:"Contrast Checker"}),(0,l.jsx)("p",{className:"mb-2",children:"Located in the bottom bar:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsx)("li",{children:"If one tile is selected, contrast is calculated against the canvas background."}),(0,l.jsx)("li",{children:"If two tiles are selected, contrast is calculated between them."}),(0,l.jsx)("li",{children:"If more than two, the checker is hidden."}),(0,l.jsx)("li",{children:"You can manually pick a second color for comparison by right-clicking another tile while one is selected."})]}),(0,l.jsx)("p",{className:"mt-4",children:"Contrast levels are evaluated using WCAG AA and AAA standards."})]}),(0,l.jsxs)("section",{children:[(0,l.jsx)("h3",{className:"text-lg font-bold mb-2",children:"Export & Share"}),(0,l.jsx)("p",{className:"mb-2",children:"Gloss provides two ways to save or share your palette:"}),(0,l.jsxs)("ul",{className:"list-disc pl-5 space-y-2",children:[(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"Export:"})," Save the palette as a JSON file containing each tile's hex value, label, and description."]}),(0,l.jsxs)("li",{children:[(0,l.jsx)("strong",{children:"Copy URL:"})," Generate a shareable link encoding the full canvas state.",(0,l.jsx)("p",{className:"mt-2 text-sm text-gray-600",children:"Note: long palettes will result in long URLs, which may not be supported by all browsers."})]})]})]})]})]})})]})}function m(e){let{isOpen:t,onClose:s,onConfirm:n,title:i,message:r}=e;return(0,l.jsx)(u.lG,{open:t,onOpenChange:s,children:(0,l.jsxs)(u.Cf,{"aria-describedby":"confirmation-dialog-description",children:[(0,l.jsxs)(u.c7,{children:[(0,l.jsx)(u.L3,{children:i}),(0,l.jsx)(u.rr,{id:"confirmation-dialog-description",children:r})]}),(0,l.jsxs)(u.Es,{children:[(0,l.jsx)(c.$,{variant:"outline",onClick:s,children:"Cancel"}),(0,l.jsx)(c.$,{onClick:n,children:"Confirm"})]})]})})}var p=s(1018);let f=(0,p.A)("Undo2",[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]]),g=(0,p.A)("Redo2",[["path",{d:"m15 14 5-5-5-5",key:"12vg1m"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",key:"6uklza"}]]);function j(e){let{backgroundColor:t,onBackgroundColorChange:s,onBackgroundSelect:i,onReset:r,getExportData:o,getUrlEncodedState:a,onUndo:p,onRedo:j,canUndo:b=!1,canRedo:v=!1,showUndoRedo:y=!1,hasTiles:w=!1}=e,[N,C]=(0,n.useState)(!1),[k,S]=(0,n.useState)(!1),[M,R]=(0,n.useState)(!1),[E,L]=(0,n.useState)(""),[I,U]=(0,n.useState)(""),{showToast:T,ToastContainer:A}=(0,h.d)(),F=e=>{navigator.clipboard.writeText(e).then(()=>{T("Copied to clipboard!")}).catch(e=>{console.error("Failed to copy: ",e)})};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"h-14 border-b bg-white flex items-center px-4 justify-between",children:[(0,l.jsxs)("div",{className:"flex items-center gap-2",children:[(0,l.jsx)("h1",{className:"font-bold text-lg",children:"Gloss"}),(0,l.jsx)(x,{}),(0,l.jsx)("div",{className:"h-6 w-px bg-gray-300 mx-2"}),(0,l.jsxs)("div",{className:"flex items-center gap-2",children:[(0,l.jsx)(d.J,{htmlFor:"bg-color",className:"text-sm",children:"Background:"}),(0,l.jsx)("div",{className:"w-8 h-8 rounded border border-gray-300 cursor-pointer",style:{backgroundColor:t},onClick:i,title:"Click to edit background color"})]}),p&&j&&y&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"h-6 w-px bg-gray-300 mx-2"}),(0,l.jsxs)("div",{className:"flex items-center gap-1",children:[(0,l.jsx)(c.$,{variant:"ghost",size:"icon",onClick:p,disabled:!b,className:"h-8 w-8",title:"Undo color change",children:(0,l.jsx)(f,{className:"h-4 w-4"})}),(0,l.jsx)(c.$,{variant:"ghost",size:"icon",onClick:j,disabled:!v,className:"h-8 w-8",title:"Redo color change",children:(0,l.jsx)(g,{className:"h-4 w-4"})})]})]})]}),(0,l.jsx)("div",{className:"flex items-center gap-2",children:w&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.$,{variant:"outline",size:"sm",onClick:()=>R(!0),children:"Reset"}),(0,l.jsx)(c.$,{variant:"outline",size:"sm",onClick:()=>{let e=o();L(JSON.stringify({background:e.background,items:e.items.map(e=>{let{label:t,description:s,color:l}=e;return{label:t,description:s,color:l}})},null,2)),C(!0)},children:"Export JSON"}),(0,l.jsx)(c.$,{variant:"outline",size:"sm",onClick:()=>{U("".concat(window.location.origin).concat(window.location.pathname,"#").concat(a())),S(!0)},children:"Copy URL"})]})})]}),(0,l.jsx)(u.lG,{open:N,onOpenChange:C,children:(0,l.jsxs)(u.Cf,{className:"max-w-2xl","aria-describedby":"export-dialog-description",children:[(0,l.jsxs)(u.c7,{children:[(0,l.jsx)(u.L3,{children:"Export JSON"}),(0,l.jsx)(u.rr,{id:"export-dialog-description",children:"Copy this JSON data to use in your application"})]}),(0,l.jsx)("div",{className:"bg-gray-100 p-4 rounded-md overflow-auto max-h-[60vh] mb-4",children:(0,l.jsx)("pre",{className:"text-sm",children:E})}),(0,l.jsx)(u.Es,{children:(0,l.jsx)(c.$,{onClick:()=>F(E),children:"Copy to Clipboard"})})]})}),(0,l.jsx)(u.lG,{open:k,onOpenChange:S,children:(0,l.jsxs)(u.Cf,{className:"max-w-2xl","aria-describedby":"url-dialog-description",children:[(0,l.jsxs)(u.c7,{children:[(0,l.jsx)(u.L3,{children:"Share URL"}),(0,l.jsx)(u.rr,{id:"url-dialog-description",children:"Copy this URL to share your color palette"})]}),(0,l.jsx)("div",{className:"bg-gray-100 p-4 rounded-md overflow-auto mb-4",children:(0,l.jsx)("p",{className:"text-sm break-all",children:I})}),(0,l.jsx)(u.Es,{children:(0,l.jsx)(c.$,{onClick:()=>F(I),children:"Copy to Clipboard"})})]})}),(0,l.jsx)(m,{isOpen:M,onClose:()=>R(!1),onConfirm:()=>{r(),R(!1)},title:"Reset Canvas",message:"Are you sure you want to reset the canvas? This will remove all colors and cannot be undone."}),(0,l.jsx)(A,{})]})}var b=s(900),v=s(7687);let y=n.forwardRef((e,t)=>{let{className:s,...n}=e;return(0,l.jsx)("textarea",{className:(0,v.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...n})});y.displayName="Textarea";var w=s(1006);function N(e){let{selectedTiles:t,onUpdateTiles:s,colors:i,onUpdateColors:r,onRemoveSelected:o,onClearSelection:a,onConfirmNormalization:h}=e,[u,x]=(0,n.useState)(""),[m,p]=(0,n.useState)("");return((0,n.useEffect)(()=>{if(0===t.length){x(""),p("");return}let e=t.every(e=>e.label===t[0].label),s=t.every(e=>e.description===t[0].description);x(e?t[0].label:"(varied)"),p(s?t[0].description:"(varied)")},[t]),0===t.length&&0===i.length)?(0,l.jsx)("div",{className:"w-96 border-l p-4 bg-white flex flex-col h-full items-center justify-center",children:(0,l.jsxs)("div",{className:"flex flex-col items-center gap-2 text-gray-500",children:[(0,l.jsx)("div",{className:"rounded-full bg-gray-100 p-3",children:(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,l.jsx)("path",{d:"M16 2v5h5"}),(0,l.jsx)("path",{d:"M21 6v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12l5 3Z"}),(0,l.jsx)("path",{d:"M9.5 10.5 6 14h12l-3.5-3.5-2 2-3-3Z"})]})}),(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsx)("p",{className:"text-sm font-medium mb-1",children:"Right-click to create a new tile"}),(0,l.jsx)("p",{className:"text-sm font-medium",children:"Left-click to select a tile"})]})]})}):(0,l.jsxs)("div",{className:"w-96 border-l p-4 bg-white overflow-y-auto flex flex-col h-full",children:[i.length>0&&(0,l.jsx)("div",{className:"mb-3",children:(0,l.jsx)(w.l,{colors:i,onChange:r,confirmNormalization:h})}),t.length>0&&(0,l.jsx)("div",{className:"mb-6",children:(0,l.jsxs)("div",{className:"space-y-4",children:[(0,l.jsxs)("div",{className:"space-y-2",children:[(0,l.jsx)(d.J,{htmlFor:"label",children:"Label"}),(0,l.jsx)(b.p,{id:"label",value:u,onChange:e=>{x(e.target.value),s({label:e.target.value})},placeholder:"Enter label"})]}),(0,l.jsxs)("div",{className:"space-y-2",children:[(0,l.jsx)(d.J,{htmlFor:"description",children:"Description"}),(0,l.jsx)(y,{id:"description",value:m,onChange:e=>{p(e.target.value),s({description:e.target.value})},placeholder:"Enter description",rows:3})]}),(0,l.jsx)("div",{className:"w-full",children:(0,l.jsx)(c.$,{variant:"destructive",onClick:o,className:"w-full",children:"Remove Selected"})})]})})]})}function C(e){let{color1:t,color2:s}=e;if(!t||!s)return null;let n=function(e,t){let s=i(e),l=i(t);return(Math.max(s,l)+.05)/(Math.min(s,l)+.05)}(t,s);return(0,l.jsxs)("div",{className:"h-14 border-t bg-white flex items-center px-4 gap-4",children:[(0,l.jsxs)("div",{className:"flex h-8 w-32 rounded overflow-hidden",children:[(0,l.jsx)("div",{className:"flex-1 flex items-center justify-center",style:{backgroundColor:t,color:s},children:(0,l.jsx)("span",{className:"text-xs",children:"Sample"})}),(0,l.jsx)("div",{className:"flex-1 flex items-center justify-center",style:{backgroundColor:s,color:t},children:(0,l.jsx)("span",{className:"text-xs",children:"Sample"})})]}),(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"text-sm font-medium mr-2",children:"Contrast:"}),(0,l.jsxs)("span",{className:"text-sm font-bold",children:[n.toFixed(2),":1"]})]}),(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"text-sm font-medium mr-2",children:"WCAG AA:"}),(0,l.jsx)("span",{className:"text-sm font-medium ".concat(n>=4.5?"text-green-600":"text-red-600"),children:n>=4.5?"Pass":"Fail"})]}),(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)("span",{className:"text-sm font-medium mr-2",children:"WCAG AAA:"}),(0,l.jsx)("span",{className:"text-sm font-medium ".concat(n>=7?"text-green-600":"text-red-600"),children:n>=7?"Pass":"Fail"})]})]})}function k(e){return{past:[],present:e,future:[]}}function S(e,t){var s,l;return(s=e.present,l=t,s.length===l.length&&s.every((e,t)=>e===l[t]))?e:{past:[...e.past,e.present],present:t,future:[]}}function M(e){return e.past.length>0}function R(e){return e.future.length>0}function E(){let[e,t]=(0,n.useState)([]),[s,i]=(0,n.useState)([]),[r,o]=(0,n.useState)("#f0f0f0"),[c,d]=(0,n.useState)(!1),h=(0,n.useRef)(null),[u,x]=(0,n.useState)(!1),[p,f]=(0,n.useState)(void 0),[g,b]=(0,n.useState)(void 0),[v,y]=(0,n.useState)(k([])),[w,E]=(0,n.useState)(0),[L,I]=(0,n.useState)(!1),[U,T]=(0,n.useState)("initialization"),[A,F]=(0,n.useState)(null),[z,D]=(0,n.useState)([]);(0,n.useEffect)(()=>{let e=window.location.hash.substring(1);if(e)try{x(!0);let s=function(e){try{let t=atob(e);console.log("Decoded string:",t);let s=t.split("|"),l=s[0],n=decodeURIComponent(l.split("=")[1]),i=[];for(let e=1;e<s.length;e++){let t=s[e].split(":");if(t.length>=5){let e="tile-".concat(t[0],"-").concat(t[1],"-").concat(t[3],"-").concat(t[4]);i.push({id:e,label:decodeURIComponent(t[0]),color:decodeURIComponent(t[1]),description:decodeURIComponent(t[2]),x:Number.parseInt(t[3],10),y:Number.parseInt(t[4],10),width:90,height:90})}}return console.log("Decoded items:",i),{background:n,items:i}}catch(e){return console.error("Error decoding state:",e),{background:"#f0f0f0",items:[]}}}(e);console.log("Decoded state:",s);let l=s.items.map(e=>({...e,width:90,height:90}));t(l),o(s.background),setTimeout(()=>{let e=document.querySelector(".relative.overflow-auto.flex-1");e&&e.focus()},100)}catch(e){console.error("Failed to decode state from URL:",e)}finally{x(!1)}},[]),(0,n.useEffect)(()=>{!(s.length>0&&s.every(t=>e.some(e=>e.id===t)))&&y(k(c?[r]:s.map(t=>{let s=e.find(e=>e.id===t);return s?s.color:"#000000"})))},[s,c,e]),(0,n.useEffect)(()=>{if(1===s.length){let t=e.find(e=>e.id===s[0]);t&&(f(t.color),b(r))}else if(2===s.length){let t=e.find(e=>e.id===s[0]),l=e.find(e=>e.id===s[1]);t&&l&&(f(t.color),b(l.color))}else f(void 0),b(void 0)},[s,e,r]);let G=()=>{t(e.filter(e=>!s.includes(e.id))),i([])},O=l=>{if(c)l.length>0&&o(l[0]);else{let n=[...e];s.forEach((e,t)=>{if(t<l.length){let s=n.findIndex(t=>t.id===e);-1!==s&&(n[s]={...n[s],color:l[t]})}}),t(n),1===s.length&&l.length>0?(f(l[0]),b(r)):2===s.length&&l.length>=2&&(f(l[0]),b(l[1]))}},H=c?[r]:s.map(t=>{let s=e.find(e=>e.id===t);return s?s.color:"#000000"}),$=e=>{("Delete"===e.key||"Backspace"===e.key)&&s.length>0&&G()},B=c||s.length>0,K=e=>{A&&(e||"initialization"!==U||(i([]),d(!1)),A(e),F(null),setTimeout(()=>{let e=document.querySelector(".relative.overflow-auto.flex-1");e&&e.focus()},0))},W=e=>{let t=parseInt(e.slice(1,3),16),s=parseInt(e.slice(3,5),16);return(.299*t+.587*s+.114*parseInt(e.slice(5,7),16))/255>.5?"#000000":"#FFFFFF"};return u?(0,l.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"}),(0,l.jsx)("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})}):(0,l.jsxs)("div",{className:"flex flex-col h-screen",children:[(0,l.jsx)(j,{backgroundColor:r,onBackgroundColorChange:o,onBackgroundSelect:()=>{d(!0),i([])},onReset:()=>{t([]),i([]),o("#f0f0f0"),d(!1)},getExportData:()=>({background:r,items:[...e].sort((e,t)=>e.label.localeCompare(t.label)).map(e=>{let{id:t,x:s,y:l,width:n,height:i,...r}=e;return{...r,id:t,x:s,y:l,width:n,height:i}})}),getUrlEncodedState:()=>(function(e){try{let t="background=".concat(encodeURIComponent(e.background));return e.items.forEach(e=>{t+="|".concat(encodeURIComponent(e.label),":").concat(encodeURIComponent(e.color),":").concat(encodeURIComponent(e.description),":").concat(e.x,":").concat(e.y)}),btoa(t)}catch(e){return console.error("Error encoding state:",e),""}})({background:r,items:e}),onUndo:()=>{if(M(v)){let e=function(e){if(0===e.past.length)return e;let t=e.past[e.past.length-1];return{past:e.past.slice(0,e.past.length-1),present:t,future:[e.present,...e.future]}}(v);y(e),O(e.present),E(e=>e+1)}},onRedo:()=>{if(R(v)){let e=function(e){if(0===e.future.length)return e;let t=e.future[0],s=e.future.slice(1);return{past:[...e.past,e.present],present:t,future:s}}(v);y(e),O(e.present),E(e=>e+1)}},canUndo:M(v),canRedo:R(v),showUndoRedo:B,hasTiles:e.length>0}),(0,l.jsxs)("div",{className:"flex flex-1 overflow-hidden",children:[(0,l.jsx)("div",{className:"relative overflow-auto flex-1",onKeyDown:$,tabIndex:0,children:(0,l.jsx)(a,{ref:h,tiles:e,selectedIds:s,backgroundColor:r,onCreateTile:(l,n,r)=>{c&&d(!1);let o=new Set;e.forEach(e=>{let t=e.label.match(/^color (\d+)$/);t&&o.add(parseInt(t[1],10))});let a=1;for(;o.has(a);)a++;let h={id:"tile-".concat(Date.now()),label:"color ".concat(a),description:"",color:"#"+Math.floor(0xffffff*Math.random()).toString(16).padStart(6,"0"),x:20*Math.round(l/20),y:20*Math.round(n/20),width:90,height:90};t([...e,h]),r?i([...s,h.id]):i([h.id])},onTileMove:(s,l,n)=>{t(e.map(e=>e.id===s?{...e,x:20*Math.round(l/20),y:20*Math.round(n/20)}:e))},onSelectionChange:t=>{i(t),d(!1),y(k(t.map(t=>{let s=e.find(e=>e.id===t);return s?s.color:"#000000"})))},onTileReorder:s=>{let l=[...e],n=l.findIndex(e=>e.id===s);if(-1!==n){let[e]=l.splice(n,1);l.push(e),t(l)}},onMultiTileMove:(s,l,n)=>{t(e.map(e=>s.includes(e.id)?{...e,x:20*Math.round((e.x+l)/20),y:20*Math.round((e.y+n)/20)}:e))},onKeyDown:$,onClick:()=>{c&&d(!1)},onMoveEnd:()=>{},onUpdateContrastColors:(e,t)=>{f(e),b(t)}})}),(0,l.jsx)(N,{selectedTiles:s.map(t=>e.find(e=>e.id===t)).filter(Boolean),onUpdateTiles:l=>{t(e.map(e=>s.includes(e.id)?{...e,...l}:e))},colors:H,onUpdateColors:(l,n)=>{if(0===s.length)(o(l[0]),n)?y(k([l[0]])):y(S(v,[r]));else{let i=e.map(e=>{if(s.includes(e.id)){let t=s.indexOf(e.id);return{...e,color:l[t]}}return e});(t(i),n)?y(k(l)):y(S(v,i.filter(e=>s.includes(e.id)).map(e=>e.color)))}if(D(l.map(e=>W(e))),n){let e=document.querySelector(".relative.overflow-auto.flex-1");e&&e.focus()}},onRemoveSelected:G,onClearSelection:()=>i([]),onConfirmNormalization:e=>new Promise(t=>{I(!0),T(e),F(()=>t)})},w)]}),(0,l.jsx)(C,{color1:p,color2:g}),(0,l.jsx)(m,{isOpen:!!A,onClose:()=>K(!1),onConfirm:()=>K(!0),title:"Normalize Colors",message:"The color picker enforces constraints between colors based on the current mode. Accept to normalize colors and maintain these constraints."})]})}},5954:(e,t,s)=>{Promise.resolve().then(s.bind(s,1992))}},e=>{var t=t=>e(e.s=t);e.O(0,[839,567,497,954,358],()=>t(5954)),_N_E=e.O()}]);