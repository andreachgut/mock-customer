
# Mock Customers API

Este proyecto implementa una API mock para la gestión de clientes utilizando **JSON Server** y **Express.js**. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los clientes, garantizando la validación de los datos y la asignación de IDs secuenciales.

## Estructura del Proyecto

```bash
mock-customers/
├── node_modules/          # Dependencias de Node.js
├── src/                   # Código fuente
│   ├── controllers/       # Controladores (lógica de negocio)
│   │   └── customerController.js
│   ├── db/                # Base de datos
│   │   └── db.json        # Archivo JSON que contiene los datos
│   ├── middlewares/       # Middlewares (validaciones)
│   │   └── validation.js
│   └── server.js          # Servidor principal con Express.js y JSON Server
├── package-lock.json      # Archivo de versiones de dependencias
├── package.json           # Dependencias y configuraciones del proyecto
└── README.md              # Documentación del proyecto
```

## Instalación

1. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Ejecución del Mock

Para levantar el servidor y la API, ejecuta el siguiente comando:

```bash
node src/server.js
```

El servidor se ejecutará en `http://localhost:3000`.

## Endpoints

### 1. Crear un cliente

- **URL**: `/customers`
- **Método**: `POST`
- **Descripción**: Crea un nuevo cliente y valida que el `identityDocument` sea único y que los datos estén correctamente formateados.

#### Ejemplo de cuerpo de solicitud:

```json
{
  "identityDocument": 123456789,
  "documentType": "PASSPORT",
  "fullName": "John Doe",
  "dateOfBirth": "1990-01-01"
}
```

### 2. Obtener todos los clientes

- **URL**: `/customers`
- **Método**: `GET`
- **Descripción**: Obtiene la lista completa de clientes.

### 3. Obtener un cliente por ID

- **URL**: `/customers/:id`
- **Método**: `GET`
- **Descripción**: Obtiene un cliente por su ID.

### 4. Actualizar un cliente

- **URL**: `/customers/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los datos de un cliente existente.

### 5. Eliminar un cliente

- **URL**: `/customers/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina un cliente por su ID.

## Validaciones

### 1. `identityDocument` debe ser único
El campo `identityDocument` debe ser un número único entre 0 y 999999999.

### 2. `documentType` debe ser `NATIONAL_ID` o `PASSPORT`
El tipo de documento debe ser uno de los siguientes valores:

- `NATIONAL_ID`
- `PASSPORT`

### 3. `fullName` solo puede contener letras y espacios
El nombre completo debe ser solo letras y espacios.

### 4. `dateOfBirth` debe estar en formato `YYYY-MM-DD`
La fecha de nacimiento debe estar entre el 1 de enero de 1900 y la fecha actual.

## Estructura de Base de Datos

El archivo `db.json` contiene los datos de los clientes en el siguiente formato:

```json
{
  "customers": [
    {
      "id": 1,
      "identityDocument": 123456789,
      "documentType": "PASSPORT",
      "fullName": "John Doe",
      "dateOfBirth": "1990-01-01"
    }
  ]
}
```

