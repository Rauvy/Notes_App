import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotesList from "./components/NotesList";
import NewNote from "./components/NewNote";
import EditNote from "./components/EditNote";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </Router>
  );
}

export default App;
