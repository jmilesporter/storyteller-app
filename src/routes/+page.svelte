<script>
	import { isOverlayOpen } from '../stores/OverlayStore.js';
	import { lyrics } from '../stores/OverlayStore.js';
	import { loading } from '../stores/OverlayStore.js';

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

	switch (structure) {
		case 'verse-verse-verse':
			structure = 'verse-verse-verse';
			break;
		case 'verse-chorus':
			structure = 'verse-chorus-verse-chorus-verse-chorus';
			break;
		case 'verse-bridge':
			structure = 'verse-verse-bridge-verse-bridge-verse';
			break;
		case 'verse-prechorus-chorus':
			structure = 'verse-prechorus-chorus-verse-prechorus-chorus';
			break;
		default:
			structure = '';
	}

	$: lyricPrompt = `${genre} lyrics  on the subject of ${subject} in the style of ${artist}, ${structure}`;
</script>

<div class="grid place-items-center bg-slate-500 h-screen ">
	<input
		placeholder="s u b j e c t"
		class="absolute top-0 placeholder-white focus:placeholder-transparent text-center bg-slate-700 p-8 w-72 shadow-xl rounded-3xl text-white hover:translate-y-1 hover:scale-110 hover:bg-slate-600 hover: transition ease-in-out duration-500 delay-300  "
		bind:value={subject}
	/>
	<select
		class="absolute right-0 text-center bg-slate-700  w-72 p-8 shadow-xl rounded-3xl text-gray-200 hover:-translate-x-1 hover:scale-110 hover:bg-slate-600 hover: transition ease-in-out duration-500 delay-300  "
		bind:value={genre}
	>
		<option class="rotate-90" value="" disabled selected>g e n r e</option>

		<option>rap</option>
		<option>rock</option>
		<option>pop</option>
		<option>folk</option>
		<option>country</option>
		<option>blues</option>
		<option>r&b</option>
		<option>metal</option>
		<option>classical</option>
		<option>reggae</option>
		<option>electronic</option>
		<option>indie</option>
		<option>punk</option>
		<option>disco</option>
		<option>house</option>
		<option>techno</option>
	</select>
	<input
		placeholder="a r t i s t"
		class="absolute bottom-0 placeholder-white focus:placeholder-transparent text-center bg-slate-700  p-8 w-72 shadow-xl rounded-3xl text-gray-200 hover:-translate-y-1 hover:scale-110 hover:bg-slate-600 hover: transition ease-in-out duration-500 delay-300  "
		bind:value={artist}
	/>
	<select
		class="absolute absolute left-0 text-center bg-slate-700  w-72 p-8 shadow-xl rounded-3xl text-gray-200 hover:translate-x-1 hover:scale-110 hover:bg-slate-600 hover: transition ease-in-out duration-500 delay-300  "
		bind:value={structure}
	>
		<option value="" disabled selected>s t r u c t u r e</option>
		<option>verse-verse-verse</option>
		<option>verse-chorus</option>
		<option>verse-bridge</option>
		<option>verse-chorus-bridge</option>
		<option>verse-prechorus-chorus</option>
	</select>

	<button
		id="generate"
		class="bg-slate-900  p-8 w-72 shadow-xl rounded-3xl text-gray-200 hover:-translate-y-1 hover:scale-110 hover:bg-slate-800 hover: transition ease-in-out duration-500 delay-300  "
		on:click={() => {
			onClick();
		}}>g e n e r a t e &nbsp; l y r i c s</button
	>
</div>

<style>
	select {
		appearance: none;
		cursor: pointer;
	}
</style>
