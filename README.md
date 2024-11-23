# RESTful Web Services Template using Express.js and Sequelize

This repository is a template for creating RESTful web services using [Express.js](https://www.npmjs.com/package/express) and [Sequelize](https://www.npmjs.com/package/sequelize). It uses [MySQL](https://www.mysql.com/) for data handling and [joi](https://www.npmjs.com/package/joi) for request validation.

## Features

- **Express.js and Sequelize**: The project is built using Express.js for the web framework and Sequelize as the ORM for database interactions.
- **MySQL Database**: A MySQL database is used to manage the data, facilitated by Docker.
- **API Key Authentication**: All endpoints require an API key for access. API keys are managed within the database, and necessary models are included.
- **JWT User Authentication**: The project implements JSON Web Token (JWT) for user authentication. User data is stored in the database, and JWT protection can be applied on a per-endpoint basis.
- **Record Versioning**: Example tables and models feature automatic versioning of records, with endpoints available to restore previous versions.
- **Soft Delete Support**: Example tables and models support soft deletes, and there are endpoints to "undelete" previously deleted records.

This repository is a GitHub template, meaning you can use it to create new repositories.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.