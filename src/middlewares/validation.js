const fs = require('fs');
const path = require('path');
const dbFilePath = path.join(__dirname, '../db/db.json');

const isIdentityDocumentUnique = (identityDocument, id = null) => {
  const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  const customers = db.customers || [];

  return !customers.find(customer => customer.identityDocument === identityDocument && customer.id !== id);
};

const validateCustomer = (req, res, next) => {
  const { identityDocument, documentType, fullName, dateOfBirth } = req.body;
  const id = req.params.id ? parseInt(req.params.id) : null;

  if (!isIdentityDocumentUnique(identityDocument, id)) {
    return res.status(400).json({ error: 'El número de documento ya existe en otro cliente. Debe ser único.' });
  }

  if (typeof req.body.identityDocument === 'string' && /^0\d+/.test(req.body.identityDocument)) {
    return res.status(400).json({ error: 'El número de documento no debe contener ceros a la izquierda.' });
  }

  if (typeof identityDocument !== 'number' || identityDocument <= 0 || identityDocument > 999999999) {
    return res.status(400).json({ error: 'El número de documento debe ser un número entre 1 y 999999999.' });
  }

  const validDocumentTypes = ['NATIONAL_ID', 'PASSPORT'];
  if (!validDocumentTypes.includes(documentType)) {
    return res.status(400).json({ error: 'Document Type debe ser NATIONAL_ID o PASSPORT' });
  }

  const fullNameRegex = /^[A-Za-z\s]+$/;
  if (!fullNameRegex.test(fullName)) {
    return res.status(400).json({ error: 'El nombre completo solo puede contener letras y espacios' });
  }

  const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateOfBirthRegex.test(dateOfBirth)) {
    return res.status(400).json({ error: 'La fecha de nacimiento debe estar en formato YYYY-MM-DD' });
  }

  const minDate = new Date('1900-01-01');
  const maxDate = new Date();
  const birthDate = new Date(dateOfBirth);

  if (birthDate < minDate || birthDate > maxDate) {
    return res.status(400).json({ error: 'La fecha de nacimiento debe estar entre 01/01/1900 y la fecha actual' });
  }

  next();
};

module.exports = validateCustomer;
