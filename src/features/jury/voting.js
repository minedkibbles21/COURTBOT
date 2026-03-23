exports.count = (s, type) =>
  Object.values(s.votes.responses).filter(v => v === type).length;

exports.pending = (s) =>
  s.votes.jurors.length - Object.keys(s.votes.responses).length;