const elementoMensagem = document.getElementById("mensagemJogo");

const progresso = document.getElementById("progressoJogo2");
const placar = document.getElementById("placarJogo2");
const resultado = document.getElementById("resultadoJogo2");

const botaoVerificar = document.getElementById("botaoVerificarJogo2");
const botaoProxima = document.getElementById("botaoProximaMensagem");
const botaoRodada = document.getElementById("botaoProximaRodadaJogo2");
const botaoEncerrar = document.getElementById("botaoEncerrarJogo2");

let rodada = [];
let posicao = 0;
let numeroRodada = 0;
let verificada = false;
let totalEncontrados = 0;
let totalSinais = 0;
let totalIncorretos = 0;
let pontosSessao = 0;
let pontosRodada = 0;


function normalizar(palavra) {
    return palavra.toLocaleLowerCase("pt-BR").replace(/[.,!?;:]/g, "");
}


function criarPalavra(palavra) {
    const botao = criarElemento("button", "palavra-mensagem", palavra);

    botao.type = "button";
    botao.setAttribute("aria-pressed", "false");

    botao.addEventListener("click", function () {
        if (verificada) return;

        const ativa = botao.classList.toggle("palavra-selecionada");
        botao.setAttribute("aria-pressed", ativa);
    });

    return botao;
}


function carregarMensagem() {
    verificada = false;

    elementoMensagem.textContent = "";
    resultado.textContent = "";
    resultado.className = "resultado";

    botaoVerificar.disabled = false;
    botaoProxima.disabled = true;

    progresso.textContent = "Rodada " + numeroRodada + " · Mensagem " + (posicao + 1) + " de " + rodada.length;

    rodada[posicao].texto.split(" ").forEach(function (palavra) {
        elementoMensagem.appendChild(criarPalavra(palavra));
        elementoMensagem.appendChild(document.createTextNode(" "));
    });
}


function marcarPalavra(botao, classe, simbolo, descricao) {
    botao.classList.add(classe);
    botao.textContent = simbolo + " " + botao.textContent;
    botao.setAttribute("aria-label", botao.textContent + ": " + descricao);
}


function verificar() {
    if (verificada) return;

    verificada = true;
    botaoVerificar.disabled = true;

    const sinais = rodada[posicao].sinaisSuspeitos.map(normalizar);
    let encontrados = 0;
    let incorretos = 0;

    elementoMensagem.querySelectorAll("button").forEach(function (botao) {
        const suspeita = sinais.includes(normalizar(botao.textContent));
        const selecionada = botao.getAttribute("aria-pressed") === "true";

        botao.disabled = true;
        botao.classList.remove("palavra-selecionada");

        if (suspeita && selecionada) {
            encontrados++;
            marcarPalavra(botao, "palavra-correta", "✓", "sinal encontrado corretamente");
        } else if (selecionada) {
            incorretos++;
            marcarPalavra(botao, "palavra-incorreta", "✕", "seleção incorreta");
        } else if (suspeita) {
            marcarPalavra(botao, "palavra-perdida", "!", "sinal que faltou selecionar");
        }
    });

    const possiveis = sinais.length;
    const acertouTudo = encontrados === possiveis && incorretos === 0;

    totalEncontrados += encontrados;
    totalSinais += possiveis;
    totalIncorretos += incorretos;

    if (acertouTudo) {
        pontosSessao += PONTOS_POR_ACERTO;
        pontosRodada += PONTOS_POR_ACERTO;
        adicionarPontos(2, PONTOS_POR_ACERTO);
    }

    atualizarPlacar(placar, 2, pontosSessao);

    mostrarResultado(
        resultado,
        acertouTudo ? "correto" : "incorreto",
        acertouTudo ? "✓ Você acertou!" : "✕ Sua resposta precisa de correção",
        possiveis === 0
            ? "Esta mensagem não apresenta os sinais de alerta do exercício."
            : "Você encontrou " + encontrados + " de " + possiveis + " sinais de alerta.",
        "Seleções incorretas: " + incorretos + ". Sinais que faltaram: " + (possiveis - encontrados) + "."
    );

    if (posicao === rodada.length - 1) {
        finalizarRodada();
    } else {
        botaoProxima.disabled = false;
    }

    destacarResultado(resultado);
}


function finalizarRodada() {
    salvarConclusao(2);

    const novoRecorde = registrarRecorde(2, pontosRodada);
    atualizarPlacar(placar, 2, pontosSessao);

    const resumo = "Rodada concluída! Total: " + totalEncontrados + " de " + totalSinais + " sinais encontrados e " +
        totalIncorretos + " seleções incorretas. Pontos da rodada: " + pontosRodada + (novoRecorde ? " — novo recorde!" : ".");

    resultado.appendChild(criarElemento("span", "resumo-rodada", resumo));

    botaoRodada.hidden = false;
    botaoEncerrar.hidden = false;
}


function proximaMensagem() {
    if (!verificada || posicao >= rodada.length - 1) return;

    posicao++;
    carregarMensagem();
    document.getElementById("mensagem-titulo").focus();
}


function iniciarRodada() {
    rodada = sortearRodada(bancoMensagens, 4);
    numeroRodada++;
    posicao = 0;
    pontosRodada = 0;

    botaoRodada.hidden = true;
    botaoEncerrar.hidden = true;

    atualizarPlacar(placar, 2, pontosSessao);
    carregarMensagem();
}


function encerrarJogo() {
    botaoRodada.hidden = true;
    botaoEncerrar.hidden = true;

    mostrarResultado(
        resultado,
        "resumo",
        "Fim de jogo",
        "Você encontrou " + totalEncontrados + " de " + totalSinais + " sinais, com " + totalIncorretos + " seleções incorretas, e fez " + pontosSessao + " pontos.",
        "Continue praticando!"
    );

    destacarResultado(resultado);
}


botaoVerificar.addEventListener("click", verificar);

botaoProxima.addEventListener("click", proximaMensagem);

botaoRodada.addEventListener("click", function () {
    iniciarRodada();
    document.getElementById("mensagem-titulo").focus();
});

botaoEncerrar.addEventListener("click", encerrarJogo);


iniciarRodada();
