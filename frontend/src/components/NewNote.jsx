import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewNote = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://notes-app-oarj.onrender.com/submit", { post_text: text }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-5">Add a New Note</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Write your note..."
            rows="5"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg shadow-md hover:bg-yellow-300 transition mt-4"
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewNote;
