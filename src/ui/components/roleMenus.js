const { StringSelectMenuBuilder, UserSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

exports.roleMenu = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId('role_select')
    .setPlaceholder('Select Role')
    .addOptions([
      { label: 'Judge', value: 'judge' },
      { label: 'Defense', value: 'defense' },
      { label: 'Prosecutor', value: 'prosecutor' },
      { label: 'Juror', value: 'juror' }
    ])
);

exports.userMenu = (role) =>
  new ActionRowBuilder().addComponents(
    new UserSelectMenuBuilder()
      .setCustomId(`assign_${role}`)
      .setPlaceholder(`Select ${role}`)
  );