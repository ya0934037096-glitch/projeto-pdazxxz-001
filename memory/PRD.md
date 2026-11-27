# PRD - Páginas HTML por rota
## Problema original
Usuário envia páginas (HTML salvos ou prints) com nome de rota; cada página vira uma rota no projeto. Visual idêntico ao HTML, só visual (sem funcionalidade), remover links externos, manter links internos.
## Arquitetura
- HTML limpo por /app/scripts/clean_page.py (remove scripts, iframes, recaptcha, meta/links extras; links do domínio original -> /rota com target=_top; links externos sem href)
- Arquivos em /app/frontend/public/pages/<nome>.html, renderizados via componente HtmlPage (iframe tela cheia)
- Rotas em App.js (array PAGES); rota desconhecida -> "/"
## Implementado (2026-11-27)
- Página inicial (PDAX) em "/" e "/home"
## Backlog
- Próximas páginas que o usuário enviar (links já apontam para /cryptocurrency, /bonds, /learn, /promos, /signup, /contact-us, /legal, /pdax-prime, etc.)
