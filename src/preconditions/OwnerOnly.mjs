import 'dotenv/config';
import { Precondition } from '@sapphire/framework';

export class UserPrecondition extends Precondition {
  async run(message) {
    const owner = process.env.BOT_OWNER || '';

    return owner.includes(message.author.id)
      ? this.ok()
      : this.error({ message: 'This command can only be used by the owners.' });
  }
}