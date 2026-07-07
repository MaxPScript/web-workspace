(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.innerHTML=`
            <style>
                @layer flippingcard {

                :host {
                    display: block;
                    // width: 50px;
                    // height: 3ch;
                    perspective: 1000px;
                    border: 5px dashed hsl(120 50 50 / 0.5);
                    // position: relative;
                }
                .card {
                    // width: 100%;
                    // height: 100%;
                    // position: relative;
                    transform-style: preserve-3d;
                    transition: transform 1s ease;
                    display: grid;
                    grid-template-areas: "side";
                    // place-content: center;
                }
                .card.is_flipped {
                    transform: rotateY(180deg);
                }
                .side ::slotted(*){
                    // width: 100%;
                    // height: 100%;
                }
                .side {
                    grid-area: side;
                    // position: absolute;
                    // width: 100%;
                    // height: 100%;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;

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
        `}flip(){this.shadowRoot.getElementById(`card_wrapper`).classList.toggle(`is_flipped`)}};customElements.define(`flippin-card`,e);var t=document.getElementById(`slider_red_id`),n=document.getElementById(`slider_green_id`),r=document.getElementById(`slider_blue_id`),i=document.getElementById(`value_red_id`),a=document.getElementById(`value_green_id`),o=document.getElementById(`value_blue_id`),s=document.getElementById(`front_btn_id`),c=document.getElementById(`back_btn_id`);function l(){let e=t.value,c=n.value,l=r.value;i.textContent=e,a.textContent=c,o.textContent=l,s.style.backgroundColor=`rgb(${e}, ${c}, ${l})`}t.addEventListener(`input`,l),n.addEventListener(`input`,l),r.addEventListener(`input`,l),l();var u=document.getElementById(`flippin-card_id`);s.addEventListener(`click`,e=>{console.log(u),u.flip(),e.target.style.backgroundColor}),c.addEventListener(`click`,e=>{console.log(u),u.flip()});