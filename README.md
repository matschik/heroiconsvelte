<p align="center">
  <a href="https://heroicons.com/#gh-light-mode-only" target="_blank">
    <img src="https://raw.githubusercontent.com/tailwindlabs/heroicons/master/.github/logo-light.svg" alt="Heroicons" width="300">
  </a>
  <a href="https://heroicons.com/#gh-dark-mode-only" target="_blank">
    <img src="https://raw.githubusercontent.com/tailwindlabs/heroicons/master/.github/logo-dark.svg" alt="Heroicons" width="300">
  </a>
</p>

<p align="center">
  Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS. <br>Available as Svelte library.
<p>

<p align="center">
  <a href="https://heroicons.com"><strong>Browse at Heroicons.com &rarr;</strong></a>
</p>

<p align="center">
    <a href="https://github.com/matschik/heroiconsvelte/releases"><img src="https://img.shields.io/npm/v/heroiconsvelte" alt="Latest Release"></a>
    <a href="https://github.com/matschik/heroiconsvelte/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/heroiconsvelte.svg" alt="License"></a>
</p>

## Usage

First, install `heroiconsvelte` from npm:

```sh
npm install heroiconsvelte
```

Now each icon can be imported individually as a React component:

```svelte
<script>
	import { BeakerIcon } from 'heroiconsvelte/24/solid';
</script>

<BeakerIcon class="h-6 w-6 text-blue-500" />
```

The 24x24 outline icons can be imported from `heroiconsvelte/24/outline`, the 24x24 solid icons can be imported from `heroiconsvelte/24/solid`, and the 20x20 solid icons can be imported from `heroiconsvelte/20/solid`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.

[Browse the full list of icon names on UNPKG &rarr;](https://unpkg.com/browse/heroiconsvelte/24/outline/)

## License

This library is MIT licensed.
