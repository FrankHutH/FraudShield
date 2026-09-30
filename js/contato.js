const formulario = document.getElementById("contactForm");
const statusFormulario = document.getElementById("formStatus");
const mensagemPreparada = document.getElementById("mensagemPreparada");
const rotuloPreparada = document.getElementById("rotuloPreparada");
const botaoCopiar = document.getElementById("copiarMensagem");


function mostrarStatus(texto) {
    statusFormulario.hidden = false;
    statusFormulario.textContent = texto;
}


function prepararMensagem(evento) {
    evento.preventDefault();

    if (!formulario.reportValidity()) return;

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !mensagem) {
        mostrarStatus("Preencha seu nome e sua mensagem com algo além de espaços.");
        return;
    }

    mensagemPreparada.value = "Nome: " + nome + "\nE-mail: " + email + "\n\n" + mensagem;

    mensagemPreparada.hidden = false;
    rotuloPreparada.hidden = false;
    botaoCopiar.hidden = false;

    mostrarStatus("Mensagem preparada. Nada foi enviado ou armazenado. Você pode copiar o texto abaixo.");
}


async function copiarMensagem() {
    try {
        await navigator.clipboard.writeText(mensagemPreparada.value);
        mostrarStatus("Mensagem copiada. O formulário não realizou nenhum envio.");
    } catch (erro) {
        mensagemPreparada.focus();
        mensagemPreparada.select();
        mostrarStatus("Selecione e copie o texto acima usando a opção de copiar do seu dispositivo.");
    }
}


formulario.addEventListener("submit", prepararMensagem);
botaoCopiar.addEventListener("click", copiarMensagem);
