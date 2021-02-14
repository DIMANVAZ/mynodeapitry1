const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const api_key = 'AQVN2Lc0Dc_Ujs9scAhJVVZOs2xjnbvevqj6OFFm';
const { URLSearchParams } = require('url');
const fs = require('fs');
const params = new URLSearchParams();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'];
let D = new Date();
let dayTime = `${D.getDate()}_${months[D.getMonth()]} ${D.getHours()}_${D.getMinutes()}_${D.getSeconds()}`
const text = 'Это первый раз, когда у нас получилось'

params.append('text', text);
params.append('voice', 'oksana');
params.append('emotion', 'good');
params.append('lang', 'ru-RU');
params.append('speed', '1.0');
params.append('format', 'oggopus');
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
        //alert('directFetchAlerting') //убрать - вызывает ошибки
        //res.send('res.send is executed') //работает на хероку
        console.log('direct Fetch consoling') //не работает на хероку

  //-------------------пробуем впендюрить апи яндекса----------------------------------------
        fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
            method: 'post',
            body: params,
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Api-Key ' + api_key,
            },
        })
            .then(resp => {
                //console.log(res);
                // return res.json();
                const dest = fs.createWriteStream(`./${dayTime}.ogg`);

                resp.body.pipe(dest);

                let ar = []
                fs.readdirSync(__dirname).forEach(file => {
                    ar.push(file);
                })

                res.send(ar) // получили список файлов в папке

            })
            .catch(err => console.error(err));
         //----------------------конец апи яндекса----------------------------------------

        /* //--------пробуем проверить на jsonplaceholder-----> работает и отрисовывает полученные данные
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => response.json())
            .then((json) =>
                //console.log(json)
                //res.send(JSON.stringify(json))
                res.send(json)
            );
        */ //-------------------------конец jsonplaceholder------------------------

    });

    app.get('/download', function(req, res) {
        res.download(path.join(__dirname,'fio.ogg'))
    })

    app.listen(port);

