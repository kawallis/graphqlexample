const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const mongoose = require('mongoose')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

const PORT = 4000

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({schema, context: { Cat }}))

app.listen(PORT)