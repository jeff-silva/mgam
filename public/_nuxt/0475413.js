(window.webpackJsonp=window.webpackJsonp||[]).push([[20,13],{539:function(t,e,r){"use strict";r.r(e);r(47),r(46),r(145);var o={props:{value:{default:""},height:{default:"150px"},preview:{default:!0}},watch:{$props:{deep:!0,handler:function(t){this.props=JSON.parse(JSON.stringify(this.$props))}}},methods:{emitValue:function(){this._preventRecursive||(this._preventRecursive=!0,this.$emit("value",this.props.value),this.$emit("input",this.props.value),this.$emit("change",this.props.value),this._preventRecursive=!1)},browser:function(){var t=this;Object.assign(document.createElement("input"),{type:"file",onchange:function(e){t.upload(e.target.files[0])}}).click()},dropFile:function(t){this.upload(t.dataTransfer.files[0])},upload:function(t){var e=this,data=new FormData;data.append("file",t,t.name),this.$axios.post("/api/files/upload",data,{onUploadProgress:function(t){e.progress=Math.round(100*t.loaded/t.total)}}).then((function(t){e.progress=0,e.props.value=t.data.url,e.emitValue()}))},clear:function(){this.props.value="",this.emitValue()}},computed:{compValue:function(){if(this.props.value){var t={url:this.props.value};return t.ext=t.url.split(".").pop().toLowerCase(),t.type=!1,["jpg","jpeg","png","bmp","gif","webp","svg"].indexOf(t.ext)>=0&&(t.type="image"),["mp3","ogg"].indexOf(t.ext)>=0&&(t.type="audio"),t}return!1}},data:function(){return{props:JSON.parse(JSON.stringify(this.$props)),progress:0,file:!1}}},n=r(7),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{on:{drop:function(e){return e.preventDefault(),t.dropFile.apply(null,arguments)},dragover:function(t){t.preventDefault()}}},[r("div",{staticClass:"input-group form-control p-0"},[r("div",{staticClass:"input-group-btn"},[r("button",{staticClass:"btn rounded-0",attrs:{type:"button"},on:{click:function(e){return t.browser()}}},[r("i",{staticClass:"fas fa-upload"})])]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.props.value,expression:"props.value"}],staticClass:"form-control border-0",attrs:{type:"text",placeholder:"Sem arquivo"},domProps:{value:t.props.value},on:{keyup:function(e){return t.emitValue()},input:function(e){e.target.composing||t.$set(t.props,"value",e.target.value)}}}),t._v(" "),t.compValue?r("div",{staticClass:"input-group-btn"},[r("a",{staticClass:"btn",attrs:{href:t.props.value,target:"_blank"}},[r("i",{staticClass:"fas fa-link"})])]):t._e(),t._v(" "),t.compValue?r("div",{staticClass:"input-group-btn"},[r("button",{staticClass:"btn btn-danger rounded-0",attrs:{type:"button"},on:{click:function(e){t.props.value="",t.emitValue()}}},[r("i",{staticClass:"fas fa-times"})])]):t._e()]),t._v(" "),t.progress?r("div",{staticClass:"progress",staticStyle:{height:"5px"}},[r("div",{staticClass:"progress-bar progress-bar-striped progress-bar-animated",style:"width: "+t.progress+"%",attrs:{role:"progressbar","aria-valuenow":t.progress,"aria-valuemin":"0","aria-valuemax":"100"}})]):t._e(),t._v(" "),t.preview?r("div",{staticClass:"mt-2",style:"height:"+t.height+"; background:#f5f5f5; border:dashed 3px #ccc; display:flex; align-items:center; justify-content:center; cursor:pointer;",on:{click:function(e){return t.browser()}}},[t.compValue?t._e():r("div",[r("small",{staticClass:"d-block text-muted"},[t._v("Soltar arquivo")])]),t._v(" "),t.compValue?r("div",["image"==t.compValue.type?r("div",[r("img",{style:"margin:0 auto; max-height:calc("+t.height+" - 20px);",attrs:{src:t.compValue.url,alt:""}})]):r("div",[t._v("\n                "+t._s(t.compValue.type)+"\n            ")])]):t._e()]):t._e()])}),[],!1,null,null,null);e.default=component.exports},557:function(t,e,r){"use strict";r.r(e);var o={middleware:"auth",layout:"admin",props:{settings:Object,settingsGetAll:Function,settingsSaveAll:Function},data:function(){return{propsSettings:JSON.parse(JSON.stringify(this.settings))}}},n=r(7),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ui-field",{attrs:{label:"Foto padrão",layout:"horizontal"}},[r("ui-upload",{model:{value:t.settings["user.photo_default"],callback:function(e){t.$set(t.settings,"user.photo_default",e)},expression:"settings['user.photo_default']"}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{UiUpload:r(539).default,UiField:r(202).default})}}]);