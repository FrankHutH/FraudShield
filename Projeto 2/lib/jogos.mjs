// Regras compartilhadas pelos dois jogos, sem dependências do navegador.
export const PONTOS_POR_ACERTO = 10;

export function sortearRodada(lista, quantidade = 4, aleatorio = Math.random) {
  const itens = [...lista];
  for (let indice = itens.length - 1; indice > 0; indice--) {
    const sorteado = Math.floor(aleatorio() * (indice + 1));
    [itens[indice], itens[sorteado]] = [itens[sorteado], itens[indice]];
  }
  return itens.slice(0, quantidade);
}

export function classificarSituacao(situacao, resposta) {
  return situacao.respostaCorreta === resposta;
}

export function normalizar(palavra) {
  return palavra.toLocaleLowerCase("pt-BR").replace(/[.,!?;:]/g, "");
}

export function avaliarMensagem(mensagem, selecionados) {
  const sinais = mensagem.sinaisSuspeitos.map(normalizar);
  let encontrados = 0;
  let incorretos = 0;

  const marcacoes = mensagem.texto.split(" ").map((palavra, indice) => {
    const suspeita = sinais.includes(normalizar(palavra));
    const selecionada = selecionados.includes(indice);
    if (suspeita && selecionada) encontrados++;
    if (!suspeita && selecionada) incorretos++;
    return suspeita && selecionada ? "correta" : selecionada ? "incorreta" : suspeita ? "perdida" : "";
  });

  return {
    marcacoes,
    encontrados,
    incorretos,
    possiveis: sinais.length,
    acertou: encontrados === sinais.length && incorretos === 0
  };
}
