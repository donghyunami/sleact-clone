"use strict";(self.webpackChunksleact_ts_front=self.webpackChunksleact_ts_front||[]).push([[808],{808:function(e,t,a){a.r(t);var n=a(2309),l=a(2545),s=a(9250),o=a(8678),r=a(2951),c=a(9732),i=a(3564),u=a(8667),h=a(9669),m=a.n(h),d=a(7294),f=a(5977),p=a(8100),g=a(4593);t.default=()=>{const{workspace:e,channel:t}=(0,f.UO)(),{data:a}=(0,p.ZP)("/api/users",i.Z),{data:h}=(0,p.ZP)(`/api/workspaces/${e}/channels`,i.Z),k=h?.find((e=>e.name===t)),{data:b,mutate:C,setSize:T}=(0,g.ZP)((a=>`/api/workspaces/${e}/channels/${t}/chats?perPage=20&page=${a+1}`),i.Z,{onSuccess(e){1===e?.length&&setTimeout((()=>{I.current?.scrollToBottom()}),100)}}),{data:_}=(0,p.ZP)(a?`/api/workspaces/${e}/channels/${t}/members`:null,i.Z),[w,E]=(0,d.useState)(!1),[Z,$]=(0,d.useState)(!1),[S,v,D]=(0,o.Z)(""),[B]=(0,r.Z)(e),I=(0,d.useRef)(null),P=0===b?.[0]?.length||b&&b[b.length-1]?.length<20||!1,U=(0,d.useCallback)((n=>{if(n.preventDefault(),console.log("submit"),console.log("chat",S),S?.trim()&&b&&k){const n=S;C((e=>(e?.[0].unshift({id:(b[0][0]?.id||0)+1,content:n,UserId:a.id,User:a,ChannelId:k.id,Channel:k,createdAt:new Date}),e)),!1).then((()=>{D(""),I.current?.scrollToBottom()})),m().post(`/api/workspaces/${e}/channels/${t}/chats`,{content:S}).then((()=>{C()})).catch(console.error)}}),[S,b,a,k,e,t]),A=(0,d.useCallback)((e=>{e.Channel.name!==t||!e.content.startsWith("uploads\\")&&e.UserId===a?.id||C((t=>(t?.[0].unshift(e),t)),!1).then((()=>{I.current&&I.current.getScrollHeight()<I.current.getClientHeight()+I.current.getScrollTop()+150&&(console.log("scrollToBottom!",I.current?.getValues()),setTimeout((()=>{I.current?.scrollToBottom()}),100))}))}),[t,a]);(0,d.useEffect)((()=>(B?.on("message",A),()=>{B?.off("message",A)})),[B,A]),(0,d.useEffect)((()=>{1===b?.length&&I.current?.scrollToBottom()}),[b]);const F=(0,d.useCallback)((()=>{E(!0)}),[]),N=(0,d.useCallback)((()=>{E(!1)}),[]),R=(0,d.useCallback)((a=>{a.preventDefault(),console.log(a);const n=new FormData;if(a.dataTransfer.items){for(let e=0;e<a.dataTransfer.items.length;e++)if(console.log(a.dataTransfer.items[e]),"file"===a.dataTransfer.items[e].kind){const t=a.dataTransfer.items[e].getAsFile();console.log(a,".... file["+e+"].name = "+t.name),n.append("image",t)}}else for(let e=0;e<a.dataTransfer.files.length;e++)console.log(a,"... file["+e+"].name = "+a.dataTransfer.files[e].name),n.append("image",a.dataTransfer.files[e]);m().post(`/api/workspaces/${e}/channels/${t}/images`,n).then((()=>{$(!1),localStorage.setItem(`${e}-${t}`,(new Date).getTime().toString())}))}),[e,t]),W=(0,d.useCallback)((e=>{e.preventDefault(),console.log(e),$(!0)}),[]);if(h&&!k)return d.createElement(f.l_,{to:`/workspace/${e}/channel/일반`});const y=(0,u.Z)(b?b.flat().reverse():[]);return d.createElement(c.W2,{onDrop:R,onDragOver:W},d.createElement(c.h4,null,d.createElement("span",null,"#",t),d.createElement("div",{className:"header-right"},d.createElement("span",null,_?.length),d.createElement("button",{onClick:F,className:"c-button-unstyled p-ia__view_header__button","aria-label":"Add people to #react-native","data-sk":"tooltip_parent",type:"button"},d.createElement("i",{className:"c-icon p-ia__view_header__button_icon c-icon--add-user","aria-hidden":"true"})))),d.createElement(l.Z,{chatSections:y,scrollbarRef:I,setSize:T,isReachingEnd:P}),d.createElement(n.Z,{chat:S,onChangeChat:v,onSubmitForm:U}),d.createElement(s.Z,{show:w,onCloseModal:N,setShowInviteChannelModal:E}),Z&&d.createElement(c.KW,null,"업로드"))}}}]);