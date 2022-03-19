const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const cors = require('cors');
const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'HeZv870523',
    database: 'maquinas'
});

connection.connect(function (err) {
    if (err) throw err; 
    console.log('Connected to database');
})

app.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

// Mostrar

app.get('/empresa', function (req, res) {
    const sql = 'SELECT * FROM empresa';
    connection.query(sql, function (err, results) {
        if (err) throw err;  
        if(results.length > 0) {
            res.send(results);
        } else {
            res.send('No hay empresas');
        }
    });
});

app.get('/maquina', function (req, res) {
    const sql = 'SELECT * FROM maquina';
    connection.query(sql, function (err, results) {
        if (err) throw err; 
        if(results.length > 0) {
            res.send(results);
        } else {
            res.send('No hay maquinas');
        }
    });
});

app.get('/funcionario', function (req, res) {
    const sql = 'SELECT * FROM funcionario';
    connection.query(sql, function (err, results) {
        if (err) throw err; 
        if(results.length > 0) {
            res.send(results);
        } else {
            res.send('No hay funcionarios');
        }
    });
});

// Buscar

app.get('/empresa/:id', function (req, res) {
    const { id } = req.params;
    const sql = `SELECT * FROM empresa WHERE idEmpresa = ${id}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;  
        if(result.length > 0) {
            res.send(result);
        } else {
            res.send('No hay empresa');
        }
    });    
});

app.get('/maquina/:id', function (req, res) {
    const { id } = req.params;
    const sql = `SELECT * FROM maquina WHERE idMaquina = ${id}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;  
        if(result.length > 0) {
            res.send(result);
        } else {
            res.send('No hay maquina');
        }
    });    
});

app.get('/funcionario/:id', function (req, res) {
    const { id } = req.params;
    const sql = `SELECT * FROM funcionario WHERE idFuncionario = ${id}`;
    connection.query(sql, function (err, result) {
        if (err) throw err;  
        if(result.length > 0) {
            res.send(result);
        } else {
            res.send('No hay Funcionario');
        }
    });    
});

// Crear

app.post('/empresa', function (req, res) {
    const sql = 'INSERT INTO empresa SET ?';

    const empresaObject = {
        nomEmpresa: req.body.nomEmpresa,
        direccion: req.body.direccion,
    };

    connection.query(sql, empresaObject, function (err, result) {
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }       
    }); 
});

app.post('/maquina', function (req, res) {
    const sql = 'INSERT INTO maquina SET ?';

    const maquinaObject = {
        idEmpresa: req.body.idEmpresa,
        nomMaquina: req.body.nomMaquina,
        ubicacion: req.body.ubicacion,
    };

    connection.query(sql, maquinaObject, function (err, result) {
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }     
    }); 
});

app.post('/funcionario', function (req, res) {
    const sql = 'INSERT INTO funcionario SET ?';

    const funcionarioObject = {
        idMaquina: req.body.idMaquina,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cargo: req.body.cargo,
    };

    connection.query(sql, funcionarioObject, function (err, result) {
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }        
    }); 
});

// Editar

app.put('/empresa/:id', function (req, res) {
    const {id} = req.params;
    const {nomEmpresa, direccion} = req.body;
    const sql = `UPDATE empresa SET nomEmpresa = '${nomEmpresa}', direccion = '${direccion}' WHERE idEmpresa = ${id}`;
    
    connection.query(sql, function (err, result) {
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }       
    });
});

app.put('/maquina/:id', function (req, res) {
    const {id} = req.params;
    const {idEmpresa, nomMaquina, ubicacion} = req.body;
    const sql = `UPDATE maquina SET idEmpresa = ${idEmpresa}, nomMaquina = '${nomMaquina}', ubicacion = '${ubicacion}' WHERE idMaquina = ${id}`;
    
    connection.query(sql, function (err, result) {
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }       
    });
});

app.put('/funcionario/:id', function (req, res) {
    const {id} = req.params;
    const {idMaquina, nombre, apellido, cargo} = req.body;
    const sql = `UPDATE funcionario SET idMaquina = ${idMaquina}, nombre = '${nombre}', apellido = '${apellido}', cargo = '${cargo}' WHERE idFuncionario = ${id}`;
    
    connection.query(sql, function (err, result) {
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }       
    });
});

// Eliminar

app.delete('/empresa/:id', function (req, res){
    const {id} = req.params;
    const sql = `DELETE FROM empresa WHERE idEmpresa = ${id}`;
    connection.query(sql, function (err) {        
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }
    });
});

app.delete('/maquina/:id', function (req, res){
    const {id} = req.params;
    const sql = `DELETE FROM maquina WHERE idMaquina = ${id}`;
    connection.query(sql, function (err) {
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }
    });
});

app.delete('/funcionario/:id', function (req, res){
    const {id} = req.params;
    const sql = `DELETE FROM funcionario WHERE idFuncionario = ${id}`;
    connection.query(sql, function () {
        if(err) {
            res.sendStatus(400);    
        }else{
            res.sendStatus(200);
        }
    });
});
