import React, { useState } from "react";
import axios from '../utils/axios'
import Navbar from "../components/Navbar";
import {useNavigate} from 'react-router-dom'

const NewPost = () => {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
   const {data} = await axios.post("/posts/new-post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    console.log(data)
    if(data.status) navigate('/')
  };
  

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div>
        <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <input onChange={fileSelected} type="file" name="image" accept="image/*"></input>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          placeholder="Caption"
        ></input>
        <button type="submit" className="">Submit</button>
      </form>
    </div>
    </div>
    
  );
};

export default NewPost;
