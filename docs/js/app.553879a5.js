(function(t){function e(e){for(var o,a,r=e[0],l=e[1],c=e[2],u=0,f=[];u<r.length;u++)a=r[u],i[a]&&f.push(i[a][0]),i[a]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);d&&d(e);while(f.length)f.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,r=1;r<n.length;r++){var l=n[r];0!==i[l]&&(o=!1)}o&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},i={app:0},s=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var d=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var o=n("64a9"),i=n.n(o);i.a},4185:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],a={name:"App"},r=a,l=(n("034f"),n("2877")),c=Object(l["a"])(r,i,s,!1,null,null,null),d=c.exports,u=n("8c4f"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("form",{staticClass:"fixed-top add-form center-block",staticStyle:{"padding-top":"20px",margin:"0 50px"},on:{submit:function(e){return e.preventDefault(),t.doAdd(e)}}},[n("div",{staticClass:"input-group input-group-sm mb-3"},[t._m(0),n("input",{ref:"comment",staticClass:"form-control",attrs:{type:"text",id:"comment"}}),t._m(1)])]),n("div",t._l(t.options,function(e){return n("label",{key:e.value,staticClass:"p-2"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.filterOption,expression:"filterOption"}],attrs:{type:"radio"},domProps:{value:e.value,checked:t._q(t.filterOption,e.value)},on:{change:function(n){t.filterOption=e.value}}}),n("span",{staticClass:"status-label"},[t._v(t._s(e.label))]),n("span",{staticClass:"badge",class:t.badgeColor(e.value)},[t._v("\n        "+t._s(t.todoCounts(e.value))+"\n      ")])])}),0),n("div",{staticClass:"list-group"},[n("draggable",{attrs:{handle:".move-icon"},on:{end:t.onDragEnd},model:{value:t.filteredTodos,callback:function(e){t.filteredTodos=e},expression:"filteredTodos"}},t._l(t.filteredTodos,function(e){return n("todo-item",{key:e.id,staticClass:"list-group-item list-group-item-action list-style",attrs:{id:e.id,comment:e.comment,state:e.state},on:{changeState:t.doChangeState,edit:t.editComment,remove:t.doRemove}})}),1)],1),t.isModal?n("transition",{attrs:{name:"modal"}},[n("div",{staticClass:"overlay",on:{click:function(e){return t.cancelEdit()}}})]):t._e()],1)},p=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"input-group-prepend"},[n("label",{staticClass:"input-group-text",attrs:{for:"comment"}},[t._v("Todo")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"input-group-prepend"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("OK")])])}],v=n("bd86"),m=n("5176"),h=n.n(m),b=(n("20d6"),n("f499")),g=n.n(b),C=(n("ac6a"),n("d225")),x=n("b0b4"),_="vue-todolist",w=function(){function t(){Object(C["a"])(this,t)}return Object(x["a"])(t,null,[{key:"fetch",value:function(){var t=JSON.parse(localStorage.getItem(_)||"[]");return t.forEach(function(t,e){t.id=e}),t}},{key:"save",value:function(t){localStorage.setItem(_,g()(t))}}]),t}(),O=n("1980"),y=n.n(O);function I(t){switch(t){case 0:return"badge-light circle-button-border";case 1:return"badge-warning";case 2:return"badge-success";default:return"badge-info"}}var T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"d-flex"},[n("div",{staticClass:"p-1 move-icon"},[n("font-awesome-icon",{attrs:{icon:"ellipsis-v",size:"xs"}})],1),n("div",{staticClass:"p-1",on:{click:t.changeEventHandler}},[n("span",{staticClass:"circle-button pointer",class:t.badgeColor(t.state)})]),n("div",{staticClass:"p-1 flex-grow-1 no-wrap todo-text",attrs:{title:t.comment}},[t._v("\n      "+t._s(t.comment)+"\n    ")]),n("div",{staticClass:"p-1",on:{click:t.editEventHandler}},[n("font-awesome-icon",{staticClass:"pointer",attrs:{icon:"edit",size:"xs"}})],1),n("div",{staticClass:"p-1",on:{click:t.removeEventHandler}},[n("span",{staticClass:"pointer"},[t._v("×")])])])])},k=[],E=(n("c5f6"),{name:"todo-item",props:{id:Number,comment:String,state:Number},data:function(){return{}},methods:{changeEventHandler:function(){this.$emit("changeState",this.id)},badgeColor:function(t){return I(t)},editEventHandler:function(){this.$emit("edit",this.id)},removeEventHandler:function(){this.$emit("remove",this.id)}}}),j=E,S=(n("6959"),Object(l["a"])(j,T,k,!1,null,null,null)),$=S.exports,M=function t(e,n,o){Object(C["a"])(this,t),this.id=e,this.comment=n,this.state=o};function P(t,e){return-1!==e?t.filter(function(t){return t.state===e}):t.concat()}function H(t,e){var n=t.findIndex(function(t){return t.id===e});return t[n]}var A={name:"TodoList",components:{draggable:y.a,TodoItem:$},data:function(){return{todos:[],filteredTodos:[],lastUid:0,options:[{value:-1,label:"All"},{value:0,label:"Todo"},{value:1,label:"In Progress"},{value:2,label:"Done"}],filterOption:-1,isModal:!1,editingItem:null}},methods:{doAdd:function(t,e){var n=this.$refs.comment;if(n.value.length){if(this.isModal&&null!==this.editingItem)this.editingItem.comment=n.value,this.editingItem=null,this.isModal=!1;else{var o=new M(this.lastUid++,n.value,0);this.todos.push(o)}n.value=""}},doChangeState:function(t){var e=H(this.todos,t);switch(e.state){case 0:e.state=1;break;case 1:e.state=2;break;case 2:e.state=0;break}},doRemove:function(t){var e=this.todos.findIndex(function(e){return e.id===t});this.todos.splice(e,1)},editComment:function(t){this.isModal=!0;var e=this.$refs.comment,n=H(this.todos,t);e.value=n.comment,e.focus(),this.editingItem=n},cancelEdit:function(){this.isModal=!1;var t=this.$refs.comment;t.value="",this.editingItem=null},todoCounts:function(t){return this.todos.filter(function(e){return-1===t||e.state===t}).length},badgeColor:function(t){return I(t)},onDragEnd:function(t){var e=0;if(t.oldIndex<t.newIndex)e=-1;else{if(!(t.oldIndex>t.newIndex))return;e=1}var n=this.filteredTodos[t.newIndex],o=this.todos.indexOf(n),i=this.filteredTodos[t.newIndex+e],s=this.todos.indexOf(i);this.todos.splice(o,1),this.todos.splice(s,0,n)}},watch:{todos:{handler:function(t){w.save(t),this.filteredTodos=P(this.todos,this.filterOption)},deep:!0},filterOption:function(t){this.filteredTodos=P(this.todos,t)}},created:function(){this.todos=w.fetch(),this.filteredTodos=this.todos.concat(),this.lastUid=this.todos.length},computed:{labels:function(){return this.options.reduce(function(t,e){return h()(t,Object(v["a"])({},e.value,e.label))},{})}}},D=A,N=(n("98fe"),Object(l["a"])(D,f,p,!1,null,"7b688b5e",null)),J=N.exports;o["a"].use(u["a"]);var U=new u["a"]({routes:[{path:"/",name:"TodoList",component:J}]}),z=(n("f9e3"),n("2dd8"),n("9f7b")),L=n.n(z),R=n("ecee"),q=n("c074"),K=n("ad3d");R["c"].add(q["b"],q["a"]),o["a"].component("font-awesome-icon",K["a"]),o["a"].use(L.a),o["a"].config.productionTip=!1,new o["a"]({router:U,render:function(t){return t(d)}}).$mount("#app")},"64a9":function(t,e,n){},6959:function(t,e,n){"use strict";var o=n("e074"),i=n.n(o);i.a},"98fe":function(t,e,n){"use strict";var o=n("4185"),i=n.n(o);i.a},e074:function(t,e,n){}});
//# sourceMappingURL=app.553879a5.js.map