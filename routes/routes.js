module.exports = app => {
    const inventory = require("../controllers/controllers.js");
  
    var router = require("express").Router();
  
    // Create a new inventory item
    router.post("/", inventory.create);
  
    // Retrieve all inventory
    router.get("/", inventory.findAll);

    //Retrieve inventory, filter by description
    router.get("/filter/", inventory.filterResults);

    // Retrieve a single inventory item by ID
    router.get("/:id", inventory.findOne);
  
    // Update an Inventory Item by id
    router.put("/:id", inventory.update);
  
    // Delete a Inventory Item by ID
    router.delete("/:id", inventory.delete); 
    
  
    app.use('/api/inventory', router);
  };