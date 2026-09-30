const bancoSituacoes = [
    {
        texto: "Seu banco pediu sua senha por mensagem.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Seu filho pediu PIX utilizando um número novo.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você abriu diretamente o aplicativo oficial do banco.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Uma mensagem informou que sua conta será bloqueada caso você não clique em um link.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu uma ligação pedindo o código que chegou por SMS.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Um desconhecido pelo WhatsApp diz ser seu neto e pede dinheiro urgente.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Uma promoção pede que você pague uma taxa para liberar um prêmio.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Um e-mail pede que você confirme seus dados clicando em um link suspeito.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Alguém se identificou como funcionário do banco e pediu sua senha pelo telefone.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu um boleto com valor diferente do combinado por e-mail.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Um site oferece um produto com preço muito abaixo do mercado e pede pagamento antecipado.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Uma mensagem pede que você instale um aplicativo para resolver um problema na sua conta.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu uma cobrança por PIX de uma empresa que você nunca contratou.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Alguém pede que você leia em voz alta o código de segurança que recebeu.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Um perfil falso nas redes sociais oferece emprego com pagamento antecipado.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu um link para atualizar o aplicativo do banco fora da loja oficial.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Uma pessoa se passa por parente e pede PIX para uma emergência médica.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Um vendedor pede que você pague fora do aplicativo de compras.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu uma mensagem dizendo que ganhou um sorteio do qual nunca participou.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Alguém oferece ajuda para resolver um problema técnico e pede acesso remoto ao seu computador.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Uma cobrança aparece pedindo que você escaneie um QR Code para regularizar uma pendência.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu uma ligação de um número desconhecido pedindo dados do seu cartão.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Uma mensagem promete dobrar seu dinheiro em poucos dias.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Um anúncio pede que você preencha seus dados bancários para participar de uma pesquisa.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu um e-mail com anexo suspeito pedindo para abrir imediatamente.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Alguém liga se passando por policial pedindo que você faça um PIX para resolver uma multa.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Um site pede o número do seu cartão de crédito para confirmar sua idade.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu uma cobrança de uma fatura que já foi paga.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Um contato desconhecido oferece investimento com retorno garantido de cem por cento ao mês.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você recebeu uma mensagem pedindo para encaminhar um código de verificação para um amigo.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Uma pessoa se passando por suporte técnico pede sua senha para verificar sua conta.",
        respostaCorreta: "golpe"
    },
    {
        texto: "Você digitou o endereço do site do banco diretamente no navegador.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você conferiu o número de telefone oficial antes de ligar para o banco.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu um extrato bancário através do aplicativo oficial do banco.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você usou a biometria para acessar sua conta no aplicativo do banco.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu uma notificação de uma compra que você mesmo realizou.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você acessou o endereço oficial já conhecido do banco e conferiu se ele estava correto antes de fazer login.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você atualizou o aplicativo do banco através da loja oficial de aplicativos.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você confirmou uma compra diretamente com um vendedor conhecido.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu um comprovante de PIX depois de uma compra que você mesmo fez.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você ligou para o número oficial impresso no cartão para tirar uma dúvida.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você verificou o CNPJ da empresa antes de fazer uma compra online.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu um e-mail do banco sem pedido de clique em links ou senhas.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você usou o cartão físico em uma maquininha de um estabelecimento conhecido.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você conferiu a reputação da loja antes de finalizar a compra.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu uma cobrança do condomínio através do aplicativo oficial da administradora.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você fez login no aplicativo do banco usando sua senha pessoal, sem compartilhar com ninguém.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu um comprovante de transferência que já esperava.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você comparou o preço do produto com outras lojas antes de comprar.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você usou o cartão virtual para uma compra online em um site confiável.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você conferiu os dados do vendedor antes de combinar um PIX.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu a fatura do cartão de crédito através do aplicativo oficial.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você ativou a autenticação em duas etapas na sua conta.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você guardou sua senha apenas na sua memória, sem compartilhar com ninguém.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu uma notificação de login que você mesmo autorizou pelo celular.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você conferiu o remetente do e-mail antes de considerá-lo confiável.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você fez uma compra em uma loja física reconhecida da sua cidade.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recusou informar sua senha quando alguém perguntou por telefone.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você conferiu o comprovante de pagamento diretamente no aplicativo do banco.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você bloqueou o cartão imediatamente depois de perceber que ele havia sumido.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você leu os termos de uso antes de aceitar um contrato online.",
        respostaCorreta: "seguro"
    },
    {
        texto: "Você recebeu um alerta de compra internacional e reconheceu a transação.",
        respostaCorreta: "seguro"
    }
];

