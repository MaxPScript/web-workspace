class FlippinCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
            <style>
                @layer flippingcard {

                :host {
                    display: block;
                    // width: 50px;
                    // height: min-content;
                    perspective: 1000px;
                    border: 5px dashed hsl(120 50 50 / 0.5);
                    // position: relative;
                    interpolate-size: allow-keywords;
                }
                .card {
                    // width: 100%;
                    // height: 100%;
                    // position: relative;
                    transform-style: preserve-3d;
                    transition: transform 10s ease;
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
                    height: auto;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    transition: height 10s;
                    // overflow: hidden;

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
        `;
	}
	flip() {
		// console.log(this);
		const card = this.shadowRoot.getElementById("card_wrapper");
		const front = this.shadowRoot.querySelector(".front");
		const back = this.shadowRoot.querySelector(".back");
		//
		card.classList.toggle("is_flipped");

		front.classList.toggle("is_hidden", card.classList.contains("is_flipped"));
		back.classList.toggle("is_hidden", !card.classList.contains("is_flipped"));

		const active = card.classList.contains("is_flipped") ? back : front;
		const notActive = card.classList.contains("is_flipped") ? front : back;
	}
}
customElements.define("flippin-card", FlippinCard);
