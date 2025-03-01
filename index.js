import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const posts = [];

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts_list: posts
    });
});

app.get("/new", (req, res) => {
    res.render("new_post.ejs");
}); 

app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id); // Parse the ID from the URL
    const post = posts.find(p => p.post_id === postId); // Find the post with matching ID

    if (post) {
        res.render("edit_post.ejs", { post: post }); // Pass the post to the template
    } else {
        res.status(404).send("Post not found");
    }
});


app.post("/submit", (req, res) => {
    const text = req.body["post_text"];
    const post_id = posts.length;
    posts.push({ post_id: post_id, text: text });
    res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedText = req.body["post_text"];
    const postIndex = posts.findIndex(p => p.post_id === postId);

    if (postIndex !== -1) {
        posts[postIndex].text = updatedText;
        res.redirect("/");
    } else {
        res.status(404).send("Post not found");
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});