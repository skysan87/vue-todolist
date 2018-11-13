webpackJsonp([1],{"1/oy":function(t,e){},"9M+g":function(t,e){},Byyw:function(t,e){},GfHa:function(t,e){},Id91:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")({name:"App"},o,!1,function(t){n("gsu9")},null,null).exports,a=n("/ocq"),l=n("bOdI"),r=n.n(l),c=n("woOf"),d=n.n(c),u=n("mvHQ"),f=n.n(u),v=n("Zrlr"),p=n.n(v),m=n("wxAW"),h=n.n(m),g=function(){function t(){p()(this,t)}return h()(t,null,[{key:"fetch",value:function(){var t=JSON.parse(localStorage.getItem("vue-todolist")||"[]");return t.forEach(function(t,e){t.id=e}),t}},{key:"save",value:function(t){localStorage.setItem("vue-todolist",f()(t))}}]),t}(),b=n("DAYN");function _(t,e){return-1!==e?t.filter(function(t){return t.state===e}):t.concat()}var C={name:"TodoList",components:{draggable:n.n(b).a},data:function(){return{todos:[],filteredTodos:[],lastUid:0,options:[{value:-1,label:"All"},{value:0,label:"Todo"},{value:1,label:"In Progress"},{value:2,label:"Done"}],filterOption:-1,isModal:!1,editingItem:null}},methods:{doAdd:function(t,e){var n=this.$refs.comment;n.value.length&&(this.isModal&&null!==this.editingItem?(this.editingItem.comment=n.value,this.editingItem=null,this.isModal=!1):this.todos.push({id:this.lastUid++,comment:n.value,state:0}),n.value="")},doChangeState:function(t){switch(t.state){case 0:t.state=1;break;case 1:t.state=2;break;case 2:t.state=0}},doRemove:function(t){var e=this.todos.indexOf(t);this.todos.splice(e,1)},editComment:function(t){this.isModal=!0;var e=this.$refs.comment;e.value=t.comment,e.focus(),this.editingItem=t},cancelEdit:function(){this.isModal=!1,this.$refs.comment.value="",this.editingItem=null},todoCounts:function(t){return this.todos.filter(function(e){return-1===t||e.state===t}).length},badgeColor:function(t){switch(t){case 0:return"badge-light circle-button-border";case 1:return"badge-warning";case 2:return"badge-success";default:return"badge-info"}},onDragEnd:function(t){var e=0;if(t.oldIndex<t.newIndex)e=-1;else{if(!(t.oldIndex>t.newIndex))return;e=1}var n=this.filteredTodos[t.newIndex],i=this.todos.indexOf(n),o=this.filteredTodos[t.newIndex+e],s=this.todos.indexOf(o);this.todos.splice(i,1),this.todos.splice(s,0,n)}},watch:{todos:{handler:function(t){g.save(t),this.filteredTodos=_(this.todos,this.filterOption)},deep:!0},filterOption:function(t){this.filteredTodos=_(this.todos,t)}},created:function(){this.todos=g.fetch(),this.filteredTodos=this.todos.concat(),this.lastUid=this.todos.length},computed:{labels:function(){return this.options.reduce(function(t,e){return d()(t,r()({},e.value,e.label))},{})}}},x={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("form",{staticClass:"fixed-top add-form center-block",staticStyle:{"padding-top":"20px",margin:"0 50px"},on:{submit:function(e){return e.preventDefault(),t.doAdd(e)}}},[n("div",{staticClass:"input-group input-group-sm mb-3"},[t._m(0),t._v(" "),n("input",{ref:"comment",staticClass:"form-control",attrs:{type:"text",id:"comment"}}),t._v(" "),t._m(1)])]),t._v(" "),n("div",t._l(t.options,function(e){return n("label",{key:e.value,staticClass:"p-2"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.filterOption,expression:"filterOption"}],attrs:{type:"radio"},domProps:{value:e.value,checked:t._q(t.filterOption,e.value)},on:{change:function(n){t.filterOption=e.value}}}),t._v(" "),n("span",[t._v(t._s(e.label))]),t._v(" "),n("span",{staticClass:"badge",class:t.badgeColor(e.value)},[t._v("\n        "+t._s(t.todoCounts(e.value))+"\n      ")])])})),t._v(" "),n("div",{staticClass:"list-group"},[n("draggable",{attrs:{options:{animation:200,delay:50,handle:".move-icon"}},on:{end:t.onDragEnd},model:{value:t.filteredTodos,callback:function(e){t.filteredTodos=e},expression:"filteredTodos"}},t._l(t.filteredTodos,function(e){return n("div",{key:e.id,staticClass:"list-group-item list-group-item-action list-style"},[n("div",{staticClass:"d-flex"},[n("div",{staticClass:"p-1 move-icon"},[n("font-awesome-icon",{attrs:{icon:"ellipsis-v",size:"xs"}})],1),t._v(" "),n("div",{staticClass:"p-1",on:{click:function(n){t.doChangeState(e)}}},[n("span",{staticClass:"circle-button del",class:t.badgeColor(e.state)})]),t._v(" "),n("div",{staticClass:"p-1 flex-grow-1 no-wrap todo-text",attrs:{title:e.comment}},[t._v("\n            "+t._s(e.comment)+"\n          ")]),t._v(" "),n("div",{staticClass:"p-1",on:{click:function(n){t.editComment(e)}}},[n("font-awesome-icon",{staticClass:"del",attrs:{icon:"edit",size:"xs"}})],1),t._v(" "),n("div",{staticClass:"p-1",on:{click:function(n){t.doRemove(e)}}},[n("span",{staticClass:"del"},[t._v("×")])])])])}))],1),t._v(" "),t.isModal?n("transition",{attrs:{name:"modal"}},[n("div",{staticClass:"overlay",on:{click:function(e){t.cancelEdit()}}})]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("label",{staticClass:"input-group-text",attrs:{for:"comment"}},[this._v("Todo")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-prepend"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[this._v("OK")])])}]};var w=n("VU/8")(C,x,!1,function(t){n("Byyw")},"data-v-7705ad6c",null).exports;i.a.use(a.a);var y=new a.a({routes:[{path:"/",name:"TodoList",component:w}]}),I=(n("Jmt5"),n("9M+g"),n("e6fC")),O=n("C/JF"),T=n("fhbW"),k=n("1e6/");O.c.add(T.b,T.a),i.a.component("font-awesome-icon",k.a),i.a.use(I.a),i.a.config.productionTip=!1,new i.a({el:"#app",router:y,components:{App:s},template:"<App/>"})},gsu9:function(t,e){},zj2Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7e042b9b6ac3a2717d30.js.map