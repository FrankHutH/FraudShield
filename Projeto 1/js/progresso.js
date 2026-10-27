const PONTOS_POR_ACERTO = 10;


function lerNumero(chave) {
    return Number(localStorage.getItem(chave)) || 0;
}

function obterPontos(jogo) {
    return lerNumero("quiz" + jogo + "Pontos");
}

function obterRecorde(jogo) {
    return lerNumero("quiz" + jogo + "Recorde");
}


function jogoConcluido(jogo) {
    return localStorage.getItem("quiz" + jogo + "Concluido") === "sim";
}

function salvarConclusao(jogo) {
    localStorage.setItem("quiz" + jogo + "Concluido", "sim");
}


function adicionarPontos(jogo, pontos) {
    localStorage.setItem("quiz" + jogo + "Pontos", obterPontos(jogo) + pontos);
}

function registrarRecorde(jogo, pontosRodada) {
    if (pontosRodada <= obterRecorde(jogo)) return false;

    localStorage.setItem("quiz" + jogo + "Recorde", pontosRodada);
    return true;
}

function zerarPontuacao() {
    for (let jogo = 1; jogo <= 2; jogo++) {
        localStorage.removeItem("quiz" + jogo + "Pontos");
        localStorage.removeItem("quiz" + jogo + "Recorde");
    }
}


function atualizarPlacar(elemento, jogo, pontosSessao) {
    elemento.textContent =
        "Pontos nesta sessão: " + pontosSessao +
        " · Total acumulado: " + obterPontos(jogo) +
        " · Recorde de rodada: " + obterRecorde(jogo);
}


function sortearRodada(banco, quantidade) {
    const embaralhado = banco.slice().sort(function () {
        return Math.random() - 0.5;
    });

    return embaralhado.slice(0, quantidade);
}
