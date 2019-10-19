const functions = require('firebase-functions');
const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");

const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// API calls

app.get("/", (req, res) => {
	res.set('Cache-Control', 'public, max-age=18000, s-maxage=86400');
  res.send(`${Date.now()}`);
});


// if (process.env.NODE_ENV === "production") {
// 	// Serve any static files
// 	app.use(express.static(path.join(__dirname, "/build")));

// 	// Handle React routing, return all requests to React app
// 	app.get("*", function(req, res) {
// 		res.sendFile(path.join(__dirname, "/build", "index.html"));
// 	});
// }


exports.app = functions.https.onRequest(app);

// app.listen(port, () => console.log(`Listening on port ${port}`));
