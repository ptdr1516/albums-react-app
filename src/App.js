import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/index.css";

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ title: "", userId: 1 });
  const [editAlbum, setEditAlbum] = useState({ id: null, title: "" });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setAlbums(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addAlbum = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/albums",
        newAlbum
      );
      setAlbums([...albums, response.data]);
      setNewAlbum({ title: "", userId: 1 });
    } catch (error) {
      console.error(error);
    }
  };

  const updateAlbum = async () => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/albums/${editAlbum.id}`,
        editAlbum
      );
      const updatedAlbums = albums.map((album) =>
        album.id === response.data.id ? response.data : album
      );
      setAlbums(updatedAlbums);
      setEditAlbum({ id: null, title: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
      const filteredAlbums = albums.filter((album) => album.id !== id);
      setAlbums(filteredAlbums);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1 className="heading">Albums</h1>
      <ul className="album-lits">
        {albums.map((album) => (
          <li key={album.id} className="album-item">
            {album.title}{" "}
            <button className="delete-btn" onClick={() => deleteAlbum(album.id)}>Delete</button>{" "}
            <button className="edit-btn" onClick={() => setEditAlbum(album)}>Edit</button>
          </li>
        ))}
      </ul>
      <h2 className="subheading">Add Album</h2>
      <input
        className="add-input"
        type="text"
        value={newAlbum.title}
        onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
      />
      <button className="add-btn" onClick={addAlbum}>Add</button>
      <h2 className="subheading">Edit Album</h2>
      {editAlbum.id && (
        <div>
          <input
            className="edit-input"
            type="text"
            value={editAlbum.title}
            onChange={(e) =>
              setEditAlbum({ ...editAlbum, title: e.target.value })
            }
          />
          <button className="save-btn" onClick={updateAlbum}>Save</button>
          <button className="cancel-btn" onClick={() => setEditAlbum({ id: null, title: "" })}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
