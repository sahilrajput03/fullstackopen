const { v1: uuid } = require("uuid");
const { ApolloServer, UserInputError, gql } = require("apollo-server");

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(name: String!, phone: String, street: String!, city: String!): Person
    editNumber(name: String!, phone: String!): Person
  }
`;

const resolvers = {
  // Person: {
  //   street: (root) => "Manhattan",
  //   city: (root) => "New York",
  // },

  //defines how GraphQL queries are responded to.
  // can also be viewed from the graphql playgrounds, DOCS
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons;
      }
      const byPhone = (person) => (args.phone === "YES" ? person.phone : !person.phone);
      return persons.filter(byPhone);
    },
    // allPersons: () => persons,
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
  },
  Person: {
    // So every time a Person object is returned, the fields name, phone and id are returned using their default resolvers, but the field address is formed by using a self defined resolver.
    // The parameter root of the resolver function is the person-object, so the street and the city of the address can be taken from its fields.
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: uuid() };
      // console.log("$person:-", person);
      persons = persons.concat(person);
      return person;
    },
    editNumber: (root, args) => {
      const person = persons.find((p) => p.name === args.name);
      if (!person) {
        return null;
      }

      const updatedPerson = { ...person, phone: args.phone };
      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p));
      return updatedPerson;
    },
  },
};

const server = new ApolloServer({
  typeDefs, // this defines the graphql SCHEMA
  resolvers, //object, which contains the resolvers of the server;; defines how graphQL QUERIES ARE RESPONDED to.
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
