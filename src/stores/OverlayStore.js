import {writable} from 'svelte/store '

export let isOverlayOpen = writable(false)
export let lyrics = writable('') 
export let loading = writable(false)

