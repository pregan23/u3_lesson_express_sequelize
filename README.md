# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

## Getting started

1. Fork
1. Clone

# Express & Sequelize

```sh
cd express-sequelize-api
npm init -y && npm install --save-dev sequelize-cli
```

Next we will initialize a Sequelize project:

```sh
npx sequelize-cli init
```
> Let's get familiar with all the commands available to us: `npx sequelize-cli --help`

Let's configure our project to work with Postgres:

express-sequelize-api/config/config.json
```js
"development": {
    "database": "products_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false,
    "underscored": true
  }
```

Cool, now create the Postgres database:

```sh
npx sequelize-cli db:create
```

Next we will create a Product model:

```sh
npx sequelize-cli model:generate --name Product --attributes title:string,description:string,price:integer --underscored
```
> Checkout the Sequelize Data Types that are available: https://sequelize.org/master/manual/data-types.html

Now we need to execute our migration which will create the products table in our Postgres database along with the columns:

```sh
npx sequelize-cli db:migrate
```

> If you made a mistake, you can always rollback: `npx sequelize-cli db:migrate:undo`

Now let's create a seed file:

```sh
npx sequelize-cli seed:generate --name products
```

Let's edit the seed file:

```js
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      title: 'Apple AirPods',
      description: "https://www.apple.com/airpods",
      price: 199,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Apple iPhone Pro',
      description: "https://www.apple.com/iphone-11-pro",
      price: 1000,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Apple Watch',
      description: "https://www.apple.com/watch",
      price: 499,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Vespa Primavera',
      description: "https://www.vespa.com/us_EN/vespa-models/primavera.html",
      price: 3000,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'New Balance 574 Core',
      description: "https://www.newbalance.com/pd/574-core/ML574-EG.html",
      price: 84,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Tribe Messenger Bike 004',
      description: "https://tribebicycles.com/collections/messenger-series/products/mess-004-tx",
      price: 675,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Stumptown Hair Bender Coffee',
      description: "https://www.stumptowncoffee.com/products/hair-bender",
      price: 16,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
```

Execute the seed file:

```sh
npx sequelize-cli db:seed:all
```

> Made a mistake? You can always undo: `npx sequelize-cli db:seed:undo`

Drop into psql and query the database for the demo user:

```sh
psql products_development
SELECT * FROM "Products";
```

Create a .gitignore file `touch .gitignore`!

```sh
/node_modules
.DS_Store
```

Cool, enough Sequelize. Now, Express. Let's install Express:

```sh
npm install express --save
```
And now let's create our Express boilerplate:

```sh
touch server.js
```

Add the code:

```js
const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send("This is root!");
});
```

Let's make sure our server works:

```sh
node server.js
open localhost:3000
```

Awesome! Next we want to be able to access our Product model from within the models folder.
Add the following to the top of your server.js file:

```js
const { Product } = require('./models');
```

Let's create the route to show all products:

```js
app.get('/products', async (req, res) => {
    const products = await Product.findAll()
    res.json(products)
})
```

Restart the server and test the route:

```sh
node server.js
open localhost:3000/products
```

Now I would like to see a specific product.
Let's say you type http://localhost:3000/products/2 then our API should respond with the product where id equals 2. Express let's us do this via the `req.params` object:

```js
app.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const product = await Product.findById(id)
  res.json(product)
})
```

What if the product does not exist in the database? We would get an ugly error message. We can handle this by using a try/catch block:

```js
app.get('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const product = await Product.findById(id)
        if (!product) throw Error('Product not found')
        res.json(product)
    } catch (e) {
        console.log(e)
        res.send('Product not found!')
    }
})
```

Does it work? Restart the server and test the route.

```sh
node server.js
open http://localhost:3000/products/2
```

Success!

![](http://www.winsold.com/sites/all/modules/winsold/images/checkmark.svg)
