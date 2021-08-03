# Leeneon

The free accessible portfolio template.

[![Leeneon](https://leeneon.com.br/external-images/github-cover.png)](https://leeneon.com.br/demos/)

There are few accessible websites on the internet and even less accessible websites with open source. However, open source projects heavily contribute to the evolution of web development, and web accessibility can't be left out this progression.

Leeneon is an open source project and it was born to contribute to the expansion of web accessibility. It is a free accessible portfolio template, ideal for resumes and for presenting creative works such as design projects, photography, illustration and more.

If you desire to use Leeneon to publish your personal or commercial website, read the License section of this documentation before.

## Demos

Leeneon has two templates:

- [Default](https://leeneon.com.br/demos/)
- [Fullscreen](https://leeneon.com.br/demos/fullscreen.html)

## Why is Leeneon accessible?

The [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) is a document that contains all the instructions for creating accessible content on the web. This document is maintained by W3C, the organization that regulates web standards worldwide. Leeneon was developed to meet those standards.

Check out the main features that make Leeneon an accessible website (or very close to it):

- **HTML semantics** – Correct use of HTML 5 tags that provide meaning for its content.
- **Color contrast** – All color combinations between text and background have a contrast of at least 4.5:1.
- **Keyboard navigation** – All functionalities are available from keyboard and the focus are always visible.
- **Reduce motion** – Leeneon identifies user's system preferences to disable or enable animations.
- **Dark and light theme** – Leeneon identifies user's system preferences to choose between dark or light themes.
- **Responsive** – The website adjusts for all screen sizes.
- **Zoom** – It supports up to 400% zoom without breaking the page.
- **Right to left** – Both right-to-left and left-to-right versions are supported.
- **Form errors** – Contact form errors are clearly presented and guides the user on how to fix them.
- **Images description** – Non-decorative images have alternative text.
- **User has the control** – Although Leeneon adopts settings based on user's system preferences, an interactive panel is available for the user to manage preferences on their own.

### Tests

This is the result of the automated test powered by [Web Dev Measure Tool](https://web.dev/measure/).

[![Leeneon](https://leeneon.com.br/external-images/leeneon-webdev-measure-result.png)](https://leeneon.com.br/external-images/leeneon-webdev-measure-result.png)

Automated tests are important, but they are not a substitute for human tests. That is why your contribution is so important for improving Leeneon's accessibility.

## Installation and usage

Download the project's `.zip` file from GitHub or clone the repository. Open the project in the terminal and run the `npm install` command to install all project's dependencies.

### Development

Run the command `npm run start` to start the server and open `http://localhost:8080` in browser. The site will reload automatically when changes in the source files are saved.

### Production

Run the command `npm run build` to generate production files. The `dist/` folder containing the files will be created.

## Editing the template

### Changing the color

By default Leeneon comes in purple, but you also have a choice between five others colors available in the project.

To change the color open the file `src/index.js` and find the line that imports the `.scss` color file:

```js
import "./scss/purple.scss";
```

Change `purple.scss` for one of the options below:

- blue.scss
- orange.scss
- pink.scss
- green.scss
- red.scss

Finally, save the file.

### Changing the language

By default Leeneon uses the English language. To change it you should edit the value of the lang attribute in the opening `<html>` tag of the `index.html`, `fullscreen.html` and `404.html` files.

See the example below of how to switch from English to Brazilian Portuguese language

First the English language:

```html
<html lang="en">
```

Now the changing to Brazilian Portuguese language:

```html
<html lang="pt-br">
```

### Changing the direction of the content (rtl)

One of Leeneon's goals is to be a portfolio template that can be used by anyone regardless of their language. Because there are some cultures in the world that have a right-to-left writing order, Leeneon was developed to support this as well.

The left-to-right writing order is the default in Leeneon. To change it you should open the `src/index.js` file and go to the line that import the main css file.

```js
import "./scss/main.ltr.scss";
```

Change `main.ltr.scss` to `main.rtl.scss`:

```js
import "./scss/main.rtl.scss";
```

Save the file.

### Creating your own styles

Leeneon is an open source template, so nothing prevents you from editing the files anyway you want. However, to avoid conflicts with the styles defined in the existing `.scss` files, utilize the `custom.scss` file to create your own styles. It is located in the `src/scss/` folder.

```html
leeneon/
|-- src/
|---- scss/
|------ custom.scss
```

## Contributions

Leeneon is an open source project that aims to be increasingly accessible, but for that your contribution is essential.

When using the template and identifying bugs or improvements, please create an issue in the GitHub repository.

## License

Leeneon was born with the initial purpose of being sold on the internet. The goal was to create a template that had accessibility as its main differential.

Throughout the process, I had a hard time finding other accessible open source websites that I could learn from.

When I finished the first version, I realized that I had developed the project that I would have liked to have had access to during my own product development.

That's when I decided that Leeneon would be more useful to people as an open source project rather than being sold.

If this project is in any way useful for the growth of accessibility on the web, I will be very happy to have made my contribution to this issue that impacts the lives of millions of people.

My intention is to be able to dedicate myself more and more to improving Leeneon's accessibility, but for that I would like to ask you for help: [consider supporting this project with any donation](https://www.buymeacoffee.com/manussakis).

You can use Leeneon to publish either personal or commercial websites, just remember to keep the credit that are at the bottom of the `index.html` and `fullscreen.html` files.

### Isotope plugin

Isotope is one of the javascript plugins used by Leeneon. Although Isotope has a free license for personal and open source projects, it also has a specific license for commercial projects. Therefore, read carefully about the [license of Isotope for commercial purposes](https://isotope.metafizzy.co/license.html) before publishing your project. Proper use of Isotope is your responsibility.

## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 8+ | 11+ | 32+ | 15+ |

## Credits

### Images

The images of this repository were taken from:

- [Placeholder.com](https://placeholder.com/)

The demo websites images were taken from free bank imagens and they are not included in this repository.

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

### JavaScript plugins

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
