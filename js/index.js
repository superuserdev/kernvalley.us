import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/theme-cookie.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/install/prompt.js';
import 'https://cdn.kernvalley.us/components/ad/block.js';
import 'https://cdn.kernvalley.us/components/app/list-button.js';
import 'https://cdn.kernvalley.us/components/app/stores.js';
import { getAlerts } from './functions.js';
import { init } from 'https://cdn.kernvalley.us/js/std-js/data-handlers.js';
import { getCustomElement } from 'https://cdn.kernvalley.us/js/std-js/custom-elements.js';
import { ready, loaded, on, toggleClass, css } from 'https://cdn.kernvalley.us/js/std-js/dom.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { GA } from './consts.js';

if (typeof GA === 'string' && GA.length !== 0) {
	loaded().then(() => {
		requestIdleCallback(async () => {
			importGa(GA).then(async ({ ga, hasGa }) => {
				if (hasGa()) {
					ga('create', GA, 'auto');
					ga('set', 'transport', 'beacon');
					ga('send', 'pageview');

					on('a[rel~="external"]', ['click'], externalHandler, { passive: true, capture: true });
					on('a[href^="tel:"]', ['click'], telHandler, { passive: true, capture: true });
					on('a[href^="mailto:"]', ['click'], mailtoHandler, { passive: true, capture: true });
				}
			});
		});
	});
}

toggleClass([document.documentElement], {
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
	'js': true,
	'no-js': false,
});

ready().then(() => {
	init();

	getAlerts().then(alerts => {
		if (alerts.length !== 0) {
			const container = document.createElement('section');
			container.classList.add('flex', 'column');
			css([container], {
				'gap': '1.5em',
				'justify-content': 'space-around',
				'padding': '0.8em 10% 0.8em 10%',
			});

			container.append(...alerts);
			document.getElementById('main').prepend(container);
		}
	});

	getCustomElement('install-prompt').then(HTMLInstallPromptElement => {
		on('#install-btn', ['click'], () => new HTMLInstallPromptElement().show())
			.forEach(el => el.hidden = false);
	});
});
