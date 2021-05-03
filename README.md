# Apollo Server & RabbitMQ

It is a basic project to demonstrate how a message can be published from Apollo Server, using GraphQL PubSub, to a RabbitMQ message broker

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- A running RabbitMQ server.
- A running MongoDB
- NodeJS v14+
- npm v7+ or yarn v1+

### Installing

Clone the repo.
Go under the project directory.

Create an `.env` file and assign AMQP and MongoDB connection informations to relevant variables, like that:

```
AMQP_SERVER="amqp_server_info"
MONGODB_URL="mongodb_info"
```

Then run:

```
npm i
```

or

```
yarn install
```

## Built With

- [Express.js](https://expressjs.com/)
- [Apollo](https://www.apollographql.com/)
- [MongoDB Cloud](https://cloud.mongodb.com/)
- [CloudAMQP](https://www.cloudamqp.com/)

## Authors

- [Arda Örkin](https://github.com/ardaorkin) - _Initial work_
