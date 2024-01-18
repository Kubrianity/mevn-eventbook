const BaseService = require('./base-service');
const CommentModel = require('../models/comment');

class CommentService extends BaseService {
    model = CommentModel
}

module.exports = new CommentService();