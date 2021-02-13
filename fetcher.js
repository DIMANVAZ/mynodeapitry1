const button = document.getElementById("getter");
const fetch = require('node-fetch');
const api_key = 'AQVN2Lc0Dc_Ujs9scAhJVVZOs2xjnbvevqj6OFFm';
const { URLSearchParams } = require('url');
const fs = require('fs');
const params = new URLSearchParams();
const names_surnames = require('./names_surnames')
const text = 'Это первый раз, когда у нас получилось'

params.append('text', text);
params.append('voice', 'oksana');
params.append('emotion', 'good');
params.append('lang', 'ru-RU');
params.append('speed', '1.0');
params.append('format', 'oggopus');

button.onclick = function(){
    alert('butt func is alerting')
    console.log('butt function is consoling')

    fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
        method: 'post',
        body: params,
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Api-Key ' + api_key,
        },
    })
        .then(res => {
            console.log(res);
            // return res.json();
            const dest = fs.createWriteStream(`./fio.ogg`);
            res.body.pipe(dest);
        })
        .catch(err => console.error(err));


}