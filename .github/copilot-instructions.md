## Objetivo rápido

Este repositório é uma SPA estática (HTML/CSS/JS) publicada via GitHub Pages. Use este guia para entender a arquitetura, onde estão as integrações com a API e como depurar problemas como "site sobe, mas a API não responde".

## Visão geral da arquitetura

- Frontend estático em `src/` — código ES modules, sem bundler complexo.
- Entrypoint: `src/index.html` e `src/page/index.js` (inicia a aplicação).
- Componentes JS em `src/components/` (ex.: `Api.js`, `Card.js`, `PopupWithForms.js`).
- Estilos organizados em `src/blocks/` (BEM-style) e `src/page/index.css`.
- Config runtime (token + base URL) em `src/config.js`. Um modelo está em `src/config.example.js`.
- Build: `npm run build` copia `src/*` para `dist/`. Deploy: `npm run deploy` usa `gh-pages -d dist`.

## Integração com a API — onde olhar

- `src/components/Api.js` contém todas as chamadas `fetch` para endpoints (`/users/me`, `/cards`, etc.).
- A instância exportada é criada no final de `Api.js` usando:

  - `baseUrl: CONFIG.BASE_URL` (vem de `src/config.js`)
  - `headers: { authorization: CONFIG.API_TOKEN, "Content-Type": "application/json" }`

Modificações no formato do header (ex.: adicionar `Bearer `) devem ser feitas aqui.

## Problema comum: "site implantado no GitHub Pages, mas API não carrega"

Passos de diagnóstico (use o navegador do usuário):

1. Abra DevTools → Network e recarregue a página. Observe as requisições para `https://around-api.../v1/*`.
2. Verifique o status HTTP:
   - 401/403 → token inválido ou formato de header diferente do esperado.
   - 0 / erro de rede / blocked by CORS → problema de CORS ou conexão bloqueada.
3. Verifique as Request Headers: confirme se `authorization` está sendo enviada e no formato que o backend espera (por exemplo, `Authorization: Bearer <TOKEN>` vs `authorization: <TOKEN>`).
4. Para reproduzir fora do browser, teste com curl (substitua `<TOKEN>`):

   curl -i -H "authorization: <TOKEN>" "https://around-api.pt-br.tripleten-services.com/v1/cards"

   e, se necessário:

   curl -i -H "Authorization: Bearer <TOKEN>" "https://around-api.pt-br.tripleten-services.com/v1/cards"

5. Verifique a resposta de preflight OPTIONS (se houver). Se OPTIONS for bloqueado, é CORS no servidor.

Possíveis causas observadas neste projeto:
- Token público em `src/config.js` é enviado do browser. Se o servidor rejeita o token, atualize `src/config.js` antes do deploy.
- Backend pode exigir `Authorization: Bearer <TOKEN>`; ajustar em `src/components/Api.js`.
- CORS não habilitado no backend — precisa ser ajustado no servidor que expõe `around-api...`.

## Como alterar rapidamente o formato do header

Abra `src/components/Api.js` e ajuste a criação da instância no final, por exemplo:

```js
export const api = new Api({
  baseUrl: CONFIG.BASE_URL,
  headers: {
    Authorization: `Bearer ${CONFIG.API_TOKEN}`,
    "Content-Type": "application/json",
  },
});
```

## Convenções do projeto (rápido)

- JS: classes em `src/components/`, import/export ES modules.
- CSS: BEM-like em `src/blocks/` (cada arquivo corresponde a uma área/component).
- Build: `npm run build` → `dist/`; `npm run deploy` → GitHub Pages.

## Onde procurar quando algo falha

- `src/components/Api.js` — primeiro lugar para problemas de integração.
- `src/config.js` / `src/config.example.js` — ver valores de `BASE_URL` e `API_TOKEN`.
- `package.json` — scripts de build/deploy.

Se alguma seção estiver incompleta ou você quiser que eu adicione snippets de debugging (ex.: comandos curl com headers específicos ou um pequeno script de verificação), diga qual formato prefere.  

— Fim
