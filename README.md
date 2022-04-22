# Node API Boilerplate

This boilerplate has been created to allow us to rapidly deploy API software.

A JWT Access and Refresh Token system and User Role Access has been implemented.

## Installation

Run `NPM Install` to install dependencies.

## DOTENV
Add a `.env` file to the project. This file will store sensitive information critical to the running of the application.

The following variables will be required:

`DB_CONNECT` - The URL to your Mongo DB.  
`TOKEN_SECRET` - A URL string for your Token Secret.  
`TOKEN_SECRET_EXPIRY` - A URL string for your expiry date. E.g "2d".  
`REFRESH_TOKEN_SECRET` - A URL string for your Refresh Token Secret.  
`API_URL` - A URL string from which your API routes will be accessed. E.g. "/api".  
`PROTECTED_API_URL` - A URL string from which your protected API routes will be accessed. E.g. "/api/protected"

## Start
Running `npm start` will run the server on `localhost:3000`.

# Routes
There are two main routes available:

## Public
These are routes available to anyone via an API request. They do not require an Access Token in order to get, put, delete or edit data at API endpoints.  

If required, it is possible to verify user roles via middleware by adding `verifyRoles()` function before the controller.

## Private
These are protected routes available to anyone with an Access Token. They require an Access Token in order to get, put, delete or edit data at API endpoints.  

If required, it is possible to verify user roles via middleware by adding `verifyRoles()` function before the controller.
