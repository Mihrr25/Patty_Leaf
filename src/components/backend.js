import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cloudinary from "cloudinary"
dotenv.config();
cloudinary.v2.config({
    api_key: process.env.myApiKey,
    cloud_name: process.env.myCloudName,
    api_secret: process.env.myApiSecret
})
let app = express();
app.use(cors());
app.use(express.json({
    limit: "25mb"
}));
app.use(express.urlencoded({
    limit: "25mb"
}));
async function connectToMongo() {
    await mongoose.connect(process.env.mylink, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};
const menuSchema = new mongoose.Schema({
    heading: String,
    variety: [{
        name: String,
        image: String,
        description: String,
        veg: Number,
        available: Number,
        myId: Number
    }]
})
const userSch = new mongoose.Schema({
    username: String,
    password: String,
    order: [Object],
    cart: [Object]
})
const orderSch = new mongoose.Schema({
    cartItem: [Object],
    totalAmount: Number,
    totalquantity: Number,
    status: String,
    transactionId: String,
    transactionImage: String,
    orderId: Number,
    orderDate: String
})
const feedbackSch = new mongoose.Schema({
    feedDate: String,
    name: String,
    email: String,
    text: String,
    rating: Number,
    image: String
})
const contactSch = new mongoose.Schema({
    contactDate: String,
    name: String,
    email: String,
    text: String,
    phone:String
})
const newOrder = mongoose.model("order", orderSch)
const contact = mongoose.model("contact", contactSch)
const feedback = mongoose.model("feedback", feedbackSch)
const Menu = mongoose.model("menu", menuSchema);
const User = mongoose.model("user", userSch);
app.get("/menu", async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus); // Send response back to the client
    } catch (error) {
        console.error("Error fetching menu:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/api/fetchuser", async (req, res) => {
    try {
        const ans = await User.findOne({ username: req.body.username })
        res.send(JSON.stringify(ans));
    } catch (error) {
        console.error("Error fetching menu:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.put('/api/createuser', async (req, res) => {
    let demo = new User({
        username: req.body.username,
        password: req.body.newpas,
        order: [],
        cart: []
    })
    await demo.save();
    let obj = await User.findOne({ username: req.body.username });
    res.send(JSON.stringify(obj));

})
app.put('/api/updateUser', async (req, res) => {
    let obj = await User.findOne({ username: req.body.currentUser.username });
    obj.cart = req.body.currentUser.cart;
    obj.order = req.body.currentUser.orders;
    await obj.save();
    res.sendStatus(200)
})
app.post("/api/imgupload", async (req, res) => {
    try {
        const resu = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "PattyLeafFolder/paymentScreenShots"
        });
        let ur = resu.secure_url;
        res.send(JSON.stringify({ url: ur }))
    }
    catch (error) {
        console.log(error);
    }
})
app.post("/api/order", async (req, res) => {
    try {
        // console.log(req.body);
        let myarr = await newOrder.find();
        let myobj = req.body;
        myobj.orderId = (myarr.length + 1000);
        let demo = new newOrder(myobj);
        await demo.save();
        let obj = await newOrder.find({ orderId: myobj.orderId });
        // console.log(obj[0]);
        res.send(JSON.stringify(obj[0]));
    }
    catch (error) {
        console.log(error);
    }
})
app.post("/api/feedback", async (req, res) => {
    try {
        console.log(req.body);
        let myObj = req.body;
        const resu = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "PattyLeafFolder/feedback"
        });
        let ur = resu.secure_url;
        myObj.image = ur;
        let demo = new feedback(myObj);
        await demo.save();
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }

})
app.post("/api/contact", async (req, res) => {
    try {
        let demo = new contact(req.body);
        await demo.save();
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }

})

app.listen(5000, async () => {
    console.log("server");
    await connectToMongo()
    console.log("connected");

})