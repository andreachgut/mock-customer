const express = require('express');
const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const customerController = require('./controllers/customer-controller');
const validateCustomer = require('./middlewares/validation');  // Importamos la validación

const app = express();
const dbFilePath = path.join(__dirname, 'db/db.json');
const router = jsonServer.router(dbFilePath);
const middlewares = jsonServer.defaults();

app.use(express.json());
app.use(middlewares);

app.post('/customers', validateCustomer, (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  const customers = db.customers;

  const newId = customerController.getNextId();
  req.body.id = newId;

  customers.push(req.body);

  fs.writeFileSync(dbFilePath, JSON.stringify({ customers }, null, 2));

  return res.status(201).json(req.body);
});

app.put('/customers/:id', validateCustomer, (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  const customers = db.customers;
  const id = parseInt(req.params.id);

  const customerIndex = customers.findIndex(customer => customer.id === id);
  if (customerIndex === -1) {
    return res.status(404).json({ error: 'Cliente no encontrado.' });
  }

  customers[customerIndex] = { ...customers[customerIndex], ...req.body };

  fs.writeFileSync(dbFilePath, JSON.stringify({ customers }, null, 2));

  return res.status(200).json(customers[customerIndex]);
});

app.use(router);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
