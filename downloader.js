const fetcherHTML = document.getElementById("downloaderHTML");
//let D = new Date();
//const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'];
//let dayTime = `${D.getDate()}_${months[D.getMonth()]} ${D.getHours()} ${D.getMinutes()}`

fetcherHTML.onclick = function(){
    fetch("https://mynodeapitry1.herokuapp.com/download", {
        method: 'GET',
    })
        .then(response => response.blob()) // ?????????????????
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `existing.ogg`; //мы именуем скачиваемый файл в момент скачивания!!!
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();  //afterwards we remove the element again
        });
}