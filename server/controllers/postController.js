const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/cloudfront-signer')
const crypto = require('crypto')
const sharp = require('sharp')
const Posts = require('../models/postSchema')
require('dotenv').config()

// const bucketName = process.env.BUCKET_NAME
// const bucketRegion = process.env.BUCKET_REGION
// const accessKey = process.env.ACCESS_KEY
// const secretAccessKey = process.env.SECRET_ACCESS_KEY
 
/*----------------------------creating new S3Client instance-----------------------------------*/
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }, 
    region: process.env.BUCKET_REGION
})  
/*----------------------------------------------------------------------------------------*/



/*-------------------------creating random image name for storing------------------------------*/

const randomImageName = (bytes = 32) =>crypto.randomBytes(bytes).toString('hex')
 
/*----------------------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------------------*/

const getAllPosts = async(req, res) => {
     const posts = await Posts.find().sort({_id: -1})
     console.log(posts, "signed url")
     
     for(const post of posts) {
        post.imageUrl = getSignedUrl({
            url: `https://d2yf5nco1desqy.cloudfront.net/${post.image}`,
            dateLessThan: new Date(Date.now() + 5 * 60 * 1000),
            privateKey: process.env.CLOUDFRONT_PRIVATE_KEY,
            keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID
        })
     }
     console.log(posts, "signed url")
     res.status(200).json(posts)
}

/*----------------------------------------------------------------------------------------*/

  
const addNewpost = async(req, res) => {
    console.log(req.body, "req.bodyyy")
    const buffer = await  sharp(req.file.buffer).resize({
        height: 1920,
        width: 1080,
        fit: "contain"
    }).toBuffer()
    try {
        const imageName = randomImageName()
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        console.log(params)

        const command = new PutObjectCommand(params)
        await s3.send(command)
         
        const newPost = new Posts({
            title: req.body.caption,
            image: imageName
        })
      const post = await newPost.save()
      res.status(200).send({status: true})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }


    
    
}

module.exports = { getAllPosts, addNewpost}
