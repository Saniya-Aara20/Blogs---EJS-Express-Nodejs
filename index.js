const express = require("express");
const app = express();
const port = 8060;

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let blogs = [
    {
        id: uuidv4(),

        title: "First Blog",
        content: "This is my first Blog.. It is fixed and every time u restart the server, this is default, your previous blogs are vanished since no database is used in this project..",
    }
]

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/blogs", (req, res) => {
    res.render("index.ejs", { blogs });
});



app.get("/blogs/new", (req, res) => {
    res.render("new.ejs");
});



app.get("/blogs/:id", (req, res) => {
    let { id } = req.params;
    let blog = blogs.find((b) => id === b.id);
    //res.send("working");
    res.render("show.ejs", { blog });
});

app.post("/blogs", (req, res) => {
    let { title, content } = req.body;
    let id = uuidv4();
    blogs.push({ id, title, content });
    res.redirect("/blogs");
});

app.patch("/blogs/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let blog = blogs.find((b) => id === b.id);
    blog.content = newContent;
    res.redirect("/blogs");
});

app.get("/blogs/:id/edit", (req, res) => {
    let { id } = req.params;
    let blog = blogs.find((b) => id === b.id);
    res.render("edit.ejs", { blog });
});

app.delete("/blogs/:id", (req, res) => {
    let { id } = req.params;
    blogs = blogs.filter((p) => id != p.id);
    res.redirect("/blogs");
})





app.listen(port, () => {
    console.log("Listening on port 8060...");
})