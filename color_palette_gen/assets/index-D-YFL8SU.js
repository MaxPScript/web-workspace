(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.innerHTML=`
            <style>
                @layer flippingcard {

                :host {
                    display: block;
                    perspective: 500px;
                    interpolate-size: allow-keywords;
                }
                :host {
                    --transition_duration: 1.5s
                }
                .card {
                    transform-style: preserve-3d;
                    transition: transform var(--transition_duration) ease-in-out;
                    display: grid;
                    grid-template-areas: "side";
                }
                .card.is_flipped {
                    transform: rotateY(180deg);
                }
                .side ::slotted(*){
                }
                .side {
                    grid-area: side;
                    height: auto;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    transition: height var(--transition_duration) ease-in-out;
                }
                .side.is_hidden {
                    height: 0px;
                }
                .front {
                    display: grid;
                    gap: 1em;
                    transform: rotateY(0deg);
                }
                .back {
                    display: grid;
                    gap: 1em;
                    transform: rotateY(180deg);
                }
                }
            </style>
            <div class="card" id="card_wrapper">
                <div class="side front">
                    <slot name="front">Default Front</slot>
                </div>
                <div class="side back">
                    <slot name="back">Default Back</slot>
                </div>
            </div>
        `}flip(){let e=this.shadowRoot.getElementById(`card_wrapper`),t=this.shadowRoot.querySelector(`.front`),n=this.shadowRoot.querySelector(`.back`);e.classList.toggle(`is_flipped`),t.classList.toggle(`is_hidden`,e.classList.contains(`is_flipped`)),n.classList.toggle(`is_hidden`,!e.classList.contains(`is_flipped`)),e.classList.contains(`is_flipped`),e.classList.contains(`is_flipped`)}};customElements.define(`flippin-card`,e);function t(e){let t=e.match(/\d+/g);return t?{r:parseInt(t[0]),g:parseInt(t[1]),b:parseInt(t[2])}:{r:0,g:0,b:0}}function n(e,t,n){e/=255,t/=255,n/=255;let r=Math.max(e,t,n),i=Math.min(e,t,n),a,o,s=(r+i)/2;if(r===i)a=o=0;else{let c=r-i;switch(o=s>.5?c/(2-r-i):c/(r+i),r){case e:a=(t-n)/c+(t<n?6:0);break;case t:a=(n-e)/c+2;break;case n:a=(e-t)/c+4;break}a/=6}return{h:a*360,s:o*100,l:s*100}}function r(e,t,n){t/=100,n/=100;let r=t=>(t+e/30)%12,i=t*Math.min(n,1-n),a=e=>n-i*Math.max(-1,Math.min(r(e)-3,Math.min(9-r(e),1)));return{r:Math.round(a(0)*255),g:Math.round(a(8)*255),b:Math.round(a(4)*255)}}function i(e,t,n){return`#`+[e,t,n].map(e=>{let t=e.toString(16);return t.length===1?`0`+t:t}).join(``)}function a(e,t,n,a=5){let o=[],s=360/a;for(let c=0;c<a;c++){let a=r((e+s*c)%360,t,n);o.push(i(a.r,a.g,a.b))}return o}function o(e,t,n,a=5){let o=[],s=e-60;for(let e=0;e<a;e++){let a=r((s+30*e+360)%360,t,n);o.push(i(a.r,a.g,a.b))}return o}function s(e,t,n){let a=[];for(let o=0;o<3;o++){let s=r((e+120*o)%360,t,n);a.push(i(s.r,s.g,s.b))}return a}function c(e,t,n){let a=[];for(let o of[0,60,180,240]){let s=r((e+o)%360,t,n);a.push(i(s.r,s.g,s.b))}return a}function l(e,t,n){let a=[];for(let o=0;o<4;o++){let s=r((e+90*o)%360,t,n);a.push(i(s.r,s.g,s.b))}return a}function u(e=3){let t=[];for(let n=0;n<e;n++){let e=Math.floor(Math.random()*256),n=Math.floor(Math.random()*256),r=Math.floor(Math.random()*256);t.push(i(e,n,r))}return t}function d(e){let r=t(e),i=n(r.r,r.g,r.b),d=[{name:`Complementary`,colors:a(i.h,i.s,i.l,5)},{name:`Analogous`,colors:o(i.h,i.s,i.l,5)},{name:`Triadic`,colors:s(i.h,i.s,i.l)},{name:`Tetradic`,colors:c(i.h,i.s,i.l)},{name:`Square`,colors:l(i.h,i.s,i.l)},{name:`Monochromatic`,colors:a(i.h,i.s*.5,i.l*.7,5)}],f=[{name:`Ugly 1`,colors:u(4)},{name:`Ugly 2`,colors:u(4)},{name:`Ugly 3`,colors:u(4)}];return[...d,...f]}function f(e){let t=getComputedStyle(e).backgroundColor;console.log(`Base color:`,t);let n=d(t);console.log(`Generated palettes:`,n),p(n)}function p(e){let t=document.querySelector(`.main_back`);if(!t)return;t.innerHTML=``;let n=document.createElement(`div`);n.className=`palettes-container`,e.forEach((e,t)=>{let r=document.createElement(`div`);r.className=`palette-item`;let i=document.createElement(`span`);i.className=`palette-name`,i.textContent=`${t+1}. ${e.name}`,r.appendChild(i);let a=document.createElement(`div`);a.className=`swatches-container`,e.colors.forEach(e=>{let t=document.createElement(`div`);t.className=`color-swatch`,t.style.backgroundColor=e,t.title=e;let n=document.createElement(`span`);n.className=`color-code`,n.textContent=e,t.appendChild(n),a.appendChild(t)}),r.appendChild(a),n.appendChild(r)}),t.appendChild(n)}var m=document.getElementById(`slider_red_id`),h=document.getElementById(`slider_green_id`),g=document.getElementById(`slider_blue_id`),_=document.getElementById(`value_red_id`),v=document.getElementById(`value_green_id`),y=document.getElementById(`value_blue_id`),b=document.getElementById(`front_btn_id`),x=document.getElementById(`back_btn_id`);function S(){let e=m.value,t=h.value,n=g.value;_.textContent=e,v.textContent=t,y.textContent=n,b.style.backgroundColor=`rgb(${e}, ${t}, ${n})`}m.addEventListener(`input`,S),h.addEventListener(`input`,S),g.addEventListener(`input`,S),S();var C=document.getElementById(`flippin-card_id`);b&&b.addEventListener(`click`,e=>{f(e.target),C.flip()}),x.addEventListener(`click`,e=>{console.log(C),C.flip()});