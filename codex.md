# Mapa detalhado do projeto

Ultima atualizacao: 30/05/2026.

## Visao geral

Este projeto e um site estatico criado para a Avaliacao 2 da disciplina de Interface Humano-Computador, com foco em Engenharia de Usabilidade aplicada ao YouTube Music. A pagina funciona como uma wiki academica: ela documenta contexto, persona, diagnostico heuristico, problemas encontrados, evidencias visuais, decisoes de redesign, prototipos e ciclos de refinamento.

O objetivo principal nao e reproduzir o YouTube Music de forma completa. O objetivo e demonstrar, de forma clara e apresentavel, como problemas especificos de interface afetam controle do usuario, previsibilidade, carga cognitiva e prevencao de erros. Por isso, os prototipos sao recortes funcionais e focados nos dois problemas priorizados.

## Escopo funcional

O site documenta dois problemas de usabilidade:

- P1, fila de reproducao e ordem aleatoria. O problema central e a mistura entre musicas da playlist e recomendacoes automaticas, gerando quebra de expectativa e perda de controle.
- P2, tela inicial e organizacao do conteudo. O problema central e a mistura visual entre tipos de midia, como musicas, albuns, videos, covers, lives e playlists, aumentando o esforco cognitivo.

O antigo P3 foi removido da narrativa principal para reduzir dispersao. A decisao fortalece a apresentacao porque concentra a argumentacao nos problemas com maior impacto e maior relacao direta com as heuristicas trabalhadas.

## Publico e contexto de uso

O usuario representado pela persona usa o YouTube Music durante estudo, trabalho e momentos em que precisa manter foco. Nesse contexto, mudancas inesperadas na fila de reproducao sao mais prejudiciais do que em um uso casual, porque interrompem concentracao e obrigam o usuario a recuperar o estado mental da tarefa.

O impacto pratico das melhorias e reduzir atrito em tarefas recorrentes. Em termos de produto, isso tende a aumentar confianca, diminuir abandono de sessao, reduzir frustracao e melhorar retencao em playlists de foco, estudo ou trabalho.

## Estrutura de arquivos

```text
.
|-- index.html
|-- prototipo-final.html
|-- README.md
|-- codex.md
|-- src
|   |-- css
|   |   |-- styles.css
|   |   `-- prototipo-final.css
|   |-- img
|   |   |-- fila-antes.png
|   |   |-- fila-depois.png
|   |   |-- notificacao-rapida.png
|   |   `-- tela-inicial-poluida.png
|   `-- js
|       |-- script.js
|       `-- prototipo-final.js
|-- conteudo_aula.md
|-- instrucoes_agente.md
`-- instrucoes_trabalho.md
```

## Responsabilidade dos arquivos principais

`index.html` concentra o conteudo da entrega e a estrutura dos prototipos. Ele tambem define os atributos `data-*` usados pelo JavaScript para ativar interacoes sem acoplar comportamento a textos visiveis.

`prototipo-final.html` e a copia navegavel em tela cheia das duas telas finais inspiradas nos prints do YouTube Music. A primeira tela representa a home com organizacao resolvida e acesso ao player expandido pelo botao do canto inferior direito. A segunda tela representa o player/fila expandido e volta para a home pelo botao equivalente no canto inferior direito.

`src/css/styles.css` concentra a identidade visual, layout responsivo, comparacoes Antes/Depois, mockups do YouTube Music, estados de radio automatica, toasts, barra de progresso e animacoes sutis.

`src/css/prototipo-final.css` isola a interface de tela cheia do prototipo final. Isso evita que estilos do relatorio academico vazem para a copia visual do YouTube Music e reduz risco de regressao no restante da entrega.

Na tela expandida do prototipo final, o player de video deve respeitar a largura da propria coluna (`width: min(100%, 760px)`) para nao invadir a fila lateral. A lista fica em uma coluna separada e com `z-index` local, preservando legibilidade mesmo em telas largas ou com zoom do navegador.

`src/js/script.js` concentra comportamento progressivo: menu lateral, progresso de leitura, efeitos de revelacao, brilho leve nos cards, toggle da Radio Automatica, remocao com desfazer no primeiro prototipo, restauracao fixa no prototipo final, restauracao de estado, abas do prototipo e previa progressiva.

`src/js/prototipo-final.js` controla o prototipo final em tela cheia: alternancia entre home e player expandido, estado da Radio Automatica no player inferior e remocao/restauracao fixa das faixas da fila.

O prototipo final tambem demonstra a correcao do aleatorio. O botao com icone de aleatorio fica ao lado do chip de escopo da fila. Com `Radio off`, ele embaralha apenas as faixas ja presentes na playlist atual. Com `Radio on`, o chip muda para `Playlist + Radio rock` e cada clique no aleatorio troca a fila por recomendacoes de rock nacional e internacional. Nessa acao, o bloco `Sugestoes futuras da Radio` tambem muda: as duas sugestoes exibidas ali sao sempre promovidas para as duas primeiras posicoes da fila, preservando a relacao entre preview e resultado.

Na fila expandida do prototipo final, cada faixa e clicavel e passa a ser a musica atual. O titulo do player grande e o texto do player inferior devem acompanhar essa selecao. O botao `Remover` continua separado da selecao para manter controle do usuario sem acao acidental.

O botao de aleatorio do prototipo final deve expor estado selecionado. Ao clicar, ele alterna `aria-pressed` e recebe destaque visual persistente, reforcando visibilidade do status.

A home do `prototipo-final.html` deve espelhar o `Depois` do P2 no Ciclo 2: abas `Musicas`, `Albuns`, `Videos` e `Playlists`, cards consistentes e painel de previa contextual. No prototipo em tela cheia, apenas o conteudo util desse P2 deve ocupar o palco principal; nao use uma moldura interna ou uma miniatura do mockup, porque isso desperdiça o espaco da tela e enfraquece a demonstracao. A faixa de titulo da home final deve usar a largura util inteira, sem texto explicativo secundario ao lado e sem grandes vazios laterais. As abas superiores devem ter o mesmo tamanho, usando quatro colunas iguais, para manter consistencia visual entre os controles de categoria. No corpo da home, os cards principais devem ocupar a largura equivalente aos tres primeiros tabs, enquanto o painel lateral de informacoes ocupa apenas a largura equivalente ao quarto tab.

`README.md` explica objetivo, execucao e principais decisoes do projeto para quem vai abrir ou avaliar a entrega.

`codex.md` serve como memoria tecnica para futuras alteracoes feitas por agentes ou pessoas desenvolvedoras.

## Etapas documentadas

### Etapa anterior aos ciclos

A etapa anterior aos ciclos apresenta o contexto, a persona, o diagnostico inicial e as decisoes de design. Ela conecta prints reais em PNG aos problemas de usabilidade e usa heuristicas de Nielsen para justificar por que cada problema prejudica a experiencia.

### Ciclo 1

O Ciclo 1 comeca no prototipo inicial Antes/Depois. Ele transforma o diagnostico anterior em uma proposta navegavel e registra o teste com comentarios integros dos colegas. A secao 1.2 usa apenas nome e sobrenome dos autores no rotulo superior de cada card, sem matricula.

### Ciclo 2

O Ciclo 2 e o fechamento. Ele repete os dois comparativos la embaixo e registra, na secao 2.2, os comentarios integros de Karolini, Luis e Theo sobre esse ciclo:

- `Antes`, representando o estado do Ciclo 1.
- `Depois`, representando o refinamento final do Ciclo 2.

Essa separacao e importante porque evita confundir evolucao historica com estado final. O avaliador consegue ver o que existia no ciclo anterior e o que mudou apos os feedbacks. Sempre que o `Depois` do Ciclo 1 mudar, o `Antes` do Ciclo 2 deve espelhar esse estado atualizado.

A secao 2.2 usa um layout proprio para aproveitar melhor o espaco horizontal: Theo fica em destaque na coluna esquerda por ser o comentario mais longo, enquanto Karolini e Luis ficam empilhados na coluna direita. O card maior estica ate a mesma altura visual da coluna direita, evitando um vazio abaixo dele. Em telas menores, esse bloco volta para uma coluna, preservando legibilidade.

## Interacoes atuais do Ciclo 2

No P1 do Ciclo 2, os dois lados sao interativos:

- O lado `Antes` simula o estado do Ciclo 1, com toggle de Radio Automatica, preview semitransparente e remocao com desfazer em uma faixa.
- O lado `Depois` simula o estado final do Ciclo 2, com toggle de Radio Automatica, todos os botoes `Remover`, preview final mais contrastada e restauracao fixa por faixa.
- Os botoes `Remover` podem ser clicados um por um. Cada faixa permanece na lista com estado riscado/desabilitado, e o botao da propria faixa vira `Restaurar`.
- Cada lado possui um botao de restaurar estado inicial abaixo da imagem, fora do mockup, para deixar claro que e uma acao de reset da demonstracao.

No P2 do Ciclo 2, os dois lados tambem sao interativos:

- O lado `Antes` mostra o comportamento do Ciclo 1, com abas funcionais e previa progressiva.
- O lado `Depois` inicia em `Playlists`, porque esse e o estado final mais relevante para provar que o agrupamento ficou consistente.
- O lado `Depois` usa um painel fixo de previa contextual, separado dos cards principais. Isso diferencia claramente o Ciclo 2 do Ciclo 1 e mostra que `Musicas`, `Albuns`, `Videos` e `Playlists` possuem evidencia propria sem abrir outra tela.
- As abas `Musicas`, `Albuns`, `Videos` e `Playlists` alteram titulo, descricao, cards e itens do painel de previa.

## Decisoes de design

A interface geral evita uma landing page promocional e prioriza uma experiencia de leitura e revisao. Isso combina melhor com o tipo de entrega academica, porque o avaliador precisa escanear contexto, evidencias, decisoes e resultados.

A paleta usa base neutra com vermelho associado ao YouTube Music. O vermelho e usado como acento de estado, impacto, botoes importantes e destaques de problema. O fundo claro e quadriculado ajuda a separar a pagina documental dos mockups escuros.

Os cards e paineis mantem raio pequeno, seguindo uma linguagem mais documental e menos decorativa. Os efeitos sao leves, com entrada suave e hover discreto, para melhorar percepcao de acabamento sem competir com o conteudo.

## Decisoes de implementacao

O projeto usa HTML, CSS e JavaScript puro. Essa escolha reduz custo de manutencao, elimina build, evita dependencias externas e facilita publicacao via GitHub Pages.

Os controles interativos usam atributos `data-*`, como `data-radio-toggle`, `data-remove-track`, `data-undo-toast`, `data-tab-group`, `data-tab-panel` e `data-progressive-preview`. Essa abordagem mantem o JavaScript desacoplado da ordem visual e dos textos.

O JS foi escrito em funcoes pequenas:

- `prepareRadioPrototype`, controla estado da Radio Automatica e atualiza copy da preview.
- `prepareUndoFeedback`, controla remocao temporaria com desfazer no Ciclo 1, restauracao fixa por faixa no Ciclo 2 e reset dos prototipos.
- `renderTab`, troca conteudo das abas.
- `preparePrototypeTabs`, conecta botoes de aba ao conteudo.
- `prepareProgressivePreview`, alterna expansao da previa.

## Pontos de atencao

O site deve continuar funcionando abrindo `index.html` diretamente no navegador. Por isso, links para CSS, JS e imagens devem ser relativos e respeitar caixa de letras. Isso e essencial para GitHub Pages.

Evite transformar o projeto em aplicacao com build, a menos que exista uma necessidade real. Para esta entrega, simplicidade e portabilidade sao vantagens.

Ao alterar arquivos existentes, siga a regra de backup do projeto: criar pasta diaria em `Backup`, copiar a versao anterior dos arquivos e preservar subpastas quando necessario.

O Ciclo 1 deve permanecer como registro historico. Melhorias finais devem ser aplicadas no Ciclo 2, especialmente nos blocos em que `Antes` representa Ciclo 1 e `Depois` representa Ciclo 2.

## Validacao recomendada

Depois de qualquer alteracao, validar:

- `node --check src/js/script.js`, para garantir que o JavaScript nao tem erro de sintaxe.
- `git diff --check`, para detectar espacos problematicos.
- Abertura local do `index.html`, conferindo se CSS e JS carregam.
- Publicacao no GitHub Pages, conferindo se os caminhos relativos funcionam.
- Ciclo 2 P1, testar Radio Automatica, Remover, estado riscado/desabilitado, Restaurar por faixa e restauracao geral.
- Ciclo 2 P2, testar todas as abas e a previa progressiva nos dois lados.

## Criterio de qualidade

Uma boa alteracao neste projeto deve deixar a narrativa mais clara e o prototipo mais demonstravel. O avaliador precisa entender rapidamente qual era o problema, qual decisao foi tomada, como o prototipo responde ao feedback e qual risco de usabilidade foi reduzido.

O melhor caminho costuma ser o simples: HTML semantico, CSS organizado, JS pequeno e comportamento previsivel. Isso reduz risco de erro na apresentacao, facilita manutencao e aumenta confianca na entrega final.
