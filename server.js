const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const DIRECTORY_PUBLIC = path.join(__dirname, "public");

/**
 * Static directories
 */
app.use(express.static(DIRECTORY_PUBLIC));

/**
 * Routes
 */
app.get("*", (req, res) => {
	// Send the index.html file when visiting any route.
	res.sendFile(path.join(DIRECTORY_PUBLIC, "index.html"));
});

/**
 * Server port
 */
app.listen(port);
