class FlippinCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
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
