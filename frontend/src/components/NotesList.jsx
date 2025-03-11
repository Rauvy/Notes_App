import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes
  useEffect(() => {
    axios.get("https://notes-app-oarj.onrender.com/").then((response) => {
      setNotes(response.data);
    });
  }, []);

  // Delete Note Function
  const handleDelete = (postId) => {
    axios.delete(`https://notes-app-oarj.onrender.com/delete/${postId}`).then(() => {
      setNotes(notes.filter((note) => note.post_id !== postId));
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold text-center text-yellow-400">My Notes</h1>

      <div className="flex justify-center my-5">
        <Link to="/new">
          <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg shadow-md hover:bg-yellow-300 transition">
            + Add New Note
          </button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {notes.map((note) => (
          <div
            key={note.post_id}
            className="p-5 bg-gray-800 rounded-lg shadow-md flex justify-between items-center transition transform hover:scale-105"
          >
            <p className="text-lg">{note.text}</p>
            <div className="flex gap-3">
              <Link to={`/edit/${note.post_id}`} className="text-yellow-400 text-sm hover:underline">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(note.post_id)}
                className="text-red-400 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
