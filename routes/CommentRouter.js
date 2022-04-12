const Router = require('express').Router()
const controller = require('../controllers/CommentController')

Router.get('/all', controller.GetComments)
Router.get('/:comment_id', controller.GetThisComment)
Router.post('/:twert_id/:user_id', controller.LeaveComment)
Router.put('/:comment_id', controller.UpdateComment)
Router.delete('/:comment_id', controller.DeleteComment)
// You Do
// Implement Crud Operations For Comments
// You Do
module.exports = Router
