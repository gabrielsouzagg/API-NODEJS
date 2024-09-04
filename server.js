const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3300;

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const docsFilePath = path.join(__dirname, 'data', 'docs.json');

const readJSONFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Erro ao ler o arquivo ${filePath}: ${err.message}`);
        return null;
    }
};

const usersData = readJSONFile(usersFilePath);
const docsData = readJSONFile(docsFilePath);

app.get('/api/users', (req, res) => {
    if (usersData) {
        res.status(200).json(usersData);
    } else {
        res.status(500).send('Erro ao carregar dados dos usuários.');
    }
});

app.get('/api/users/:id', (req, res) => {
    if (usersData) {
        const userId = parseInt(req.params.id, 10); 
        const user = usersData.find(user => user.id === userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } else {
        res.status(500).send('Erro ao carregar dados dos usuários.');
    }
});

app.get('/api/docs', (req, res) => {
    if (docsData) {
        res.status(200).json(docsData);
    } else {
        res.status(500).send('Erro ao carregar dados dos documentos.');
    }
});

app.get('/api/docs/:id', (req, res) => {
    if (docsData) {
        const docId = parseInt(req.params.id, 10); // Converte o id do parâmetro para número
        const doc = docsData.find(doc => doc.id === docId);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).send('Documento não encontrado.');
        }
    } else {
        res.status(500).send('Erro ao carregar dados dos documentos.');
    }
});

app.use((req, res) => {
    res.status(404).send('404 Página não encontrada');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
