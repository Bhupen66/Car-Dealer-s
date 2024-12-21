// src/components/AdminPanel.jsx

import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    albumName: "",
    artist: "",
    producer: "",
    singer: "",
    composer: "",
    mp3File: null,
    imageFile: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("albumName", formData.albumName);
    data.append("artist", formData.artist);
    data.append("producer", formData.producer);
    data.append("singer", formData.singer);
    data.append("composer", formData.composer);
    data.append("mp3File", formData.mp3File);
    data.append("imageFile", formData.imageFile);

    try {
      const response = await axios.post("/api/admin/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-900 text-white">
      <h1 className="text-3xl mb-6 font-bold">Admin Panel - Upload Music</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Album Name */}
        <input
          type="text"
          name="albumName"
          placeholder="Album Name"
          className="w-full p-2 text-black rounded"
          value={formData.albumName}
          onChange={handleInputChange}
          required
        />

        {/* Artist */}
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          className="w-full p-2 text-black rounded"
          value={formData.artist}
          onChange={handleInputChange}
          required
        />

        {/* Producer */}
        <input
          type="text"
          name="producer"
          placeholder="Producer"
          className="w-full p-2 text-black rounded"
          value={formData.producer}
          onChange={handleInputChange}
          required
        />

        {/* Singer */}
        <input
          type="text"
          name="singer"
          placeholder="Singer"
          className="w-full p-2 text-black rounded"
          value={formData.singer}
          onChange={handleInputChange}
          required
        />

        {/* Composer */}
        <input
          type="text"
          name="composer"
          placeholder="Composer"
          className="w-full p-2 text-black rounded"
          value={formData.composer}
          onChange={handleInputChange}
          required
        />

        {/* Upload MP3 File */}
        <input
          type="file"
          name="mp3File"
          accept=".mp3"
          className="w-full p-2 text-white rounded bg-gray-800"
          onChange={handleFileChange}
          required
        />

        {/* Upload Album Image */}
        <input
          type="file"
          name="imageFile"
          accept=".jpg,.jpeg,.png"
          className="w-full p-2 text-white rounded bg-gray-800"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="bg-green-600 px-4 py-2 rounded">
          Upload Music
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
