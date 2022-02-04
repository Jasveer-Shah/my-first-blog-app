
const express = require('express');
const app = express();
const Post = require('./api/models/posts')                       // class
const postsData = new Post();     // initialize the object        // new class
app.use(express.json());
var multer = require('multer');  
// var upload = multer({dest: 'uploads/'})   // https://www.npmjs.com/package/multer
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
     
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  })

  const getExt = (mimeType) => {
          switch(mimeType){
              case "image/png":
                  return ".png";
              case "image/jpeg":
                  return ".jpeg";    
          }
  }
  
   var upload = multer({ storage: storage })



      // at /uploads url end point use uploads folder
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res)=>{
    res.send("hello baby from blog app")
})
// app.get("/healthcheck", (req, res)=>{
//     res.status(200).send("working")
// })
app.get('/api/posts', (req, res) => {
    // const test = {
    //     testing:"testing",
    // }
    // postsData.add(test)
    res.status(200).send(postsData.get())
});

app.get('/api/posts/:post_id', (req, res)=>{       
   const postId = req.params.post_id;                // first here
   console.log(postId);
   const foundPost = postsData.getIndividualBlog(postId);
   console.log(foundPost)
   if(foundPost){
       res.status(200).send(foundPost)
   }else{
       res.status(400).send('NOT FOUND')
   } 
});

app.post('/api/posts', upload.single("post-image"), (req,res) => {
    const newPost = {
        "id":`${Date.now()}`,
        "title": req.body.title,
        "content":req.body.content,
        "post_image":"uploads/"+req.file.filename,
        "added_date": `${Date.now()}`
    }
    postsData.add(newPost);
    console.log(req.body);
    console.log(req.file)
     res.status(201).send(newPost)
    // res.send("Ok")
})
const port = process.env.port || 3000;
app.listen(port, () => console.log("Listening at localHost:3000")
)