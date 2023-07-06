<script lang="ts">
  import { PUBLIC_GOOGLE_CIVIC_API_KEY } from '$env/static/public'
	import { writable } from 'svelte/store';

	let street = ''
	let city = ''
	let zip = ''

	let representatives = []
	let timeout : NodeJS.Timeout | undefined
	let searching = false

	export const error = writable(false);

	let errorValue = false;
	error.subscribe((value) => {
		errorValue = value;
	});

	function address() {
		if(street === '' || city === '' || zip === '') {
			return ''
		}

		return `${street}, ${city}, CA ${zip}`
	}

	console.log('Address', address())

	function handleSearch() {
		searching = true
		error.set(false);
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(fetchRepresentatives, 300)
	}

	async function fetchRepresentatives() {
		if (!address()) {
			reset()
			return
		}

		const data = await fetch(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=${PUBLIC_GOOGLE_CIVIC_API_KEY}&address=${address()}`
		)
			.then((res) => {
				if (!res.ok) {
					handleError()
					return
				}
				return res.json()
			})
			.catch((e) => handleError())
		representatives = data?.representatives || []
		console.log("data", data);
		searching = false
	}

	function handleError() {
		error.set(true);
		reset()
	}

	function reset() {
		representatives = []
		searching = false
	}
</script>

{#if errorValue}
	<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
		<span class="font-medium">Error!</span> Invalid address {address()}
	</div>
{/if}

<div class="container mx-auto mt-6 mb-6">
	<h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Find your Representatives</h1>
</div>

<div class="container mx-auto mt-10">
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
								<th scope="col" class="p-4">
										<div class="flex items-center">
												<input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
												<label for="checkbox-all-search" class="sr-only">checkbox</label>
										</div>
								</th>
								<th scope="col" class="px-6 py-3">
										Name
								</th>
								<th scope="col" class="px-6 py-3">
										Office
								</th>
								<th scope="col" class="px-6 py-3">
										Email
								</th>
								<th scope="col" class="px-6 py-3">
										Phone
								</th>
								<th scope="col" class="px-6 py-3">
										Contact
								</th>
						</tr>
				</thead>
				<tbody>
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td class="w-4 p-4">
										<div class="flex items-center">
												<input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
												<label for="checkbox-table-search-1" class="sr-only">checkbox</label>
										</div>
								</td>
								<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										Apple MacBook Pro 17"
								</th>
								<td class="px-6 py-4">
										Silver
								</td>
								<td class="px-6 py-4">
										Laptop
								</td>
								<td class="px-6 py-4">
										$2999
								</td>
								<td class="px-6 py-4">
										<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td>
						</tr>
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td class="w-4 p-4">
										<div class="flex items-center">
												<input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
												<label for="checkbox-table-search-2" class="sr-only">checkbox</label>
										</div>
								</td>
								<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										Microsoft Surface Pro
								</th>
								<td class="px-6 py-4">
										White
								</td>
								<td class="px-6 py-4">
										Laptop PC
								</td>
								<td class="px-6 py-4">
										$1999
								</td>
								<td class="px-6 py-4">
										<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td>
						</tr>
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td class="w-4 p-4">
										<div class="flex items-center">
												<input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
												<label for="checkbox-table-search-3" class="sr-only">checkbox</label>
										</div>
								</td>
								<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										Magic Mouse 2
								</th>
								<td class="px-6 py-4">
										Black
								</td>
								<td class="px-6 py-4">
										Accessories
								</td>
								<td class="px-6 py-4">
										$99
								</td>
								<td class="px-6 py-4">
										<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td>
						</tr>
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td class="w-4 p-4">
										<div class="flex items-center">
												<input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
												<label for="checkbox-table-3" class="sr-only">checkbox</label>
										</div>
								</td>
								<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										Apple Watch
								</th>
								<td class="px-6 py-4">
										Silver
								</td>
								<td class="px-6 py-4">
										Accessories
								</td>
								<td class="px-6 py-4">
										$179
								</td>
								<td class="px-6 py-4">
										<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td>
						</tr>
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td class="w-4 p-4">
										<div class="flex items-center">
												<input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
												<label for="checkbox-table-3" class="sr-only">checkbox</label>
										</div>
								</td>
								<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										iPad
								</th>
								<td class="px-6 py-4">
										Gold
								</td>
								<td class="px-6 py-4">
										Tablet
								</td>
								<td class="px-6 py-4">
										$699
								</td>
								<td class="px-6 py-4">
										<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td>
						</tr>
						<tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td class="w-4 p-4">
										<div class="flex items-center">
												<input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
												<label for="checkbox-table-3" class="sr-only">checkbox</label>
										</div>
								</td>
								<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										Apple iMac 27"
								</th>
								<td class="px-6 py-4">
										Silver
								</td>
								<td class="px-6 py-4">
										PC Desktop
								</td>
								<td class="px-6 py-4">
										$3999
								</td>
								<td class="px-6 py-4">
										<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td>
						</tr>
				</tbody>
		</table>
	</div>	
</div>
