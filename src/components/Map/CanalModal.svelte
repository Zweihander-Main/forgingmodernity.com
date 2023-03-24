<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	on:keypress|self={() => dialog.close()}
>
	<div on:click|stopPropagation on:keypress|stopPropagation>
		<slot />
	</div>
</dialog>

<style lang="scss">
</style>
