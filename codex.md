# Mapa detalhado do projeto

Ultima atualizacao: 01/06/2026.

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
|   |   |-- index.css
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

`src/css/index.css` concentra a identidade visual, layout responsivo, comparacoes Antes/Depois, mockups do YouTube Music, estados de radio automatica, toasts, barra de progresso, remocao pendente nos mocks do Ciclo 2 e animacoes sutis.

`src/css/prototipo-final.css` isola a interface de tela cheia do prototipo final. Isso evita que estilos do relatorio academico vazem para a copia visual do YouTube Music e reduz risco de regressao no restante da entrega.

Na tela expandida do prototipo final, o player de video deve respeitar a largura da propria coluna (`width: min(100%, 760px)`) para nao invadir a fila lateral. A lista fica em uma coluna separada e com `z-index` local, preservando legibilidade mesmo em telas largas ou com zoom do navegador.

`src/js/script.js` concentra comportamento progressivo: menu lateral, progresso de leitura, efeitos de revelacao, brilho leve nos cards, toggle da Radio Automatica, remocao com desfazer no primeiro prototipo, remocao pendente de 7 segundos no Ciclo 2, restauracao de estado, abas do prototipo e previa progressiva. Ele tambem separa os dados historicos das abas do Ciclo 1 dos dados finais do Ciclo 2 por meio de `data-tab-source="final"`, evitando que ajustes finais alterem os mocks antigos.

`src/js/prototipo-final.js` controla o prototipo final em tela cheia: alternancia entre home e player expandido, abas da home final, estado da Radio Automatica no player inferior, aleatorio contextual, selecao da faixa atual e remocao pendente das faixas da fila.

O prototipo final tambem demonstra a correcao do aleatorio. O botao com icone de aleatorio fica ao lado do chip de escopo da fila. Com `Radio off`, ele embaralha apenas as faixas ja presentes na playlist atual. Com `Radio on`, o chip muda para `Playlist + Radio rock` e cada clique no aleatorio troca a fila por recomendacoes de rock nacional e internacional. Nessa acao, o bloco `Sugestoes futuras da Radio` tambem muda: as duas sugestoes exibidas ali sao sempre promovidas para as duas primeiras posicoes da fila, preservando a relacao entre preview e resultado.

Na fila expandida do prototipo final, cada faixa e clicavel e passa a ser a musica atual. O titulo do player grande e o texto do player inferior devem acompanhar essa selecao. O botao `Remover` continua separado da selecao para manter controle do usuario sem acao acidental. Ao remover uma faixa, ela entra em estado pendente por 7 segundos: fica riscada, o botao vira `Restaurar` e um preenchimento vermelho progride pela linha. Se o usuario nao restaurar dentro desse intervalo, a faixa e removida definitivamente da fila. A tela expandida tambem possui um botao fixo `Restaurar tudo`, exibido acima do player inferior, que limpa remocoes pendentes e devolve fila, Radio Automatica, aleatorio e aba inicial ao estado padrao.

O botao de aleatorio do prototipo final deve expor estado selecionado. Ao clicar, ele alterna `aria-pressed` e recebe destaque visual persistente, reforcando visibilidade do status.

A home do `prototipo-final.html` deve espelhar o `Depois` do P2 no Ciclo 2: ela abre com o titulo `Escolha a dedo`, seguido pelas abas `Musicas`, `Albuns`, `Videos` e `Playlists`. Cada aba apresenta 6 itens, e o JavaScript substitui os placeholders do HTML inicial pelos dados atuais de `homeTabContent`. Em `Musicas`, `Albuns` e `Videos`, o recorte atual usa conteudos ligados ao universo Linkin Park para manter coerencia entre cards e informacoes. Em `Playlists`, o recorte mostra listas de uso comum, como estudos, academia, dormir, rock e MPB.

No prototipo em tela cheia, apenas o conteudo util desse P2 deve ocupar o palco principal; nao use uma moldura interna ou uma miniatura do mockup, porque isso desperdiça o espaco da tela e enfraquece a demonstracao. A faixa de titulo da home final deve usar a largura util inteira, sem texto explicativo secundario ao lado e sem grandes vazios laterais. As abas superiores devem ter o mesmo tamanho, usando quatro colunas iguais, para manter consistencia visual entre os controles de categoria. No corpo da home, os cards principais devem ocupar a largura equivalente aos tres primeiros tabs, enquanto o painel lateral de informacoes ocupa apenas a largura equivalente ao quarto tab. Essa decisao reforca a hierarquia: os cards sao a area de exploracao principal, e o painel lateral funciona como uma camada de detalhe sem competir com a lista.

O CSS atual do P2 final usa `--home-p2-gap` para manter o mesmo espacamento entre titulo, tabs, cards e painel. A grade principal da home usa `repeat(4, minmax(0, 1fr))`; `.home-p2-grid` ocupa `grid-column: 1 / 4` e renderiza 6 cards em 3 colunas, enquanto `.home-p2-preview` ocupa `grid-column: 4 / 5`. Em telas menores, esse posicionamento e resetado para uma coluna, evitando overflow lateral.

As microinteracoes atuais da home final incluem hover nos tabs, hover nos cards e hover nos itens do painel lateral. Esses efeitos sao discretos e servem para comunicar clicabilidade sem transformar o prototipo em uma experiencia visual exagerada.

No `index.html`, os blocos de resumo de cada ciclo aparecem antes dos comentarios integrais. Para manter leitura mais confortavel e evitar que o titulo dos comentarios "cole" no card branco anterior, o CSS aplica um espacamento adicional com a regra `.refinement-panel + .section-heading`. Essa decisao e pequena, mas melhora a hierarquia visual do relatorio e ajuda na apresentacao em tela compartilhada, onde proximidade excessiva entre secoes costuma parecer erro de alinhamento.

O menu lateral do relatorio agora espelha melhor a estrutura dos ciclos intermediarios. Em vez de um item generico para "teste e refinamento" ou "comentarios finais", o sumario separa cada etapa em ancora de resumo e ancora de comentarios: `#resumo-ciclo-1`, `#comentarios-ciclo-1`, `#resumo-ciclo-2` e `#comentarios-ciclo-2`. Isso reduz ambiguidade durante a apresentacao, porque permite navegar direto para a parte exata da narrativa, sem obrigar scroll manual dentro da mesma secao.

Na mesma navegacao lateral, o item do segundo ciclo foi renomeado para `Prototipo refinado`, alinhando o menu ao papel real dessa etapa no relatorio. A sidebar tambem passou a ter rolagem propria com `overflow-y: auto`, `overscroll-behavior: contain` e `scrollbar-gutter: stable`, o que evita corte de links em telas menores e deixa a interacao mais previsivel em janelas baixas ou notebooks com zoom.

O bloco que antes aparecia apenas como `Decisao final do ciclo` foi promovido na narrativa para um resumo explicito do `Ciclo Final`. No menu lateral, essa etapa agora tem ancora propria (`#resumo-ciclo-final`) antes de `#prototipo-navegavel`. Na pagina, o titulo do bloco passou a comunicar consolidacao, nao apenas decisao isolada. Isso melhora a leitura academica porque separa com clareza duas camadas: primeiro, o que o ultimo ciclo consolidou; depois, a demonstracao interativa dessa consolidacao no prototipo navegavel.

Depois desse ajuste, o `Resumo do ciclo final` nao fica mais pendurado no fim da secao de comentarios do Ciclo 2. Ele passou a abrir uma secao propria `#ciclo-final`, com o titulo grande `CICLO FINAL`, seguida de duas subetapas dentro da mesma narrativa: `#resumo-ciclo-final` e `#prototipo-navegavel`. Essa organizacao aproxima o fechamento do projeto da estrutura usada nos ciclos anteriores e reduz a sensacao de quebra brusca entre avaliacao e consolidacao final.

`README.md` explica objetivo, execucao e principais decisoes do projeto para quem vai abrir ou avaliar a entrega.

`codex.md` serve como memoria tecnica para futuras alteracoes feitas por agentes ou pessoas desenvolvedoras.

## Etapas documentadas

### Etapa anterior aos ciclos

A etapa anterior aos ciclos apresenta o contexto, a persona, o diagnostico inicial e as decisoes de design. Ela conecta prints reais em PNG aos problemas de usabilidade e usa heuristicas de Nielsen para justificar por que cada problema prejudica a experiencia.

### Ciclo 1

O Ciclo 1 comeca no prototipo inicial Antes/Depois. Ele transforma o diagnostico anterior em uma proposta navegavel e registra o teste com comentarios integros dos colegas. A secao 1.2 usa apenas nome e sobrenome dos autores no rotulo superior de cada card, sem matricula.

### Ciclo 2

O Ciclo 2 representa o refinamento apos o teste do Ciclo 1. No `index.html`, a secao 2.1 mostra um prototipo refinado aplicando apenas os 4 comentarios do Ciclo 1 (Arthur, Theo, Luis e Karolini). Na secao 2.2, ficam os 3 comentarios mais recentes (Ciclo 2). O `prototipo-final.html` e a consolidacao final, feita para atender de vez as sugestoes do Ciclo 2 sem misturar etapas na narrativa.

- `Antes`, representando o estado do Ciclo 1.
- `Depois`, representando o prototipo refinado do Ciclo 2 (a partir dos comentarios do Ciclo 1).

Essa separacao e importante porque evita confundir evolucao historica com estado final. O avaliador consegue ver o que existia no ciclo anterior e o que mudou apos os feedbacks. Sempre que o `Depois` do Ciclo 1 mudar, o `Antes` do Ciclo 2 deve espelhar esse estado atualizado.

A secao 2.2 usa um layout proprio para aproveitar melhor o espaco horizontal: Theo fica em destaque na coluna esquerda por ser o comentario mais longo, enquanto Karolini e Luis ficam empilhados na coluna direita. O card maior estica ate a mesma altura visual da coluna direita, evitando um vazio abaixo dele. Em telas menores, esse bloco volta para uma coluna, preservando legibilidade.

## Interacoes atuais do Ciclo 2

No P1 do Ciclo 2, os dois lados sao interativos:

- O lado `Antes` representa o prototipo do Ciclo 1 antes de aplicar o feedback: fila sem feedback reversivel e sem previa das proximas musicas.
- O lado `Depois` aplica os 4 comentarios do Ciclo 1: toggle explicito da Radio Automatica, previa semitransparente das proximas musicas e acao critica com `Desfazer` via toast.
- Cada lado possui um botao de restaurar estado inicial abaixo da imagem, fora do mockup, para deixar claro que e uma acao de reset da demonstracao.

No P2 do Ciclo 2, os dois lados tambem sao interativos:

- O lado `Antes` ilustra uma navegacao com evidencia limitada, sem provar que cada aba possui previa e conteudo proprio.
- O lado `Depois` aplica os 4 comentarios do Ciclo 1: abas funcionais com conteudo proprio, previa progressiva e evidencia de comportamento em cada categoria.
- O estado final do P2 com `Escolha a dedo`, 6 itens por aba e painel de informacoes fica no `prototipo-final.html`, junto com as microinteracoes finais do Ciclo 2.

## Decisoes de design

A interface geral evita uma landing page promocional e prioriza uma experiencia de leitura e revisao. Isso combina melhor com o tipo de entrega academica, porque o avaliador precisa escanear contexto, evidencias, decisoes e resultados.

A paleta usa base neutra com vermelho associado ao YouTube Music. O vermelho e usado como acento de estado, impacto, botoes importantes e destaques de problema. O fundo claro e quadriculado ajuda a separar a pagina documental dos mockups escuros.

Os cards e paineis mantem raio pequeno, seguindo uma linguagem mais documental e menos decorativa. Os efeitos sao leves, com entrada suave e hover discreto, para melhorar percepcao de acabamento sem competir com o conteudo.

## Decisoes de implementacao

O projeto usa HTML, CSS e JavaScript puro. Essa escolha reduz custo de manutencao, elimina build, evita dependencias externas e facilita publicacao via GitHub Pages.

Os controles interativos usam atributos `data-*`, como `data-radio-toggle`, `data-remove-track`, `data-undo-toast`, `data-tab-group`, `data-tab-panel`, `data-progressive-preview`, `data-home-tab`, `data-home-card-panel`, `data-home-preview-list`, `data-queue-list`, `data-shuffle-button` e `data-radio-button`. Essa abordagem mantem o JavaScript desacoplado da ordem visual e dos textos.

O JS foi escrito em funcoes pequenas:

- `prepareRadioPrototype`, controla estado da Radio Automatica e atualiza copy da preview.
- `prepareUndoFeedback`, controla remocao temporaria com `Desfazer` nos mocks do `index.html` e reset dos prototipos.
- `renderTab`, troca conteudo das abas e escolhe entre os dados historicos e os dados finais conforme o `data-tab-source` do mock.
- `preparePrototypeTabs`, conecta botoes de aba ao conteudo.
- `prepareProgressivePreview`, alterna expansao da previa.
- `renderHomeTab`, no `prototipo-final.js`, troca os dados da home final entre musicas, albuns, videos e playlists.
- `renderQueue`, no `prototipo-final.js`, reconstrui a fila expandida com faixa atual, capa, artista, duracao e botao de remocao.
- `shuffleQueue`, no `prototipo-final.js`, alterna o estado visual do aleatorio e muda a fila conforme a Radio Automatica esteja ligada ou desligada.
- `selectTrack`, no `prototipo-final.js`, permite clicar em uma faixa da fila para torna-la a musica atual no player grande e no player inferior.
- `toggleTrackState`, `restorePendingRemoval` e `finalizeTrackRemoval`, no `prototipo-final.js`, formam o fluxo de exclusao pendente: remover inicia a contagem visual de 7 segundos, restaurar cancela o timer e finalizar retira a faixa da fila. A funcao `restorePrototypeState` restaura a experiencia completa pelo botao fixo `Restaurar tudo`.

## Pontos de atencao

O site deve continuar funcionando abrindo `index.html` diretamente no navegador. Por isso, links para CSS, JS e imagens devem ser relativos e respeitar caixa de letras. Isso e essencial para GitHub Pages.

Sempre que `src/css/index.css` ou `src/js/script.js` forem alterados, atualize tambem as query strings do `index.html`. Sempre que `src/css/prototipo-final.css` ou `src/js/prototipo-final.js` forem alterados, atualize tambem a query string no `prototipo-final.html`. Isso reduz risco de o GitHub Pages ou o navegador manterem uma versao antiga em cache. No estado atualizado em 31/05/2026, CSS e JS do `index.html` usam `v=20260531-restore-all-7s`, enquanto CSS e JS do prototipo final usam `v=20260531-restore-all-7s`.

Evite transformar o projeto em aplicacao com build, a menos que exista uma necessidade real. Para esta entrega, simplicidade e portabilidade sao vantagens.

Ao alterar arquivos existentes, siga a regra de backup do projeto: criar pasta diaria em `Backup`, copiar a versao anterior dos arquivos e preservar subpastas quando necessario.

O Ciclo 1 deve permanecer como registro historico. Melhorias finais devem ser aplicadas no Ciclo 2, especialmente nos blocos em que `Antes` representa Ciclo 1 e `Depois` representa Ciclo 2.

No `Depois` do Ciclo 1, os mocks devem permanecer em um nivel de funcionalidade limitado. Em P1, o botao `Remover` pode aparecer como elemento visual do prototipo, mas nao deve acionar cronometro, exclusao temporizada ou fluxo completo de desfazer; esse comportamento pertence ao Ciclo 2. Em P2, as abas do `Depois` do Ciclo 1 devem comunicar agrupamento visual, mas nao devem abrir todas as categorias com conteudo proprio. A interacao completa das abas, com `data-tab-group`, troca dinamica e previa expandivel, fica reservada para o Ciclo 2.

Para P1 especificamente, o `Antes` do Ciclo 2 deve espelhar esse mesmo fechamento visual do Ciclo 1: playlist isolada, Radio Automatica como controle separado, botao `Remover` visivel e previa das proximas musicas da Radio. A diferenca e que esse lado `Antes` continua sem `data-remove-track` e sem `data-undo-toast`, ou seja, ainda nao dispara cronometro nem fluxo de exclusao. O lado `Depois` do Ciclo 2 e quem demonstra a reversao temporizada e o comportamento completo.

## Validacao recomendada

Depois de qualquer alteracao, validar:

- `node --check src/js/script.js`, para garantir que o JavaScript nao tem erro de sintaxe.
- `node --check src/js/prototipo-final.js`, para garantir que o prototipo final navegavel continua sem erro de sintaxe.
- `git diff --check`, para detectar espacos problematicos.
- Abertura local do `index.html`, conferindo se CSS e JS carregam.
- Abertura local do `prototipo-final.html`, conferindo a home final com 6 cards por aba, o painel lateral e a alternancia para a fila expandida.
- Publicacao no GitHub Pages, conferindo se os caminhos relativos funcionam.
- Ciclo 2 P1, testar Radio Automatica, Remover, preenchimento vermelho de 7 segundos, Restaurar por faixa, exclusao definitiva e restauracao geral pelo botao fixo.
- Ciclo 2 P2, testar todas as abas no lado `Depois`, conferindo 6 itens por aba, cards consistentes e painel lateral de informacoes alinhado ao prototipo final.

## Criterio de qualidade

Uma boa alteracao neste projeto deve deixar a narrativa mais clara e o prototipo mais demonstravel. O avaliador precisa entender rapidamente qual era o problema, qual decisao foi tomada, como o prototipo responde ao feedback e qual risco de usabilidade foi reduzido.

O melhor caminho costuma ser o simples: HTML semantico, CSS organizado, JS pequeno e comportamento previsivel. Isso reduz risco de erro na apresentacao, facilita manutencao e aumenta confianca na entrega final.

As secoes de comentarios do Ciclo 1 e do Ciclo 2 agora possuem um bloco-resumo proprio no fechamento. Esses paineis nao substituem os comentarios integrais nem os blocos de ajustes; eles funcionam como leitura executiva da rodada, separando elogios recorrentes de sugestoes consolidadas. No Ciclo 1, o resumo fica abaixo do painel `Ajustes aplicados apos a avaliacao`, deixando claro o que foi implementado e, em seguida, qual foi o saldo avaliativo da turma. No Ciclo 2, o resumo fica logo apos os tres comentarios finais e prepara a transicao para o `Ciclo Final`, sintetizando o que foi validado e o que motivou a consolidacao final no prototipo navegavel.
