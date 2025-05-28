const db = require('./db')

const createConversation = (conversation,cb) => {
    const { candidate_id, transcript, entities_extracted } = conversation;
    db.query(
        'INSERT INTO conversations (candidate_id, transcript, entities_extracted) VALUES (?, ?, ?)',
        [candidate_id, transcript, JSON.stringify(entities_extracted)],
        cb
    )
}

const getConversationbyCandidate = (candidateId, cb) => {
    db.query(
        'SELECT * FROM conversations WHERE candidate_id = ? ORDER BY created_at DESC',[candidateId],cb
    )
}

module.exports = {
    createConversation,
    getConversationbyCandidate
}