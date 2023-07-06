import { derived, writable } from 'svelte/store'

export let contactDetails = writable(
  {
    firstName: '',
    lastName: '',
    street: '',
    zip: '',
    city: '',
    email: ''
  }
);

let fullName = derived(contactDetails, ($contactDetails) => `${contactDetails.firstName} ${contactDetails.lastName}`)

export let personalStory = writable('');

export let emailText = derived([contactDetails, personalStory], ([$contactDetails, $personalStory]) => `Dear {official}

My name is ${$contactDetails.firstName, $contactDetails.lastName}, and I am a resident in your constituency. I am writing to express my deep concern about the ongoing service disruptions on the LOSSAN rail corridor between San Diego and Los Angeles.

A reliable and fast passenger rail connection between America's 2nd and 8th largest city is important for California's goals to reduce traffic, air pollution, and carbon emissions while boosting economic development and social ties across Southern California.

${$personalStory}

The interruptions are predominantly due to coastal erosion issues along the Oceanside to Irvine segment of the corridor. This persistent problem significantly affects the reliability of service, leading to unpredictable schedules and substantial inconvenience for passengers who travel this route.

I am aware of the California state senate subcommittee on LOSSAN Rail Corridor Resiliency, tasked with improving the rail corridor now and for future generations. I respectfully request that you bring to the subcommittee's attention:

The urgent need for a short-term fix to the Amtrak/Metrolink closures, 
The importance of a long-term solution to the coastal erosion issue so that our kids and grandkids will still be able to ride the train, and
The opportunity to improve the corridor so that it becomes faster and more reliable than driving. 

I am convinced that this issue warrants immediate attention and action.

I would greatly appreciate any updates on the steps being taken to address this pressing issue. I am also more than willing to contribute to any discussions or community efforts aimed at enhancing the resilience of the LOSSAN rail corridor.

Thank you for your attention to this matter. I am confident in your leadership and advocacy and look forward to the necessary improvements under your guidance.

Sincerely,

${$contactDetails.firstName, $contactDetails.lastName}
{address}`.trim())
