---
layout: null
---
'use strict';
/* eslint-env serviceworker */
/* global init: readonly, config: readonly */
/* {{ site.data.app.version | default: site.version }} */
const CDN = 'https://cdn.kernvalley.us/';

try {
	self.importScripts(new URL('./service-worker.js', CDN), '/sw-config.js');

	if (init instanceof Function && typeof config === 'object') {
		init(self, config);
	}
} catch(err) {
	console.error(err);
}
