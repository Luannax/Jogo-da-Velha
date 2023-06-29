import React, { useState } from "react";
import './JogoDaVelha.css';

const JogoDaVelha = () => {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(""));
  const [jogadorAtual, setJogadorAtual] = useState("X");
  const [vencedor, setVencedor] = useState(null);

  const jogada = (indice) => {
    if (tabuleiro[indice] !== "" || vencedor) {
      return;
    }

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = jogadorAtual;
    setTabuleiro(novoTabuleiro);

    if (verificarVencedor(novoTabuleiro, jogadorAtual)) {
      setVencedor(jogadorAtual);
    } else if (novoTabuleiro.every((celula) => celula !== "")) {
      setVencedor("Empate");
    } else {
      setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
    }
  };

  const reiniciarJogo = () => {
    setTabuleiro(Array(9).fill(""));
    setJogadorAtual("X");
    setVencedor(null);
  };

  const verificarVencedor = (tabuleiro, jogador) => {
    const combinacoesVencedoras = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
      [0, 4, 8], [2, 4, 6] // diagonais
    ];

    for (let combinacao of combinacoesVencedoras) {
      const [a, b, c] = combinacao;
      if (
        tabuleiro[a] === jogador &&
        tabuleiro[b] === jogador &&
        tabuleiro[c] === jogador
      ) {
        return true;
      }
    }

    return false;
  };

  const renderCelula = (indice) => {
    return (
      <div className="celula" onClick={() => jogada(indice)}>
        {tabuleiro[indice]}
      </div>
    );
  };

  return (
    <div className="jogo-da-velha">
      <h2>Jogo da Velha</h2>
      <div className="tabuleiro">
        {tabuleiro.map((_, indice) => renderCelula(indice))}
      </div>
      {vencedor && (
        <div className="mensagem">
          {vencedor === "Empate" ? (
            <p>O jogo empatou!</p>
          ) : (
            <p>O jogador {vencedor} venceu!</p>
          )}
          <button onClick={reiniciarJogo}>Reiniciar</button>
        </div>
      )}
        <div className="footer">
            <a href="https://github.com/Luannax" target="_blank" rel="noopener noreferrer">Feito por Luanna</a>
        </div>
    </div>
  );
};

export default JogoDaVelha;
