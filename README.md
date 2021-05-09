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

## Usage

Run `npm start` or `yarn start` to execute the server. Then open up the [Apollo Server](http://localhost:4000/graphql) in a web browser and run this subscription:

```graphql
subscription HeroCreated {
  heroEvent {
    _id
    name
    enemies
    powers
  }
}
```

And then create a hero in an another tab on the Apollo Server:

```graphql
mutation AddHero {
  addHero(
    body: { name: "Batman", powers: "Night See", enemies: ["Penguin", "Bane"] }
  ) {
    _id
    name
    powers
    enemies
  }
}
```

After run the mutation above, open up subscription tab and you should see the newly added hero.

Also you can delete the hero by running this mutation:

```graphql
mutation DeleteHero {
  deleteHero(id: "id_of_the_hero") {
    _id
    name
    powers
  }
}
```

And you can check exchanges and queues in the AMQP Server. You should see an exchange named **apollo-pubsub** of the topic type.

## Built With

- [Express.js](https://expressjs.com/)
- [Apollo](https://www.apollographql.com/)
- [MongoDB Cloud](https://cloud.mongodb.com/)
- [CloudAMQP](https://www.cloudamqp.com/)

## Authors

- [Arda Örkin](https://github.com/ardaorkin) - _Initial work_
