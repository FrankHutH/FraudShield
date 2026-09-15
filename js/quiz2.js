var mensagens = [
    {
        texto: "URGENTE! Sua conta será bloqueada hoje. Clique neste link para confirmar sua senha.",
        sinaisSuspeitos: ["URGENTE!", "bloqueada", "Clique", "link", "senha"]
    },
    {
        texto: "Você ganhou um prêmio. Informe seus dados bancários para receber agora.",
        sinaisSuspeitos: ["prêmio", "dados", "bancários", "agora"]
    },
    {
        texto: "Parabéns! Você foi sorteado e precisa pagar uma taxa para liberar o valor.",
        sinaisSuspeitos: ["Parabéns!", "sorteado", "pagar", "taxa"]
    },
    {
        texto: "Identificamos uma compra suspeita em seu cartão. Clique aqui para cancelar imediatamente.",
        sinaisSuspeitos: ["suspeita", "Clique", "cancelar", "imediatamente"]
    },
    {
        texto: "Seu boleto está vencido. Pague agora pelo link para evitar o corte do serviço.",
        sinaisSuspeitos: ["vencido", "Pague", "link", "evitar"]
    },
    {
        texto: "Central de atendimento informa pendência em seu CPF. Regularize agora clicando no botão.",
        sinaisSuspeitos: ["pendência", "Regularize", "agora", "clicando"]
    },
    {
        texto: "Recebemos seu pedido de empréstimo. Envie seus dados e a senha do aplicativo para liberar.",
        sinaisSuspeitos: ["empréstimo", "Envie", "dados", "senha", "liberar"]
    },
    {
        texto: "Sua encomenda está retida. Pague uma taxa extra para liberar a entrega hoje.",
        sinaisSuspeitos: ["retida", "Pague", "taxa", "extra"]
    },
    {
        texto: "Seu WhatsApp será bloqueado. Envie o código que você recebeu por SMS agora.",
        sinaisSuspeitos: ["bloqueado", "Envie", "código", "SMS", "agora"]
    },
    {
        texto: "Detectamos acesso não autorizado. Confirme sua senha para proteger sua conta agora.",
        sinaisSuspeitos: ["autorizado", "Confirme", "senha", "agora"]
    },
    {
        texto: "Seu INSS foi suspenso. Atualize seus dados agora para não perder o benefício.",
        sinaisSuspeitos: ["suspenso", "Atualize", "dados", "agora"]
    },
    {
        texto: "Você tem uma multa pendente. Pague com desconto clicando no link a seguir.",
        sinaisSuspeitos: ["multa", "Pague", "clicando", "link"]
    },
    {
        texto: "Sua restituição do imposto de renda está disponível. Clique aqui para receber agora.",
        sinaisSuspeitos: ["restituição", "Clique", "receber", "agora"]
    },
    {
        texto: "Alguém tentou acessar sua conta do banco. Informe o código de segurança recebido.",
        sinaisSuspeitos: ["tentou", "Informe", "código", "segurança"]
    },
    {
        texto: "Promoção imperdível! Pague apenas a taxa de envio e receba o produto grátis.",
        sinaisSuspeitos: ["imperdível!", "Pague", "taxa"]
    },
    {
        texto: "Sua fatura apresenta um valor incorreto. Entre em contato pelo link para corrigir.",
        sinaisSuspeitos: ["incorreto", "link", "corrigir"]
    },
    {
        texto: "Seu cadastro será cancelado. Confirme seus dados agora para continuar usando o aplicativo.",
        sinaisSuspeitos: ["cancelado", "Confirme", "dados", "agora"]
    },
    {
        texto: "Recebemos uma solicitação de troca de senha. Clique para confirmar ou cancelar agora.",
        sinaisSuspeitos: ["Clique", "confirmar", "cancelar", "agora"]
    },
    {
        texto: "Você foi selecionado para um emprego. Envie seus dados bancários para o cadastro.",
        sinaisSuspeitos: ["selecionado", "Envie", "dados", "bancários"]
    },
    {
        texto: "Aviso do banco. Sua conta apresenta movimentação estranha. Confirme sua senha agora.",
        sinaisSuspeitos: ["estranha", "Confirme", "senha", "agora"]
    },
    {
        texto: "Seu serviço de streaming está com pagamento pendente. Atualize o cartão pelo link para continuar.",
        sinaisSuspeitos: ["pendente", "Atualize", "link"]
    },
    {
        texto: "Uma pessoa da sua família precisa de dinheiro urgente. Faça um PIX agora.",
        sinaisSuspeitos: ["urgente", "PIX", "agora"]
    },
    {
        texto: "Seu aplicativo do banco precisa ser atualizado. Baixe pelo link enviado agora.",
        sinaisSuspeitos: ["atualizado", "Baixe", "link", "agora"]
    },
    {
        texto: "Identificamos um problema técnico no seu computador. Permita o acesso remoto agora.",
        sinaisSuspeitos: ["problema", "Permita", "remoto", "agora"]
    },
    {
        texto: "Você recebeu um pix por engano. Devolva o valor para o número informado.",
        sinaisSuspeitos: ["engano", "Devolva", "informado"]
    },
    {
        texto: "Sua conta de luz está atrasada. Pague agora pelo link para evitar o corte.",
        sinaisSuspeitos: ["atrasada", "Pague", "link"]
    },
    {
        texto: "Confirmamos seu cadastro no sorteio. Pague a taxa de liberação para receber o prêmio.",
        sinaisSuspeitos: ["sorteio", "Pague", "taxa", "prêmio"]
    },
    {
        texto: "Seu cartão foi bloqueado por segurança. Informe o número completo para desbloquear agora.",
        sinaisSuspeitos: ["bloqueado", "Informe", "completo", "agora"]
    },
    {
        texto: "Detectamos um vírus no seu celular. Clique aqui para instalar a proteção agora.",
        sinaisSuspeitos: ["vírus", "Clique", "instalar", "agora"]
    },
    {
        texto: "Seu pedido foi cancelado por falta de pagamento. Clique aqui para regularizar agora.",
        sinaisSuspeitos: ["cancelado", "Clique", "regularizar", "agora"]
    },
    {
        texto: "Você foi indicado para um investimento com retorno garantido de cem por cento.",
        sinaisSuspeitos: ["investimento", "retorno", "garantido"]
    },
    {
        texto: "Sua senha expirou. Clique no link para criar uma nova senha imediatamente.",
        sinaisSuspeitos: ["expirou", "Clique", "link", "imediatamente"]
    },
    {
        texto: "Recebemos sua solicitação de saque. Confirme seus dados bancários para liberar o valor.",
        sinaisSuspeitos: ["saque", "Confirme", "dados", "bancários"]
    },
    {
        texto: "Seu número foi sorteado em uma promoção. Acesse o link para resgatar o prêmio.",
        sinaisSuspeitos: ["sorteado", "Acesse", "link", "prêmio"]
    },
    {
        texto: "A operadora informa uma pendência na sua linha. Regularize agora pelo link enviado.",
        sinaisSuspeitos: ["pendência", "Regularize", "agora", "link"]
    },
    {
        texto: "Seu computador foi invadido. Ligue agora para o suporte técnico informado na tela.",
        sinaisSuspeitos: ["invadido", "Ligue", "agora", "suporte"]
    },
    {
        texto: "Identificamos que você não atualizou seus dados. Atualize agora para evitar o bloqueio.",
        sinaisSuspeitos: ["Atualize", "agora", "bloqueio"]
    },
    {
        texto: "Você recebeu uma herança inesperada. Envie uma taxa para liberar a transferência.",
        sinaisSuspeitos: ["herança", "Envie", "taxa", "transferência"]
    },
    {
        texto: "Seu endereço está incorreto na encomenda. Corrija pelo link para não perder o produto.",
        sinaisSuspeitos: ["incorreto", "link", "perder"]
    },
    {
        texto: "A prefeitura informa um débito em atraso. Pague com desconto pelo link exclusivo.",
        sinaisSuspeitos: ["débito", "atraso", "Pague", "link"]
    },
    {
        texto: "Seu plano de saúde foi cancelado. Reative agora informando seus dados completos.",
        sinaisSuspeitos: ["cancelado", "Reative", "dados", "completos"]
    },
    {
        texto: "Detectamos login suspeito na sua conta. Envie o código recebido para confirmar.",
        sinaisSuspeitos: ["suspeito", "Envie", "código"]
    },
    {
        texto: "Você tem uma vaga de emprego confirmada. Pague o kit de uniforme para começar.",
        sinaisSuspeitos: ["confirmada", "Pague", "kit"]
    },
    {
        texto: "Sua declaração de imposto de renda está com pendência. Regularize agora pelo link.",
        sinaisSuspeitos: ["pendência", "Regularize", "agora", "link"]
    },
    {
        texto: "Recebemos um pedido de cancelamento do seu cartão. Cancele o pedido informando a senha.",
        sinaisSuspeitos: ["cancelamento", "Cancele", "informando", "senha"]
    },
    {
        texto: "Olá, seu pedido foi entregue com sucesso. Obrigado por comprar conosco.",
        sinaisSuspeitos: []
    },
    {
        texto: "Lembrete, sua consulta médica está agendada para amanhã às dez horas.",
        sinaisSuspeitos: []
    },
    {
        texto: "Recebemos o pagamento da sua fatura. Obrigado por manter seu cadastro em dia.",
        sinaisSuspeitos: []
    },
    {
        texto: "Seu extrato mensal já está disponível no aplicativo do banco.",
        sinaisSuspeitos: []
    },
    {
        texto: "A reunião de amanhã foi confirmada para as nove horas na sala principal.",
        sinaisSuspeitos: []
    },
    {
        texto: "Seu pacote chegará em três dias úteis conforme o prazo informado na compra.",
        sinaisSuspeitos: []
    },
    {
        texto: "Obrigado por participar da nossa pesquisa de satisfação sobre o atendimento.",
        sinaisSuspeitos: []
    },
    {
        texto: "Seu ponto de fidelidade foi adicionado após a última compra na loja.",
        sinaisSuspeitos: []
    },
    {
        texto: "A escola informa que as aulas retornam normalmente na próxima segunda feira.",
        sinaisSuspeitos: []
    },
    {
        texto: "Seu cartão de crédito foi entregue na portaria do seu prédio hoje.",
        sinaisSuspeitos: []
    }
];

var elementoMensagem = document.getElementById("mensagemJogo");
var resultadoJogo2 = document.getElementById("resultadoJogo2");
var progressoJogo2 = document.getElementById("progressoJogo2");
var botaoVerificarJogo2 = document.getElementById("botaoVerificarJogo2");
var botaoProximaMensagem = document.getElementById("botaoProximaMensagem");
var botaoEncerrarJogo2 = document.getElementById("botaoEncerrarJogo2");
var botaoProximaRodadaJogo2 = document.getElementById("botaoProximaRodadaJogo2");

var tamanhoRodada = 4;
var proximaMensagem = mensagens.length;
var mensagensDaRodada = [];
var posicaoNaRodada = 0;

var indiceMensagemAtual = 0;
var palavrasSelecionadas = [];

var numeroRodada = 0;
var rodadasJogadas = 0;
var sinaisEncontradosTotais = 0;
var sinaisPossiveisTotais = 0;

function embaralhar(lista) {
    for (var i = lista.length - 1; i > 0; i = i - 1) {
        var sorteado = Math.floor(Math.random() * (i + 1));
        var valor = lista[i];
        lista[i] = lista[sorteado];
        lista[sorteado] = valor;
    }
}

function removerPontuacao(palavra) {
    var palavraSemPontuacao = palavra;
    palavraSemPontuacao = palavraSemPontuacao.replace(".", "");
    palavraSemPontuacao = palavraSemPontuacao.replace(",", "");
    palavraSemPontuacao = palavraSemPontuacao.replace("!", "");
    palavraSemPontuacao = palavraSemPontuacao.replace("?", "");
    return palavraSemPontuacao;
}

function palavraEhSinalSuspeito(palavra, listaDeSinais) {
    var palavraSemPontuacao = removerPontuacao(palavra);
    var encontrouSinal = false;

    listaDeSinais.forEach(function (sinalSuspeito) {
        var sinalSemPontuacao = removerPontuacao(sinalSuspeito);
        if (sinalSemPontuacao === palavraSemPontuacao) {
            encontrouSinal = true;
        }
    });

    return encontrouSinal;
}

function alternarSelecaoPalavra(indicePalavra, elementoPalavra) {
    var posicaoNaLista = palavrasSelecionadas.indexOf(indicePalavra);

    if (posicaoNaLista === -1) {
        palavrasSelecionadas.push(indicePalavra);
        elementoPalavra.classList.add("palavra-selecionada");
    }
    else {
        palavrasSelecionadas.splice(posicaoNaLista, 1);
        elementoPalavra.classList.remove("palavra-selecionada");
    }
}

function mostrarProgresso(mensagem) {
    progressoJogo2.textContent = mensagem + " Progresso: " + rodadasJogadas + " rodada(s) jogada(s), "
        + sinaisEncontradosTotais + " de " + sinaisPossiveisTotais + " sinais encontrados.";
}

function carregarMensagem(indice) {
    indiceMensagemAtual = indice;

    var mensagemAtual = mensagens[indice];
    var listaPalavras = mensagemAtual.texto.split(" ");

    palavrasSelecionadas = [];
    elementoMensagem.textContent = "";
    resultadoJogo2.textContent = "";
    botaoProximaMensagem.disabled = true;

    mostrarProgresso("Rodada " + numeroRodada + " — mensagem " + (posicaoNaRodada + 1) + " de " + tamanhoRodada + ".");

    listaPalavras.forEach(function (palavra, indicePalavra) {
        var elementoPalavra = document.createElement("span");
        elementoPalavra.className = "palavra-mensagem";
        elementoPalavra.textContent = palavra;

        elementoPalavra.addEventListener("click", function () {
            alternarSelecaoPalavra(indicePalavra, elementoPalavra);
        });

        elementoMensagem.appendChild(elementoPalavra);
        elementoMensagem.appendChild(document.createTextNode(" "));
    });
}

function verificarRespostasJogo2() {
    var mensagemAtual = mensagens[indiceMensagemAtual];
    var listaPalavras = mensagemAtual.texto.split(" ");
    var listaElementosPalavras = elementoMensagem.querySelectorAll(".palavra-mensagem");

    var totalSinaisSuspeitos = mensagemAtual.sinaisSuspeitos.length;
    var totalSinaisEncontrados = 0;

    for (var indicePalavra = 0; indicePalavra < listaPalavras.length; indicePalavra = indicePalavra + 1) {
        var palavraAtual = listaPalavras[indicePalavra];
        var elementoPalavraAtual = listaElementosPalavras[indicePalavra];
        var foiSelecionada = palavrasSelecionadas.indexOf(indicePalavra) !== -1;
        var ehSinalSuspeito = palavraEhSinalSuspeito(palavraAtual, mensagemAtual.sinaisSuspeitos);

        elementoPalavraAtual.classList.remove("palavra-selecionada");

        if (ehSinalSuspeito === true && foiSelecionada === true) {
            elementoPalavraAtual.classList.add("palavra-correta");
            totalSinaisEncontrados = totalSinaisEncontrados + 1;
        }
        else if (ehSinalSuspeito === false && foiSelecionada === true) {
            elementoPalavraAtual.classList.add("palavra-incorreta");
        }
        else if (ehSinalSuspeito === true && foiSelecionada === false) {
            elementoPalavraAtual.classList.add("palavra-perdida");
        }
    }

    resultadoJogo2.textContent = "Você encontrou " + totalSinaisEncontrados + " de " + totalSinaisSuspeitos + " sinais de golpe.";

    sinaisEncontradosTotais = sinaisEncontradosTotais + totalSinaisEncontrados;
    sinaisPossiveisTotais = sinaisPossiveisTotais + totalSinaisSuspeitos;

    if (posicaoNaRodada === tamanhoRodada - 1) {
        rodadasJogadas = rodadasJogadas + 1;

        resultadoJogo2.textContent = "Rodada " + numeroRodada + " encerrada! " + resultadoJogo2.textContent;
        mostrarProgresso("Rodada concluída.");

        localStorage.setItem("quiz2Concluido", "sim");

        botaoVerificarJogo2.disabled = true;
        botaoProximaMensagem.disabled = true;
        botaoEncerrarJogo2.hidden = false;
        botaoProximaRodadaJogo2.hidden = false;
    }
    else {
        botaoProximaMensagem.disabled = false;
    }
}

function iniciarRodada() {
    botaoEncerrarJogo2.hidden = true;
    botaoProximaRodadaJogo2.hidden = true;
    botaoVerificarJogo2.disabled = false;

    numeroRodada = numeroRodada + 1;
    posicaoNaRodada = 0;

    if (proximaMensagem + tamanhoRodada > mensagens.length) {
        embaralhar(mensagens);
        proximaMensagem = 0;
    }

    mensagensDaRodada = [];

    for (var i = 0; i < tamanhoRodada; i = i + 1) {
        mensagensDaRodada.push(proximaMensagem + i);
    }

    proximaMensagem = proximaMensagem + tamanhoRodada;

    carregarMensagem(mensagensDaRodada[posicaoNaRodada]);
}

function encerrarJogo2() {
    botaoEncerrarJogo2.hidden = true;
    botaoProximaRodadaJogo2.hidden = true;
    botaoVerificarJogo2.disabled = true;
    botaoProximaMensagem.disabled = true;

    resultadoJogo2.textContent = "Jogo encerrado! Você jogou " + rodadasJogadas + " rodada(s) e encontrou "
        + sinaisEncontradosTotais + " de " + sinaisPossiveisTotais + " sinais de golpe.";

    progressoJogo2.textContent = "";
}

botaoVerificarJogo2.addEventListener("click", verificarRespostasJogo2);

botaoProximaMensagem.addEventListener("click", function () {
    posicaoNaRodada = posicaoNaRodada + 1;
    carregarMensagem(mensagensDaRodada[posicaoNaRodada]);
});

botaoProximaRodadaJogo2.addEventListener("click", iniciarRodada);
botaoEncerrarJogo2.addEventListener("click", encerrarJogo2);

iniciarRodada();
