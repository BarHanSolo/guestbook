<script lang=ts>
    import { createEventDispatcher } from 'svelte';
    import Fa from 'svelte-fa';
    import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
    export let columnCount : number;

    const dispatch = createEventDispatcher();

	function changeColumnCount() {
		if (columnCount == 4){
			localStorage.setItem('columnCount', '1');
			dispatch('columnChange', 1);
		} else {
			localStorage.setItem('columnCount', (columnCount+1).toString());
			dispatch('columnChange', columnCount+1);
		}
	}
</script>

<button class="change-column-count" aria-label="Column count" on:click={() => changeColumnCount()}>
	<Fa icon={faGripVertical} />
</button>

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
