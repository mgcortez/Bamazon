
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  displayTable();
});

var displayTable = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    console.log("ItemID\nProduct Name\nDepartment Name\nPrice\n# In Stock");
    console.log("--------------------------------------------------------");
    
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id);
      console.log(res[i].product_name);
      console.log(res[i].department_name);
      console.log(res[i].price);
      console.log(res[i].stock_quantity);
    }
    console.log("--------------------------------------------------------");
   
    customerSearch(res);
  });
};

var customerSearch = function(res) {

  inquirer.prompt([{
    type: "input",
    name: "choice",
    message: "What would you like to buy?"
  }]).then(function(val) {
    
    var correct = false;
    for (var i = 0; i < res.length; i++) {
      if (res[i].product_name === val.choice) {
        correct = true;
        var product = val.choice;
        var id = i;

        inquirer.prompt([{
          type: "input",
          name: "buy",
          message: "How many would you like to buy?"
        }]).then(function(val) {
          if ((res[id].stock_quantity - val.buy) > 0) {
            connection.query(
              "UPDATE products SET stock_quantity='" + (res[id].stock_quantity - val.buy) +
              "' WHERE product_name='" + product + "'",
              function(err, res2) {
                if (err) {
                  throw err;
                }
        
                console.log("Purchase Confirmed!");
                displayTable();
              });
          }
          else {
            console.log("Not Enough in Stock!");
            customerSearch(res);
          }
        });
      }
      
    }
    if (i === res.length && correct === false) {
      console.log("Not Available at the Moment");
      customerSearch(res);
    }
  });
};