const express = require('express')
const app = express()
const port = 8080
const mysql = require('mysql2/promise')

async function main() {
    const connection = await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'desafio_docker_node'
    })
    
    createInitialTable()
    
    app.get('/', async (req, res) => {
        await addPeople()
    
        const result = await getAllPeople()
    
        let initialHtml = '<h1>Full Cycle Rocks!</h1>'
    
        for (const people of result) {
            initialHtml += `<p>${people.name}</p>`
        }
    
        res.status(200).send(initialHtml)
    })
    
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
    
    function createInitialTable() {
        const query = `CREATE TABLE IF NOT EXISTS people (
                id INT AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
            );`
    
        connection.query(query)
    }
    
    async function addPeople() {
        const queryCountPeople = 'SELECT COUNT(id) + 1 as count FROM people'
    
        const [countPeopleResult] = await connection.query(queryCountPeople)
    
        const query = `INSERT INTO people(name) VALUES (CONCAT(?, ' ', ?))`
    
        await connection.query(query, ['Pessoa', countPeopleResult[0].count])
    }
    
    async function getAllPeople() {
        const query = 'SELECT * FROM people'
    
        const [result] = await connection.query(query);
    
        return result
    }
}

main()
