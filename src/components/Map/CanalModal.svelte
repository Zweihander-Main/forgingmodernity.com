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
	dialog {
		padding: 0;
		box-shadow: 0 20px 50px -12px rgb(0 0 0 / 40%);
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 50%);
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

	.name {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		color: white;
		text-align: left;
		margin: 0;
		font-size: 3rem;
		z-index: 1201;
		line-height: 1;
	}

	.image {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1200;
	}

	.text {
		grid-area: text;
		padding: 1rem;
		text-align: justify;
		overflow-y: auto;
	}
</style>
