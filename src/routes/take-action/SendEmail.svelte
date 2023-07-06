<script lang="ts">
  import { personalStory, emailText } from './store';
</script>

<div class="container mx-auto mt-6 mb-6">
  <label for="personalStory" class="block mb-2 font-medium text-gray-900 dark:text-white">How does the interruption of the train line affect you personally? (optional)</label>
  <textarea id="personalStory" bind:value={$personalStory} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Share a Personal Story" />
</div>

<div class="container mx-auto mt-6 mb-6">
  <label for="message" class="block mb-2 font-medium text-gray-900 dark:text-white">Your Message</label>
  <textarea id="message" rows="{$emailText.split("\n").length}" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
    { $emailText }
  </textarea>
</div>

<div class="container mx-auto mt-6 mb-6">
  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Find Your Representatives</button>
</div>


