"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[925],{6925:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var r=n(4165),i=n(5861),a=n(2791),s=n(6151),c=n(722),o=n(8870),l=n(890),u=n(9164),d=n(9658),h=n(7317),p=n(7621),f=n(7689),x=n(2958),m=n(3108),v=n(184);function g(){var e=(0,f.UO)().placeId,t=(0,f.s0)(),n=(0,x.x)(),g=n.sendRequest,Z=n.error,b=(0,a.useContext)(m.V),j=function(){var n=(0,i.Z)((0,r.Z)().mark((function n(i){var a,s;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i.preventDefault(),a=new FormData(i.currentTarget),s={title:a.get("title"),description:a.get("description")},n.prev=3,n.next=6,g("https://cute-plum-cobra.cyclic.app/api/places/".concat(e),"patch",s,{Authorization:"Bearer ".concat(b.token)});case 6:t("/".concat(b.userId,"/places")),n.next=11;break;case 9:n.prev=9,n.t0=n.catch(3);case 11:case"end":return n.stop()}}),n,null,[[3,9]])})));return function(e){return n.apply(this,arguments)}}();return(0,v.jsxs)(v.Fragment,{children:[Z&&(0,v.jsx)(u.Z,{sx:{my:4,display:"flex",justifyContent:"center"},children:(0,v.jsxs)(d.Z,{severity:"error",variant:"filled",sx:{width:"40%"},children:[(0,v.jsx)(h.Z,{children:"Error"}),Z," \u2014 ",(0,v.jsx)("strong",{children:"check it out!"})]})}),(0,v.jsx)(u.Z,{component:"main",maxWidth:"sm",children:(0,v.jsxs)(p.Z,{sx:{display:"flex",alignItems:"center",flexDirection:"column"},children:[(0,v.jsx)(l.Z,{component:"h1",variant:"h4",fontWeight:"bold",children:"Update Place"}),(0,v.jsxs)(o.Z,{component:"form",onSubmit:j,noValidate:!0,sx:{width:"80%"},children:[(0,v.jsx)(l.Z,{variant:"body1",fontWeight:"bold",children:"Title"}),(0,v.jsx)(c.Z,{margin:"normal",required:!0,fullWidth:!0,id:"title",name:"title"}),(0,v.jsx)(l.Z,{variant:"body1",fontWeight:"bold",children:"description"}),(0,v.jsx)(c.Z,{margin:"normal",required:!0,fullWidth:!0,name:"description",id:"description",multiline:!0,rows:4}),(0,v.jsx)(s.Z,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2,bgcolor:"orange"},children:"Save"})]})]})})]})}},2958:function(e,t,n){n.d(t,{x:function(){return o}});var r=n(4165),i=n(5861),a=n(9439),s=n(1243),c=n(2791),o=function(){var e=(0,c.useState)(!0),t=(0,a.Z)(e,2),n=t[0],o=t[1],l=(0,c.useState)(),u=(0,a.Z)(l,2),d=u[0],h=u[1],p=(0,c.useCallback)(function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){var n,i,a,c,l,u=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:"get",i=u.length>2&&void 0!==u[2]?u[2]:{},a=u.length>3&&void 0!==u[3]?u[3]:{},e.prev=3,e.next=6,(0,s.Z)({method:n,url:t,data:i,headers:a});case 6:return c=e.sent,e.abrupt("return",c.data);case 10:throw e.prev=10,e.t0=e.catch(3),l=e.t0.response?e.t0.response.data.message:e.t0.message,h(l),o(!1),e.t0;case 16:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}(),[]);return{isLoading:n,error:d,sendRequest:p,setIsLoading:o,setError:h}}}}]);
//# sourceMappingURL=925.069559da.chunk.js.map