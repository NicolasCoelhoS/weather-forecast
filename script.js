const API_KEY = 'e58bfd93a525a2df533b979eb459293d';

function exibirDados(dados) {
    // Esconde o loading e mostra o resultado
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".resultado").style.display = "block";
    document.querySelector(".erro").style.display = "none";
    
    // Atualiza a interface do usuário
    document.querySelector(".cidade").textContent = `Tempo em ${dados.name}`;
    document.querySelector(".tempo").textContent = `${Math.floor(dados.main.temp)}°C`;
    document.querySelector(".texto-previsao").textContent = dados.weather[0].description;
    document.querySelector(".umidade").textContent = `Umidade: ${dados.main.humidity}%`;
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;
    document.querySelector(".img-previsao").alt = dados.weather[0].description;
}

async function buscarCidade(cidade) {
    try {
        if (!cidade) {
            throw new Error("Por favor, insira o nome de uma cidade");
        }

        // Mostra o loading e esconde resultados anteriores
        document.querySelector(".loading").style.display = "block";
        document.querySelector(".resultado").style.display = "none";
        document.querySelector(".erro").style.display = "none";

        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&lang=pt_br&units=metric`
        );

        if (!resposta.ok) {
            throw new Error("Cidade não encontrada. Verifique o nome e tente novamente.");
        }

        const dados = await resposta.json();
        exibirDados(dados);
    } catch (erro) {
        console.error("Erro:", erro.message);
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".erro").textContent = erro.message;
        document.querySelector(".erro").style.display = "block";
    }
}

function clickButton() {
    const cidade = document.querySelector(".input-cidade").value.trim();
    buscarCidade(cidade);
}

// Adicionando evento de tecla Enter no input
document.querySelector(".input-cidade").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        clickButton();
    }
});