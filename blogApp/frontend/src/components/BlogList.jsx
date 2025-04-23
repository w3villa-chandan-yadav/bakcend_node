import React, { useState } from "react";
import { useUserContext } from "../useContext/Context";
import { MdDelete } from "react-icons/md";


export default function BlogList({ blogs }) {
  if (blogs.length === 0) {
    return <p className="text-center text-gray-500">No blogs posted yet.</p>;
  }

  return (
    <div className="space-y-4 py-2">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

// Component for individual blog with like & comment feature
function BlogItem({ blog }) {


  const { user } = useUserContext()


  const [liked, setLiked] = useState(blog?.Likes?.find((ele)=> {
   return ele.userId === user.id}));
  const [comments, setComments] = useState(()=>{
    return blog.comments
  });
  const [newComment, setNewComment] = useState("");


  console.log(user),
  console.log(blog)

const date = new Date(blog?.createdAt);

const formatted = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;

// console.log(formatted);

  const toggleLike =async () => {
    if(blog?.Likes?.find((ele)=>{
      return ele.userId === user.id
    })){
      await fetch("http://localhost:4000/api/v1/unlike",{
        method: "POST",
        body: JSON.stringify({blogId: blog?.id}),
        headers:{
          "Content-Type": "application/json",
          "Authentication": user?.token,
        }
      })
     const newLikes =   blog.Likes.filter((ele)=>{
        
        return ele.userId != user.id
      })

      blog.Likes = newLikes     
    }else{

      await fetch("http://localhost:4000/api/v1/like",{
        method: "POST",
        body: JSON.stringify({blogId: blog.id}),
        headers:{
          "Content-Type": "application/json",
          "Authentication": user?.token,
        }
      })

    
    blog.Likes.push({userId:user.id})
    }

    
   
    setLiked(() => blog.Likes.find((ele)=>{
     return ele.userId === user.id
    }));    
  };

  const handleDelete =async ()=>{
    const result = await fetch("http://localhost:4000/api/v1/delete",{
      method: "DELETE",
      body: JSON.stringify({blogId: blog.id}),
      headers: {
        "Content-Type": "application/json",
        "Authentication": user?.token,
      }
    })

    const data = await result.json();

    if(!data.success){
      alert(data.message)
    }

  }


  const handleAddComment =async () => {
    if (newComment.trim()) {
    
    const result = await fetch("http://localhost:4000/api/v1/comment",{
      method: "POST",
      body: JSON.stringify({comment: newComment.trim(), blogId: blog.id}),
      headers: {
        "Content-Type": "application/json",
        "Authentication": user?.token,
      }
    })
    const data =await result.json();

    if(data.success){
      setComments([...comments, newComment.trim()]);
    setNewComment("");
    return
    }

    alert(data.message)
  }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <h3 className={`text-lg font-bold flex justify-between ${blog?.user?.name === user?.name && "text-orange-500"}`}><span>{blog.title}</span> <div className="font-medium text-base"><span>{formatted}</span><span className="">
        {
          blog.userId === user.id && <MdDelete className="text-center mx-auto text-xl" onClick={handleDelete}/>
        }
        </span></div></h3>
      <p className="text-gray-700 whitespace-pre-line">{blog.descriptions}</p>
      {
        blog.image && <img src="kdflksmfk" className="w-full h-[200px] object-cover"/>
      }
      {/* Like Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLike}
          className={`px-3 py-1 rounded ${
            liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {/* {liked ? "❤️ Liked" : "🤍 Like"} */}
          <span>🤍</span>
          <span>{blog?.Likes?.length < 1 ? "Be first to like": blog?.Likes?.length}</span>
        </button>
        {/* <span className="text-sm">
          {liked ? "You liked this post." : "You haven't liked this yet."}
        </span> */}
      </div>

      {/* Comments */}
      <div>
        <h4 className="font-medium mb-1">Comments:</h4>
        <div className="space-y-1 mb-2">
          {comments?.map((comment, idx) => (
            <div
              key={idx}
              className="bg-gray-100 p-2 rounded text-sm border border-gray-300"
            >
              {comment.comment}
            </div>
          ))}
          {comments?.length === 0 && (
            <p className="text-gray-400 text-sm">No comments yet.</p>
          )}
        </div>

        <div className="flex gap-2 overflow-hidden">
          <input
            type="text"
            value={newComment}
            placeholder="Write a comment..."
            onChange={(e) => setNewComment(e.target.value)}
            className=" flex-3/4 p-2 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 flex-1/4 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
