const fs = require('fs');
const path = require('path');
const dbFilePath = path.join(__dirname, '../db/db.json');

const getNextId = () => {
  const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  const customers = db.customers || [];

  if (customers.length === 0) {
    return 1; // Si no hay clientes, empezamos en 1
  }

  const lastId = Math.max(...customers.map(customer => customer.id || 0));
  return lastId + 1;
};

const saveCustomer = (customers, customer) => {
  customers.push(customer);
  fs.writeFileSync(dbFilePath, JSON.stringify({ customers }, null, 2));
};

module.exports = {
  getNextId,
  saveCustomer
};
