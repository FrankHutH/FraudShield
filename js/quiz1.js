var situacoes = [
    {
        texto: "Seu banco pediu sua senha por mensagem.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Seu filho pediu PIX utilizando um número novo.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você abriu diretamente o aplicativo oficial do banco.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Uma mensagem informou que sua conta será bloqueada caso você não clique em um link.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma ligação pedindo o código que chegou por SMS.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Um desconhecido pelo WhatsApp diz ser seu neto e pede dinheiro urgente.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Uma promoção pede que você pague uma taxa para liberar um prêmio.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Um e-mail pede que você confirme seus dados clicando em um link suspeito.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Alguém se identificou como funcionário do banco e pediu sua senha pelo telefone.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu um boleto com valor diferente do combinado por e-mail.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Um site oferece um produto com preço muito abaixo do mercado e pede pagamento antecipado.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Uma mensagem pede que você instale um aplicativo para resolver um problema na sua conta.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma cobrança por PIX de uma empresa que você nunca contratou.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Alguém pede que você leia em voz alta o código de segurança que recebeu.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Um perfil falso nas redes sociais oferece emprego com pagamento antecipado.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu um link para atualizar o aplicativo do banco fora da loja oficial.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Uma pessoa se passa por parente e pede PIX para uma emergência médica.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Um vendedor pede que você pague fora do aplicativo de compras.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma mensagem dizendo que ganhou um sorteio do qual nunca participou.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Alguém oferece ajuda para resolver um problema técnico e pede acesso remoto ao seu computador.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Uma cobrança aparece pedindo que você escaneie um QR Code para regularizar uma pendência.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma ligação de um número desconhecido pedindo dados do seu cartão.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Uma mensagem promete dobrar seu dinheiro em poucos dias.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Um anúncio pede que você preencha seus dados bancários para participar de uma pesquisa.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu um e-mail com anexo suspeito pedindo para abrir imediatamente.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Alguém liga se passando por policial pedindo que você faça um PIX para resolver uma multa.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Um site pede o número do seu cartão de crédito para confirmar sua idade.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma cobrança de uma fatura que já foi paga.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Um contato desconhecido oferece investimento com retorno garantido de cem por cento ao mês.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma mensagem pedindo para encaminhar um código de verificação para um amigo.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Uma pessoa se passando por suporte técnico pede sua senha para verificar sua conta.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    {
        texto: "Você digitou o endereço do site do banco diretamente no navegador.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você conferiu o número de telefone oficial antes de ligar para o banco.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu um extrato bancário através do aplicativo oficial do banco.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você usou a biometria para acessar sua conta no aplicativo do banco.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma notificação de uma compra que você mesmo realizou.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você conferiu o cadeado de segurança do site antes de fazer login.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você atualizou o aplicativo do banco através da loja oficial de aplicativos.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você confirmou uma compra diretamente com um vendedor conhecido.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu um comprovante de PIX depois de uma compra que você mesmo fez.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você ligou para o número oficial impresso no cartão para tirar uma dúvida.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você verificou o CNPJ da empresa antes de fazer uma compra online.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu um e-mail do banco sem pedido de clique em links ou senhas.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você usou o cartão físico em uma maquininha de um estabelecimento conhecido.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você conferiu a reputação da loja antes de finalizar a compra.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma cobrança do condomínio através do aplicativo oficial da administradora.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você fez login no aplicativo do banco usando sua senha pessoal, sem compartilhar com ninguém.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu um comprovante de transferência que já esperava.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você comparou o preço do produto com outras lojas antes de comprar.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você usou o cartão virtual para uma compra online em um site confiável.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você conferiu os dados do vendedor antes de combinar um PIX.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu a fatura do cartão de crédito através do aplicativo oficial.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você ativou a autenticação em duas etapas na sua conta.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você guardou sua senha apenas na sua memória, sem compartilhar com ninguém.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu uma notificação de login que você mesmo autorizou pelo celular.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você conferiu o remetente do e-mail antes de considerá-lo confiável.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você fez uma compra em uma loja física reconhecida da sua cidade.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recusou informar sua senha quando alguém perguntou por telefone.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você conferiu o comprovante de pagamento diretamente no aplicativo do banco.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você bloqueou o cartão imediatamente depois de perceber que ele havia sumido.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você leu os termos de uso antes de aceitar um contrato online.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    },
    {
        texto: "Você recebeu um alerta de compra internacional e reconheceu a transação.",
        respostaCorreta: "seguro",
        classificacaoAtual: null
    }
];

var mensagensAcerto = [
    "Muito bem!",
    "Boa análise!",
    "Você identificou corretamente."
];

var mensagensErro = [
    "Observe os sinais com mais atenção.",
    "Cuidado com esse tipo de situação.",
    "Analise novamente antes de decidir."
];

var listaCartoes = document.getElementById("listaCartoes");
var areaGolpe = document.getElementById("areaGolpe");
var areaSeguro = document.getElementById("areaSeguro");
var listaCartoesGolpe = document.getElementById("cartoesGolpe");
var listaCartoesSeguro = document.getElementById("cartoesSeguro");
var botaoClassificarGolpe = document.getElementById("botaoClassificarGolpe");
var botaoClassificarSeguro = document.getElementById("botaoClassificarSeguro");
var botaoConcluirJogo1 = document.getElementById("botaoConcluirJogo1");
var resultadoJogo1 = document.getElementById("resultadoJogo1");

var indiceCartaoSelecionado = -1;
var indiceCartaoArrastado = -1;

function escolherMensagemAleatoria(listaDeMensagens) {
    var indiceAleatorio = Math.floor(Math.random() * listaDeMensagens.length);
    return listaDeMensagens[indiceAleatorio];
}

function criarCartao(situacao, indice) {
    var elementoCartao = document.createElement("li");
    elementoCartao.className = "item-beneficio cartao-situacao";
    elementoCartao.id = "cartaoSituacao" + indice;
    elementoCartao.setAttribute("draggable", "true");

    var textoSituacao = document.createElement("p");
    textoSituacao.textContent = situacao.texto;

    var textoFeedback = document.createElement("p");
    textoFeedback.className = "feedback-cartao";

    elementoCartao.appendChild(textoSituacao);
    elementoCartao.appendChild(textoFeedback);

    elementoCartao.addEventListener("click", function () {
        selecionarCartao(indice);
    });

    elementoCartao.addEventListener("dragstart", function () {
        indiceCartaoArrastado = indice;
    });

    return elementoCartao;
}

function selecionarCartao(indice) {
    var elementoCartao = document.getElementById("cartaoSituacao" + indice);

    if (indiceCartaoSelecionado === indice) {
        elementoCartao.classList.remove("cartao-selecionado");
        indiceCartaoSelecionado = -1;
        return;
    }

    if (indiceCartaoSelecionado !== -1) {
        var cartaoAnteriormenteSelecionado = document.getElementById("cartaoSituacao" + indiceCartaoSelecionado);
        if (cartaoAnteriormenteSelecionado !== null) {
            cartaoAnteriormenteSelecionado.classList.remove("cartao-selecionado");
        }
    }

    elementoCartao.classList.add("cartao-selecionado");
    indiceCartaoSelecionado = indice;
}

function classificarCartao(indiceSituacao, categoriaEscolhida) {
    var situacaoAtual = situacoes[indiceSituacao];
    situacaoAtual.classificacaoAtual = categoriaEscolhida;

    var elementoCartao = document.getElementById("cartaoSituacao" + indiceSituacao);

    if (categoriaEscolhida === "golpe") {
        listaCartoesGolpe.appendChild(elementoCartao);
    }
    else {
        listaCartoesSeguro.appendChild(elementoCartao);
    }

    elementoCartao.classList.remove("cartao-correto");
    elementoCartao.classList.remove("cartao-incorreto");
    elementoCartao.classList.remove("cartao-selecionado");

    var textoFeedback = elementoCartao.querySelector(".feedback-cartao");

    if (categoriaEscolhida === situacaoAtual.respostaCorreta) {
        elementoCartao.classList.add("cartao-correto");
        textoFeedback.textContent = "Correto — " + escolherMensagemAleatoria(mensagensAcerto);
    }
    else {
        elementoCartao.classList.add("cartao-incorreto");
        textoFeedback.textContent = "Incorreto — " + escolherMensagemAleatoria(mensagensErro);
    }

    indiceCartaoSelecionado = -1;
    indiceCartaoArrastado = -1;
}

function iniciarJogo1() {
    situacoes.forEach(function (situacao, indice) {
        var elementoCartao = criarCartao(situacao, indice);
        listaCartoes.appendChild(elementoCartao);
    });
}

botaoClassificarGolpe.addEventListener("click", function () {
    if (indiceCartaoSelecionado !== -1) {
        classificarCartao(indiceCartaoSelecionado, "golpe");
    }
    else {
        resultadoJogo1.textContent = "Toque em um cartão antes de tocar neste botão.";
    }
});

botaoClassificarSeguro.addEventListener("click", function () {
    if (indiceCartaoSelecionado !== -1) {
        classificarCartao(indiceCartaoSelecionado, "seguro");
    }
    else {
        resultadoJogo1.textContent = "Toque em um cartão antes de tocar neste botão.";
    }
});

areaGolpe.addEventListener("dragover", function (evento) {
    evento.preventDefault();
});

areaSeguro.addEventListener("dragover", function (evento) {
    evento.preventDefault();
});

areaGolpe.addEventListener("drop", function (evento) {
    evento.preventDefault();
    if (indiceCartaoArrastado !== -1) {
        classificarCartao(indiceCartaoArrastado, "golpe");
    }
});

areaSeguro.addEventListener("drop", function (evento) {
    evento.preventDefault();
    if (indiceCartaoArrastado !== -1) {
        classificarCartao(indiceCartaoArrastado, "seguro");
    }
});

botaoConcluirJogo1.addEventListener("click", function () {
    var totalSituacoes = situacoes.length;
    var totalClassificadas = 0;

    for (var indice = 0; indice < totalSituacoes; indice = indice + 1) {
        if (situacoes[indice].classificacaoAtual !== null) {
            totalClassificadas = totalClassificadas + 1;
        }
    }

    if (totalClassificadas < totalSituacoes) {
        resultadoJogo1.textContent = "Classifique todos os cartões antes de concluir o mini jogo.";
        return;
    }

    var totalCorretas = 0;

    for (var indice = 0; indice < totalSituacoes; indice = indice + 1) {
        if (situacoes[indice].classificacaoAtual === situacoes[indice].respostaCorreta) {
            totalCorretas = totalCorretas + 1;
        }
    }

    resultadoJogo1.textContent = "Você acertou " + totalCorretas + " de " + totalSituacoes + " situações.";

    localStorage.setItem("quiz1Concluido", "sim");
});

iniciarJogo1();
