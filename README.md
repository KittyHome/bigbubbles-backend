# BigBubbles Backend

Welcome to the BigBubbles Backend repository! This backend is developed using [Nest.js](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

BigBubbles Backend is the server-side application that powers the BigBubbles platform. It handles authentication, user management, and various other backend services.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 12.x)
- npm (>= 6.x)
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/KittyHome/bigbubbles-backend.git
   cd bigbubbles-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for guidance.

### Running the Application

To start the application, run:

```sh
npm run start:dev
```

### Running Tests

To run tests, use the following command:

```sh
npm run test
```

## API Documentation

Detailed API documentation can be found [here](link-to-api-docs).

## Project Structure

The project structure follows the standard Nest.js framework conventions. Key directories include:

- `src/` - Contains the source code for the application
- `test/` - Contains the test files

## Contributing

Contributions are welcome! Please read our [contributing guidelines](link-to-contributing-guidelines) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
