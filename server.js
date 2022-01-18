const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sqlite = require('sqlite3')
const cors=require('cors')


//Creare instanta baza de date sqlite folosind sequelize
const sequelize = new Sequelize({dialect: 'sqlite' ,storage: './aPlus.sqlite'})

//Creare tabela proiecte
const Project = sequelize.define('project', {
    fileLink: {
        type: Sequelize.STRING,
        allowNull: true
    },
    version: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deadline: {
        type: Sequelize.DATE,
        allowNull: false
    },
    final_grade: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    personID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
    {
        timestamps: false
    })

//Creare tabela persoane
const Person = sequelize.define('person', {
    type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['STUDENT', 'TEACHER']
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    group: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    series: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
    {
        timestamps: false
    })
    
//Creare tabela note
const Grade = sequelize.define('grade', {
    projectTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    version: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    grade: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
},
    {
        timestamps: false
    })



const app = express()
app.use(cors())
app.use(bodyParser.json())

//Acest get request va crea tabelele in caz ca nu exista
app.get('/create', async (req, res, next) => {
    try {
        await sequelize.sync({ alter: true })
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

//Acest post request adauga o intrare in tabela persoane
app.post('/person', async (req, res, next) => {
    try {
        await Person.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

//Acest get request returneaza toate persoanele din tabela
app.get('/people', async (req, res, next) => {
    try {
        const people = await Person.findAll()
        res.status(200).json(people)
    } catch (err) {
        next(err)
    }
})

//Toate erorile returneaza acest mesaj cu status code 500
app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
})

//Serverul asculta pe portul 8080
app.listen(8080)