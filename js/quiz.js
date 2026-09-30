function atualizarJogo(jogo) {
    const concluido = jogoConcluido(jogo);
    const status = concluido ? "concluída ✓" : "não concluída";

    document.getElementById("statusJogo" + jogo).textContent =
        "Fase " + jogo + " — " + status +
        " · " + obterPontos(jogo) + " pontos" +
        " · recorde de rodada: " + obterRecorde(jogo);

    return concluido;
}


function atualizarProgresso() {
    const concluido1 = atualizarJogo(1);
    const concluido2 = atualizarJogo(2);

    const porcentagem = (concluido1 ? 50 : 0) + (concluido2 ? 50 : 0);
    const pontuacaoTotal = obterPontos(1) + obterPontos(2);

    const barra = document.getElementById("barraProgresso");
    barra.value = porcentagem;
    barra.textContent = porcentagem + "%";

    document.getElementById("textoProgresso").textContent = "Progresso: " + porcentagem + "%";
    document.getElementById("pontuacaoTotal").textContent = pontuacaoTotal + " pontos";
}


function zerar() {
    if (!confirm("Zerar o placar dos dois jogos?")) return;

    zerarPontuacao();
    atualizarProgresso();
}


document.getElementById("botaoZerarPontos").addEventListener("click", zerar);

window.addEventListener("pageshow", atualizarProgresso);
window.addEventListener("storage", atualizarProgresso);


atualizarProgresso();
