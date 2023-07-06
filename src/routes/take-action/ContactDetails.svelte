<script lang="ts">
  import { contactDetails } from './store';
</script>

<h3>Contact Details</h3>

<div class="container mx-auto">
  <form>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-6 group">
          <label for="firstName" class="block mb-2 font-medium text-gray-900 dark:text-white">First Name</label>
          <input bind:value={$contactDetails.firstName} type="text" name="firstName" id="firstName" class="block py-2.5 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <label for="lastName" class="block mb-2 font-medium text-gray-900 dark:text-white">Last Name</label>
        <input value={$contactDetails.lastName} type="text" name="lastName" id="lastName" class="block py-2.5 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
    </div>

    <div class="mb-6">
      <label for="street" class="block mb-2 font-medium text-gray-900 dark:text-white">Street</label>
      <input bind:value={$contactDetails.street} type="street" id="street" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123 Main St" required>
    </div>

    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-6 group">
          <label for="city" class="block mb-2 font-medium text-gray-900 dark:text-white">City</label>
          <input bind:value={$contactDetails.city} type="text" name="city" id="city" class="block py-2.5 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="San Diego" required />
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <label for="zip" class="block mb-2 font-medium text-gray-900 dark:text-white">ZIP</label>
        <input bind:value={$contactDetails.zip} type="text" name="zip" id="zip" class="block py-2.5 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="92104" required />
      </div>
    </div>
  </form>
</div>
