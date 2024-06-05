const API = 'e58bfd93a525a2df533b979eb459293d'

function  exibirDados(dados){
    //pegando os elementos que vão recieber info
    document.querySelector(".cidade").innerHTML = 'Tempo em ' + dados.name
    document.querySelector(".tempo").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
}

//consumindo dados e outro site via API
async function buscarCidade(cidade) {
    //AWAIT, ASYNC E FETCH são ferrramnetas que usamos para conectar servidores ao nosso projeto
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API}&lang=pt_br&units=metric`).then(resposta => resposta.json())

    exibirDados(dados);
}

//função para reconhecer o click no botão
function clickButton() {
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}