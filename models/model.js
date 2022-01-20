const req = require("express/lib/request");
const sql = require("./db.js");

// constructor
const Inventory = function(inventory) {
  this.itemname = inventory.itemname;
  this.description = inventory.description;
  this.price=inventory.price;
  this.count=inventory.count;
  this.image_src = inventory.image_src;
};

Inventory.create = (newInventory, result) => {
  sql.query("INSERT INTO inventory SET ?", newInventory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created inventory item: ", { id: res.insertId, ...newInventory });
    result(null, { id: res.insertId, ...newInventory });
  });
};

Inventory.findById = (id, result) => {
  sql.query(`SELECT * FROM inventory WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Inventory: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Inventory with the id
    result({ kind: "not_found" }, null);
  });
};

Inventory.getAll = (itemname, result) => {
  let query = "SELECT * FROM inventory";

  if (itemname) {
    query += ` WHERE itemname LIKE '%${itemname}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("inventory: ", res);
    result(null, res);
  });
};

Inventory.filterBy = (filterCriteria, type, result) => {
    console.log(filterCriteria,type,result);
    let query = "SELECT * FROM inventory";
  
    if (type==="description") {
        console.log(type,"HERE");
      query += ` WHERE description LIKE '%${filterCriteria}%'`;
    }
    else if (type==="name"){
      query += ` WHERE itemname LIKE '%${filterCriteria}%'`;  
    }
    else if (type==="count"){
        query += ` WHERE count = ${filterCriteria}`
    }
    else if (type==="price"){
        query += ` WHERE price = ${filterCriteria}`  
    }
    
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(query);
      console.log("inventory: ", res);
      result(null, res);
    });
};

Inventory.updateById = (id, Inventory, result) => {
  sql.query(
    "UPDATE inventory SET itemname = ?, description = ?, image_src = ? WHERE id = ?",
    [Inventory.itemname, Inventory.description, Inventory.image_src, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Inventory with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Inventory: ", { id: id, ...Inventory });
      result(null, { id: id, ...Inventory });
    }
  );
};

Inventory.remove = (id, result) => {
  sql.query("DELETE FROM inventory WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Inventory with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Inventory with id: ", id);
    result(null, res);
  });
};


module.exports = Inventory;