!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(t){return e[t]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}({4:function(e,t,n){e.exports=n(5)},5:function(){function e(){var e=document.getElementById("spot_id"),t=document.getElementById("spot_secret");e&&t&&chrome.storage.local.set({credentials:{client_id:e.value,client_secret:t.value}},(function(){document.getElementById("save").innerHTML="SAVED"}))}window.onload=function(){chrome.storage.local.get("credentials",(function(e){var t=e.credentials;if(null!=t){var n=document.getElementById("spot_id"),r=document.getElementById("spot_secret");n.value=t.client_id,r.value=t.client_secret}}));var t=document.getElementById("save");t&&(t.onclick=e)}}});