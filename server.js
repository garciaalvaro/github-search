const express = require("express");
const path = require("path");

const server = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const DIRECTORY_PUBLIC = path.join(__dirname, "public");

/**
 * Static directories
 */
server.use(express.static(DIRECTORY_PUBLIC));

/**
 * Routes
 */
server.get("*", (req, res) => {
	// Send the index.html file when visiting any route.
	res.sendFile(path.join(DIRECTORY_PUBLIC, "index.html"));
});

/**
 * Server port
 */
server.listen(port);
