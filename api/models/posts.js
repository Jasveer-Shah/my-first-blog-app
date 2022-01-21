const PATH = './data.json';
const fs = require('fs')

class Post {
    
    get(){
        // get all posts
        return this.readData();
    }

    getIndividualBlog(postId){
         // get One blog post
         const posts = this.readData();
         const foundPost = posts.find((post) => post.id == postId);
         return foundPost;
    }

    add(newPost){
        // add new post
        const currentPosts = this.readData();
        currentPosts.unshift(newPost)
        this.storeData(currentPosts)
    }


    readData(){                //1
        let rawData = fs.readFileSync(PATH);//import data.json
        let posts = JSON.parse(rawData);
        // posts now in object form
        return posts;                       // export data.json in object form
    }

    storeData(rawData){
      let data = JSON.stringify(rawData);
      // data is now in json form
      fs.writeFileSync(PATH, data);
      
    }
}

module.exports = Post;