const express = require('express')
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 4000;
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://keerthibirudu2003:gvISlr6i6UPwMhkz@todoapp.s3y7hoq.mongodb.net/")
    .then(() => console.log("connect to MangoDB"))
    .catch(err => console.error("MongoDB connection error:", err))
const trySchema = new mongoose.Schema({ name: String })
const Item = mongoose.model("Task", trySchema);
const todo = new Item({ name: "ayan" });
//todo.save();
app.get('/', (_, res) => {
    Item.find({})
        .then(foundItems => {
            res.render("list", { ejes: foundItems })

        })
        .catch(err => {
            console.log(err);
            res.status(500).send("something went wrong")
        });
});
app.post("/", function (req, res) {
    const ItemName = req.body.ele1;
    const todo = new Item({ name: ItemName });
    todo.save();
    res.redirect("/");
});
app.post("/delete", async (req, res) => {
    const checked = req.body.checkbox1;
    try {
        await Item.findByIdAndDelete(checked);
        console.log("delete Item with Id:", checked);
        res.redirect("/");
    }
    catch (err) {
        console.err("error deleting Item:", err);
        res.status(500).send("Error deleting item")
    }
});

app.listen(port, () => {
    console.log(`server started on port http://localhost:${port}`);
});
