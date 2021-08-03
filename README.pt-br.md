# Leeneon

O template de portfólio acessível e gratuito

[![Leeneon](https://leeneon.com.br/external-images/github-cover.png)](https://leeneon.com.br/demos/)

Há poucos sites acessíveis na internet, e há menos ainda sites acessíveis com código aberto. Entretanto, projetos de código aberto contribuem significativamente para a evolução do desenvolvimento web e a acessibilidade não pode ficar de fora desta evolução.

Leeneon é um projeto de código aberto e foi criado para contribuir com a expansão da acessibilidade na web. Ele é um template de website acessível, no estilo de portfólio, ideal para criar currículos e apresentar trabalhos de design, fotografia, ilustração e outros trabalhos criativos.

Se você deseja usar Leeneon em seus projetos pessoais ou comerciais, leia antes a seção Licença desta documentação.

## Demos

Leeneon possui dois templates:

- [Template padrão](https://leeneon.com.br/demos/)
- [Fullscreen](https://leeneon.com.br/demos/fullscreen.html)

## Porque Leeneon é acessível?

O [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) é um documento que contém todas as instruções para se criar conteúdo acessível na web. Este documento é mantido pelo W3C, consórcio que regulamenta os padrões web no mundo. Leeneon foi desenvolvido atendendo diversos desses padrões.

Veja as principais características e funcionalidades que fazem de Leeneon um site acessível (ou muito próximo disso):

- **Semântica HTML** – Uso adequados das tags HTML 5 que atribuem significado a cada área do site.
- **Cores com contraste** – Todas as combinações de cores de elementos textuais possuem contraste de, no mínimo, 4.5:1.
- **Navegação por teclado** – Todo o site é navegável pelo teclado e possui foco perceptível.
- **Redução de animação** – Leeneon identifica as preferências do sistema da pessoa usuária para habilitar ou desabilitar as animações no site.
- **Tema claro e escuro** – Leeneon identifica qual o tema a pessoa usuária optou nas preferências do sistema para escolher em qual tema carregar o site.
- **Responsivo** – O site responde adequadamente a diferentes tamanhos de tela.
- **Zoom** – Comporta zoom de até 400% sem quebrar o layout.
- **Leitura da direita para a esquerda** – As duas versões de leituras estão disponíveis: esquerda para direita e direita para esquerda.
- **Alerta de erro no formulário** – Erros no formulário de contato são apresentados de forma clara e orientam a pessoa usuária a como corrigi-los.
- **Descrição de imagens** – As imagens que não são decorativas possuem texto alternativo.
- **Controle na mão da pessoa usuária** – Embora Leeneon adote configurações baseadas nas preferências do sistema, um painel exclusivo para gerenciar opções de acessibilidade está disponível no site.

### Testes

Este é o resultado do teste automatizado utilizando a ferramenta do Google: [https://web.dev/measure/](https://web.dev/measure/).

[![Leeneon](https://leeneon.com.br/external-images/leeneon-webdev-measure-result.png)](https://leeneon.com.br/external-images/leeneon-webdev-measure-result.png)

Testes automatizados são importantes, mas não substituem os testes feitos por seres humanos. Por isso sua contribuição é tão importante para a melhoria da acessibilidade de Leeneon.

## Instalação e uso

Faça o download do arquivo `.zip` do projeto no GitHub ou clone o repositório. Abra o projeto no terminal e rode o comando `npm install` para instalar as dependências do projeto.

### Desenvolvimento

Rode o comando `npm run start` para iniciar um servidor e abra `http://localhost:8080` no navegador. O site irá recarregar automaticamente quando novas alterações nos arquivos forem salvas.

### Produção

Rode o comando `npm run build` para gerar os arquivos para produção. Uma pasta `dist/` com os arquivos será criada.

## Edição do template

### Alterando a cor

Leeneon vem com a cor roxa por padrão, mas você pode escolher qualquer outra cor dentre as seis disponíveis no projeto.

Para alterar a cor, abra o arquivo `src/index.js` e encontre a linha com o comando que importa o arquivo com os estilos de cor: 

```js
import "./scss/purple.scss";
```

Altere `purple.scss` para algumas das outras opções disponíveis:

- blue.scss
- orange.scss
- pink.scss
- purple.scss
- red.scss

Por fim, salve o arquivo.

### Alterando o idioma

Configurar corretamente o idioma do seu site é fundamental para que a pronúncia das palavras sejam feitas corretamente pelos leitores de tela.

Por padrão, Leeneon está configurado na idioma inglês. Para alterar o idioma você deve editar o valor da atributo `lang` na tag de abertura `<html>` dos arquivos `index.html`, `fullscreen.html` e `404.html`.

Veja no exemplo abaixo a troca do idioma de inglês para português do Brasil.

Primeiro o idioma inglês:

```html
<html lang="en">
```

Agora, a troca para o idioma português do Brasil:

```html
<html lang="pt-br">
```

### Alterando a direção do conteúdo (Rtl)

Um dos objetivos de Leeneon é ser um template de site que possa ser utilizado por qualquer pessoa independente do idioma. E como há muitas culturas no mundo que possuem o sistema de escrita da direita para esquerda (também conhecido como rtl, abreviação de right-to-left), Leeneon foi desenvolvido para comportar este sistema de escrita.

Por padrão, a direção do conteúdo do template é da esquerda para direita, para alterar basta abrir o arquivo `src/index.js` e encontrar a linha que importa o arquivo principal de estilos:

```js
import "./scss/main.ltr.scss";
```

Altere `main.ltr.scss` para `main.rtl.scss`:

```js
import "./scss/main.rtl.scss";
```

Salve o arquivo.

### Criando seus próprios estilos

Leeneon é um template de código aberto, portanto, nada te impede de editar os arquivos como bem entender. Porém, para evitar conflitos com os estilos definidos nos arquivos `.scss` já existentes, prefira utilizar o arquivo `custom.scss` para criar seus próprios estilos. Ele se encontra dentro da pasta `src/scss/`.

```html
leeneon/
|-- src/
|---- scss/
|------ custom.scss
```

## Contribuições

Leeneon é um projeto de código aberto que pretende ser cada vez mais acessível, mas, para isso, sua contribuição é fundamental.

Ao usar o template e identificar bugs ou melhorias, crie uma issue no repositório do GitHub.

## Licença

Leeneon nasceu com o propósito inicial de ser um template pago. A objetivo era criar um template que tivesse a acessibilidade como principal diferencial. 

Ao longo do processo, tive dificuldade de encontrar outros sites acessíveis com código aberto para que eu pudesse aprender come eles.

Quando terminei a primeira versão, me dei conta que eu tinha desenvolvido o projeto que eu gostaria de ter tido acesso para aprender durante o desenvolvimento.

Foi aí que decidi que Leeneon seria mais útil para as pessoas se seu código fosse aberto ao invés de ser vendido na internet.

Se este projeto de alguma forma for útil para o crescimento da acessibilidade na web, ficarei muito contente por ter dado a minha pequena contribuição para essa questão que impacta a vida de milhões de pessoas.

Minha intenção é poder me dedicar cada vez mais em aprimorar a acessibilidade de Leeneon, mas para isso eu gostaria de te pedir uma ajuda: [considere apoiar este projeto com uma doação](https://www.buymeacoffee.com/manussakis).

Você pode usar Leeneon para publicar seus sites pessoais ou comerciais, lembre-se apenas de manter os créditos que se encontram no rodapé dos arquivos `index.html` e `fullscreen.html`.

### Plugin Isotope

Isotope é um dos plugins javascript utilizados por Leeneon. Embora Isotope possua uma licença livre para projetos de código aberto e para projetos pessoais, ele também possui uma licença específica para projetos para fins comerciais. Portanto, leia atentamente sobre [a licença do Isotope para fins comerciais](https://isotope.metafizzy.co/license.html) antes de publicar o seu projeto. O uso adequado do Isotope é de sua responsabilidade.

## Compatibilidade com navegadores

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 8+ | 11+ | 32+ | 15+ |

## Créditos

### Imagens

As imagens utilizadas neste repositório foram retiradas de:

- [Placeholder.com](https://placeholder.com/)

As imagens do site de demonstração foram tiradas de banco de imagens gratuitos na web e não estão incluídas nos arquivos deste repositório.

**Photos**

- [Pixabay](https://www.pexels.com/@pixabay) on [Pexels](https://www.pexels.com/photo/alone-buildings-city-cityscape-220444/).
- [Ben Parker](https://unsplash.com/@brokenlenscap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/OhKElOkQ3RE).
- [Michael Dam](https://unsplash.com/@michaeldam) on [Unsplash](https://unsplash.com/photos/mEZ3PoFGs_k).
- [Andrea Piacquadio](https://www.pexels.com/pt-br/@olly) on [Pexels](https://www.pexels.com/pt-br/foto/mulher-em-camisa-de-colarinho-774909/).
- [Philbert Pembani](https://www.pexels.com/@philpembani) on [Pexels](https://www.pexels.com/photo/man-in-blue-crew-neck-t-shirt-2559675/).
- [Mike Dorner](https://unsplash.com/photos/sf_1ZDA1YFw) on [Unsplash](https://unsplash.com/photos/sf_1ZDA1YFw).
- [Oleg Laptev](https://unsplash.com/@snowshade) on [Unsplash](https://unsplash.com/photos/hwu-uFaXzOU).
- [Tomoko Uji](https://unsplash.com/@ujitomo) on [Unsplash](https://unsplash.com/photos/Zb4OwWU-5MA).

**Mockups**

- [Mockup Design](https://mockups-design.com/)

### Plugins JavaScript

- [Animejs](https://animejs.com/)
- [Headroom.js](https://wicky.nillia.ms/headroom.js/)
- [imagesLoaded](https://imagesloaded.desandro.com/)
- [Isotope](https://isotope.metafizzy.co/)
- [Object Fit Images](https://github.com/fregante/object-fit-images)
- [Inert](https://github.com/WICG/inert)
- [Focus Visible](https://github.com/WICG/focus-visible)
- [Lazysizes](https://github.com/aFarkas/lazysizes)
- [Jarallax](https://github.com/nk-o/jarallax)
- [RxJS](https://rxjs.dev/)
