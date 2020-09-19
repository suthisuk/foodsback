var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");


// คำสั่งเชื่อม MongoDB Atlas
var mongo_uri = "mongodb+srv://admin:1234@cluster0.jci8r.gcp.mongodb.net/MONGO-TEST?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

// สร้าง express เพื่อทำ path
var app = express();

// ทำให้ดึง uri ไปใช้งานได้
app.use(cors());

// คำสั่งสำหรับแปลงค่า JSON ให้สามารถดึงและส่งค่าไปยัง MongoDB Atlas ได้
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// สร้าง server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("[success] task 1 : listening on port " + port);
});

// ข้อความสำหรับ path หน้าแรกของ express เรา (localhost:5000/)
app.get("/", (req, res) => {
  res.status(200).send("หน้าแรกของ api express");
});

//path สำหรับ MongoDB ของเรา
var Food = require("./foodrouter");
app.use("/api/food", Food);

// ข้อความสำหรับใส่ path ผิด (localhost:5000/asdfghjkl;)
app.use((req, res, next) => {
  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});