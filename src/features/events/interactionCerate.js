const store = require('../core/sessionStore');
const ai = require('../features/ai/aiService');
const panel = require('../ui/panels/courtPanel');
const roles = require('../ui/components/roleMenus');
const votingUI = require('../ui/embeds/votingEmbed');
const transcript = require('../features/transcript/service');
const share = require('../features/sharing/service');

module.exports = (client) => {
  client.on('interactionCreate', async (i) => {

    const caseId = i.channel?.name?.split('-')[1];
    const s = store.get(caseId);

    if (i.isButton()) {

      if (i.customId === 'assign_roles') {
        return i.reply({ components: [roles.roleMenu], ephemeral: true });
      }

      if (i.customId === 'start_vote') {
        const ui = votingUI(s);
        s.voteMsg = await i.channel.send({ embeds: [ui.embed], components: [ui.row] });
        return i.reply({ content: 'Voting started', ephemeral: true });
      }

      if (i.customId.startsWith('vote_')) {
        const vote = i.customId.replace('vote_', '');
        s.votes.responses[i.user.id] = vote;
        return i.reply({ content: `Vote: ${vote}`, ephemeral: true });
      }

      if (i.customId === 'ai') {
        return i.reply(await ai.judge(s.logs));
      }

      if (i.customId === 'close') {
        await transcript.send(i, s);
        const link = share.create(s);
        await i.channel.send(`Public case: ${link}`);
        return i.channel.delete();
      }
    }

    if (i.isStringSelectMenu()) {
      const role = i.values[0];
      return i.reply({ components: [roles.userMenu(role)], ephemeral: true });
    }

    if (i.isUserSelectMenu()) {
      const role = i.customId.split('_')[1];
      s.roles[role] = i.values[0];
      if (role === 'juror') s.votes.jurors.push(i.values[0]);

      return i.reply({ content: `Assigned ${role}`, ephemeral: true });
    }
  });
};