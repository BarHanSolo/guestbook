<script lang=ts>
    import { createEventDispatcher } from 'svelte';
    import Fa from 'svelte-fa';
    import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
	export let showColumnOptions : boolean;
    export let columnCount : number;

	let dialog: HTMLDialogElement;
    const dispatch = createEventDispatcher();

	$: if (dialog && showColumnOptions) dialog.showModal();

    function setColumnCount(count: number) {
        columnCount = count;
        localStorage.setItem('columnCount', count.toString());
        dispatch('columnChange', columnCount);
        showColumnOptions = false;
    }
</script>

<button class="change-column-count" aria-label="Column count" on:click={() => showColumnOptions = true}>
	<Fa icon={faGripVertical} />
</button>
<dialog
	bind:this={dialog}
	on:close={() => (showColumnOptions = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
        <div class="options-list">
            {#each [1, 2, 3, 4, 5] as option}
                <button on:click={() => { setColumnCount(option); dialog.close(); }}>
                    {option} kolumn{option === 1 ? 'a' : option === 5 ? '' : 'y'}
                </button>
            {/each}
        </div>
        <hr />
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.change-column-count {
		display: flex;
        padding: 10px;
        margin-left: auto;
	}
	button {
		display: flex;
        padding: 10px;
	}
</style>
