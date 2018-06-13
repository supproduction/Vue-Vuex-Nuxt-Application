webpackJsonp([0],{"05Hf":function(t,e,s){"use strict";var r=s("NZfA"),a=s("8XlI"),i=s("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Select.vue",e.a=i.exports},"2nD8":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"collection-wrap"},[s("ul",{staticClass:"collection-gallery"},t._l(t.$store.state.artworksItems.data,function(e){return s("li",{key:e.id},[s("div",{staticClass:"item"},[s("figure",[s("nuxt-link",{style:"background-image: url("+e.image+")",attrs:{to:e.link}})],1),s("h3",[s("a",[t._v(t._s(e.artist))])]),s("h4",[s("nuxt-link",{attrs:{to:e.link},domProps:{innerHTML:t._s(e.title)}})],1),s("span",{staticClass:"date"},[t._v(t._s(e.year))]),s("span",{staticClass:"category"},[t._v(t._s(e.category))])])])})),t._m(0)])};r._withStripped=!0;var a={render:r,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"preloader-circle"},[e("span")])}]};e.a=a},"7kc9":function(t,e,s){"use strict";var r=void 0;r=s("Z8hi"),e.a={data:function(){return{state:!1}},props:["checked","value"],model:{prop:"checked",event:"input"},methods:{onChange:function(){Array.isArray(this.checked)?this.checked.includes(this.value)?(this.checked.splice(this.checked.indexOf(this.value),1),this.state=!1):(this.checked.push(this.value),this.state=!0):(this.state=!this.state,this.$emit("input",this.state))}},mounted:function(){var t=this;if(Array.isArray(this.checked))for(var e in this.checked)this.value==this.checked[e]&&(this.state=!0);else this.state=this.checked;this.$nextTick(function(){r.replace(t.$el.querySelector(".js-check"))})}}},"8LcR":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"search-filter"},[s("form",{staticClass:"artworks-filter",attrs:{method:"get",action:"http://amma-test.bigdropinc.net/wp-json/wp/v2/artworks?_embed"}},[s("div",{staticClass:"filter-checkboxes"},[s("label",[t._v("Filter By Type")]),s("ul",t._l(t.$store.state.dataFilters.types,function(e,r){return s("li",{key:r},[s("CustomCheck",{attrs:{value:r},model:{value:t.checkedTypes,callback:function(e){t.checkedTypes=e},expression:"checkedTypes"}},[t._v(t._s(e))])],1)})),s("label",[t._v("Show Only")]),s("ul",[s("li",[s("CustomCheck",{attrs:{value:Object.keys(t.$store.state.dataFilters)[1]},model:{value:t.acquisition,callback:function(e){t.acquisition=e},expression:"acquisition"}},[t._v("\n              "+t._s(t.$store.state.dataFilters["new-acquisition"])+"\n            ")])],1)])]),s("div",{staticClass:"filter-selects"},[s("label",[t._v("Date")]),s("div",{staticClass:"select-wrap"},[s("Select",{attrs:{options:t.$store.state.dataFilters.artwork_year},model:{value:t.selectedYear,callback:function(e){t.selectedYear=e},expression:"selectedYear"}})],1),s("label",[t._v("Sort By")]),s("div",{staticClass:"select-wrap"},[s("Select",{attrs:{options:t.$store.state.dataFilters.orderby},model:{value:t.selectedOrder,callback:function(e){t.selectedOrder=e},expression:"selectedOrder"}})],1)])])]),s("div",{staticClass:"toolbar-sorting"},[t.$store.state.artworksItems.headers?s("div",{staticClass:"items-showing"},[t._v("Showing: "),s("span",[t._v(t._s(t.$store.state.artworksItems.headers["x-wp-total"]))]),t._v(" Works")]):t._e(),s("div",{staticClass:"sorting"},[t._v("Per page:\n      "),s("div",{staticClass:"select-wrap"},[s("form",{staticClass:"per_page",attrs:{method:"get",action:"http://amma-test.bigdropinc.net/artworks/"}},[s("Select",{attrs:{options:t.$store.state.dataFilters.per_page},model:{value:t.checkedAmount,callback:function(e){t.checkedAmount=e},expression:"checkedAmount"}})],1)])])])])};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},"8XlI":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("select",{domProps:{value:t.value},on:{change:function(e){t.onChange(e.target.value)}}},t._l(t.options,function(e,r,a){return s("option",{key:a,domProps:{value:r,selected:r===t.value}},[t._v(t._s(e))])}))};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},B94I:function(t,e,s){"use strict";var r=s("H9w8"),a=s("8LcR"),i=s("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Filter.vue",e.a=i.exports},H9w8:function(t,e,s){"use strict";var r=s("Dd8w"),a=s.n(r),i=s("05Hf"),n=s("qjD6");e.a={components:{Select:i.a,CustomCheck:n.a},data:function(){return{checkedTypes:this.$route.query.types?this.$route.query.types.split(","):[],checkedAmount:this.$route.query.per_page||"12",selectedYear:this.$route.query.artwork_year||"all",selectedOrder:this.$route.query.orderby||"default",acquisition:"yes"===this.$route.query.acquisition}},mounted:function(){this.$store.dispatch("getFilters")},watch:{"$route.query":function(t){var e=this;this.$store.state.preloader=!0,this.$store.dispatch("getArtworks",t).then(function(){e.$store.state.preloader=!1})},checkedTypes:function(t){var e=this.$route.query;delete e.page;var s=0!==t.length?t.join(","):t,r=a()({},e,{types:s});this.$router.push({query:r})},checkedAmount:function(t){var e=this.$route.query;delete e.page;var s=a()({},e,{per_page:t});this.$router.push({query:s})},selectedYear:function(t){var e=this.$route.query;delete e.page;var s=a()({},e,{artwork_year:t});this.$router.push({query:s})},selectedOrder:function(t){var e=this.$route.query;delete e.page;var s=a()({},e,{orderby:t});this.$router.push({query:s})},acquisition:function(t){var e=this.$route.query,s="false"===t.toString()?"no":"yes";delete e.page;var r=a()({},e,{acquisition:s});this.$router.push({query:r})}}}},NZfA:function(t,e,s){"use strict";var r=void 0;r=s("Z8hi"),e.a={props:["options","value"],methods:{onChange:function(t){this.$emit("input",t)}},mounted:function(){r.setOptions("Select",{wrapNative:!0,useCustomScroll:!0,wrapNativeOnMobile:!0,fakeDropInBody:!1}),r.replace(this.$el)},updated:function(){this.$el.parentElement.querySelector(".jcf-select-text").textContent||r.refresh(this.$el)}}},PwIc:function(t,e,s){"use strict";e.a={computed:{submenuData:function(){return this.$store.getters.getHeadingData("/"+this.$route.path.split("/")[1])}}}},U1lW:function(t,e,s){"use strict";e.a={beforeMount:function(){this.$store.state.preloader=!0},mounted:function(){var t=this;this.$store.dispatch("getArtworks").then(function(){t.$store.state.preloader=!1})}}},YSCi:function(t,e,s){"use strict";var r=s("Dd8w"),a=s.n(r);e.a={data:function(){return{currentPage:+this.$route.query.page||1}},computed:{artworksTotal:function(){return+this.$store.state.artworksItems.headers["x-wp-totalpages"]}},watch:{"$route.query":function(t){this.$store.dispatch("getArtworks",t),this.currentPage=t.page||1}},methods:{pageClick:function(t){var e=this.$route.query,s=a()({},e,{page:t});this.$router.push({query:s})}}}},Zc5q:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",[s("input",{staticClass:"js-check",attrs:{type:"checkbox"},domProps:{checked:t.state},on:{change:function(e){t.onChange()}}}),t._t("default")],2)};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},gXnx:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("tV7O"),a=s("tDWY"),i=s("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="pages/artworks.vue",e.default=i.exports},hYtS:function(t,e,s){"use strict";var r=s("YSCi"),a=s("zTfd"),i=s("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Pagination.vue",e.a=i.exports},kxdB:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tabs-wrap"},[t.submenuData?s("ul",{staticClass:"tabs-nav"},t._l(t.submenuData.children,function(e,r){return t.submenuData.children?s("li",{key:r,class:[t.submenuData.classes,{active:e.active}]},[s("nuxt-link",{attrs:{to:e.url},domProps:{innerHTML:t._s(e.title)}})],1):t._e()})):t._e()])};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},qjD6:function(t,e,s){"use strict";var r=s("7kc9"),a=s("Zc5q"),i=s("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Custom-check.vue",e.a=i.exports},tDWY:function(t,e,s){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return e("main",{staticClass:"content"},[e("div",{staticClass:"container"},[e("div",{class:["collection",{preloader:this.$store.state.preloader}]},[e("h1",[this._v("The Collection")]),e("Submenu"),e("h2",[this._v("Artworks")]),e("FilterMenu"),e("Collections"),e("Pagination")],1)])])};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},tV7O:function(t,e,s){"use strict";var r=s("xwXm"),a=s("B94I"),i=s("x3lo"),n=s("hYtS");e.a={components:{Submenu:r.a,FilterMenu:a.a,Collections:i.a,Pagination:n.a}}},x3lo:function(t,e,s){"use strict";var r=s("U1lW"),a=s("2nD8"),i=s("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Collections.vue",e.a=i.exports},xwXm:function(t,e,s){"use strict";var r=s("PwIc"),a=s("kxdB"),i=s("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Submenu.vue",e.a=i.exports},zTfd:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.$store.state.artworksItems.headers?s("div",{staticClass:"pagination"},[s("div",{staticClass:"wp-pagenavi"},[1!==t.currentPage?s("a",{staticClass:"previouspostslink",attrs:{rel:"prev",href:""},on:{click:function(e){e.preventDefault(),t.pageClick(t.currentPage-1)}}},[t._v("prev")]):t._e(),t._l(t.artworksTotal,function(e){return s("a",{key:e,class:["page smaller",{current:t.currentPage===e}],attrs:{href:""},on:{click:function(s){s.preventDefault(),t.pageClick(e)}}},[t._v(t._s(e))])}),t.currentPage!==t.artworksTotal?s("a",{staticClass:"nextpostslink",attrs:{rel:"next",href:""},on:{click:function(e){e.preventDefault(),t.pageClick(t.currentPage+1)}}},[t._v("next")]):t._e()],2)]):t._e()};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a}});