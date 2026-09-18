<div align="center">
  <a href="https://eruda.liriliri.io/" target="_blank">
    <img src="https://eruda.liriliri.io/icon.png" width="400">
  </a>
</div>

<h1 align="center">@hydenliu/eruda</h1>

<div align="center">

Console for Mobile Browsers.

Fork of [liriliri/eruda](https://github.com/liriliri/eruda), based on [iulo/eruda](https://github.com/iulo/eruda).

[![NPM version][npm-image]][npm-url]
[![License][license-image]][npm-url]

</div>

[npm-image]: https://img.shields.io/npm/v/@hydenliu/eruda?style=flat-square
[npm-url]: https://www.npmjs.com/package/@hydenliu/eruda
[ci-image]: https://img.shields.io/github/actions/workflow/status/HydenLiu/eruda/main.yml?branch=master&style=flat-square
[ci-url]: https://github.com/HydenLiu/eruda/actions/workflows/main.yml
[license-image]: https://img.shields.io/npm/l/@hydenliu/eruda?style=flat-square

<img src="https://eruda.liriliri.io/screenshot.jpg" style="width:100%">

## Install

```bash
npm install @hydenliu/eruda --save-dev
```

```html
<script src="node_modules/@hydenliu/eruda/eruda.js"></script>
<script>
  eruda.init()
</script>
```

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@hydenliu/eruda"></script>
<script>
  eruda.init()
</script>
```

Usage matches upstream Eruda. Full API docs: [eruda.liriliri.io/docs](https://eruda.liriliri.io/docs/).

Upstream demo: [eruda.liriliri.io](https://eruda.liriliri.io/)

## What's different

Compared with upstream Eruda, this fork adds:

- Network panel sections: General, Query Parameters, Payload, Response Body
- Network list options for **Full Name** and **Full URL**
- Hide DevTools when clicking outside the panel
- Entry button position stored in `sessionStorage` (cleared when the tab closes)
- DOM highlighter via `luna-dom-highlighter`

## Development

```bash
npm install
npm run setup
npm run dev
```

Then open `http://localhost:8080`.

| Script | Description |
| --- | --- |
| `npm run dev` | webpack-dev-server |
| `npm test` | Karma + Jasmine |
| `npm run build` | production bundle in `dist/` |
| `npm run lint` | ESLint |

Issues and PRs: [HydenLiu/eruda](https://github.com/HydenLiu/eruda/issues)

## Related

- [eruda](https://github.com/liriliri/eruda): upstream project
- [eruda-android](https://github.com/liriliri/eruda-android): WebView with Eruda loaded automatically
- [chii](https://github.com/liriliri/chii): remote debugging
- [luna](https://github.com/liriliri/luna): UI components used by Eruda

## License

MIT
