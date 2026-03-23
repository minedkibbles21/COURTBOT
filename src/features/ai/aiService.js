const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = {
  async judge(logs) {
    const text = logs.map(l => `${l.user}: ${l.content}`).join('\n');

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Act as judge:\n${text}` }]
    });

    return res.choices[0].message.content;
  }
};