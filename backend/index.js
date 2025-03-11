import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
const posts = [];

app.use(cors()); // Allow React frontend to communicate with backend
app.use(bodyParser.json());

// Get all notes
app.get("/", (req, res) => {
    res.json(posts);
});

// Get a single note for editing
app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((p) => p.post_id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// Create a new note
app.post("/submit", (req, res) => {
    const text = req.body.post_text;
    const post_id = posts.length;
    posts.push({ post_id: post_id, text: text });
    res.json({ message: "Post added successfully" });
});

// Edit an existing note
app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedText = req.body.post_text;
    const postIndex = posts.findIndex((p) => p.post_id === postId);

    if (postIndex !== -1) {
        posts[postIndex].text = updatedText;
        res.json({ message: "Post updated successfully" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

app.delete("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex((p) => p.post_id === postId);

    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.json({ message: "Post deleted successfully" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
