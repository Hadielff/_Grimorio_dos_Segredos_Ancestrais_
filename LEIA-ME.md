# Grimório dos Segredos Ancestrais

Aplicativo web progressivo (PWA) em português brasileiro, com visual de manuscrito, capa original, navegação entre capítulos, sumário por volumes, pesquisa, favoritos, marcadores de conclusão, progresso local, enigmas, capítulos secretos, ajuste de fonte, exportação/importação de progresso e cache offline.

## Arquivos

- `index.html` — estrutura da interface.
- `styles.css` — visual responsivo de pergaminho e manuscrito.
- `app.js` — capítulos, navegação, desbloqueios, enigmas e salvamento.
- `manifest.webmanifest` — metadados da PWA.
- `service-worker.js` — cache de arquivos para uso offline após a primeira visita online.
- `assets/capa-grimorio.png` — ilustração original da capa.
- `assets/icon.svg` — ícone do aplicativo.

## Executar localmente

O Service Worker e a instalação PWA precisam de `localhost` ou HTTPS; abrir `index.html` diretamente pelo gerenciador de arquivos permite ver a interface, mas não ativa o cache offline.

1. Extraia o ZIP.
2. Abra a pasta do projeto em um computador com Python instalado.
3. No terminal, dentro da pasta, execute `python -m http.server 8000` (no Windows, `py -m http.server 8000` também costuma funcionar).
4. Abra `http://localhost:8000` no navegador.
5. Para testar o offline, carregue o app uma vez com internet, aguarde o cache e então use as ferramentas do navegador para ficar offline ou desconecte a rede.

No Android, para instalar como PWA, publique em HTTPS (por exemplo, GitHub Pages), abra o endereço no Chrome e use o menu do navegador → **Instalar app** ou **Adicionar à tela inicial**, conforme a versão.

## Publicar gratuitamente no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie **o conteúdo da pasta** (não apenas o ZIP), mantendo a pasta `assets` e os nomes dos arquivos.
3. Abra **Settings → Pages**.
4. Em *Build and deployment*, escolha *Deploy from a branch*; selecione `main` e `/ (root)` e salve.
5. Aguarde a publicação e abra o endereço indicado pelo GitHub Pages.
6. A primeira visita precisa de internet para baixar os arquivos. Depois do cache inicial, os arquivos incluídos no Service Worker podem funcionar offline. Alterações futuras podem exigir recarregar online para atualizar o cache.

## O que funciona offline

A capa, o texto dos capítulos, a navegação, a pesquisa, os enigmas, os favoritos e o progresso local são incluídos nos arquivos do projeto. O progresso fica no armazenamento local do navegador; exporte um JSON periodicamente para backup ou para transferir entre dispositivos. O Service Worker guarda os arquivos principais depois de uma primeira visita bem-sucedida.

A fonte web importada do Google pode não estar disponível offline; o navegador usa fontes substitutas. O aplicativo não depende de serviços externos para gerar imagens. A capa é um arquivo local; as gravuras de cada capítulo usam emblemas temáticos desenhados na interface. A arquitetura permite trocar esses emblemas por imagens próprias, colocando-as em `assets` e apontando o capítulo para o arquivo correspondente.

## Transparência sobre o conteúdo

Esta versão inicial contém capítulos autorais de demonstração aprofundada distribuídos pelos dez volumes, além de segredos e enigmas. Não representa uma enciclopédia exaustiva: novos capítulos e ilustrações individuais podem ser adicionados ao vetor `chapters` em `app.js`. Os textos identificam conteúdo histórico, folclore, ciência e ficção original para evitar confundir invenções narrativas com fatos documentados. A atualização acrescenta cinco volumes sobre envelhecimento saudável, força e resistência, psicologia, segurança com animais selvagens, visão noturna e prevenção de doenças. Não existem técnicas garantidas para aparência perfeita, invulnerabilidade, nunca adoecer ou obter visão noturna sobrenatural. O som de página usa áudio sintetizado localmente; a primeira interação ativa o áudio quando o navegador exige permissão.

## Reprodutor musical integrado

- Toque no ícone `♫` no cabeçalho para abrir **Melodias do Grimório**.
- A reprodução começa pausada; selecione uma faixa e toque em reproduzir.
- O painel oferece volume independente, linha do tempo, pular/voltar 10 segundos, faixa anterior/próxima, aleatório e repetição.
- O mini-reprodutor permanece disponível ao fechar o painel e navegar entre capítulos.
- A playlist contém as quatro faixas selecionadas: `The Vampire Masquerade — Waltz Music`, `Dark Magic Music`, `Royalty (Slowed + Reverb)` e `Me and the Devil (TikTok Version)`. Os arquivos estão em `assets/music/`.
- Para uso offline em uma publicação HTTPS, conecte-se a uma rede Wi-Fi e toque em **Preparar músicas para ouvir offline**. O navegador tentará armazenar aproximadamente 150 MB; isso depende do espaço e da quota de armazenamento disponíveis. O Service Worker atende solicitações por intervalos de áudio a partir do arquivo completo em cache.
- A reprodução em segundo plano ou com a tela bloqueada depende das limitações do navegador e do Android.
- Se publicar em um repositório público, certifique-se de possuir os direitos ou a autorização necessários para redistribuir as faixas MP3.


## Correção do reprodutor musical
Esta versão corrige a sequência de carregamento ao iniciar a primeira faixa e atualiza a versão do Service Worker para o navegador buscar os arquivos novos. Publique todos os arquivos mantendo as pastas e caminhos.
