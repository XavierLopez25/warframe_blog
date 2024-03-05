# Warframe Blog API

This project provides a RESTful API for a blog dedicated to the game Warframe. It allows users to create, read, update, and delete blog posts related to Warframe builds, strategies, and news.

## Features

- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on blog posts.
- **Docker Support**: Includes Docker configuration for easy setup and deployment.
- **Swagger Documentation**: API documented with Swagger for easy reference and testing.

## Getting Started

### Prerequisites

- Node.js
- MySQL
- Docker (optional)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/XavierLopez25/warframe_blog.git
    ```

2. Install the dependencies:

    ```bash
    cd warframe_blog
    npm install
    ```

3. Set up the MySQL database:

    - Run MySQL on your local machine or use Docker to create an image and run the database instance with mysql2 and configure your database connection details.
    - Execute the `schema.sql` script to create the necessary database and tables.

4. Configure your database connection details in `src/conn.js`.

5. Start the application:

    ```bash
    npm start
    ```

## Usage

Refer to the Swagger documentation available at `/api-docs` endpoint for detailed API usage information.

## Contributing

Contributions are welcome! Feel free to open pull requests or issues to suggest improvements or add new features.

