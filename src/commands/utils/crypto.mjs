import { Command } from '@sapphire/framework';
import axios from 'axios';
import { createEmbed } from '#lib/createEmbed';

export class CryptoCommand extends Command {
  constructor(context, options) {
    super(context, {
      name: 'crypto',
      description: 'Get detailed information about a cryptocurrency',
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('crypto')
        .setDescription('Get cryptocurrency market data')
        .addStringOption(option =>
          option.setName('coin')
            .setDescription('The cryptocurrency to get information about')
            .setRequired(true)
        )
    );
  }

  async chatInputRun(interaction) {
    const coin = interaction.options.getString('coin').toLowerCase();

    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);

      if (!data || !data.market_data) {
        return interaction.reply({ content: '⚠️ Cryptocurrency not found.', ephemeral: true });
      }

      const price = data.market_data.current_price.usd.toLocaleString();
      const marketCap = data.market_data.market_cap.usd.toLocaleString();
      const low24h = data.market_data.low_24h.usd.toLocaleString();
      const high24h = data.market_data.high_24h.usd.toLocaleString();
      const priceChange24h = data.market_data.price_change_percentage_24h.toFixed(2);
      const totalSupply = data.market_data.total_supply ? data.market_data.total_supply.toLocaleString() : 'N/A';
      const maxSupply = data.market_data.max_supply ? data.market_data.max_supply.toLocaleString() : 'N/A';

      const embed = createEmbed({
        type: 'info',
        thumbnail: data.image.small,
        message: `**${data.name} (${data.symbol.toUpperCase()})**`,
        fields: [
          { name: '💰 Current Price', value: `$${price}`, inline: true },
          { name: '📊 Market Cap', value: `$${marketCap}`, inline: true },
          { name: '📉 24h Low', value: `$${low24h}`, inline: true },
          { name: '📈 24h High', value: `$${high24h}`, inline: true },
          { name: '🔁 24h Change', value: `${priceChange24h}%`, inline: true },
          { name: '📦 Total Supply', value: totalSupply, inline: true },
          { name: '🚀 Max Supply', value: maxSupply, inline: true },
        ],
        footerText: 'Data from CoinGecko',
        footerIconUrl: 'https://support.coingecko.com/hc/article_attachments/4499575478169',
        timestamp: true
      })

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      this.container.logger.error(`Coin not found: ${coin}`);
      await interaction.reply({ content: '⚠️ An error occurred while fetching data.', ephemeral: true });
    }
  }
}