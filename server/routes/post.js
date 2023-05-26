const router = require('express').Router()
const postController = require('../controllers/postController')
const multer = require('multer')


const storage = multer.memoryStorage()
const upload = multer({ storage})


router.get('/get-posts', postController.getAllPosts)

router.post('/new-post',  upload.single('image'),  postController.addNewpost)




module.exports = router
