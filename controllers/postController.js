// const posts = require("../data/posts");

//db import
const connection = require("../data/db")

// index
function index(req, res) {
    //sql query
    const sql = 'SELECT * FROM posts';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
};

//show
function show(req, res) {
    // res.send(`Visione del post ${req.params.id}`);
    let post = posts.find((el) => el.id === parseInt(req.params.id));

    //per id inesistenti
    if (!post) {
        res.status(404);
        return res.json({ post: "not found" });
    }

    res.json(post);
};

//create
function create(req, res) {
    // console.log(req.body);
    //id dell'ultimo + 1
    let newId = posts[posts.length - 1].id + 1;

    let newPost = {
        "id": newId,
        "title": req.body.title,
        "content": req.body.content,
        "image": req.body.image,
        "tags": req.body.tags
    };
    // console.log(newPost);

    posts.push(newPost)

    res.status(201)
    res.json(newPost)
    // res.send("Creazione nuovo post");
};

//update
function update(req, res) {
    // res.send(`Modifica del post ${req.params.id}`);
    let post = posts.find((el) => el.id === parseInt(req.params.id));

    //per id inesistenti
    if (!post) {
        res.status(404);
        return res.json({ post: "not found" });
    }

    post.id = post.id,
        post.title = req.body.title,
        post.content = req.body.content,
        post.image = req.body.image,
        post.tags = req.body.tags

    res.json(post)
    // console.log(posts);

};

//destroy
function destroy(req, res) {
    //Recuperiamo l'id dall' URL
    const { id } = req.params;

    //Eliminiamo la pizza dal menu
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete pizza' });
        res.sendStatus(204)
    });
};

//export
module.exports = { index, show, create, update, destroy };