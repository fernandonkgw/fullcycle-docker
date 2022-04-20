const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql')
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafiodb'
}

const con = mysql.createConnection(config)
con.query(`CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id));`)
con.end()

app.get('/', (req, res) => {
    const connection =  mysql.createConnection(config)

    const sql = `insert into people (name) values ('Fernando ${new Date()}')`
    connection.query(sql)
    
    connection.query('select * from people', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            let html = '<h1>Full Cycle Rocks!</h1><br/><table>'
            rows.forEach(row => {
                html += `<tr><td>${row.name}</td></tr>`
            });
            html += '</table></html>'
            res.send(html)
        }
    })
    connection.end()
})



app.listen(port, () => {
    console.log('Rodando na porta..', port)
})