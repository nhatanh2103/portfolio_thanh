const express = require("express");
const path = require('path');
const compression = require('compression');
const app = express();
const database = require('./database.js')

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression({ threshold: 1024 }));

const pdfFile=path.join(__dirname,"public/NguyenDucThanhCV.pdf")

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

app.get("/download_cv", (req, res) => {
    console.log("Handling request to download CV...");
        res.download(pdfFile, 'NguyenDucThanhCV.pdf', (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});



app.get(`/sub-projects`, (req, res) => {
    const title = req.query.data;
    const query = 'SELECT * FROM content WHERE title = ?';
    database.get(query, [title], (err, content) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log("Status: Success");
            return res.status(200).render("sub-projects.html", { data: content });
        }
    });
});


const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("Server is running http://localhost:" + port);
});