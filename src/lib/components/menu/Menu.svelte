<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Button from '../button/Button.svelte';
</script>

<div class='flex space-between justify-between'>
    <nav class="menu">
        <ul class="menu-list">
            <li><Button on:click={() => goto('/upload')}>Upload</Button></li>
            <li><Button on:click={() => goto('/gallery')}>Galeria</Button></li>
            <li><Button on:click={() => goto('/gallery-user')}>Twoje zdjęcia</Button></li>
        </ul>
    </nav>
</div>

<style>
    .menu {
        padding: 10px;
    }
    
    .menu-list {
        list-style: none;
        display: flex;
        gap: 15px;
        margin: 0;
        padding: 0;
    }

    .menu-list li {
        color: white;
    }
</style>
