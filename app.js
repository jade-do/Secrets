//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const {Schema} = mongoose;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

uri = "mongodb+srv://thanhchaudo522:VKLs6CbXBBlOuIXw@cluster0.x2fbny8.mongodb.net/"
mongoose.connect(uri + "userDB", {useNewUrlParser: true});

const userSchema = new Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password,
    });

    newUser.save()
    .then(() => {
        res.render("secrets")
    })
    .catch((err) => {
        console.log(err);
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
})