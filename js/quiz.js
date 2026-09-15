var statusJogo1 = document.getElementById("statusJogo1");
var statusJogo2 = document.getElementById("statusJogo2");
var barraProgresso = document.getElementById("barraProgresso");
var textoProgresso = document.getElementById("textoProgresso");

var jogo1Concluido = localStorage.getItem("quiz1Concluido");
var jogo2Concluido = localStorage.getItem("quiz2Concluido");

var totalJogosConcluidos = 0;

if (jogo1Concluido === "sim") {
    statusJogo1.textContent = "Jogo 1 — Concluído";
    totalJogosConcluidos = totalJogosConcluidos + 1;
}
else {
    statusJogo1.textContent = "Jogo 1 — Não concluído";
}

if (jogo2Concluido === "sim") {
    statusJogo2.textContent = "Jogo 2 — Concluído";
    totalJogosConcluidos = totalJogosConcluidos + 1;
}
else {
    statusJogo2.textContent = "Jogo 2 — Não concluído";
}

var totalDeJogos = 2;
var porcentagemProgresso = (totalJogosConcluidos / totalDeJogos) * 100;

barraProgresso.value = porcentagemProgresso;
textoProgresso.textContent = "Progresso: " + porcentagemProgresso + "%";
