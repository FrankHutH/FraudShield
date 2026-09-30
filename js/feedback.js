function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    elemento.className = classe;
    elemento.textContent = texto;

    return elemento;
}


function mostrarResultado(elemento, tipo, titulo, explicacao, detalhe) {
    elemento.textContent = "";
    elemento.className = "resultado resultado-" + tipo;

    elemento.appendChild(criarElemento("strong", "", titulo));
    elemento.appendChild(criarElemento("span", "", explicacao));

    if (detalhe) {
        elemento.appendChild(criarElemento("span", "", detalhe));
    }
}


function destacarResultado(elemento) {
    elemento.focus({ preventScroll: true });
    elemento.scrollIntoView({ block: "nearest" });
}
