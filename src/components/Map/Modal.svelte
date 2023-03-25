<script lang="ts">
	export let showModal: boolean;
	export let imageSrc: string;
	export let name: string;
	export let L: typeof import('leaflet');

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) {
		dialog.showModal();
		console.log(L.DomEvent.disableScrollPropagation);
		L.DomEvent.disableScrollPropagation(dialog);
	}
</script>

<dialog
	id="test"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	on:keypress|self={() => dialog.close()}
>
	<div class="modal" on:click|stopPropagation on:keypress|stopPropagation>
		<div class="image-container">
			<h1 class="name">{name}</h1>
			<img class="image" src={imageSrc} alt={name} />
		</div>
		<div class="text">
			<slot name="text" />
		</div>
	</div>
</dialog>

<style lang="scss">
	// TODO animation
	// TODO close button
	dialog {
		padding: 0;
		box-shadow: 0 10px 50px -12px v.$color-shadow-dark;
	}

	dialog::backdrop {
		background: v.$color-shadow;
	}

	.modal {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		grid-template-areas: 'image text';
		max-width: 80vw;
		max-height: 85vh;
		overflow: hidden;
	}

	.image-container {
		position: relative;
		grid-area: image;
	}

	.image-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to right,
			transparent 0%,
			transparent 95%,
			v.$color-shadow-light 100%
		);
		z-index: 1202;
	}

	.name {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		color: white;
		text-align: left;
		font-size: 3.5rem;
		z-index: 1201;
		line-height: 0.9;
		text-shadow: 0 0 0.4rem black;
		-webkit-text-stroke: 1px black;
		letter-spacing: 0.03em;
		margin-left: 0.7rem;
		margin-bottom: 0.3rem;
		color: v.$color-map-white;
	}

	.image {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		z-index: 1200;
	}

	.text {
		@include m.custom-scrollbar(transparent, v.$color-button);

		background: v.$color-map-peach;
		grid-area: text;
		padding: 1rem;
		text-align: justify;
		overflow-y: auto;
		padding: 1rem 2.5rem;
	}
</style>
