(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{365:function(t,e,c){var content=c(433);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,c(11).default)("08226272",content,!0,{sourceMap:!1})},432:function(t,e,c){"use strict";var l=c(365);c.n(l).a},433:function(t,e,c){(e=c(10)(!1)).push([t.i,".blueSection[data-v-319ce01b]{height:200px;background-color:#dceaf5}.blueSection[data-v-319ce01b],.itm[data-v-319ce01b]{display:block;width:100%}.itm[data-v-319ce01b]{height:100%;align-items:center;margin:auto}th[data-v-319ce01b]{vertical-align:top}",""]),t.exports=e},519:function(t,e,c){"use strict";c.r(e);c(55);var l=c(13),n={layout:"admin",data:function(){return{search:"",activeclass:"primary",allclass:"normal",items:[],state:[{text:"paid",value:"paid"}],States:[{text:"All states",value:"All"},{text:"Paid",value:"paid"},{text:"Overdue",value:"overdue"},{text:"Drafts",value:"draft"}],types:[{text:"All types",value:"All"},{text:"Invoice",value:"Invoice"},{text:"Cash invoice",value:"cash"},{text:"Credit invoice",value:"credit"}],header:[{text:"Invoice number",align:"start",sortable:!1,value:"userid"},{text:"Customer",value:"customername"},{text:"Invoice amount (inc VAT)",value:"summa"},{text:"status",value:"status"},{text:"Date of invoice",value:"createdate"},{text:"Due date",value:"userid"},{text:"Delivery  date",value:"userid"}],invoices:[],invoicesItem:[]}},methods:{getColor:function(t){return"paid"==t?"green":"overdue"==t||"draft"==t||"publihsed"==t?"red":void 0},filterstate:function(a){this.invoicesItem="All"==a?this.invoices:this.invoices.filter((function(t){return t.status==a}))},activeinvoices:function(){this.invoicesItem=this.invoices,this.invoicesItem=this.invoices.filter((function(t){return"paid"!=t.status})),this.activeclass="primary",this.allclass="normal"},allinvoices:function(){this.invoicesItem=this.invoices,this.invoicesItem=this.invoices.filter((function(t){return"draft"!=t.status})),this.allclass="primary",this.activeclass="normal"},handleClick:function(a){"Draft"==a.status?this.$router.push("/invoices/draft/"+a._id):"overdue"==a.status?this.$router.push("/invoices/overdue/"+a.id):this.$router.push("/invoices/paid"+a.id)}},created:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("/invoices").then((function(e){e.forEach((function(t){t.createdate=new Date(t.createdate).toISOString().substring(0,10)})),t.invoices=e,t.invoices.forEach((function(t){t.published?t.published&&!t.invoicepaid&&t.dueDate?(t.status="Published",console.log("Published")):t.published&&!t.invoicepaid&&t.dueDate?(t.status="Overdue",console.log("Overdue")):t.published&&t.invoicepaid&&(t.status="Paid",console.log("Paid")):(t.status="Draft",console.log("Draft"))})),t.activeinvoices(),console.log(e)})).catch((function(t){return console.log(t)}));case 2:case"end":return e.stop()}}),e)})))()}},o=(c(432),c(34)),r=c(37),v=c.n(r),d=c(142),h=c(132),m=c(387),f=c(382),x=c(515),y=c(429),_=c(384),C=c(376),w=c(378),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("v-layout",[c("v-row",[c("v-col",{attrs:{cols:"12",sm:"12"}},[c("div",{staticClass:"d-flex justify-space-between align-center",staticStyle:{width:"100%"}},[c("p",{staticClass:"py-0 my-0 black--text headline"},[t._v("Invoices")]),t._v(" "),c("v-btn",{attrs:{color:"success",to:"/newinvoice"}},[t._v("New invoice")])],1)]),t._v(" "),c("v-col",{attrs:{cols:"12",sm:"12"}},[c("div",{staticClass:"blueSection"},[c("v-row",{staticStyle:{width:"100%",height:"100%"},attrs:{justify:"center",align:"center"}},[c("v-col",{attrs:{cols:"12",sm:"4"}},[c("h6",{staticClass:"grey--text text-center subtitle-1 my-4"},[t._v("Overpaid (inc VAT)")]),t._v(" "),c("h6",{staticClass:"display-1 text-center"},[t._v("0,00 kr")])]),t._v(" "),c("v-col",{attrs:{cols:"12",sm:"4"}},[c("h6",{staticClass:"grey--text text-center subtitle-1 my-4"},[t._v("Overdue (inc VAT)")]),t._v(" "),c("h6",{staticClass:"display-1 text-center"},[t._v("28 375,000 kr")])]),t._v(" "),c("v-col",{attrs:{cols:"12",sm:"4"}},[c("h6",{staticClass:"grey--text text-center subtitle-1 my-4"},[t._v("Outstanding (inc VAT)")]),t._v(" "),c("h6",{staticClass:"display-1 text-center"},[t._v("28 375,00")])])],1)],1)]),t._v(" "),c("v-col",{attrs:{cols:"12",sm:"12"}},[c("v-btn",{attrs:{text:"",small:"",color:t.activeclass},on:{click:t.activeinvoices}},[t._v("Active invoices")]),t._v(" "),c("v-btn",{attrs:{text:"",small:"",color:t.allclass},on:{click:t.allinvoices}},[t._v("All invoices")]),t._v(" "),c("v-card",{staticClass:"pa-8"},[c("v-row",{staticClass:"pa-4"},[c("v-col",{attrs:{cols:"12",sm:"3"}},[c("v-text-field",{attrs:{label:"Search","append-icon":"mdi-magnify","single-line":"","hide-details":"",solo:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),c("v-col",{attrs:{cols:"12",sm:"3"}},[c("v-select",{attrs:{items:t.States,"item-text":"text","item-value":"value",label:"All states",solo:"",dense:""},on:{change:t.filterstate},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}})],1),t._v(" "),c("v-col",{attrs:{cols:"12",sm:"3"}},[c("v-select",{attrs:{items:t.types,"item-text":"text","item-value":"value",label:"All types",solo:"",dense:""}})],1)],1),t._v(" "),c("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.header,items:t.invoices,search:t.search},on:{"click:row":t.handleClick},scopedSlots:t._u([{key:"item.status",fn:function(e){var l=e.item;return[c("v-chip",{attrs:{color:t.getColor(l.status),dark:""}},[t._v(t._s(l.status))])]}}])})],1)],1)],1)],1)}),[],!1,null,"319ce01b",null);e.default=component.exports;v()(component,{VBtn:d.a,VCard:h.a,VChip:m.a,VCol:f.a,VDataTable:x.a,VLayout:y.a,VRow:_.a,VSelect:C.a,VTextField:w.a})}}]);