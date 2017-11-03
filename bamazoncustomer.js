const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  start();
});

var start = function() {
  inquirer.prompt({
    name: "welcome",
    type: "list",
    message: "Welcome, would you like to shop with us?",
    choices: ["YES", "NO"]
  }).then(function(answer) {
    if (answer.welcome.toUpperCase() == "YES") {
      ourProducts();
    } else {
      console.log("Ok, Thanks for your time.");
      connection.end();
      return;
    }
  })
};

var ourProducts = function() {
  connection.query('SELECT * FROM products', function(err, res) {
    var table = new Table({
      head: ['Item ID', 'Item Name', 'Department', 'Price', 'quantity'],
      colWidths: [10, 25, 15, 10, 10]
    });
    for (let i of res) {
      table.push([i.id, i.product_name, i.department_name, i.price, i.stock_quantity]);
    }
    console.log(table.toString());
    setTimeout(function() {
      nextAsk();
    }, 1000);
  })
};

var nextAsk = function() {
  inquirer.prompt([{
      name: "productid",
      type: "list",
      message: "Choose the  Item ID of the product you wish to purchase:",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
      name: "productunits",
      type: "input",
      message: "How many units of this product would you like to puchase?",
    }
  ]).then(function(answer) {
    console.log("==============Thank you for your order!=============");
    checkQuantity(answer);
  })
};

var nextAsk = function() {
  inquirer.prompt([{
      name: "productid",
      type: "list",
      message: "Which Item would you like to buy?:",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    {
      name: "productunits",
      type: "input",
      message: "How many?",
    }
  ]).then(function(answer) {
    console.log("==============Thank you=============");
    checkQuantity(answer);
  })
};


var checkQuantity = function(answer) {
  console.log("Checking my stock");
  var query = 'SELECT stock_quantity, price FROM products WHERE id =?';
  var params = answer.productid;

  connection.query(query, params, function(err, res) {
    if (res[0].stock_quantity < answer.productunits) {
      console.log("Im sorry, we dont carry that many in stock. Please return later.");
    } else {

      var total = answer.productunits * res[0].price;
      var newQuantity = res[0].stock_quantity - answer.quantity;

      console.log("Total Cost: $" + total);

      connection.query("UPDATE `products` SET stock_quantity = (stock_quantity - ?) WHERE id = ?;", [answer.productunits, answer.productid], function(err, res) {

        console.log("Your order had been processed at $" + total);
      });

    }
  });


  setTimeout(function() {
    console.log("Thanks for shopping with us.");
  }, 3000);

  connection.end();
};
