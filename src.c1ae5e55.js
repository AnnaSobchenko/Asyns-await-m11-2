parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"clu1":[function(require,module,exports) {

},{}],"Focm":[function(require,module,exports) {
"use strict";require("./sass/main.scss");const t="http://localhost:3000";async function e(e,a="GET",s={}){const n={method:a,headers:{"Content-Type":"application/json; charset=UTF-8"}};return"GET"!==a&&"DELETE"!==a&&(n.body=JSON.stringify(s)),(await fetch(t+e,n)).json()}const a={listNode:document.querySelector(".post-list"),form:document.querySelector("#create-post")};async function s(){const t=await e("/posts"),s=(await Promise.all(t.map(async t=>{const a=await e("/comments?postId="+t.id);return`<li data-id="${t.id}">\n        <h3>${t.title}</h3>\n        <p>${t.text}</p>\n        <button data-action="del">DELETE</button> \n        <button data-action="edit">EDIT</button>\n        <div>\n        <span class="like" data-actio="like">${t.like}</span>\n        <span class="dislike" data-action="dislike">${t.dislike}</span></div>\n        <small> ${t.author}</small></p>\n        <input class='create-comment' placeholder="Comment">\n        <ul class="comments">${a.map(t=>`<li>${t.text}</li>`).join("")}</ul>\n        </li>`}))).join("");a.listNode.innerHTML=s}s(),a.listNode.addEventListener("click",async t=>{if("SPAN"!==t.target.nodeName)return;const a=t.target.closest("li").dataset.id;"like"===t.target.dataset.action&&(await e(`/posts/${a}`,"PATCH",{like:Number(t.target.textContent)+1}),t.target.textContent=Number(t.target.textContent)+1)}),a.listNode.addEventListener("click",async t=>{if("BUTTON"!==t.target.nodeName)return;const n=t.target.closest("li").dataset.id;if("edit"===t.target.dataset.action){const t=await e("/posts/"+n);a.form.elements.text.value=t.text,a.form.elements.author.value=t.author,a.form.elements.title.value=t.title,a.form.elements.id.value=t.id}"del"===t.target.dataset.action&&confirm("Are your sure?")&&(await e("/posts/"+n,"DELETE"),s())}),a.form.addEventListener("keydown",async t=>{if("Enter"===t.code&&t.shiftKey){a.form.elements;const t={text:a.form.elements.text.value,author:a.form.elements.author.value,title:a.form.elements.title.value},s=a.form.elements.id.value;""===s?(t.like=0,t.dislike=0,await e("/posts","POST",t)):await e(`/posts/${s}`,"PATCH",t)}}),a.listNode.addEventListener("keydown",async t=>{if("Enter"===t.code&&t.shiftKey&&"INPUT"===t.target.nodeName){const a=Number(t.target.closest("li").dataset.id),s=t.target.value;await e("/comments","POST",{postId:a,text:s})}});
},{"./sass/main.scss":"clu1"}]},{},["Focm"], null)
//# sourceMappingURL=/parcel-project-template/src.c1ae5e55.js.map