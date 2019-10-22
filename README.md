# Real Time Chat
Real Time Chat is a project built using Node, Socket.io, Mongo with Mongoose to simulate a real time chatting application.
Users can signup or login using their gmail accounts, send messages to themselves or other members who are registered in the application;
they can also fetch their messages.

## Requirements
- Mongo
- Node
- Yarn / npm
- Google API client and secret keys

## Installation
- Clone this Repo
- Install requirements using `yarn install`
- Setup the .env file from the .env.sample file
- Start the mongo server using `mongod`
- Start the server using `yarn dev:start`

## Endpoints available
| Endpoints                 | Method  | Description                                         |
|---------------------------|---------|-----------------------------------------------------|
|  /login                   | POST    | redirects to google signin page                     |
|  /google-auth             | GET     | returns server jwt token from returned google code  |
|  /send                    | POST    | sends message                                       |
|  /user/contacts           | GET     | returns a user's contacts                           |
|  /user/contacts/messages  | POST    | returns a user's contact's messages                 |
|  /contacts                | GET     | returns all app contacts                            |

## Front-end Client
[Go To Client Repo](https://github.com/njeri-ngigi/real-time-chat-react)
