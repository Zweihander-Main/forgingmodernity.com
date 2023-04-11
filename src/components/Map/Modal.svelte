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
		<div class="modal-grid">
			<div class="image-container">
				<h1 class="name">{name}</h1>
				<slot name="image" />
			</div>
			<div class="text-container">
				<slot name="text" />
			</div>
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
		@include m.custom-scrollbar(v.$color-map-peach, v.$color-button);
		overflow-y: auto;
		overflow-x: hidden;
		max-height: 85vh;
		max-width: 95vw;

		@include m.media('>tablet') {
			max-width: 90vw;
		}

		@include m.media('>desktop') {
			overflow-y: hidden;
		}

		@include m.media('>large') {
			max-width: 80vw;
		}
	}

	.modal-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		grid-template-areas: 'image' 'text';

		@include m.media('>desktop') {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			grid-template-areas: 'image text';
			max-height: inherit;
		}
	}

	.image-container {
		position: relative;
		grid-area: image;
		max-height: 80vh;
		@include m.media('>desktop') {
			max-height: unset;
		}
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
		@include m.text-stroke(
			v.$color-black,
			1.3px,
			0 0 0.4rem v.$color-black
		);
		position: absolute;
		bottom: 0;
		left: 0;
		max-width: 100%;
		color: white;
		text-align: left;
		z-index: 1201;
		line-height: 0.9;
		letter-spacing: 0.03em;
		margin-left: 0.7rem;
		margin-right: 0.7rem;
		margin-bottom: 0.3rem;
		color: v.$color-map-white;
		font-size: 10vw;
		@include m.media('>tablet') {
			font-size: 3.5rem;
		}
		@include m.media('>desktop') {
			font-size: min(3.5rem, 5vw);
		}
	}

	.image-container :global(img) {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		z-index: 1200;
	}

	.text-container {
		@include m.custom-scrollbar(transparent, v.$color-button);

		background: v.$color-map-peach;
		grid-area: text;
		text-align: justify;
		overflow-y: hidden;
		padding: 0rem 1rem;

		@include m.media('>phone') {
			padding: 0.5rem 2rem;
		}

		@include m.media('>desktop') {
			overflow-y: auto;
			padding: 1rem 2.5rem;
		}
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
