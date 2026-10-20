# aya-navegador-emocional

<!-- psicothica-kit 1.0.1 -->
**psicothica-kit 1.0.1**

Navegador Emocional (ACT, DBT e terapia baseada em processos): bússola emocional, ponto de escolha, diário de processos (PBAT), ferramentas SOS e psicoeducação. Material informativo e de apoio da marca **Psicothica** (Alanne Raquel Fragoso de Farias, psicóloga, CRP 13/9646), disponível no Programa Ramificar da AyA Clínica Integrada. Não substitui avaliação, diagnóstico ou acompanhamento profissional.

Publicado no GitHub Pages: `https://psicothica.github.io/aya-navegador-emocional/` (workflow `.github/workflows/pages.yml`; em Settings → Pages a fonte precisa ser **GitHub Actions**).

## Desenvolvimento

```bash
npm ci
npm run dev        # servidor local (http://localhost:5173/aya-navegador-emocional/)
npm run lint       # tsc --noEmit
npm run build      # gera dist/ (assets com o prefixo /aya-navegador-emocional/)
npm run preview
```

- Vite + React + Tailwind CSS 4. O `base` do Vite é `'/aya-navegador-emocional/'` (`vite.config.ts`); se o app mudar de endereço (por exemplo, para um domínio próprio), é só ajustar essa linha.
- `npm install` funciona sem `--legacy-peer-deps`. (O conflito antigo vinha do `esbuild` listado na raiz contra o peer do Vite 8; ele saiu junto com os demais restos do AI Studio: `@google/genai`, `express`, `dotenv`, `tsx`, `motion`, `autoprefixer`.)
- Sem IA, sem analytics, sem requisição externa: as fontes são locais (WOFF2 em `src/psi-kit/fonts/`) e não há CDN.

## psicothica-kit

`src/psi-kit/` é uma **cópia** do [psicothica-kit](https://github.com/psicothica/psicothica-kit) 1.0.1 (sem submodule): `tokens.css`, `psi-components.css`, `fonts/` (licenças OFL em `fonts/licenses/`), `PsiHeader.tsx`, `PsiFooter.tsx` e `psi-storage.ts`. As logos ficam em `public/psi-kit/logo/`. Dentro de um iframe (como no AyAClin) o cabeçalho fica compacto; aberto direto, fica completo. O texto do rodapé é do kit e não deve ser editado aqui.

Para atualizar o kit: substitua os arquivos copiados pelos da nova versão e atualize a linha `psicothica-kit x.y.z` no topo de `index.html`, de `src/main.tsx` e deste README.

## Dados e privacidade

Tudo fica no `localStorage` do navegador, com o prefixo **`psi.navegador-emocional.v1.`**:

| Chave (sem o prefixo) | Conteúdo |
|---|---|
| `pbat-logs` | Diário de processos (PBAT): escalas, emoção, necessidade, micro-ação, notas |
| `choice-points` | Pontos de escolha: situação, pensamentos, emoções, sensações, ação, reflexão |

Todos os apps do Psicothica dividem a origem `psicothica.github.io`; por isso este app só lê, grava, exporta e apaga as chaves do próprio prefixo.

- **Backup** (aba "Diário PBAT" → "Backup do diário"): **Exportar** gera um JSON do kit com metadados (`app`, `version`, `exportedAt`) e só as chaves deste app. **Importar** aceita apenas arquivo deste app (arquivo de outro app é recusado, sem gravar nada) e **acrescenta** os registros ao que já existe, por `id`; nunca apaga.
- **Migração única** das chaves antigas (`psicothica_pbat_logs_v1` e `psicothica_choice_points_v1`): copia para o prefixo novo, confere a cópia e só então remove as antigas. A chave `psicothica_custom_logo` (upload de logomarca, recurso removido) é apagada na mesma migração. Nenhuma chave de outro app é tocada.
- Se o navegador bloquear o armazenamento, o app avisa ("Seus registros não serão salvos neste navegador.") e funciona em memória.

## Dentro do iframe do AyAClin

O app é exibido com `sandbox="allow-scripts allow-same-origin allow-downloads allow-modals allow-popups allow-popups-to-escape-sandbox"` (sem `allow-forms` e sem `allow-top-navigation`). Por isso:

- nenhum `<form>` é usado: tudo é botão `type="button"` com validação própria (sem `allow-forms` o navegador nem dispara o evento `submit`);
- nada navega a janela principal; os links de texto abrem em nova aba (`target="_blank" rel="noopener noreferrer"`), assim como os links `tel:`;
- downloads (backup) e `window.print()` (relatório) funcionam com `allow-downloads` e `allow-modals`.

Movimento reduzido: com `prefers-reduced-motion`, animações e transições próprias do app ficam desligadas.
