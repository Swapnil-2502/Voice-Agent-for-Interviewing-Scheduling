const conversation = require('../models/Conversations')

exports.createConversation = (req,res) => {
    conversation.createConversation(req.body,(err,result)=>{
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Conversation saved', conversationId: result.insertId });
    })
}

exports.getConversationbyCandidate = (req,res) => {
    const candidateId = req.params.candidateId;
    console.log(candidateId)
    conversation.getConversationbyCandidate(candidateId,(err,result)=>{
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    })
}