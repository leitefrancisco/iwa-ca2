const   http = require("http"),
        logger = require("morgan"),
        express = require("express"),
        mongoose = require("mongoose"),
        dotenv = require("dotenv");

let app = express();
let port = process.env.PORT || 8000;

dotenv.config();

app.use(express.json());
app.use(logger("tiny"));
app.use(require('./routes'));

mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log('connected to db'))
        .catch((err) => console.log(err));

app.listen(port, function(err){
    console.log("Listening on port: " + port)
});