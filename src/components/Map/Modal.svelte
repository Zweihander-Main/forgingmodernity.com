<script lang="ts">
	export let showModal: boolean;
	export let name: string;
	export let L: typeof import('leaflet');
	import Icon from '@iconify/svelte';

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) {
		dialog.showModal();
		L.DomEvent.disableScrollPropagation(dialog);
		L.DomEvent.disableClickPropagation(dialog);
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	on:keypress|self={() => dialog.close()}
>
	<div class="modal" on:click|stopPropagation on:keypress|stopPropagation>
		<div class="image-container">
			<h1 class="name">{name}</h1>
			<slot name="image" />
		</div>
		<div class="text">
			<slot name="text" />
		</div>
	</div>
	<span
		class="close-button"
		title="Close"
		on:click={() => dialog.close()}
		on:keypress={() => dialog.close()}
	>
		<Icon icon="mdi:close-octagon" class="close-icon" />
	</span>
</dialog>

<style lang="scss">
	// TODO close button
	@keyframes modal-fly-up {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	dialog {
		opacity: 0;
		transform: translateY(10vh);
		padding: 0;
		box-shadow: 0 10px 50px -12px v.$color-shadow-dark;
		overflow: visible;
		animation: modal-fly-up v.$transition-speed-slow
			v.$transition-speed-normal forwards;
		will-change: transform, opacity;
		cursor: default;
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

	.image-container :global(img) {
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

	.close-button {
		display: block;
		background: white;
		height: 1rem;
		width: 1rem;
		position: absolute;
		top: -0.5rem;
		right: -0.5rem;
		z-index: 1204;
	}

	:global(.close-icon) {
		right: 0.5rem;
		top: -0.5rem;
		position: relative;
		font-size: 2rem;
		color: v.$color-text-stroke;
		cursor: pointer;
		z-index: 1205;
		filter: drop-shadow(0 0 0.4rem v.$color-shadow);
	}
</style>
