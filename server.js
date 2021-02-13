const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const api_key = 'AQVN2Lc0Dc_Ujs9scAhJVVZOs2xjnbvevqj6OFFm';
const { URLSearchParams } = require('url');
const fs = require('fs');
const params = new URLSearchParams();
const text = 'Это первый раз, когда у нас получилось'
const port = process.env.PORT||3333;

    //подключаем статический  index.html:
    app.get('/index', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
    //делаем доступным скрипт, на который ссылается index.html
    // = fetcher.js (лежит в той же папке)
    app.use(express.static(path.join('./')));

    //пробуем выполнять команды скрипта аж при заходе на страницу
    app.get('/directFetch', (req, res) => {
        alert('directFetchAlerting') //убрать
        res.send('res.send is executed')
        console.log('direct Fetch consoling')
    });

    app.listen(port);

