<script>
	import { isOverlayOpen } from '../stores/OverlayStore.js';
	import { lyrics } from '../stores/OverlayStore.js';
	import { loading } from '../stores/OverlayStore.js';
	import { onMount, onDestroy } from 'svelte';
	import fullpage from 'fullpage.js/dist/fullpage.extensions.min.js';

	let myFullpage;

	function destroyFullPage() {
		if (myFullpage) {
			myFullpage.destroy('all');
			myFullpage = null;
		}
	}

	function createFullPage() {
		if (myFullpage) {
			return;
		}

		const check = document.getElementById('fullpage');
		console.log(check);
		if (document.getElementById('fullpage')) {
			console.log('fullpage exists');
			myFullpage = new fullpage('#fullpage', {
				// fullpage.js options here
				licenseKey: '1L9FI-Q6NI9-RIWI7-V1KFJ-TLBYL',
				controlArrows: false,
				scrollHorizontally: true,
				slideNavigation: true,
				autoScrolling: true,
				continuousVertical: true,
				scrollingSpeed: 500,
				// parallax: true,
				// anchors: ['firstPage', 'secondPage', 'thirdPage'],
				afterLoad: function (origin, destination, direction, trigger) {
					console.warn('afterLoad. Trigger: ' + trigger);
				}
			});
			console.log('myFullpage: ', myFullpage);
		}
	}

	export let active = false;

	$: {
		if (active) createFullPage();
		else destroyFullPage();
	}

	onMount(() => {
		createFullPage();
	});

	onDestroy(() => {
		destroyFullPage();
	});

	export let data;
	const apiKey = data.key;

	async function onClick() {
		$lyrics = '';
		isOverlayOpen.set(true);
		try {
			$loading = true;
			const response = await fetch('https://api.openai.com/v1/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiKey}`
				},
				body: JSON.stringify({
					model: 'text-davinci-003',
					prompt: lyricPrompt,
					temperature: 0.8,
					max_tokens: 4000
				})
			});
			const data = await response.json();
			$loading = false;

			$lyrics = data.choices[0].text;

			if (response.status !== 200) {
				$loading = false;
				throw data.error || new Error(`Request failed with status ${response.status}`);
			}
		} catch (error) {
			// Consider implementing your own error handling logic here
			console.error(error);
			// alert(error.message);
		}
	}

	$: subject = '';
	$: genre = '';
	$: artist = '';
	$: structure = '';

	$: lyricPrompt = `${genre} lyrics  on the subject of ${subject} in the style of ${artist}, ${structure}`;
</script>

<div id="fullpage">
	<div class="section " id="section 1">
		<div class="slide " id="slide1">
			<div class="fp-bg " />

			<input
				placeholder="s u b j e c t (s)"
				class=" placeholder-white focus:placeholder-transparent text-center bg-slate-700 p-8 w-72 shadow-xl rounded-3xl text-white hover:translate-y-1 hover:scale-110 hover:bg-slate-600 hover: transition ease-in-out duration-500 delay-300  "
				bind:value={subject}
			/>
		</div>
		<div class="slide " id="slide2">
			<div class="fp-bg " />
			<input
				placeholder="a r t i s t (s)"
				class=" placeholder-white focus:placeholder-transparent text-center bg-slate-700 p-8 w-72 shadow-xl rounded-3xl text-white hover:translate-y-1 hover:scale-110 hover:bg-slate-600 hover: transition ease-in-out duration-500 delay-300  "
				bind:value={artist}
			/>
		</div>
		<div class="slide" id="slide3">
			<div class="fp-bg  " />
			<input
				placeholder="g e n r e (s)"
				class=" placeholder-white focus:placeholder-transparent text-center bg-slate-700 p-8 w-72 shadow-xl rounded-3xl text-white hover:translate-y-1 hover:scale-110 hover:bg-slate-600 hover: transition ease-in-out duration-500 delay-300  "
				bind:value={genre}
			/>
		</div>
	</div>
	<div class="section place-items-center bg-gray-200 " id="section 4">
		<button
			id="generate"
			class="bg-slate-900 p-8 w-72 shadow-xl rounded-3xl text-gray-200 hover:-translate-y-1 hover:scale-110 hover:bg-slate-800 hover: transition ease-in-out duration-500 delay-300  "
			on:click={() => {
				onClick();
			}}>g e n e r a t e &nbsp; l y r i c s</button
		>
	</div>
</div>

<!-- <style>
	select {
		appearance: none;
		cursor: pointer;
	}
</style> -->

<!-- 
	- tooltips or notes giving a hint to the user either an explanation or examples


	- subject
	- genre
	- artist
	- title

	- temperature 
	- max tokens ('haikus', 'poetry', 'single line', 'single section', 'single stanza', 'single song', 'full EP', 'full album'')

	- various precon settings as buttons (can help teach how to use the app) (auto populates fields and parameters)
	- it needs to remember your prompts and its responses to feed back in like normal chat gpt does 
	- a chat window that you can type in and it will respond to you 'i like this line, build a new set of lyrics aound it', etc

	- structure 
	- rhyme scheme
	- rhyme type
	- line length
	- line number 

	- 'write a song using these lyrics'
	- finish this stanza 
	- finish this verse
	- give me a line  


	- feedback or rating system
	- The GPT Top 100 
	
-->
<style>
	#slide1 .fp-bg {
		background-size: cover;
		background-position: initial;
		background-image: url(slide1.jpeg);
		height: 100vh;
	}
	#slide2 .fp-bg {
		background-size: cover;
		background-position: center 80%;
		background-image: url(slide2.jpeg);
		height: 100vh;
	}
	#slide3 .fp-bg {
		background-size: cover;
		background-position: center 80%;
		background-image: url(slide3.jpeg);
		height: 100vh;
	}
</style>
