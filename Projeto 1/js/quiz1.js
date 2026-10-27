const listaCartoes = document.getElementById("listaCartoes");
const cartoesGolpe = document.getElementById("cartoesGolpe");
const cartoesSeguro = document.getElementById("cartoesSeguro");

const progresso = document.getElementById("progressoJogo1");
const placar = document.getElementById("placarJogo1");
const resultado = document.getElementById("resultadoJogo1");

const botaoGolpe = document.getElementById("botaoClassificarGolpe");
const botaoSeguro = document.getElementById("botaoClassificarSeguro");
const botaoProxima = document.getElementById("botaoProximaRodada");
const botaoEncerrar = document.getElementById("botaoEncerrarJogo1");

const nomesCategorias = {
    golpe: "Golpe",
    seguro: "Seguro"
};

let rodada = [];
let selecionado = -1;
let numeroRodada = 0;
let acertos = 0;
let respostas = 0;
let pontosSessao = 0;
let pontosRodada = 0;


function sortearMensagem(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}


function atualizarProgresso() {
    const respondidas = rodada.filter(function (situacao) {
        return situacao.respondida;
    }).length;

    progresso.textContent = "Rodada " + numeroRodada + " · " + respondidas + " de " + rodada.length + " situações classificadas";

    return respondidas;
}


function selecionarCartao(indice) {
    if (rodada[indice].respondida) return;

    selecionado = selecionado === indice ? -1 : indice;

    rodada.forEach(function (situacao, posicao) {
        const ativo = posicao === selecionado;

        situacao.cartao.classList.toggle("cartao-selecionado", ativo);
        situacao.botao.setAttribute("aria-pressed", ativo);
    });

    botaoGolpe.disabled = selecionado === -1;
    botaoSeguro.disabled = selecionado === -1;
}


function marcarCartao(situacao, acertou) {
    situacao.cartao.classList.remove("cartao-selecionado");
    situacao.cartao.classList.add(acertou ? "cartao-correto" : "cartao-incorreto");
    situacao.cartao.draggable = false;

    situacao.botao.disabled = true;
    situacao.botao.setAttribute("aria-pressed", "false");

    const feedback = criarElemento("p", "feedback-cartao", "");
    feedback.appendChild(criarElemento("strong", "rotulo-resposta", acertou ? "✓ Você acertou!" : "✕ Você errou"));
    feedback.appendChild(criarElemento("span", "", "Resposta correta: " + nomesCategorias[situacao.respostaCorreta] + "."));

    situacao.cartao.appendChild(feedback);
}


function classificar(categoria) {
    if (selecionado === -1) return;

    const situacao = rodada[selecionado];
    const acertou = situacao.respostaCorreta === categoria;

    situacao.respondida = true;
    respostas++;

    if (acertou) {
        acertos++;
        pontosSessao += PONTOS_POR_ACERTO;
        pontosRodada += PONTOS_POR_ACERTO;
        adicionarPontos(1, PONTOS_POR_ACERTO);
    }

    marcarCartao(situacao, acertou);

    if (categoria === "golpe") {
        cartoesGolpe.appendChild(situacao.cartao);
    } else {
        cartoesSeguro.appendChild(situacao.cartao);
    }

    mostrarResultado(
        resultado,
        acertou ? "correto" : "incorreto",
        acertou ? "✓ Você acertou!" : "✕ Você errou",
        "Você marcou: " + nomesCategorias[categoria] + ". Resposta correta: " + nomesCategorias[situacao.respostaCorreta] + ".",
        sortearMensagem(acertou ? mensagensAcerto : mensagensErro)
    );

    selecionado = -1;
    botaoGolpe.disabled = true;
    botaoSeguro.disabled = true;

    atualizarPlacar(placar, 1, pontosSessao);

    if (atualizarProgresso() === rodada.length) {
        finalizarRodada();
    }

    destacarResultado(resultado);
}


function finalizarRodada() {
    salvarConclusao(1);

    const novoRecorde = registrarRecorde(1, pontosRodada);
    atualizarPlacar(placar, 1, pontosSessao);

    const resumo = "Rodada concluída! Total: " + acertos + " de " + respostas + " acertos. " +
        "Pontos da rodada: " + pontosRodada + (novoRecorde ? " — novo recorde!" : ".");

    resultado.appendChild(criarElemento("span", "resumo-rodada", resumo));

    botaoProxima.hidden = false;
    botaoEncerrar.hidden = false;
}


function criarCartao(situacao, indice) {
    const cartao = criarElemento("li", "cartao-situacao", "");
    const botao = criarElemento("button", "selecionar-cartao", situacao.texto);

    botao.type = "button";
    botao.setAttribute("aria-pressed", "false");

    botao.addEventListener("click", function () {
        selecionarCartao(indice);
    });

    cartao.draggable = true;

    cartao.addEventListener("dragstart", function (evento) {
        selecionado = -1;
        selecionarCartao(indice);
        evento.dataTransfer.setData("text/plain", indice);
    });

    cartao.appendChild(botao);

    situacao.cartao = cartao;
    situacao.botao = botao;

    return cartao;
}


function iniciarRodada() {
    numeroRodada++;
    pontosRodada = 0;
    selecionado = -1;

    rodada = sortearRodada(bancoSituacoes, 4).map(function (item) {
        return { texto: item.texto, respostaCorreta: item.respostaCorreta, respondida: false };
    });

    listaCartoes.textContent = "";
    cartoesGolpe.textContent = "";
    cartoesSeguro.textContent = "";

    resultado.textContent = "";
    resultado.className = "resultado";

    botaoGolpe.disabled = true;
    botaoSeguro.disabled = true;
    botaoProxima.hidden = true;
    botaoEncerrar.hidden = true;

    rodada.forEach(function (situacao, indice) {
        listaCartoes.appendChild(criarCartao(situacao, indice));
    });

    atualizarProgresso();
    atualizarPlacar(placar, 1, pontosSessao);
}


function encerrarJogo() {
    botaoProxima.hidden = true;
    botaoEncerrar.hidden = true;

    mostrarResultado(
        resultado,
        "resumo",
        "Fim de jogo",
        "Você acertou " + acertos + " de " + respostas + " situações e fez " + pontosSessao + " pontos.",
        "Que tal tentar a Fase 2?"
    );

    destacarResultado(resultado);
}


function permitirSoltar(evento) {
    evento.preventDefault();
}


document.getElementById("areaGolpe").addEventListener("dragover", permitirSoltar);
document.getElementById("areaSeguro").addEventListener("dragover", permitirSoltar);

document.getElementById("areaGolpe").addEventListener("drop", function (evento) {
    evento.preventDefault();
    classificar("golpe");
});

document.getElementById("areaSeguro").addEventListener("drop", function (evento) {
    evento.preventDefault();
    classificar("seguro");
});

botaoGolpe.addEventListener("click", function () {
    classificar("golpe");
});

botaoSeguro.addEventListener("click", function () {
    classificar("seguro");
});

botaoProxima.addEventListener("click", function () {
    iniciarRodada();
    document.getElementById("situacoes").focus();
});

botaoEncerrar.addEventListener("click", encerrarJogo);


iniciarRodada();
