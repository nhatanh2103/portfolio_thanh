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
    const title = req.query.data;
    const query = 'SELECT * FROM content WHERE title = ?';
    database.get(query, [title], (err, content) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            // Trả về lỗi 500 và thông báo lỗi cụ thể
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log("Status: Success");
            // Trả về dữ liệu thành công
            return res.status(200).render("sub-projects.html", { data: content });
        }
    });
});


const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("Server is running http://localhost:" + port);
});

function loadContent(title, content){
    
}