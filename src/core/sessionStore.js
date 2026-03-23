const sessions = new Map();

module.exports = {
  create(caseId, data) {
    sessions.set(caseId, {
      ...data,
      queue: [],
      logs: [],
      evidence: [],
      roles: {},
      votes: { jurors: [], responses: {} },
      currentSpeaker: null,
      active: true
    });
  },
  get: (id) => sessions.get(id),
  delete: (id) => sessions.delete(id)
};