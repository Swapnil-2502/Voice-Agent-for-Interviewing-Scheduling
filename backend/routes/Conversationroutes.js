const express = require('express');
const router = express.Router();

const conversation = require('../controllers/ConversationController')

router.post('/',conversation.createConversation)
router.get('/candidate/:candidateId',conversation.getConversationbyCandidate)

module.exports = router