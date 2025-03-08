import { Command } from '@sapphire/framework';
import { createEmbed } from '#lib/createEmbed';

export class HelpCommand extends Command {
  constructor(context, options) {
    super(context, {
      name: 'help',
      description: 'Displays the list of available commands',
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName('help')
          .setDescription('Displays the list of available commands'),
      {
        idHints: ['1347680887013118069'],
      }
    );
  }

  async chatInputRun(interaction) {
    const commands = this.container.stores.get('commands');

    try {
      const commandList = commands.map(cmd => `\`/${cmd.name}\` - ${cmd.description || 'No description'}`).join('\n');
    
      const embed = createEmbed({
        title: '📜 Command List',
        message: commandList || 'No commands available',
        footerText: 'Use /command to execute a command',
        timestamp: true
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      await interaction.reply({ content: '⚠️ An error occurred while fetching the command list.', ephemeral: true });
    }
  }
}
