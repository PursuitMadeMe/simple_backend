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


//Add a GET Route in server.js - This gets all the items from the database.
app.get("/items", async (req, res) => {
    try {
      const result = await db.any("SELECT * FROM items");
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


  //GET Route to Fetch an Item by ID - Retrieve a specific item by its ID.
  app.get("/items/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get the item ID from the URL
  
      const result = await db.oneOrNone("SELECT * FROM items WHERE id = $1", [id]);
  
      if (!result) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      res.json(result);
    } catch (err) {
      console.error("Error fetching item:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  

  //Add a POST Route in server.js - This adds a new item to the database.
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
  
  //Add the UPDATE Route - This route allows users to update an item’s name in the database.
  app.put("/items/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get the item ID from the URL
      const { name } = req.body; // Get the new name from the request body
  
      if (!name) {
        return res.status(400).json({ error: "Missing 'name' field" });
      }
  
      const result = await db.oneOrNone(
        "UPDATE items SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
      );
  
      if (!result) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      res.json({ message: "Item updated successfully", item: result });
    } catch (err) {
      console.error("Error updating item:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  //Add the DELETE Route - This route allows users to delete an item by its ID.
  app.delete("/items/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get the item ID from the URL
  
      const result = await db.oneOrNone("DELETE FROM items WHERE id = $1 RETURNING *", [id]);
  
      if (!result) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      res.json({ message: "Item deleted successfully", deletedItem: result });
    } catch (err) {
      console.error("Error deleting item:", err.message);
      res.status(500).json({ error: "Server error" });
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