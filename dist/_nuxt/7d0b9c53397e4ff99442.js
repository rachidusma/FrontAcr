(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{336:function(t,e,n){var content=n(360);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("33f03376",content,!0,{sourceMap:!1})},342:function(t,e,n){var content=n(343);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("2065bca8",content,!0,{sourceMap:!1})},343:function(t,e,n){(e=n(10)(!1)).push([t.i,".v-dialog{border-radius:4px;margin:24px;overflow-y:auto;pointer-events:auto;transition:.3s cubic-bezier(.25,.8,.25,1);width:100%;z-index:inherit;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.v-dialog:not(.v-dialog--fullscreen){max-height:90%}.v-dialog>*{width:100%}.v-dialog>.v-card>.v-card__title{font-size:1.25rem;font-weight:500;letter-spacing:.0125em;padding:16px 24px 10px}.v-dialog>.v-card>.v-card__subtitle,.v-dialog>.v-card>.v-card__text{padding:0 24px 20px}.v-dialog__content{align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;width:100%;z-index:6;outline:none}.v-dialog__container{display:none}.v-dialog__container--attached{display:inline}.v-dialog--animated{-webkit-animation-duration:.15s;animation-duration:.15s;-webkit-animation-name:animate-dialog;animation-name:animate-dialog;-webkit-animation-timing-function:cubic-bezier(.25,.8,.25,1);animation-timing-function:cubic-bezier(.25,.8,.25,1)}.v-dialog--fullscreen{border-radius:0;margin:0;height:100%;position:fixed;overflow-y:auto;top:0;left:0}.v-dialog--fullscreen>.v-card{min-height:100%;min-width:100%;margin:0!important;padding:0!important}.v-dialog--scrollable,.v-dialog--scrollable>form{display:flex}.v-dialog--scrollable>.v-card,.v-dialog--scrollable>form>.v-card{display:flex;flex:1 1 100%;flex-direction:column;max-height:100%;max-width:100%}.v-dialog--scrollable>.v-card>.v-card__actions,.v-dialog--scrollable>.v-card>.v-card__title,.v-dialog--scrollable>form>.v-card>.v-card__actions,.v-dialog--scrollable>form>.v-card>.v-card__title{flex:0 0 auto}.v-dialog--scrollable>.v-card>.v-card__text,.v-dialog--scrollable>form>.v-card>.v-card__text{-webkit-backface-visibility:hidden;backface-visibility:hidden;flex:1 1 auto;overflow-y:auto}@-webkit-keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}@keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}",""]),t.exports=e},359:function(t,e,n){"use strict";var o=n(336);n.n(o).a},360:function(t,e,n){(e=n(10)(!1)).push([t.i,".overline{color:#336882;font-size:25px}",""]),t.exports=e},377:function(t,e,n){"use strict";var o={data:function(){return{dialog:!1}}},r=(n(359),n(34)),l=n(37),c=n.n(l),d=n(142),v=n(132),h=n(118),f=n(382),m=n(325),x=n(383),y=n(316),_=n(384),w=n(328),k=n(378),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-btn",t._g({attrs:{color:"success"}},o),[t._v("Add new")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),n("v-card",[n("v-card-title",[n("span",{staticClass:"overline"},[t._v("Add article")])]),t._v(" "),n("v-divider"),t._v(" "),n("v-card-text",[n("v-container",[n("v-row",[n("p",{staticClass:"overline"},[t._v("Article informations")]),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[n("v-text-field",{attrs:{label:"Artikelnamn*",placeholder:"Artikelnamn",outlined:"",color:"#336882"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[n("v-text-field",{attrs:{label:"Produktkod",placeholder:"Produktkod",outlined:"",color:"#336882"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[n("v-text-field",{attrs:{label:"Pris enhet",placeholder:"Pris enhet",outlined:"",type:"nymber",color:"#336882"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[n("v-text-field",{attrs:{label:"Enhet",placeholder:"Enhet",outlined:"",type:"number",color:"#336882"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[n("v-text-field",{attrs:{label:"Moms (%)",placeholder:"Moms",outlined:"",type:"number",color:"#336882"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[n("v-text-field",{attrs:{label:"typ",placeholder:"typ",outlined:"",color:"#336882"}})],1)],1)],1),t._v(" "),n("small",[t._v("*indicates required field")])],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Close")]),t._v(" "),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Save")])],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;c()(component,{VBtn:d.a,VCard:v.a,VCardActions:h.a,VCardText:h.b,VCardTitle:h.c,VCol:f.a,VContainer:m.a,VDialog:x.a,VDivider:y.a,VRow:_.a,VSpacer:w.a,VTextField:k.a})},383:function(t,e,n){"use strict";n(12),n(7),n(5),n(4),n(8),n(38),n(39);var o=n(2),r=(n(16),n(342),n(496)),l=n(337),c=n(143),d=n(344),v=n(153),h=n(352),f=n(353),m=n(40),x=n(144),y=n(6),_=n(9),w=n(0);function k(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function O(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var C=Object(y.a)(l.a,c.a,d.a,v.a,h.a,f.a,m.a);e.a=C.extend({name:"v-dialog",directives:{ClickOutside:x.a},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200}},computed:{classes:function(){var t;return t={},Object(o.a)(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(o.a)(t,"v-dialog--active",this.isActive),Object(o.a)(t,"v-dialog--persistent",this.persistent),Object(o.a)(t,"v-dialog--fullscreen",this.fullscreen),Object(o.a)(t,"v-dialog--scrollable",this.scrollable),Object(o.a)(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(_.d)("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!=typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):v.a.options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$refs.content.focus(),t.bind()}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===w.v.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var n=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');n.length&&n[0].focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(r.a,{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:O({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var content=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[content]):content},genInnerContent:function(){var data={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:this.onClickOutside,args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(data.style=O({},data.style,{maxWidth:"none"===this.maxWidth?void 0:Object(w.g)(this.maxWidth),width:"auto"===this.width?void 0:Object(w.g)(this.width)})),this.$createElement("div",data,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},518:function(t,e,n){"use strict";n.r(e);n(55);var o=n(13),r={middleware:"auth",layout:"admin",components:{ArticleModal:n(377).a},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/articles/");case 3:n=e.sent,o=n.data.map((function(t){return{id:t.userid,invoiceid:t.invoiceid,artikelnamn:t.artikelnamn,produktkod:t.produktkod,pris_enhet:t.pris_enhet,enhet:t.enhet,moms:t.moms,typ:t.typ}})),t.articles=o,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},methods:{handleClick:function(a){this.$router.push("/articles/"+a.id)}},data:function(){return{all:[],search:"",Allarticles:[],selected:[],headers:[{text:"id",value:"id"},{text:"invoiceid",value:"invoiceid"},{text:"produktkod",value:"produktkod"},{text:"pris_enhet",value:"pris_enhet"},{text:"enhet",value:"enhet"},{text:"moms",value:"moms"},{text:"typ",value:"typ"}],articles:[]}}},l=n(34),c=n(37),d=n.n(c),v=n(132),h=n(382),f=n(515),m=n(429),x=n(384),y=n(328),_=n(378),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("v-row",[n("v-col",{attrs:{cols:"12",md:"12"}},[n("v-row",{staticClass:"pa-4"},[n("h1",{staticClass:"title"},[t._v("Articles")]),t._v(" "),n("v-spacer"),t._v(" "),n("ArticleModal")],1)],1),t._v(" "),n("v-col",{attrs:{cols:"12",md:"12"}},[n("p",{staticClass:"overline"},[t._v(" All Articles")]),t._v(" "),n("v-card",{staticClass:"pa-8",attrs:{tile:"",width:"100%"}},[n("v-row",[n("v-spacer"),t._v(" "),n("v-text-field",{staticClass:"mb-4 pa-4",attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":"",solo:"",dense:"",color:"#336882"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.articles,"items-per-page":5,search:t.search},on:{"click:row":t.handleClick}})],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VCard:v.a,VCol:h.a,VDataTable:f.a,VLayout:m.a,VRow:x.a,VSpacer:y.a,VTextField:_.a})}}]);