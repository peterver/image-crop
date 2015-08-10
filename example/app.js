(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ImageCropper = require('./imagecrop.min.js');

var dimensions = null;
var is_active = false;
var img_c = null;

var onUpdateHandler = function (dim) {
  dimensions = dim;
};

var onCropHandler = function() {
  var img = new Image();
  img.src = img_c.crop('image/jpeg', 1);
  img.width = dimensions.w;
  img.height = dimensions.h;
  var target = document.querySelector('.preview');
  while(target.firstChild) {
    target.removeChild(target.firstChild)
  }
  target.appendChild(img);
};

var onCreateHandler = function() {
  if(is_active) { return; }

  new ImageCropper('.test-imagecrop', 'img2.jpg', {
    update: onUpdateHandler
  });
  destroy_btn.style.display = 'initial';
  create_btn.style.display = 'none';

  is_active = true;
};

var onDestroyHandler = function() {
  if(!is_active) { return; }

  img_c.destroy();
  destroy_btn.style.display = 'none';
  create_btn.style.display = 'initial';

  is_active = false;
};

var crop_btn = document.querySelector('.crop-button');
crop_btn.addEventListener('click', onCropHandler);

var create_btn = document.querySelector('.create-button');
create_btn.addEventListener('click', onCreateHandler);
create_btn.style.display = 'none';

var destroy_btn = document.querySelector('.destroy-button');
destroy_btn.addEventListener('click', onDestroyHandler);

img_c = new ImageCropper('.test-imagecrop', 'img.jpg', {
  update: onUpdateHandler,
  fixed_size: true,
  create_cb: function(dim) {
    console.log('created - ', dim);
  },
  destroy_cb: function() {
    console.log('destroy');
  }
});
is_active = true;
},{"./imagecrop.min.js":2}],2:[function(require,module,exports){
module.exports=function(){function e(e,t,n){if(t&&e){n=n?n:{};for(var i in s)p[s[i][0]]=i in n?n[i]:s[i][1];l(e),f=new Image,f.addEventListener("load",function(e){this.create()}.bind(this)),f.src=t}}function t(e){var t=m.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;return{x:0>n?0:n>t.width?t.width:n,y:0>i?0:i>t.height?t.height:i}}function n(e){var t=m.getBoundingClientRect(),n=!1,i=!1,e=e?!0:!1;(p.fs&&y.x<0||y.y<0)&&(n=!0),(p.fs&&y.x2>t.width||y.y2>t.height)&&(i=!0),(!n||e)&&y.x<0&&(y.x=0,y.x2=y.w),(!n||e)&&y.y<0&&(y.y=0,y.y2=y.h),(!i||e)&&y.x2>t.width&&(y.x2=t.width,y.x=y.x2-y.w),(!i||e)&&y.y2>t.height&&(y.y2=t.height,y.y=y.y2-y.h),y.w=y.x2-y.x,y.h=y.y2-y.y,c.style.top=y.y+"px",c.style.left=y.x+"px",c.style.right=~~(t.width-y.x2)+"px",c.style.bottom=~~(t.height-y.y2)+"px",u.setAttribute("d","M 0 0 v"+t.height+"h"+t.width+"v"+-t.height+"H-0zM"+y.x+" "+y.y+"h"+y.w+"v"+y.h+"h-"+y.w+"V-"+y.h+"z"),p.up&&p.up(y)}function i(e){e=t(e),y.x=e.x-.5*y.w,y.y=e.y-.5*y.h,y.x2=e.x+.5*y.w,y.y2=e.y+.5*y.h,n(!0)}function o(e){document.addEventListener("mousemove",r),document.addEventListener("mouseup",h),i(e)}function h(e){document.removeEventListener("mouseup",h),document.removeEventListener("mousemove",r)}function r(e){i(e)}function d(e,i,o){function h(e){e.stopPropagation(),document.addEventListener("mouseup",d),document.addEventListener("mousemove",r)}function r(e){e.stopPropagation(),e=t(e),o(e),n()}function d(e){e.stopPropagation(),document.removeEventListener("mouseup",d),document.removeEventListener("mousemove",r)}var m=document.createElement("span");return m.className="imgc-handles-el-"+e+"-"+i,m.addEventListener("mousedown",h),m}var m,c,u,s={update:["up",!1],create_cb:["cr",!1],destroy_cb:["de",!1],min_crop_width:["mcw",32],min_crop_height:["mch",32],max_width:["mw",500],max_height:["mh",500],fixed_size:["fs",!1]},a=[function(e){var t=y.x;a[7](e),p.fs?y.y+=y.x-t:a[4]},function(e){var t=y.x2;a[5](e),p.fs?y.y-=y.x2-t:a[4](e)},function(e){var t=y.x2;a[5](e),p.fs?y.y2+=y.x2-t:a[6](e)},function(e){var t=y.x;a[7](e),p.fs?y.y2-=y.x-t:a[6](e)},function(e){y.y=y.y2-e.y<p.mch?y.y2-p.mch:e.y},function(e){y.x2=e.x-y.x<p.mcw?y.x+p.mcw:e.x},function(e){y.y2=e.y-y.y<p.mch?y.y+p.mch:e.y},function(e){y.x=y.x2-e.x<p.mcw?y.x2-p.mcw:e.x}],w=null,x=!1,y={x:0,y:0,x2:80,y2:80,w:80,h:80},p={},f=null,v={w:1,h:1},l=function(e){m&&this.destroy(),m=document.querySelector(e),m.className+=" imgc ".indexOf(" "+p.cn+" ")>-1?"":" imgc"};return e.prototype.create=function(e){if(!x){m||l(e);var t=f.width,i=f.height;t>p.mw&&(i=~~(p.mw*i/t),t=p.mw),i>p.mh&&(t=~~(p.mh*t/i),i=p.mh),v={w:f.naturalWidth/t,h:f.naturalHeight/i},m.style.width=t+"px",m.style.height=i+"px",m.addEventListener("DOMNodeRemovedFromDocument",this.destroy),w=document.createElement("canvas"),w.setAttribute("width",t),w.setAttribute("height",i),m.appendChild(w),m.appendChild(f);var h=document.createElementNS("http://www.w3.org/2000/svg","svg");h.setAttribute("height",i),h.setAttribute("width",t),m.appendChild(h),u=document.createElementNS("http://www.w3.org/2000/svg","path"),u.style.fill="rgba(0, 0, 0, .8)",h.appendChild(u),c=document.createElement("div"),c.className="imgc-handles",m.appendChild(c);for(var r=0;r<(p.fs?4:8);r++)c.appendChild(new d(p.fs?0:~~(r/4),r%4,a[r]));m.addEventListener("mousedown",o),x=!0,n({x:0,y:0}),p.cr&&p.cr({w:t,h:i})}},e.prototype.destroy=function(){if(x){if(m){for(m.removeEventListener("DOMNodeRemovedFromDocument",this.destroy),m.removeEventListener("mousedown",o);m.firstChild;)m.removeChild(m.firstChild);m=w=f=c=u=null}x=!1,p.de&&p.de()}},e.prototype.crop=function(e,t){(!e||"image/jpeg"!==e&&"image/png"!==e)&&(e="image/jpeg"),(!t||0>t||t>1)&&(t=1),w.setAttribute("width",y.w),w.setAttribute("height",y.h);var n=w.getContext("2d");return n.drawImage(f,v.w*y.x,v.h*y.y,v.w*y.w,v.h*y.h,0,0,y.w,y.h),w.toDataURL(e,t)},e}();
},{}]},{},[1]);
