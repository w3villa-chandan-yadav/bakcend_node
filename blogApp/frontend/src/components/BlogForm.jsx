import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useUserContext } from "../useContext/Context";





export default function BlogForm({ onAdd, categoryy, setaddBlogPopUp }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { user } = useUserContext()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      return alert("All fields including category are required!");
    }

    const blogData = {
      title,
      content,
      category,
      image, // This is a File object
    };

    const data = await fetch("http://localhost:4000/api/v1/blog",{
      method: "POST",
      body: JSON.stringify({title, descriptions: content, categories: category, image: image}),
      headers: {
        "Content-Type": "application/json",
        "Authentication": user?.token,
      }
    })

    const result = await data.json();

    console.log(result)

    if(!result.success){
      alert(result.message)
    }

    

    console.log(blogData)

    // onAdd(blogData);

    onAdd(result.data)



    // Reset form
    setTitle("");
    setContent("");
    setCategory("");
    setImage(null);
    setImagePreview(null);
    setaddBlogPopUp(false)
  };

  return (
    <div className="w-screen h-screen backdrop-blur-[4px] overflow-hidden inset-0 grid place-items-center absolute">
    <form onSubmit={handleSubmit} className=" p-6  bg-white rounded-lg shadow mb-6 space-y-4 max-w-2xl mx-auto  ">
      <h2 className="text-xl flex justify-between items-center font-semibold mb-2">Create a Blog <span onClick={()=>setaddBlogPopUp(false)}><IoIosCloseCircle/></span></h2>

      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Category Dropdown */}
      <div className="overflow-hidden">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full p-2 border border-gray-300  rounded focus:outline-none focus:ring overflow-hidden focus:border-blue-400 text-sm"
        >
          <option disabled value="">Select Category</option>
          {categoryy.map((ele) => {
            return (
              <option key={ele.id} className="w-full" value={ele.id}>
                {ele.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Content */}
      <div>
        <textarea
          placeholder="Blog Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Image Upload */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 w-full max-h-60 object-cover rounded border"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Post Blog
      </button>
    </form>
    </div>
  );
}
