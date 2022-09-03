[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# Jotr Backend

This is the backend for the Jotr Project. The project is an api built with Nodejs
and Express. This is meant to work with the front end Project found [here](https://github.com/mcdavidlubega/jotr-frontend)

## Features

The project is still in early development. However the following features are planned.

- User Registration & Profiles
- Users can create Articles
- Users can comment on articles
- Users can like articles
- Users can rate articles

## Quick Setup

Download or clone the repo and run npm install to install dependencies

```bash
  npm i

```

Create a config folder in the root directory

```bash
  mkdir config

```

Create a create develeopment environment variable file for your develeopment
setup in the config folder.

```bash
  cd config
  touch dev.env

```

You can also create one for your tests.

Add the following environment variabls to your environment files.

`PORT` should be a number e.g 30000

`TOKEN_SECRET` should be a string (used by JWT)

`MONGO_DB` connection to your mongodb

### Note:

When you set up the test environment file, set up a diffrent MONGO_DB variable.
This is because when you run test all data is deleted from the database after the tests complete.

## Available Scripts

Start the server and run the built version of the app.
(build/index.js)

```bash
  npm start
```

Start the server with nodemon.
(src/index.js)

```bash
  npm run dev
```

Lint the code

```bash
  npm run lint
```

Run tests and generate a coverage report

```bash
  npm test
```

Run tests without coverage report. This for use during develeopment. This script runs in verbose mode.

```bash
  npm run dev:test
```

Check whether code meets prettier standards.

```bash
  npm run prettier:check
```

Prettify code with prettier.

```bash
  npm run prettier:write
```

Build the project

```bash
  npm build
```

### Note:

The project uses husky to run a precommit script that lints the code.
You can find and edit the precommit script at

`.husky/pre_commit`

## API Reference

#### Register A User

```http
  POST /api/v1/users/register
```

| Parameter   | Type     | Description                                  |
| :---------- | :------- | :------------------------------------------- |
| `userName`  | `string` | **Required**. Should be unique               |
| `email`     | `string` | **Required**. Your email. Should be unique   |
| `password`  | `string` | **Required**. Required. 8 characters minimum |
| `firstName` | `string` | **Required**. Your first name                |
| `lastName`  | `string` | **Required**. Your last name                 |

#### Login user

```http
  POST /api/v1/auth
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email.   |
| `password` | `string` | **Required**. Your password |

## Author

McDavid Lubega
[@mcdavidlubega](https://www.github.com/mcdavidlubega)
