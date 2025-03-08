import { Command } from '@sapphire/framework';
import { createEmbed } from '#lib/createEmbed';

export class AvatarCommand extends Command {
  constructor(context, options) {
    super(context, {
      name: 'avatar',
      description: 'Get the avatar of a user',
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('avatar')
        .setDescription('Get the avatar of a user')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('The user to get the avatar of')
            .setRequired(true)
        )
    );
  }

  async chatInputRun(interaction) {
    const user = interaction.options.getUser('user');

    try {
      const embed = createEmbed({
        type: 'info',
        author: `${user.username}`,
        message: `**[Avatar URL](${user.displayAvatarURL({ dynamic: true, size: 4096 })})**`,
        image: user.displayAvatarURL({ dynamic: true, size: 4096 }),
        timestamp: true
      });
  
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({ content: '⚠️ An error occurred while fetching the avatar.', ephemeral: true });
    }
  }
}