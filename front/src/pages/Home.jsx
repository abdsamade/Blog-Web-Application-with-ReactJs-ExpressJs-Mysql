import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
function Home() {
  const [posts,setPosts] = useState([]);
const getText = (input) => {

}  
//useLocation method of router-dom wich split url to many fields and 'search' one of them
const cat = useLocation().search;
useEffect(()=> {
  const fetchData = async ()=>{
  try {
	  const res= await axios.get(`/posts/${cat}`);
	    setPosts(res.data);
	  console.log(res)
} catch (error) {
	console.log(error);
}}
  fetchData();
},[cat]);
  return (
    <div className="home">
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={post.img} alt="" />
          </div>
          <div className="content">
            <Link className="link" to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <p>{post.desc}</p>
            <button>Read More</button>
          </div>
        </div>
      ))}
    </div>
  </div>

  )
}

export default Home