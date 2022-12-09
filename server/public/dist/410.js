"use strict";(self.webpackChunksleact_ts_front=self.webpackChunksleact_ts_front||[]).push([[410],{2309:function(e,t,n){n.d(t,{Z:function(){return b}});var r=n(3564),a=n(7294),i=n(5977),o=n(8100),l=n(6482),s=n(2034);const c=(0,l.Z)("div",{target:"e298qi15"})({name:"ra6cyy",styles:"display:flex;width:100%;padding:20px;padding-top:0"}),p=(0,l.Z)("form",{target:"e298qi14"})({name:"33ihw2",styles:"color:rgb(29, 28, 29);font-size:15px;width:100%;border-radius:4px;border:1px solid rgb(29, 28, 29)"}),d=(0,l.Z)(s.r,{target:"e298qi13"})({name:"f8f3ry",styles:"font-family:Slack-Lato,appleLogo,sans-serif;font-size:15px;padding:8px 9px;width:100%;resize:none;& strong{background:skyblue;}& textarea{width:100%;height:44px;padding:9px 10px!important;outline:none!important;border-radius:4px!important;resize:none!important;line-height:22px;border:none;}& ul{border:1px solid lightgray;max-height:200px;overflow-y:auto;padding:9px 10px;background:white;border-radius:4px;width:150px;}"}),u=(0,l.Z)("div",{target:"e298qi12"})({name:"13ie2qx",styles:"position:relative;background:rgb(248, 248, 248);height:41px;display:flex;border-top:1px solid rgb(221, 221, 221);align-items:center;border-bottom-left-radius:4px;border-bottom-right-radius:4px"}),m=(0,l.Z)("button",{target:"e298qi11"})({name:"xrrdm2",styles:"position:absolute;right:5px;top:5px"}),x=(0,l.Z)("button",{target:"e298qi10"})("padding:4px 20px;background:transparent;border:none;display:flex;align-items:center;color:rgb(28, 29, 28);width:100%;& img{margin-right:5px;}",(({focus:e})=>e&&"\n    background: #1264a3;\n    color: white;\n  "),";");var g=n(3682),h=n(6182),f=n.n(h),b=({chat:e,onSubmitForm:t,onChangeChat:n,placeholder:l})=>{const{workspace:h}=(0,i.UO)(),{data:b,error:y,mutate:w}=(0,o.ZP)("/api/users",r.Z,{dedupingInterval:2e3}),{data:k}=(0,o.ZP)(b?`/api/workspaces/${h}/members`:null,r.Z),v=(0,a.useRef)(null);(0,a.useEffect)((()=>{v.current&&(0,g.Z)(v.current)}),[]);const E=(0,a.useCallback)((e=>{"Enter"===e.key&&(e.shiftKey||t(e))}),[t]),_=(0,a.useCallback)(((e,t,n,r,i)=>{if(k)return a.createElement(x,{focus:i},a.createElement("img",{src:f().url(k[r].email,{s:"20px",d:"retro"}),alt:k[r].nickname}),a.createElement("span",null,n))}),[]);return a.createElement(c,null,a.createElement(p,{onSubmit:t},a.createElement(d,{id:"editor-chat",value:e,onChange:n,onKeyDown:E,placeholder:l,inputRef:v,allowSuggestionsAboveCursor:!0},a.createElement(s.p,{appendSpaceOnAdd:!0,trigger:"@",data:k?.map((e=>({id:e.id,display:e.nickname})))||[],renderSuggestion:_})),a.createElement(u,null,a.createElement(m,{className:"c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send"+(e?.trim()?"":" c-texty_input__button--disabled"),"data-qa":"texty_send_button","aria-label":"Send message","data-sk":"tooltip_parent",type:"submit",disabled:!e?.trim()},a.createElement("i",{className:"c-icon c-icon--paperplane-filled"})))))}},2545:function(e,t,n){n.d(t,{Z:function(){return y}});var r=n(7294),a=n(6182),i=n.n(a),o=n(6482);const l=(0,o.Z)("div",{target:"ec89ap00"})({name:"2yhi1c",styles:"display:flex;padding:8px 20px;&:hover{background:#eee;}& .chat-img{display:flex;width:36px;margin-right:8px;& img{width:36px;height:36px;}}& .chat-text{display:flex;flex-wrap:wrap;flex:1;& p{flex:0 0 100%;margin:0;}}& .chat-user{display:flex;flex:0 0 100%;align-items:center;&>b{margin-right:5px;}&>span{font-size:12px;}}& a{text-decoration:none;color:deepskyblue;}"});var s=n(7484),c=n.n(s),p=n(8817),d=n(3727),u=n(5977);const m=({data:e})=>{const{workspace:t}=(0,u.UO)(),n="Sender"in e?e.Sender:e.User,a=(0,r.useMemo)((()=>e.content.startsWith("uploads\\")?r.createElement("img",{src:`https://sleact.nodebird.com/${e.content}`,style:{maxHeight:200}}):(0,p.Z)({input:e.content,pattern:/@\[(.+?)\]\((\d+?)\)|\n/g,decorator(e,n){const a=e.match(/@\[(.+?)]\((\d+?)\)/);return console.log("arr",a),a?r.createElement(d.rU,{key:e+n,to:`/workspace/${t}/dm/${a[2]}`},"@",a[1]):r.createElement("br",{key:n})}})),[e.content]);return r.createElement(l,null,r.createElement("div",{className:"chat-img"},r.createElement("img",{src:i().url(n.email,{s:"36px",d:"retro"}),alt:n.nickname})),r.createElement("div",{className:"chat-text"},r.createElement("div",{className:"chat-user"},r.createElement("b",null,n.nickname),r.createElement("span",null,c()(e.createdAt).format("h:mm A"))),r.createElement("p",null,a)))};var x=(0,r.memo)(m),g=n(6658);const h=(0,o.Z)("div",{target:"e1jqbxcr2"})({name:"1op36e9",styles:"width:100%;display:flex;flex:1"}),f=(0,o.Z)("section",{target:"e1jqbxcr1"})({name:"10zp55f",styles:"margin-top:20px;border-top:1px solid #eee"}),b=(0,o.Z)("div",{target:"e1jqbxcr0"})({name:"16cu5ak",styles:"display:flex;justify-content:center;flex:1;width:100%;position:sticky;top:14px;& button{font-weight:bold;font-size:13px;height:28px;line-height:27px;padding:0 16px;z-index:2;--saf-0:rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);box-shadow:0 0 0 1px var(--saf-0),0 1px 3px 0 rgba(0, 0, 0, 0.08);border-radius:24px;position:relative;top:-13px;background:white;border:none;outline:none;}"});var y=({chatSections:e,setSize:t,scrollbarRef:n,isReachingEnd:a})=>{const i=(0,r.useCallback)((e=>{0!==e.scrollTop||a||(console.log("가장 위"),t((e=>e+1)).then((()=>{n?.current,n.current?.scrollTop(n.current?.getScrollHeight()-e.scrollHeight)})))}),[t,a]);return r.createElement(h,null,r.createElement(g.$B,{className:"scrollbars",autoHide:!0,ref:n,onScrollFrame:i},Object.entries(e).map((([e,t])=>r.createElement(f,{className:`section-${e}`,key:e},r.createElement(b,null,r.createElement("button",null,e)),t?.map((e=>r.createElement(x,{key:e.id,data:e}))))))))}},9732:function(e,t,n){n.d(t,{KW:function(){return o},W2:function(){return a},h4:function(){return i}});var r=n(6482);const a=(0,r.Z)("div",{target:"exhfy1p2"})({name:"1a0r0eh",styles:"display:flex;flex-wrap:wrap;height:calc(100vh - 38px);flex-flow:column;position:relative"}),i=(0,r.Z)("header",{target:"exhfy1p1"})({name:"1ezwwi6",styles:"height:64px;display:flex;width:100%;--saf-0:rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);box-shadow:0 1px 0 var(--saf-0);padding:20px 16px 20px 20px;font-weight:bold;align-items:center;& .header-right{display:flex;flex:1;justify-content:flex-end;align-items:center;}"}),o=(0,r.Z)("div",{target:"exhfy1p0"})({name:"czjct4",styles:"position:absolute;top:64px;left:0;width:100%;height:calc(100% - 64px);background:white;opacity:0.7;display:flex;align-items:center;justify-content:center;font-size:40px"})},8667:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(7484),a=n.n(r);function i(e){const t={};return e.forEach((e=>{const n=a()(e.createdAt).format("YYYY-MM-DD");Array.isArray(t[n])?t[n].push(e):t[n]=[e],t[n]})),t}}}]);