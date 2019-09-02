const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

app.set('view engine', 'ejs') //Setando o EJS
app.set('views', path.join(__dirname, 'views')) // Diretorio que vai ter os Views 
app.use(express.static(path.join(__dirname, 'public'))) //Arquivos CSS

app.get('/', async(req, res) => {
    const cotacao = await apiBCB.getCotacao()
    console.log('cotacao', cotacao)
    res.render('home', {
        cotacao
    })
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    const conversao = convert.convert(cotacao, quantidade)
    if (cotacao && quantidade) {
        res.render('cotacao', {
            error:false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Numeros Inválidos'
        })
    }
})


app.listen(3000, err => {
    if (err) {
        console.log('A Aplicação deu Erro')
    } else {
        console.log('Aplicação Iniciada!')
    }
})