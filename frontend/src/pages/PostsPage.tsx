import type { Post } from "../types/post";
import { useState, useEffect } from "react";
import { getPosts } from "../services/api";

function PostsPage(){
    const[posts, setPosts]= useState<Post[]>([])
    const[loading, setLoading]=useState(true)

    useEffect(()=> {
        async function loadPosts () {
        try{
            const data= await getPosts()
            setPosts(data)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }loadPosts()
    },([])
)

return(
    <div className="app">
<h1>Posts Api</h1>
{loading?(
    <p>Carregando...</p>
):(
        <div>
{posts.slice(0, 10).map((post)=>(
        <div
        key={post.id}
        className="group-card"
        >
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        </div>
    ))
}
    </div>
)

}
    </div>
)
}

export default PostsPage