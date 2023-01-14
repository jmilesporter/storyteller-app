<script>
	import '../app.css';
	import { isOverlayOpen } from '../stores/OverlayStore.js';
	import Overlay from '../components/Overlay.svelte';
</script>

<head>
	<script src="https://kit.fontawesome.com/21639931c9.js" crossorigin="anonymous"></script>

	<!-- <script
		type="text/javascript"
		src="../../node_modules/fullpage.js/dist/fullpage.extensions.min.js"
	></script> -->
</head>

<!-- {#if $isOverlayOpen}
	<div>
		<Overlay>
			<div />
		</Overlay>
	</div>
{/if} -->
<main>
	<slot />
</main>
