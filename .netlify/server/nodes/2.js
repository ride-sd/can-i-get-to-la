import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
export const component = async () => (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.5632795d.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.6ea134b3.js","_app/immutable/chunks/preload-helper.41c905a7.js"];
export const stylesheets = ["_app/immutable/assets/2.77cb77c1.css"];
export const fonts = [];
