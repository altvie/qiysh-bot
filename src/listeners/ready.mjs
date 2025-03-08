import { Listener } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import { ActivityType } from 'discord.js';

const dev = process.env.NODE_ENV !== 'production';

export class UserEvent extends Listener {
	style = dev ? yellow : blue;

	constructor(context, options = {}) {
		super(context, {
			...options,
			once: true
		});
	}

	run() {
		this.printStoreDebugInformation();

		const client = this.container.client;
		client.user.setPresence({
			activities: [
				{ 
					name: 'type /help', 
					type: ActivityType.Watching 
				}
			],
			status: 'online',
		});
	}

	printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop();

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	styleStore(store, last) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}