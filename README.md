# Engenharia de Usabilidade - YouTube Music

Projeto acadêmico de Interface Humano-Computador (IHC) em formato de site estático. Ele documenta uma avaliação heurística do YouTube Music e evolui uma proposta de redesign em ciclos, com comparativos Antes/Depois e um protótipo final navegável.

Fato: o repositório não é um clone funcional do YouTube Music. Ele é um recorte demonstrável, focado em tornar visíveis problemas de controle, previsibilidade e carga cognitiva, e em provar a correção via protótipos interativos.

## O que você encontra aqui

- `index.html`: relatório navegável (contexto, persona, diagnóstico, decisões, ciclos e comentários).
- `prototipo-final.html`: protótipo final em tela cheia (duas telas, home e fila expandida).
- Evidências em PNG em `src/img` e estilos/scripts em `src/css` e `src/js`.
- `codex.md`: “memória técnica” do projeto (como está organizado e o que cada parte faz).

## Problemas priorizados (P1 e P2)

O trabalho concentra a análise em dois problemas:

1. P1. Fila de reprodução e ordem aleatória: quebra de expectativa quando sugestões entram na fila sem controle explícito, e confusão entre “aleatório da playlist” e “rádio automática”.
2. P2. Tela inicial e organização do conteúdo: mistura visual de tipos de mídia e excesso de estímulos, aumentando o esforço de leitura e decisão.

Opinião técnica: esses dois pontos têm alto impacto porque aparecem em tarefas recorrentes. Em produto, reduzir “surpresa ruim” na fila tende a aumentar confiança e retenção, e reduzir sobrecarga na home tende a melhorar descoberta com menos fricção.

## Como abrir (sem instalar nada)

O projeto é 100% estático (HTML/CSS/JS). Não tem build e não precisa instalar dependências.

1. Abra `index.html` no navegador.
2. No final do ciclo 2, clique em “Abrir protótipo final” para abrir `prototipo-final.html`.

Dica: se você estiver avaliando pelo GitHub Pages e algo parecer “desatualizado”, pode ser cache. Este projeto usa query strings nos arquivos de CSS/JS justamente para reduzir esse risco.

## Como navegar pelo relatório

- Ciclo 1: protótipo inicial e comentários recebidos.
- Ciclo 2: protótipo final (P1 e P2) e comentários íntegros (priorizando feedback mais recente).
- Protótipo navegável: versão em tela cheia, mais fiel ao comportamento final.

## O que o protótipo final demonstra (de forma prática)

P1. Fila e aleatório/radio

- Rádio automática fica explícita (toggle), com texto de estado para reduzir ambiguidade.
- O botão de aleatório muda de comportamento conforme Rádio estiver on/off.
- Sugestões futuras ficam em bloco separado, para não parecerem parte da playlist.

Remoção com confirmação visual (mistura do feedback do Theo e da Karolini)

- Ao clicar em `Remover`, a faixa entra em estado pendente por 7 segundos.
- A linha fica riscada e recebe preenchimento vermelho progressivo (indicador visual do tempo).
- O botão vira `Restaurar` durante a janela, e depois a faixa some de vez.
- Existe um botão fixo `Restaurar tudo` na tela expandida para voltar a fila/controles ao estado inicial de demonstração.

P2. Home organizada

- A home abre em `Escolha a dedo`, com abas `Músicas/Álbuns/Vídeos/Playlists` com o mesmo tamanho.
- Cada aba mostra 6 itens, e um painel de informações contextual muda junto (ex.: duração, número de faixas, etc.).

## Estrutura do repositório

```text
.
├── index.html
├── prototipo-final.html
├── README.md
├── codex.md
├── LICENSE
├── gitignore
└── src/
    ├── css/
    │   ├── index.css
    │   └── prototipo-final.css
    ├── img/
    └── js/
        ├── script.js
        └── prototipo-final.js
```

## Manutenção rápida (se você for mexer no projeto)

- Ao alterar `src/css/index.css` ou `src/js/script.js`, atualize as query strings no `index.html`.
- Ao alterar `src/css/prototipo-final.css` ou `src/js/prototipo-final.js`, atualize as query strings no `prototipo-final.html`.
- Antes de alterar arquivos, o projeto segue uma regra de backup em `Backup/dd_mm_aaaa/`.

## Validação sugerida

Fato: não existe suíte de testes aqui, então a validação é “sanidade”.

- `node --check src/js/script.js`
- `node --check src/js/prototipo-final.js`
- Abrir `index.html` e `prototipo-final.html` no navegador e testar as interações principais (rádio, aleatório, remover/restaurar, restaurar tudo, abas da home).

## Licença e autoria

- Licença MIT: veja `LICENSE`.
- Autor: Felipe Cidade Soares.
