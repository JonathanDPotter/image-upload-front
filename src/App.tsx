import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    files && setFile(files[0]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (image) {
      try {
        const response = await axios.post("http://localhost:1337/image/", {
          data: image,
        });
        console.log(response);
      } catch (error: any) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
    }
  }, [file]);

  return (
    <div>
      <h1>Image Uploader</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleChange}
          accept="image/jpg, image/jpeg, image/png, image/gif"
        />
        <input type="submit" value="submit" />
      </form>
      {image && <img src={image} height="400px" alt="user submitted" />}
    </div>
  );
};

export default App;
