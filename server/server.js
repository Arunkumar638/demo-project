const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const bodyParser = require('body-parser');

const dbURI = 'mongodb://localhost:27017/spl';
const port = process.env.PORT || 8000;
const app = express();
let PORT  = 8000;

// Define database connection 
mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  if (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
  next()
});


// AVOID CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});


// CATCH ALL REQUEST
app.get("*", function (req, res, next) {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  let protocol = req.protocol;
  let host = req.hostname;
  let url = req.originalUrl;
  let port = process.env.PORT || PORT;

  let fullUrl = `${protocol}://${host}:${port}${url}`;
  let responseString = `Full URL is: ${fullUrl}`;
  console.log("SERVER GET URL-1->", responseString, ip,'\n',req.body,'\n',req.query);
  // return res.send(responseString);
  next();
});

app.post("*", function (req, res, next) {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  let protocolp = req.protocol;
  let host = req.hostname;
  let url = req.originalUrl;
  let port = process.env.PORT || PORT;
  let fullUrlp = `${protocolp}://${host}:${port}${url}`;
  let responseStringp = `Full URL is: ${fullUrlp}`;
  console.log("SERVER POST URL-1->", responseStringp, ip,'\n',req.body,'\n',req.query);
  // return res.send(responseString);
  next();
});

app.delete("*", function (req, res, next) {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  let protocol = req.protocol;
  let host = req.hostname;
  let url = req.originalUrl;
  let port = process.env.PORT || PORT;

  let fullUrl = `${protocol}://${host}:${port}${url}`;
  let responseString = `Full URL is: ${fullUrl}`;
  console.log("SERVER DELETE URL-1->", responseString, ip);
  // return res.send(responseString);
  next();
});

// PORT CONFIG
app.use('/', userRoutes);
app.listen(port, () => console.log(`Server up and running on port ${port}`));
