# Guia para explicar o JavaScript do FraudShield

Este guia explica, **linha por linha (ou bloco por bloco, quando as linhas se repetem)**, os três arquivos JavaScript do projeto:

- `js/quiz.js` — controla a página `quiz.html` (barra de progresso geral).
- `js/quiz1.js` — controla o mini jogo "Golpe ou Seguro" (`quiz1.html`).
- `js/quiz2.js` — controla o mini jogo "Encontre os Sinais" (`quiz2.html`).

O objetivo é que você consiga apontar para **qualquer linha** desses arquivos e explicar, com suas próprias palavras, o que ela faz e por quê.

---

## 0. Conceitos que aparecem o tempo todo

Antes de entrar nos arquivos, veja os "blocos de Lego" que se repetem em todo o código. Se você entender esses seis conceitos, o resto é só reconhecer combinações deles.

| Conceito | O que significa | Exemplo no código |
|---|---|---|
| `var nome = valor;` | Cria uma "caixinha" com nome, guarda um valor dentro dela | `var tamanhoRodada = 4;` |
| `document.getElementById("id")` | Procura, na página HTML, o elemento que tem aquele `id` e devolve uma referência a ele | `document.getElementById("resultadoJogo1")` |
| `function nome(parametros) { ... }` | Cria uma "receita" reutilizável, que só executa quando é chamada pelo nome | `function embaralhar(lista) { ... }` |
| `if (condição) { ... } else { ... }` | Executa um bloco de código só se a condição for verdadeira; senão executa o outro bloco | `if (categoriaEscolhida === "golpe") { ... }` |
| `for (var i = 0; i < total; i = i + 1) { ... }` | Repete um bloco de código várias vezes, contando com a variável `i` | usado para percorrer listas |
| `elemento.addEventListener("click", function () { ... })` | Diz ao navegador: "quando alguém clicar neste elemento, execute esta função" | usado em todos os botões e cartões |

Outra coisa importante: **arrays** são listas entre colchetes `[ ]`, e **objetos** são "fichas" entre chaves `{ }` com campos nomeados (`campo: valor`). Os dados do quiz são arrays cheios de objetos.

---

## 1. `js/quiz.js` (32 linhas) — a barra de progresso geral

Esse é o arquivo mais curto e mais fácil. Ele roda na página `quiz.html`, que lista os dois mini jogos.

```js
var statusJogo1 = document.getElementById("statusJogo1");
var statusJogo2 = document.getElementById("statusJogo2");
var barraProgresso = document.getElementById("barraProgresso");
var textoProgresso = document.getElementById("textoProgresso");
```
Essas quatro linhas só "pegam" elementos que já existem no HTML (dois parágrafos de status, a barra `<progress>` e o texto ao lado dela) e guardam cada um numa variável, para poder mudá-los depois.

```js
var jogo1Concluido = localStorage.getItem("quiz1Concluido");
var jogo2Concluido = localStorage.getItem("quiz2Concluido");
```
`localStorage` é uma "gaveta" que o navegador guarda por conta própria, mesmo se a página for fechada e reaberta depois. Aqui o código pergunta: "esse jogador já terminou o jogo 1 alguma vez? E o jogo 2?". Cada resposta vem como o texto `"sim"` (se `js/quiz1.js` ou `js/quiz2.js` já salvaram isso) ou `null` (se nunca).

```js
var totalJogosConcluidos = 0;
```
Um contador que começa em zero e vai aumentar conforme os jogos concluídos forem encontrados.

```js
if (jogo1Concluido === "sim") {
    statusJogo1.textContent = "Jogo 1 — Concluído";
    totalJogosConcluidos = totalJogosConcluidos + 1;
}
else {
    statusJogo1.textContent = "Jogo 1 — Não concluído";
}
```
Se o valor guardado for exatamente o texto `"sim"`, o parágrafo de status recebe o texto "Concluído" e o contador sobe 1. Caso contrário, mostra "Não concluído" e o contador não muda. O mesmo bloco se repete logo abaixo para `jogo2Concluido` / `statusJogo2`.

```js
var totalDeJogos = 2;
var porcentagemProgresso = (totalJogosConcluidos / totalDeJogos) * 100;
```
Existem 2 mini jogos no total (número fixo, "chumbado" no código porque nunca muda). A porcentagem é sempre `(quantos concluídos ÷ quantos existem) × 100` — ou seja, vai dar 0%, 50% ou 100%.

```js
barraProgresso.value = porcentagemProgresso;
textoProgresso.textContent = "Progresso: " + porcentagemProgresso + "%";
```
A última linha de código move visualmente a barra `<progress>` e escreve o texto "Progresso: 50%" (por exemplo) ao lado dela.

---

## 2. `js/quiz1.js` — mini jogo "Golpe ou Seguro"

### 2.1 Os dados (linhas 1–324)

```js
var situacoes = [
    {
        texto: "Seu banco pediu sua senha por mensagem.",
        respostaCorreta: "golpe",
        classificacaoAtual: null
    },
    ... (61 objetos no total, todos com o mesmo formato) ...
];
```
Isso é **um array com 61 objetos**. Cada objeto é uma "situação" do jogo e sempre tem três campos:
- `texto`: a frase mostrada no cartão.
- `respostaCorreta`: a resposta certa, sempre `"golpe"` ou `"seguro"`.
- `classificacaoAtual`: começa `null` (vazio) porque o jogador ainda não respondeu nada; durante o jogo, esse campo é preenchido com `"golpe"` ou `"seguro"` — é assim que o código "lembra" o que o jogador escolheu para aquele cartão específico.

Não é preciso decorar as 61 frases — o importante é entender que **é sempre a mesma ficha se repetindo**.

```js
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
```
Duas listas simples de frases curtas: uma para quando o jogador acerta, outra para quando erra. Mais adiante o código sorteia uma frase de dentro dessas listas, para o feedback não ser sempre igual.

### 2.2 Conectando com o HTML (linhas 326–336)

```js
var listaCartoes = document.getElementById("listaCartoes");
var areaGolpe = document.getElementById("areaGolpe");
var areaSeguro = document.getElementById("areaSeguro");
var listaCartoesGolpe = document.getElementById("cartoesGolpe");
var listaCartoesSeguro = document.getElementById("cartoesSeguro");
var botaoClassificarGolpe = document.getElementById("botaoClassificarGolpe");
var botaoClassificarSeguro = document.getElementById("botaoClassificarSeguro");
var botaoEncerrarJogo1 = document.getElementById("botaoEncerrarJogo1");
var botaoProximaRodada = document.getElementById("botaoProximaRodada");
var resultadoJogo1 = document.getElementById("resultadoJogo1");
var progressoJogo1 = document.getElementById("progressoJogo1");
```
Onze variáveis, cada uma apontando para um elemento do `quiz1.html`:
- `listaCartoes`: a lista onde os 4 cartões da rodada atual aparecem.
- `areaGolpe` / `areaSeguro`: as duas "zonas de soltar" (drag and drop).
- `listaCartoesGolpe` / `listaCartoesSeguro`: as listinhas dentro de cada zona, que recebem os cartões já classificados.
- `botaoClassificarGolpe` / `botaoClassificarSeguro`: os botões alternativos ao arrastar (tocar no cartão e depois no botão).
- `botaoEncerrarJogo1` / `botaoProximaRodada`: os dois botões que aparecem só depois que a rodada termina.
- `resultadoJogo1`: onde aparecem mensagens de resultado.
- `progressoJogo1`: onde aparece o placar acumulado.

### 2.3 O "estado" do jogo (linhas 338–349)

```js
var tamanhoRodada = 4;
var proximaSituacao = situacoes.length;
var situacoesDaRodada = [];
var rodadaEmAndamento = false;
```
- `tamanhoRodada`: quantos cartões aparecem por rodada (4).
- `proximaSituacao`: um "marcador de página" que diz qual situação usar a seguir. Começa igual a `situacoes.length` (ou seja, 61) **de propósito** — isso força o jogo a embaralhar a lista assim que a primeira rodada começar (veja `iniciarRodada` mais abaixo).
- `situacoesDaRodada`: vai guardar os 4 números (posições no array `situacoes`) que pertencem à rodada atual.
- `rodadaEmAndamento`: `true` enquanto a rodada ainda não foi totalmente respondida; funciona como uma "trava" que impede classificar cartões fora de hora.

```js
var indiceCartaoSelecionado = -1;
var indiceCartaoArrastado = -1;
```
`-1` é usado como "nenhum". Quando o jogador toca em um cartão, `indiceCartaoSelecionado` passa a guardar a posição desse cartão; quando ele começa a arrastar um cartão, `indiceCartaoArrastado` guarda a posição dele.

```js
var numeroRodada = 0;
var rodadasJogadas = 0;
var acertosTotais = 0;
var respostasTotais = 0;
```
Contadores de placar, que valem para a sessão inteira (zeram se a página for recarregada):
- `numeroRodada`: número da rodada atual (1, 2, 3...).
- `rodadasJogadas`: quantas rodadas já foram totalmente concluídas.
- `acertosTotais` / `respostasTotais`: acertos e respostas somados de todas as rodadas já jogadas.

### 2.4 Funções auxiliares (linhas 351–370)

```js
function embaralhar(lista) {
    for (var i = lista.length - 1; i > 0; i = i - 1) {
        var sorteado = Math.floor(Math.random() * (i + 1));
        var valor = lista[i];
        lista[i] = lista[sorteado];
        lista[sorteado] = valor;
    }
}
```
Essa é uma forma clássica de embaralhar uma lista (algoritmo Fisher–Yates), útil de saber explicar passo a passo:
1. `i` começa na última posição da lista e vai diminuindo até `1`.
2. Em cada volta, sorteia uma posição aleatória `sorteado` entre `0` e `i`.
3. Troca de lugar o item da posição `i` com o item da posição `sorteado`, usando uma variável temporária `valor` para não perder nenhum dos dois durante a troca.

No final do `for`, a mesma lista está em ordem aleatória — repare que a função **não devolve nada com `return`**: ela modifica a lista original diretamente.

```js
function calcularPorcentagem(parte, total) {
    if (total === 0) {
        return 0;
    }
    return Math.round((parte / total) * 100);
}
```
Calcula uma porcentagem simples (`parte` dividido por `total`, vezes 100), arredondada com `Math.round`. O `if` no início existe só para evitar dividir por zero (o que daria um resultado inválido chamado `NaN`) — se ainda não houve nenhuma resposta, a porcentagem é 0.

```js
function escolherMensagemAleatoria(lista) {
    var indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
}
```
Sorteia uma posição aleatória dentro de uma lista e devolve o item que está lá. É usada para variar as frases de acerto/erro.

### 2.5 Criando e selecionando cartões (linhas 372–416)

```js
function criarCartao(situacao, indice) {
    var cartao = document.createElement("li");
    cartao.className = "item-beneficio cartao-situacao";
    cartao.id = "cartaoSituacao" + indice;
    cartao.setAttribute("draggable", "true");

    var texto = document.createElement("p");
    texto.textContent = situacao.texto;

    var feedback = document.createElement("p");
    feedback.className = "feedback-cartao";

    cartao.appendChild(texto);
    cartao.appendChild(feedback);

    cartao.addEventListener("click", function () {
        selecionarCartao(indice);
    });

    cartao.addEventListener("dragstart", function () {
        indiceCartaoArrastado = indice;
    });

    return cartao;
}
```
Essa função monta, usando só JavaScript, o HTML de **um** cartão (sem escrever HTML na mão):
1. Cria um `<li>` e dá a ele classes CSS, um `id` único (baseado no número `indice`) e o atributo que permite arrastá-lo.
2. Cria um `<p>` com a frase da situação e o coloca dentro do cartão.
3. Cria um segundo `<p>`, vazio por enquanto, que vai receber a mensagem de "Correto"/"Incorreto" mais tarde.
4. Adiciona um "ouvinte" de clique: ao clicar no cartão, chama `selecionarCartao` passando o número dele.
5. Adiciona um "ouvinte" de início de arraste: quando o jogador começa a arrastar, guarda o número desse cartão em `indiceCartaoArrastado`.
6. Devolve (`return`) o cartão pronto, para quem chamou a função poder colocá-lo na página.

```js
function selecionarCartao(indice) {
    var cartao = document.getElementById("cartaoSituacao" + indice);

    if (indiceCartaoSelecionado === indice) {
        cartao.classList.remove("cartao-selecionado");
        indiceCartaoSelecionado = -1;
        return;
    }

    if (indiceCartaoSelecionado !== -1) {
        var cartaoAntigo = document.getElementById("cartaoSituacao" + indiceCartaoSelecionado);
        if (cartaoAntigo !== null) {
            cartaoAntigo.classList.remove("cartao-selecionado");
        }
    }

    cartao.classList.add("cartao-selecionado");
    indiceCartaoSelecionado = indice;
}
```
Controla qual cartão está "destacado" na tela (nunca mais de um por vez):
1. Busca o cartão clicado.
2. Se ele **já** era o selecionado, o clique funciona como "desmarcar": tira o destaque visual, zera `indiceCartaoSelecionado` e sai da função (`return`) — não faz mais nada depois disso.
3. Se havia **outro** cartão selecionado antes, tira o destaque dele primeiro (senão dois cartões ficariam destacados ao mesmo tempo).
4. Por fim, destaca o cartão clicado agora e guarda o número dele.

### 2.6 Classificando um cartão (linhas 418–452)

```js
function classificarCartao(indiceSituacao, categoriaEscolhida) {
    if (rodadaEmAndamento === false) {
        return;
    }

    var situacao = situacoes[indiceSituacao];
    situacao.classificacaoAtual = categoriaEscolhida;

    var cartao = document.getElementById("cartaoSituacao" + indiceSituacao);

    if (categoriaEscolhida === "golpe") {
        listaCartoesGolpe.appendChild(cartao);
    }
    else {
        listaCartoesSeguro.appendChild(cartao);
    }

    cartao.classList.remove("cartao-correto", "cartao-incorreto", "cartao-selecionado");

    var feedback = cartao.querySelector(".feedback-cartao");

    if (categoriaEscolhida === situacao.respostaCorreta) {
        cartao.classList.add("cartao-correto");
        feedback.textContent = "Correto — " + escolherMensagemAleatoria(mensagensAcerto);
    }
    else {
        cartao.classList.add("cartao-incorreto");
        feedback.textContent = "Incorreto — " + escolherMensagemAleatoria(mensagensErro);
    }

    indiceCartaoSelecionado = -1;
    indiceCartaoArrastado = -1;

    verificarFimDaRodada();
}
```
Esta é a função central do jogo — é chamada tanto pelo botão quanto pelo "soltar" do arrastar-e-soltar. Passo a passo:
1. Se não existe nenhuma rodada em andamento (`rodadaEmAndamento === false`), a função para imediatamente com `return` — isso impede classificar cartões depois que a rodada já terminou.
2. Pega o objeto da situação correspondente e grava a resposta escolhida no campo `classificacaoAtual`.
3. Move o elemento `<li>` do cartão para dentro da lista certa (`listaCartoesGolpe` ou `listaCartoesSeguro`) usando `appendChild` — como o cartão já existe na página, isso **move** ele, não cria uma cópia.
4. Remove classes CSS antigas de acerto/erro/seleção (importante porque o mesmo cartão pode ser clicado de novo e reclassificado).
5. Pega o parágrafo de feedback dentro do cartão.
6. Compara a resposta escolhida com a resposta correta guardada nos dados: se bater, marca como correto e escreve uma frase de acerto sorteada; senão, marca como incorreto e escreve uma frase de erro sorteada.
7. Zera os marcadores de seleção/arraste (nada continua "selecionado" depois de responder).
8. Chama `verificarFimDaRodada()` para conferir se essa foi a última resposta que faltava na rodada.

### 2.7 Contando o progresso da rodada (linhas 454–478)

```js
function contarClassificadosNaRodada() {
    var total = 0;

    for (var i = 0; i < situacoesDaRodada.length; i = i + 1) {
        var situacao = situacoes[situacoesDaRodada[i]];
        if (situacao.classificacaoAtual !== null) {
            total = total + 1;
        }
    }

    return total;
}
```
Percorre as 4 situações da rodada atual e conta quantas já têm uma resposta (campo `classificacaoAtual` diferente de `null`).

```js
function contarAcertosNaRodada() {
    var total = 0;

    for (var i = 0; i < situacoesDaRodada.length; i = i + 1) {
        var situacao = situacoes[situacoesDaRodada[i]];
        if (situacao.classificacaoAtual === situacao.respostaCorreta) {
            total = total + 1;
        }
    }

    return total;
}
```
Praticamente igual à anterior, mas em vez de contar "tem resposta ou não", conta quantas dessas respostas batem com a resposta correta.

### 2.8 Mostrando o placar (linhas 480–485)

```js
function mostrarProgresso(mensagem) {
    var porcentagem = calcularPorcentagem(acertosTotais, respostasTotais);

    progressoJogo1.textContent = mensagem + " Progresso: " + rodadasJogadas + " rodada(s) jogada(s), "
        + acertosTotais + " de " + respostasTotais + " acertos (" + porcentagem + "%).";
}
```
Recebe um texto curto (`mensagem`) que muda dependendo de quem chamou a função (por exemplo "Rodada 2 em andamento" ou "Rodada concluída"), calcula a porcentagem geral de acertos e escreve tudo junto no parágrafo `progressoJogo1`.

### 2.9 Verificando o fim da rodada (linhas 487–506)

```js
function verificarFimDaRodada() {
    if (contarClassificadosNaRodada() < tamanhoRodada) {
        return;
    }

    var acertosDaRodada = contarAcertosNaRodada();

    rodadaEmAndamento = false;
    rodadasJogadas = rodadasJogadas + 1;
    acertosTotais = acertosTotais + acertosDaRodada;
    respostasTotais = respostasTotais + tamanhoRodada;

    resultadoJogo1.textContent = "Rodada " + numeroRodada + " encerrada! Você acertou " + acertosDaRodada + " de " + tamanhoRodada + " situações.";
    mostrarProgresso("Rodada concluída.");

    localStorage.setItem("quiz1Concluido", "sim");

    botaoEncerrarJogo1.hidden = false;
    botaoProximaRodada.hidden = false;
}
```
Chamada toda vez que um cartão é classificado, para checar se a rodada já acabou:
1. Se ainda faltam cartões para classificar (`contarClassificadosNaRodada()` menor que 4), a função não faz mais nada — a rodada continua.
2. Se chegou aqui, a rodada terminou. Conta quantos acertos ela teve.
3. Desliga a trava (`rodadaEmAndamento = false`) — a partir de agora, `classificarCartao` vai recusar novas respostas até uma nova rodada começar.
4. Soma essa rodada aos totais gerais (`rodadasJogadas`, `acertosTotais`, `respostasTotais`).
5. Escreve a frase de resultado da rodada e atualiza a linha de progresso.
6. Salva `"sim"` no `localStorage`, na chave `"quiz1Concluido"` — é esse valor que o `quiz.js` lê depois para saber que esse mini jogo já foi jogado ao menos uma vez.
7. Mostra os dois botões (`Encerrar jogo` e `Próxima rodada`), que ficavam escondidos até aqui.

### 2.10 Começando uma rodada nova (linhas 508–541)

```js
function iniciarRodada() {
    listaCartoes.textContent = "";
    listaCartoesGolpe.textContent = "";
    listaCartoesSeguro.textContent = "";
    resultadoJogo1.textContent = "";
    botaoEncerrarJogo1.hidden = true;
    botaoProximaRodada.hidden = true;

    indiceCartaoSelecionado = -1;
    indiceCartaoArrastado = -1;
    rodadaEmAndamento = true;
    numeroRodada = numeroRodada + 1;

    mostrarProgresso("Rodada " + numeroRodada + " em andamento — classifique os " + tamanhoRodada + " cartões abaixo.");

    if (proximaSituacao + tamanhoRodada > situacoes.length) {
        embaralhar(situacoes);
        proximaSituacao = 0;
    }

    situacoesDaRodada = [];

    for (var i = 0; i < tamanhoRodada; i = i + 1) {
        var indiceSituacao = proximaSituacao + i;

        situacoes[indiceSituacao].classificacaoAtual = null;
        situacoesDaRodada.push(indiceSituacao);

        var cartao = criarCartao(situacoes[indiceSituacao], indiceSituacao);
        listaCartoes.appendChild(cartao);
    }

    proximaSituacao = proximaSituacao + tamanhoRodada;
}
```
Monta uma rodada nova do zero:
1. Esvazia as três listas visuais (`textContent = ""` apaga tudo que está dentro do elemento) e o texto de resultado — a tela fica "limpa" para a nova rodada.
2. Esconde os dois botões de fim de rodada de novo (só vão reaparecer quando **esta** rodada terminar).
3. Zera seleção/arraste, liga a trava (`rodadaEmAndamento = true`) e soma 1 ao número da rodada.
4. Atualiza a linha de progresso avisando que a rodada está em andamento.
5. **O truque do embaralhamento automático:** se não sobrarem pelo menos 4 situações não usadas a partir de `proximaSituacao`, embaralha a lista inteira de novo e volta o marcador para `0`. Como `proximaSituacao` começa igual a `situacoes.length`, isso garante que **a primeira rodada do jogo já nasce embaralhada**. Depois, esse mesmo `if` garante que, quando as 61 situações acabarem, o jogo embaralha tudo de novo e recomeça — assim o jogo nunca "acaba" de verdade.
6. Monta a lista `situacoesDaRodada` andando 4 posições a partir de `proximaSituacao`: para cada uma, zera a resposta antiga (`classificacaoAtual = null`, caso essa situação já tenha sido usada numa volta anterior), guarda a posição na lista da rodada, cria o cartão correspondente e o adiciona na tela.
7. No final, avança `proximaSituacao` em 4 posições, para a próxima rodada começar de onde essa parou.

### 2.11 Encerrando o jogo (linhas 543–553)

```js
function encerrarJogo1() {
    botaoEncerrarJogo1.hidden = true;
    botaoProximaRodada.hidden = true;

    var porcentagem = calcularPorcentagem(acertosTotais, respostasTotais);

    resultadoJogo1.textContent = "Jogo encerrado! Você jogou " + rodadasJogadas + " rodada(s) e acertou "
        + acertosTotais + " de " + respostasTotais + " situações (" + porcentagem + "%).";

    progressoJogo1.textContent = "";
}
```
Chamada quando o jogador escolhe parar em vez de jogar outra rodada: esconde os dois botões de escolha (agora sem volta, a não ser recarregando a página), calcula a porcentagem final e escreve o resumo completo no lugar do resultado da última rodada, limpando a linha de progresso (que já não é mais necessária).

### 2.12 Ligando os botões e áreas de soltar (linhas 555–598)

```js
botaoClassificarGolpe.addEventListener("click", function () {
    if (indiceCartaoSelecionado !== -1) {
        classificarCartao(indiceCartaoSelecionado, "golpe");
    }
    else {
        resultadoJogo1.textContent = "Toque em um cartão antes de tocar neste botão.";
    }
});
```
Quando o botão "Classificar aqui como golpe" é clicado: se existe um cartão selecionado, classifica-o como `"golpe"`; senão, avisa o jogador que precisa escolher um cartão primeiro. O botão "Classificar aqui como seguro" logo abaixo faz exatamente a mesma coisa, trocando `"golpe"` por `"seguro"`.

```js
areaGolpe.addEventListener("dragover", function (evento) {
    evento.preventDefault();
});

areaSeguro.addEventListener("dragover", function (evento) {
    evento.preventDefault();
});
```
`dragover` dispara continuamente enquanto algo é arrastado por cima do elemento. `evento.preventDefault()` é obrigatório aqui: por padrão, o navegador **não permite soltar** nada em cima de um elemento comum — chamar isso avisa o navegador "pode soltar aqui".

```js
areaGolpe.addEventListener("drop", function (evento) {
    evento.preventDefault();
    if (indiceCartaoArrastado !== -1) {
        classificarCartao(indiceCartaoArrastado, "golpe");
    }
});
```
Quando o jogador solta o cartão sobre a área "Golpe": de novo `preventDefault()` (sem isso, alguns navegadores tentariam abrir o conteúdo solto como se fosse um link), e então, se existe um cartão sendo arrastado, classifica-o como `"golpe"`. A área "Seguro" tem o mesmo bloco, trocando a categoria.

```js
botaoProximaRodada.addEventListener("click", iniciarRodada);
botaoEncerrarJogo1.addEventListener("click", encerrarJogo1);

iniciarRodada();
```
As duas últimas ligações conectam os botões de fim de rodada às funções que já vimos. A última linha do arquivo, `iniciarRodada();`, é executada **uma vez, assim que a página carrega** — é ela que prepara a primeira rodada de 4 cartões antes mesmo do jogador fazer qualquer coisa.

---

## 3. `js/quiz2.js` — mini jogo "Encontre os Sinais"

Esse arquivo segue a mesma lógica de "rodadas de 4" do `quiz1.js`, só que aplicada a mensagens exibidas uma de cada vez (em vez de 4 cartões juntos na tela).

### 3.1 Os dados (linhas 1–222)

```js
var mensagens = [
    {
        texto: "URGENTE! Sua conta será bloqueada hoje. Clique neste link para confirmar sua senha.",
        sinaisSuspeitos: ["URGENTE!", "bloqueada", "Clique", "link", "senha"]
    },
    ... (51 objetos no total) ...
];
```
Um array com 51 objetos. Cada um tem:
- `texto`: a mensagem falsa completa, que vai ser exibida palavra por palavra.
- `sinaisSuspeitos`: a lista das palavras exatas, dentro daquele texto, que são sinais de golpe. Quando essa lista está vazia (`[]`), significa que a mensagem inteira é segura e não tem nenhum sinal para encontrar.

### 3.2 Conectando com o HTML (linhas 224–230)

```js
var elementoMensagem = document.getElementById("mensagemJogo");
var resultadoJogo2 = document.getElementById("resultadoJogo2");
var progressoJogo2 = document.getElementById("progressoJogo2");
var botaoVerificarJogo2 = document.getElementById("botaoVerificarJogo2");
var botaoProximaMensagem = document.getElementById("botaoProximaMensagem");
var botaoEncerrarJogo2 = document.getElementById("botaoEncerrarJogo2");
var botaoProximaRodadaJogo2 = document.getElementById("botaoProximaRodadaJogo2");
```
- `elementoMensagem`: onde a mensagem atual aparece, palavra por palavra, como elementos clicáveis.
- `resultadoJogo2` / `progressoJogo2`: textos de resultado e de placar acumulado.
- `botaoVerificarJogo2`: botão "Verificar respostas".
- `botaoProximaMensagem`: avança para a próxima mensagem **dentro da mesma rodada**.
- `botaoEncerrarJogo2` / `botaoProximaRodadaJogo2`: os dois botões de escolha que só aparecem quando as 4 mensagens da rodada acabam.

### 3.3 O "estado" do jogo (linhas 232–243)

```js
var tamanhoRodada = 4;
var proximaMensagem = mensagens.length;
var mensagensDaRodada = [];
var posicaoNaRodada = 0;
```
Mesma ideia do `quiz1.js`: `tamanhoRodada` é o tamanho da rodada, `proximaMensagem` começa igual a `mensagens.length` para forçar o primeiro embaralhamento, `mensagensDaRodada` vai guardar as 4 posições sorteadas para a rodada atual, e `posicaoNaRodada` diz qual dessas 4 (0, 1, 2 ou 3) está na tela agora.

```js
var indiceMensagemAtual = 0;
var palavrasSelecionadas = [];
```
`indiceMensagemAtual` é a posição, dentro do array `mensagens`, da mensagem exibida agora. `palavrasSelecionadas` guarda as posições das palavras que o jogador já tocou na mensagem atual.

```js
var numeroRodada = 0;
var rodadasJogadas = 0;
var sinaisEncontradosTotais = 0;
var sinaisPossiveisTotais = 0;
```
Contadores de placar, equivalentes aos de `quiz1.js`, mas medindo "sinais encontrados" em vez de "acertos".

### 3.4 Funções auxiliares de texto (linhas 245–288)

```js
function embaralhar(lista) {
    for (var i = lista.length - 1; i > 0; i = i - 1) {
        var sorteado = Math.floor(Math.random() * (i + 1));
        var valor = lista[i];
        lista[i] = lista[sorteado];
        lista[sorteado] = valor;
    }
}
```
Exatamente a mesma função do `quiz1.js` (cada página carrega seu próprio arquivo `.js` separadamente, então essa pequena função aparece duplicada nos dois arquivos — em um projeto desse tamanho, isso é normal e não é motivo de preocupação).

```js
function removerPontuacao(palavra) {
    var palavraSemPontuacao = palavra;
    palavraSemPontuacao = palavraSemPontuacao.replace(".", "");
    palavraSemPontuacao = palavraSemPontuacao.replace(",", "");
    palavraSemPontuacao = palavraSemPontuacao.replace("!", "");
    palavraSemPontuacao = palavraSemPontuacao.replace("?", "");
    return palavraSemPontuacao;
}
```
Recebe uma palavra e devolve ela sem pontuação (tira `.`, `,`, `!` e `?`). É necessária porque o texto da mensagem tem palavras coladas em pontuação ("agora." ou "URGENTE!"), enquanto a lista `sinaisSuspeitos` guarda as palavras "limpas" — sem essa função, a comparação entre as duas nunca bateria certo.

```js
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
```
Confere se uma palavra da mensagem é um sinal suspeito real:
1. Limpa a palavra recebida.
2. Começa supondo que não é sinal (`encontrouSinal = false`).
3. Para cada palavra da lista de sinais suspeitos daquela mensagem, limpa ela também e compara com a palavra recebida; se bater, marca `encontrouSinal = true`.
4. Devolve o resultado final.

```js
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
```
Liga/desliga a seleção de uma palavra ao ser clicada:
- `indexOf` procura a posição dessa palavra dentro da lista de selecionadas; se não achar, devolve `-1`.
- Se não estava selecionada (`-1`): adiciona à lista com `push` e pinta a palavra.
- Se já estava selecionada: remove da lista com `splice` (tira 1 item, na posição encontrada) e tira a pintura — é assim que clicar duas vezes na mesma palavra a desmarca.

### 3.5 Mostrando o placar (linhas 290–293)

```js
function mostrarProgresso(mensagem) {
    progressoJogo2.textContent = mensagem + " Progresso: " + rodadasJogadas + " rodada(s) jogada(s), "
        + sinaisEncontradosTotais + " de " + sinaisPossiveisTotais + " sinais encontrados.";
}
```
Igual à função equivalente do `quiz1.js`, mas relatando "sinais encontrados" em vez de "acertos" — porque o critério de pontuação desse jogo é diferente.

### 3.6 Exibindo uma mensagem na tela (linhas 295–320)

```js
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
```
1. Guarda qual mensagem está sendo mostrada (`indiceMensagemAtual`).
2. `split(" ")` corta o texto inteiro em pedaços, separando por espaço — o resultado é um array de palavras.
3. Reseta a lista de palavras selecionadas (mensagem nova, seleção zerada).
4. Limpa o texto anterior da tela e o resultado anterior.
5. Desativa o botão "Próxima mensagem" — o jogador precisa verificar essa mensagem antes de avançar.
6. Atualiza a linha de progresso avisando qual mensagem (1 a 4) da rodada está sendo exibida.
7. `listaPalavras.forEach(...)`: para cada palavra, cria um `<span>` clicável com o texto dela, liga um clique que chama `alternarSelecaoPalavra`, e adiciona tanto a palavra quanto um espaço em branco (`createTextNode(" ")`) na tela — o espaço é necessário porque, ao separar em vários elementos, as palavras ficariam grudadas sem ele.

> Aqui o `forEach` é a escolha certa (em vez de um `for` comum): cada chamada da função dentro do `forEach` recebe seu **próprio** `indicePalavra`, então cada palavra "lembra" corretamente qual é a sua posição quando for clicada, mesmo depois do loop inteiro já ter terminado.

### 3.7 Verificando as respostas (linhas 322–371)

```js
function verificarRespostasJogo2() {
    var mensagemAtual = mensagens[indiceMensagemAtual];
    var listaPalavras = mensagemAtual.texto.split(" ");
    var listaElementosPalavras = elementoMensagem.querySelectorAll(".palavra-mensagem");

    var totalSinaisSuspeitos = mensagemAtual.sinaisSuspeitos.length;
    var totalSinaisEncontrados = 0;
```
Pega de novo a mensagem atual e sua lista de palavras, além de todos os elementos `<span>` já desenhados na tela (para poder colori-los). Guarda quantos sinais suspeitos essa mensagem realmente tem, e começa a contar quantos o jogador vai acertar.

```js
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
```
Percorre palavra por palavra e decide, para cada uma, duas respostas de sim/não: "o jogador selecionou essa palavra?" (`foiSelecionada`) e "essa palavra é realmente um sinal suspeito?" (`ehSinalSuspeito`). Com essas duas respostas, existem quatro combinações possíveis, e o código cobre três delas:
- **selecionada + é sinal real** → acerto: pinta de "correta" e soma 1 no contador.
- **selecionada + não é sinal** → erro: pinta de "incorreta" (o jogador marcou uma palavra inocente).
- **não selecionada + é sinal real** → esqueceu: pinta de "perdida" (era um sinal e o jogador não viu).
- (a quarta combinação — não selecionada e não é sinal — não precisa de nenhuma cor, por isso não tem `if` para ela.)

```js
    resultadoJogo2.textContent = "Você encontrou " + totalSinaisEncontrados + " de " + totalSinaisSuspeitos + " sinais de golpe.";

    sinaisEncontradosTotais = sinaisEncontradosTotais + totalSinaisEncontrados;
    sinaisPossiveisTotais = sinaisPossiveisTotais + totalSinaisSuspeitos;
```
Escreve o resultado dessa mensagem específica e soma os números aos totais acumulados da rodada/sessão.

```js
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
```
`tamanhoRodada - 1` é `3`, ou seja, a quarta e última mensagem da rodada (posições contam a partir de `0`). Se essa era a última mensagem:
- soma 1 rodada jogada;
- coloca "Rodada encerrada!" na frente do resultado;
- atualiza a linha de progresso com o texto de rodada concluída;
- salva `"sim"` em `localStorage.quiz2Concluido` (o mesmo mecanismo do jogo 1);
- desativa os botões "Verificar" e "Próxima mensagem" (não há mais nada para fazer nessa tela);
- mostra os botões "Encerrar jogo" e "Próxima rodada".

Senão (ainda faltam mensagens na rodada), simplesmente reativa o botão "Próxima mensagem".

### 3.8 Começando uma rodada nova (linhas 373–395)

```js
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
```
Mesma estrutura de `iniciarRodada` do `quiz1.js`, aplicada a mensagens em vez de cartões:
1. Esconde os botões de escolha e reativa "Verificar" (podem ter ficado desativados na rodada anterior).
2. Soma 1 ao número da rodada e volta `posicaoNaRodada` para `0` (começo da rodada).
3. Mesmo truque do embaralhamento automático: se não sobrarem 4 mensagens não usadas, embaralha tudo de novo e reinicia o marcador — isso é o que faz o jogo "nunca acabar" mesmo tendo só 51 mensagens fixas.
4. Monta `mensagensDaRodada` com as próximas 4 posições.
5. Avança o marcador `proximaMensagem` em 4, para a próxima rodada.
6. Chama `carregarMensagem` para exibir a primeira mensagem (posição `0`) dessa nova rodada.

### 3.9 Encerrando o jogo (linhas 397–407)

```js
function encerrarJogo2() {
    botaoEncerrarJogo2.hidden = true;
    botaoProximaRodadaJogo2.hidden = true;
    botaoVerificarJogo2.disabled = true;
    botaoProximaMensagem.disabled = true;

    resultadoJogo2.textContent = "Jogo encerrado! Você jogou " + rodadasJogadas + " rodada(s) e encontrou "
        + sinaisEncontradosTotais + " de " + sinaisPossiveisTotais + " sinais de golpe.";

    progressoJogo2.textContent = "";
}
```
Espelha o `encerrarJogo1` do outro arquivo: esconde os botões de escolha, desativa os botões de jogo, escreve o resumo final e limpa a linha de progresso.

### 3.10 Ligando os botões (linhas 409–419)

```js
botaoVerificarJogo2.addEventListener("click", verificarRespostasJogo2);

botaoProximaMensagem.addEventListener("click", function () {
    posicaoNaRodada = posicaoNaRodada + 1;
    carregarMensagem(mensagensDaRodada[posicaoNaRodada]);
});

botaoProximaRodadaJogo2.addEventListener("click", iniciarRodada);
botaoEncerrarJogo2.addEventListener("click", encerrarJogo2);

iniciarRodada();
```
- O botão "Verificar respostas" chama diretamente `verificarRespostasJogo2`.
- O botão "Próxima mensagem" avança `posicaoNaRodada` em 1 e carrega a mensagem seguinte da rodada — como esse botão fica desativado (`disabled`) logo depois de carregar cada mensagem e na 4ª mensagem da rodada, ele nunca pode ser clicado além do fim da rodada.
- Os dois botões de escolha ligam para `iniciarRodada` e `encerrarJogo2`, do mesmo jeito que no `quiz1.js`.
- A última linha, `iniciarRodada();`, roda uma vez assim que a página abre, deixando a primeira rodada (e a primeira mensagem dela) pronta para o jogador.

---

## 4. Roteiro rápido para explicar de cor

Se alguém pedir para você explicar o código "do zero", siga esta ordem — ela conta a mesma história para os dois mini jogos:

1. **Os dados**: um array de objetos, cada um representando uma pergunta (situação ou mensagem) com sua resposta certa.
2. **As variáveis do topo**: cada `document.getElementById` é só uma "etiqueta" para um pedaço do HTML que o script precisa ler ou mudar.
3. **O "baralho" que nunca acaba**: existe um ponteiro (`proximaSituacao` / `proximaMensagem`) que avança 4 em 4; quando não sobram 4 itens, a lista inteira é embaralhada de novo e o ponteiro volta pro início.
4. **Uma rodada = 4 perguntas**: `iniciarRodada` monta a rodada nova; cada resposta do jogador dispara uma checagem (`verificarFimDaRodada` / dentro de `verificarRespostasJogo2`) que só faz algo quando as 4 já foram respondidas.
5. **Fim de rodada = escolha**: os botões "Encerrar jogo" e "Próxima rodada" só aparecem nesse momento, e o placar (`mostrarProgresso`) é atualizado.
6. **`localStorage`**: assim que a primeira rodada termina, o jogo grava `"sim"` numa gaveta do navegador — é isso que a página `quiz.html` lê para marcar o mini jogo como concluído.

Se você conseguir contar essa história com suas próprias palavras, já consegue explicar qualquer linha específica que alguém apontar — é só reconhecer em qual desses seis passos aquela linha se encaixa.
