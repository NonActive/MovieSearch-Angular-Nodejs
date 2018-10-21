const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const express = require('express');

const app = express()


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// const distDir = path.join(__dirname, "../dist");
// app.use(express.static(distDir));


app.use('/api', require('./routes/api-router').routes);
// app.use(function(req, res) {
//     res.sendFile(path.join(__dirname, '../dist', 'index.html'));
// });

// Initialize the app.
app.listen(port, () => {
    console.log("App now running on port", port);
});