import { LogLevel, SapphireClient } from '@sapphire/framework';

export class BotClient extends SapphireClient {
  constructor() {
    super({
      caseInsensitivePrefixes: true,
      caseInsensitiveCommands: true,
      intents: [
        'Guilds',
        'GuildMembers',
        'GuildMessages',
        'GuildBans',
        'DirectMessages'
      ],
      shards: 'auto',
      logger: {
        level: LogLevel.Info
      }
    })
  }

  async initBot() {
    await this.login(process.env.BOT_TOKEN);
    this.logger.info('Logged in!');
  }
}