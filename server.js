const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS
const db = require("./db/config"); // Import our database connection

const app = express(); // Create the server

app.use(cors()); // Allow other websites to talk to us
app.use(express.json()); // Allow sending data in JSON format


//Test route to check if the server is running
app.get("/", (req, res) => {
    res.send("Simple Backend is Running");
  });


//Add a GET Route in server.js - 👉 This gets all the items from the database.
app.get("/items", async (req, res) => {
    try {
      const result = await db.any("SELECT * FROM items");
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  //Add a POST Route in server.js - 👉 This adds a new item to the database.
  app.post("/items", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await db.one(
        "INSERT INTO items (name) VALUES ($1) RETURNING *",
        [name]
      );
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


/**
Creates a server using Express.
Allows JSON data to be sent and received.
Starts the server on port 3000.

 */