import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["about.txt","android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","ride_sd_logo.png","site.webmanifest","social_share.png"]),
	mimeTypes: {".txt":"text/plain",".png":"image/png",".ico":"image/vnd.microsoft.icon",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.78706d35.js","app":"_app/immutable/entry/app.af5a5bb5.js","imports":["_app/immutable/entry/start.78706d35.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/singletons.8f2d8d55.js","_app/immutable/entry/app.af5a5bb5.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.6ea134b3.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js'),
			() => import('../server/nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/take-action",
				pattern: /^\/take-action\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
