# Engenharia de Usabilidade - YouTube Music

Mini site responsivo em HTML, CSS e JavaScript puro para documentar a Avaliação 2 da disciplina de Interface Humano-Computador (IHC). O projeto funciona como uma wiki acadêmica sobre a avaliação de usabilidade do YouTube Music, com foco em leitura clara, evidências visuais e registro das decisões de design.

## Objetivo

Documentar o Ciclo 1 de Engenharia de Usabilidade aplicado ao YouTube Music, conectando contexto de uso, persona, diagnóstico heurístico e decisões de melhoria.

O foco do trabalho é mostrar como problemas de interface impactam a experiência real do usuário. No caso analisado, os principais riscos são perda de controle sobre a fila de reprodução, aumento de esforço cognitivo e redução da previsibilidade da interface.

## Escopo Atual

Fato: o site atualmente documenta dois problemas de usabilidade:

- P1, Quebra de Controle Explícito e Compatibilidade, com severidade alta.
- P2, Sobrecarga Cognitiva na Tela Inicial, com severidade média.

Fato: o Problema P3 foi removido da página principal. A entrega ficou mais enxuta e mais coerente com a priorização do ciclo atual.

Inferência: a remoção do P3 ajuda a concentrar a narrativa nos problemas com maior impacto para a experiência de uso e evita que o diagnóstico fique disperso.

Opinião técnica: para uma apresentação acadêmica, essa versão está melhor direcionada. Dois problemas bem explicados, com evidências visuais e decisões de design conectadas, tendem a ser mais fortes do que três problemas tratados de forma superficial.

## Conteúdo da Página

- Cabeçalho com título, subtítulo, aluno, professor e semestre.
- Seção de contexto e justificativa do sistema escolhido.
- Persona principal do usuário analisado.
- Diagnóstico heurístico com base nas heurísticas de Nielsen.
- Prints em PNG para evidenciar os problemas encontrados.
- Decisões de design para melhorar previsibilidade, controle e clareza.
- Navegação lateral no estilo wiki.
- Barra de progresso de leitura.
- Efeitos leves de entrada e realce nos cards.

## Estrutura do Projeto

```text
.
├── index.html
├── README.md
├── src
│   ├── css
│   │   └── styles.css
│   ├── img
│   │   ├── fila-antes.png
│   │   ├── fila-depois.png
│   │   ├── notificacao-rapida.png
│   │   └── tela-inicial-poluida.png
│   └── js
│       └── script.js
├── conteudo_aula.md
├── instrucoes_agente.md
└── instrucoes_trabalho.md
```

## Como Executar

Como o projeto é estático, não precisa instalar dependências.

Opção simples:

```text
Abra o arquivo index.html diretamente no navegador.
```

Opção com servidor local:

```bash
python -m http.server 5500
```

Depois acesse:

```text
http://localhost:5500
```

## Onde Alterar os Prints

Os prints usados no site ficam em:

```text
src/img
```

Arquivos principais:

- `fila-antes.png`, print da fila antes do clique em reprodução aleatória.
- `fila-depois.png`, print da fila depois da inserção de músicas sugeridas.
- `tela-inicial-poluida.png`, print da tela inicial com alta densidade informacional.

O arquivo `notificacao-rapida.png` ainda existe na pasta de imagens, mas não é usado pela página principal após a remoção do P3.

## Decisões de Design

A interface usa uma estética limpa, parecida com wiki ou documentação colaborativa. A paleta é neutra, com detalhes em vermelho e preto para manter relação visual com o YouTube Music.

As interações foram mantidas sutis:

- A barra de progresso ajuda o leitor a entender o avanço na página.
- A navegação lateral facilita voltar rapidamente para cada seção.
- Os cards usam realce leve no hover para dar sensação de acabamento.
- Os blocos aparecem suavemente ao rolar, sem distrair da leitura.

Essa abordagem reduz custo de manutenção, evita dependências desnecessárias e mantém a entrega fácil de abrir, revisar e apresentar.

## Validação Recomendada

Antes da entrega final, vale conferir:

- Se todos os prints estão atualizados e legíveis.
- Se os textos batem com a fala da apresentação.
- Se o site abre corretamente no Chrome, Edge ou Firefox.
- Se a página funciona bem em notebook e celular.
- Se as evidências visuais realmente demonstram os problemas descritos.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro

Sem frameworks, sem build e sem dependências externas.
