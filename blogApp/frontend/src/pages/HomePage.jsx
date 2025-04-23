import React, { useCallback, useEffect, useState } from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../useContext/Context";
import { LuLogOut } from "react-icons/lu";


export default function HomePage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [categoryy, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addBlogPopup, setaddBlogPopUp] = useState(false)

  const { user ,setUser } = useUserContext();

  const addBlog = (blog) => {
    setBlogs([{ ...blog, id: Date.now() }, ...blogs]);
  };

  const handleLogOut = async ()=>{
    const go = confirm("are you sure LogOut?")

    if(go){
      sessionStorage.clear()
      setUser(null)
      navigate("/login")
      
    }
  }

  const fetchAllBlogs = async () => {
    const [data, categoreis] = await Promise.all([
      fetch("http://localhost:4000/api/v1/home"),
      fetch("http://localhost:4000/api/v1/getAllcategories"),
    ]);

    const result = await data.json();
    const result2 = await categoreis.json();

    setBlogs(result.data);
    setCategories(result2.data);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchAllBlogs();
  }, []);

  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.categories === parseInt(selectedCategory));

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-gray-100 p-6">
      {/* Stylish Header */}
      

  {/* Header with user welcome and profile */}
  <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <span className="text-indigo-600 text-xl font-bold">B</span>
            </div>
            <span className="text-xl font-bold">BlogSpace</span>
          </div>
          
          {/* Main Navigation */}
          <nav className="space-x-6">
          <div className="flex flex-col md:flex-row  space-y-2 md:space-y-0 items-center md:space-x-3">
            <button 
            onClick={()=>setaddBlogPopUp(true)}
            className="px-3 py-1 w-full border border-white/50 rounded hover:bg-white/10 transition-colors text-sm">
              Add post
            </button>
            {/* Filter Dropdown */}
        <div className="flex items-center justify-between">
          {/* <h2 className="text-xl font-semibold">All Posts</h2> */}
          <select
            className="px-3 py-1 border border-white/50 rounded hover:bg-white/10 outline-none text-black transition-colors text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            
            <option value="all" selected >All Categories</option>
            {categoryy.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
          </div>
          </nav>
          
          {/* Auth Buttons */}
          
          {/* Mobile Menu Button */}
          {/* <div className="md:hidden">
            <button className="p-1 rounded hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </header>


  {/* Rest of the content... */}


      <div className="max-w-2xl mx-auto  space-y-6">
      

        

         {/* Blog Form */}
        {addBlogPopup && <BlogForm onAdd={addBlog} categoryy={categoryy} setaddBlogPopUp={setaddBlogPopUp}/>}

        {/* Blog List */}
        <BlogList blogs={filteredBlogs} />
      </div>


 <LuLogOut
 onClick={handleLogOut}
 className="text-3xl fixed bottom-2 right-2"/>

    </div>
  );
}
