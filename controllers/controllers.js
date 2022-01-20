const { NULL } = require("mysql/lib/protocol/constants/types");
const Inventory = require("../models/model.js");

// Create and Save a new item
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Request body is empty!"
      });
    }
  
    // Create a Inventory
    const inventoryItem = new Inventory({
      itemname: req.body.itemname,
      description: req.body.description,
      price: req.body.price,
      count: req.body.count,
      image_src: req.body.src || null      
    });

    console.log(inventoryItem.image_src);
  
    // Save Inventory in the database
    Inventory.create(inventoryItem, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "An error occured while creating an inventory item."
        });
      else res.send(data);
    });
};

// Retrieve all inventory items from the database (with condition).
exports.findAll = (req, res) => {
    const itemname = req.query.itemname;
  
    Inventory.getAll(itemname, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "An error occured while retrieving inventory item."
        });
      else res.send(data);
    });
};

// Retrieve inventory items and filter by those who contain the inputted string in the description.
exports.filterResults = (req, res) => {
    let filterBy;
    let type;
    if (req.query.description) {
        filterBy=req.query.description; 
        type="description";
    }
    if (req.query.name) {
        filterBy=req.query.name; 
        type="name";
    }
    if (req.query.count) {
        filterBy=req.query.count; 
        type="count";
    } 
    if (req.query.price) {        
        filterBy=req.query.price; 
        type="price";
    }       
    Inventory.filterBy(filterBy,type, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "An error occured while retrieving inventory item."
        });
      else res.send(data);
    });
};

// Find a single Inventory with a id
exports.findOne = (req, res) => {
    Inventory.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Could not find item with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving item with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a Inventory identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Request body cannot be empty!"
      });
    }
  
    console.log(req.body);
  
    Inventory.updateById(
      req.params.id,
      new Inventory(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Did not find item with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating item with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Inventory with the specified id in the request
exports.delete = (req, res) => {
    Inventory.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Did not find item with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete item with id " + req.params.id
          });
        }
      } else res.send({ message: `Item was deleted successfully!` });
    });
};

