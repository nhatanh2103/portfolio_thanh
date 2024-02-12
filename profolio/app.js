const express = require("express");
const path = require('path');
const compression=require('compression');
const app = express();
const database = require('./config/database')

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression({
    level: 1,
}))

app.get("/", (req, res) => {
    res.render('home.html')
});

app.get("/about", (req, res) => {
    res.render("about.html");
});

app.get("/projects", (req, res) => {
    res.render("projects.html")
});

app.get("/contact", (req, res) => {
    res.render("contact.html")
})

app.get(`/sub-projects`, (req, res) => {
    const jsonData = req.query.data;
    const title = decodeURIComponent(jsonData);
    database.get(`SELECT * FROM content WHERE title=?`, [title], (err, content) => {
        if (err) {
            console.log("Status: Fail");
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log("Status: Success");
            res.status(200).render("sub-projects.html", {data: content});
        }
    });
});

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("Server is running http://localhost:" + port);
});