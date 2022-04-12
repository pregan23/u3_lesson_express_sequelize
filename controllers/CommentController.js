const { Comment, User } = require('../models')

// Work Here
const GetComments = async (req, res) => {
    try{ 
        const comments = await Comment.findAll()
        res.send(comments)
    } catch (error) {
        throw error
      }
}

const GetThisComment = async (req, res) => {
    try {
        let commentId = req.params.comment_id
        const comment = await Comment.findAll({
            where: { id: commentId}
        })
        res.send(comment)
    } catch (error) {
        throw error
      }
}

const LeaveComment = async (req, res) => {
    try {
        let twertId = parseInt(req.params.twert_id)
        let ownerId = parseInt(req.params.user_id)
        let commentBody = {
            ...req.body,
            twertId,
            ownerId
        }
        let newComment = await Comment.create(commentBody)
        res.send(newComment)
    } catch (error) {
        throw error
      }
}

const UpdateComment = async (req, res) => {
    try {
      let commentId = parseInt(req.params.comment_id)
      let updatedComment = await Comment.update(req.body, {
        where: { id: commentId },
        returning: true
      })
      res.send(updatedComment)
    } catch (error) {
      throw error
    }
  }

  const DeleteComment = async (req, res) => {
      try{
        let commentId = parseInt(req.params.comment_id)
        await Comment.destroy({ where: { id: commentId }})
        res.send( { message: `Deleted comment with an id of ${commentId}`})
      } catch (error) {
        throw error
      }
  }


// Work Here

// Dont forget to export your functions
module.exports = {
    GetComments,
    LeaveComment,
    UpdateComment,
    DeleteComment,
    GetThisComment
}
