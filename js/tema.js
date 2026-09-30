const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
let tema = localStorage.getItem("tema") || (sistemaEscuro ? "escuro" : "claro");

document.documentElement.dataset.tema = tema;


function atualizarBotaoTema(botao) {
    botao.textContent = tema === "escuro" ? "☀ Claro" : "☾ Escuro";
    botao.setAttribute("aria-pressed", tema === "escuro");
}


function alternarTema() {
    tema = tema === "escuro" ? "claro" : "escuro";

    document.documentElement.dataset.tema = tema;
    localStorage.setItem("tema", tema);

    atualizarBotaoTema(this);
}


document.addEventListener("DOMContentLoaded", function () {
    const botao = document.getElementById("alternarTema");

    atualizarBotaoTema(botao);
    botao.addEventListener("click", alternarTema);
});
