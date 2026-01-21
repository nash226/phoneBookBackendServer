const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.tpu09wa.mongodb.net/?appName=Cluster0`

const name = process.argv[3] || ''
const number = process.argv[4] || ''

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!name) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name,
    number,
  })

  person.save().then(result=> {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

