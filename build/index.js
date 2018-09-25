'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h['return']&&h['return']()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),_extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};exports.default=validator;var _defaults=require('./defaults'),_rules=require('./rules'),_rules2=_interopRequireDefault(_rules);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}function validator(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!a||a.constructor!==Object)throw new Error('input-validator-js: expected parameter 1 to be an object.');if(!b||b.constructor!==Object)throw new Error('input-validator-js: expected parameter 2 to be an object.');if(c&&c.constructor!==Object)throw new Error('input-validator-js: expected parameter 1 to be an object');var d=new Set,e=b._$options?_extends({},b._$options):null,f=_extends({},b);return delete f._$options,Object.keys(f).forEach(function(f){for(var g,h=f.replace(/\_$/,''),i=b[h].split('; '),j=0;j<=i.length-1;j++)if(g=i[j],g){var k=g.split(':'),l=_slicedToArray(k,2),m=l[0],n=l[1],o=null,p=[];if(void 0===_rules2.default[m])throw new Error('input-validator-js: unknown rule `'+m+'` provided for field `'+f+'`. Please refer to the docs for more info.');if(void 0===a[h])throw new Error('input-validator-js: unknown field '+f+' in inputs.');if(!n)o=_rules2.default[m](a[h]),p.push(f);else if(n.includes(',')){var q=n.split(',');o=_rules2.default[m].apply(_rules2.default,[a[h]].concat(_toConsumableArray(q))),p.push.apply(p,[f].concat(_toConsumableArray(q)))}else a[n]?(o=_rules2.default[m](a[h],a[n]),p.push(f,a[n])):(o=_rules2.default[m](a[h],n),p.push(f,n));if(-1===o&&(c&&c[h]&&!c[h][m]&&c[h]._$all?d.add(c[h]._$all):c&&c[h]&&c[h][m]?d.add(c[h][m]):d.add(_defaults.errMessages[m].apply(_defaults.errMessages,p)),e&&e.stopAtFirstError))break}}),Array.from(d)}