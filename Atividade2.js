const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função auxiliar para transformar a pergunta em Promise
function pergunta(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (resposta) => resolve(resposta));
  });
}

async function iniciar() {
  const MEDIA_MINIMA = 7;

  const nomeAluno = await pergunta("Digite o nome do aluno: ");
  const nota1 = Number(await pergunta("Digite a Nota 1: "));
  const nota2 = Number(await pergunta("Digite a Nota 2: "));

  const media = (nota1 + nota2) / 2;

  let situacao;
  let notaRecuperacao = null;

  if (media >= MEDIA_MINIMA) {
    situacao = "APROVADO";
  } else if (media >= 5 && media < MEDIA_MINIMA) {
    situacao = "RECUPERAÇÃO";

    notaRecuperacao = Number(
      await pergunta("Aluno em recuperação. Digite a nota de recuperação: ")
    );

    if (notaRecuperacao < 5) {
      situacao = "REPROVADO";
    } else {
      situacao = "APROVADO";
    }
  } else {
    situacao = "REPROVADO";
  }

  console.log("\n----- RESULTADO -----");
  console.log("Nome do aluno: " + nomeAluno);
  console.log("Nota 1: " + nota1);
  console.log("Nota 2: " + nota2);
  console.log("Média: " + media.toFixed(2));
  if (notaRecuperacao !== null) {
    console.log("Nota de Recuperação: " + notaRecuperacao);
  }
  console.log("Situação do aluno: " + situacao);

  rl.close();
}

iniciar();
