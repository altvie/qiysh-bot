import { EmbedBuilder } from "discord.js";

const hexColors = Object.freeze({
  error: "#FF0000", // RED
  info: "#7289DA", // BLURPLE
  success: "#00FF00", // GREEN
  warn: "#FFFF00", // YELLOW
  random: "RANDOM"
});

export function createEmbed({
  type = "info",
  title = null,
  url = null,
  author = null,
  authorIcon = null,
  authorUrl = null,
  message = "",
  fields = [],
  thumbnail = null,
  image = null,
  footerText = null,
  footerIconUrl = null,
  timestamp = false
}) {
  const embed = new EmbedBuilder()
    .setColor(hexColors[type] || hexColors.info)
    .setDescription(message);

  if (title) embed.setTitle(title);
  if (url) embed.setURL(url);
  if (author) embed.setAuthor({ name: author, iconURL: authorIcon || null, url: authorUrl || null });
  if (fields.length > 0) embed.addFields(fields);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (image) embed.setImage(image);
  if (footerText) embed.setFooter({ text: footerText, iconURL: footerIconUrl || null });
  if (timestamp) embed.setTimestamp();

  return embed;
}