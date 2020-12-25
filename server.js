const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")
const multer = require('multer');
var upload = multer();
const app = express();

app.use(cors());

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/fototkp/', express.static(path.join(__dirname, '/public/fototkp')));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true 
}));


const PORT = process.env.PORT || 3000;


require("./app/routes/contact.js")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});