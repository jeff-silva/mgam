(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{556:function(t,e,o){"use strict";o.r(e);var n={middleware:"auth",layout:"admin",props:{settings:Object,settingsGetAll:Function,settingsSaveAll:Function},data:function(){return{propsSettings:JSON.parse(JSON.stringify(this.settings))}}},l=o(7),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ui-field",{attrs:{label:"Nome da aplicação",layout:"horizontal"}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.settings["app.name"],expression:"settings['app.name']"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.settings["app.name"]},on:{input:function(e){e.target.composing||t.$set(t.settings,"app.name",e.target.value)}}})]),t._v(" "),o("ui-field",{attrs:{label:"Tempo de autenticação (em minutos)",layout:"horizontal"}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.settings["jwt.ttl"],expression:"settings['jwt.ttl']"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.settings["jwt.ttl"]},on:{input:function(e){e.target.composing||t.$set(t.settings,"jwt.ttl",e.target.value)}}}),t._v(" "),o("small",{staticClass:"text-muted"},[t._v("Deixe em branco para autenticação infinita")])]),t._v(" "),o("ui-field",{attrs:{label:"Tempo de cache (em segundos)",layout:"horizontal"}},[o("div",{staticClass:"input-group"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.settings["cache.time"],expression:"settings['cache.time']"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:t.settings["cache.time"]},on:{input:function(e){e.target.composing||t.$set(t.settings,"cache.time",e.target.value)}}}),t._v(" "),o("div",{staticClass:"input-group-text"},[t._v("ou")]),t._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:t.settings["cache.time"],expression:"settings['cache.time']"}],staticClass:"form-control",on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.settings,"cache.time",e.target.multiple?o:o[0])}}},[o("option",{attrs:{value:""}},[t._v("Sem cache")]),t._v(" "),o("option",{domProps:{value:60}},[t._v("1 minuto")]),t._v(" "),o("option",{domProps:{value:600}},[t._v("10 minutos")]),t._v(" "),o("option",{domProps:{value:1800}},[t._v("30 minutos")]),t._v(" "),o("option",{domProps:{value:3600}},[t._v("1 hora")]),t._v(" "),o("option",{domProps:{value:21600}},[t._v("6 horas")]),t._v(" "),o("option",{domProps:{value:43200}},[t._v("12 horas")]),t._v(" "),o("option",{domProps:{value:86400}},[t._v("24 horas")]),t._v(" "),o("option",{domProps:{value:604800}},[t._v("1 semana")]),t._v(" "),o("option",{domProps:{value:1296e3}},[t._v("2 semanas")]),t._v(" "),o("option",{domProps:{value:2592e3}},[t._v("1 mês")]),t._v(" "),o("option",{domProps:{value:15552e3}},[t._v("6 meses")]),t._v(" "),o("option",{domProps:{value:31536e3}},[t._v("1 ano")])])])])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{UiField:o(202).default})}}]);