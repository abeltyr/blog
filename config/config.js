module.exports = {
  "development": {
    "username": "root",
<<<<<<< HEAD
    "password": "ifirstdoz",
=======
    "password": null,
>>>>>>> 1d39c8823fb4795a4f6136485f8b9d8eea885f0f
    "database": "blog",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
<<<<<<< HEAD
    "database": process.env.DB_CONNECTION,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_CONNECTION,
  }
}
=======
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_CONNECTION
  }
}
>>>>>>> 1d39c8823fb4795a4f6136485f8b9d8eea885f0f
