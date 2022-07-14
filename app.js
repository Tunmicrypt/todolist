const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();
const items = ["Buy Food", "Exercise", "Read a book"];
let workItems = [];


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {


  let day = date.getDate();
  res.render("List", {
    listTitle: day,
    newListItems: items
  });
})


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })

})

app.post("/", function(req, res) {
  let item = req.body.newItem
  console.log(item);
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})


  app.get("/about", function(req,res){
    res.render("about");
  })
app.listen(process.env.PORT || 3000, function() {
  console.log("server started at port 3000");
})
