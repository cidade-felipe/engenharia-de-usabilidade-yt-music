# Engenharia de Usabilidade - YouTube Music

Mini site responsivo em HTML, CSS e JavaScript puro para documentar a Avaliação 2 da disciplina de Interface Humano-Computador (IHC). O projeto funciona como uma wiki acadêmica sobre a avaliação de usabilidade do YouTube Music, com foco em leitura clara, evidências visuais e registro das decisões de design.

## Objetivo

Documentar a etapa anterior aos ciclos e os ciclos 1 e 2 de Engenharia de Usabilidade aplicados ao YouTube Music, conectando contexto de uso, persona, diagnóstico heurístico, decisões de melhoria, protótipo, refinamento após avaliação e versão final.

O foco do trabalho é mostrar como problemas de interface impactam a experiência real do usuário. No caso analisado, os principais riscos são perda de controle sobre a fila de reprodução, aumento de esforço cognitivo e redução da previsibilidade da interface.

## Escopo Atual

Fato: o site atualmente documenta dois problemas de usabilidade:

- P1, Quebra de Controle Explícito e Compatibilidade, com severidade alta.
- P2, Sobrecarga Cognitiva na Tela Inicial, com severidade média.

Fato: o Problema P3 foi removido da página principal. A entrega ficou mais enxuta e mais coerente com a priorização do ciclo atual.

Fato: o site agora organiza o trabalho em uma etapa anterior aos ciclos e dois ciclos de prototipação. A etapa anterior reúne contexto, persona, diagnóstico e decisões. O Ciclo 1 começa no protótipo inicial e registra os comentários recebidos. O Ciclo 2 apresenta o protótipo final: o lado "Antes" representa o estado do Ciclo 1, e o lado "Depois" representa o refinamento final.

Inferência: a remoção do P3 ajuda a concentrar a narrativa nos problemas com maior impacto para a experiência de uso e evita que o diagnóstico fique disperso.

Opinião técnica: para uma apresentação acadêmica, essa versão está melhor direcionada. Dois problemas bem explicados, com evidências visuais e decisões de design conectadas, tendem a ser mais fortes do que três problemas tratados de forma superficial.

## Conteúdo da Página

- Cabeçalho com título, subtítulo, aluno, professor e semestre.
- Seção de contexto e justificativa do sistema escolhido.
- Persona principal do usuário analisado.
- Diagnóstico heurístico com base nas heurísticas de Nielsen.
- Prints em PNG para evidenciar os problemas encontrados.
- Decisões de design para melhorar previsibilidade, controle e clareza.
- Protótipo em HTML/CSS/JS mostrando a solução proposta para a fila e para a tela inicial.
- Etapa anterior aos ciclos com contexto, persona, diagnóstico heurístico e decisões de design.
- Ciclo 1 com protótipo inicial e refinamentos baseados nos comentários do teste.
- Ciclo 2 com comparação Antes vs. Depois entre Ciclo 1 e protótipo final, comentários finais e os dois lados interativos.
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

O protótipo reforça as correções principais:

- O botão de ordem aleatória atua somente sobre a playlist atual.
- A rádio automática fica separada em um controle próprio, com estado ligado e desligado.
- A preferência da rádio é apresentada como específica da playlist, não como chave global.
- A fila mostra sugestões futuras da rádio em um bloco separado, com contraste e rótulo de status.
- A remoção de faixa começa com feedback reversível no Ciclo 1 e evolui, no Ciclo 2, para faixa riscada com botão fixo de restaurar.
- Todas as faixas da playlist possuem a ação Remover de forma consistente.
- A tela inicial passa a agrupar conteúdos por intenção de uso e tipo de mídia.
- As abas de Músicas, Álbuns, Vídeos e Playlists têm conteúdo próprio.
- Ações rápidas e prévia progressiva reduzem rigidez sem poluir a interface.

## Etapa Anterior

A etapa anterior aos ciclos reúne a leitura inicial do sistema, a persona, o diagnóstico heurístico e as decisões de design. Ela prepara a justificativa do protótipo, mas ainda não é tratada como ciclo de solução.

## Ciclo 1

O Ciclo 1 começa no protótipo inicial. Os comentários apontaram que esse protótipo melhorou a estética e reduziu a carga cognitiva, mas ainda deixava dúvidas sobre estados, feedback e flexibilidade. Na seção 1.2, os cards registram os comentários íntegros dos colegas, identificados apenas por nome e sobrenome.

Ajustes aplicados:

- Estado ligado/desligado da Rádio Automática.
- Texto explicando que a Rádio Automática vale para a playlist atual.
- Prévia semi-transparente das próximas músicas caso a rádio seja ativada.
- Ação de remover faixa com feedback e opção `Desfazer` no primeiro protótipo.
- Abas funcionais para Músicas, Álbuns, Vídeos e Playlists.
- Prévia progressiva para visualizar conteúdo sem trocar o contexto.

Impacto esperado: menor risco de erro, mais previsibilidade, mais controle para o usuário e redução da sobrecarga cognitiva durante tarefas recorrentes.

## Ciclo 2

O ciclo final resolve os principais pontos do feedback do Ciclo 1 e dos comentários recebidos no Ciclo 2:

- A prévia da Rádio Automática foi redesenhada para não parecer parte da playlist. Ela usa bloco visual separado, maior contraste e texto indicando que as músicas ainda são sugestões futuras.
- A remoção deixou de depender de um aviso temporário. A faixa removida permanece visível, riscada e desabilitada, com botão fixo de `Restaurar`.

Também foi corrigida a inconsistência dos botões de remoção. Agora todas as faixas da playlist exibem a ação `Remover`, evitando dúvida sobre quais itens podem ser excluídos.

No site, o Ciclo 1 permanece como registro do protótipo anterior. No Ciclo 2, os dois blocos de correção são repetidos com a comparação correta:

- `Antes`, estado do Ciclo 1.
- `Depois`, refinamento final do Ciclo 2.

Os comentários íntegros de Karolini, Luis e Theo também ficam registrados no Ciclo 2, com autoria por nome e sobrenome.

Ambos os lados do Ciclo 2 são clicáveis. Isso permite comparar comportamento, não só aparência: o lado `Antes` demonstra o que já existia no Ciclo 1, enquanto o lado `Depois` mostra os ajustes finais de contraste, consistência e microinteração.

Impacto esperado: mais estabilidade visual, menos ambiguidade entre playlist e sugestões futuras, e microinterações mais previsíveis.

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
