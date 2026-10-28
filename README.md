# Site do Potoo IDE

Site institucional do Potoo IDE, em português, espanhol e inglês. O conteúdo apresenta o projeto como estando em desenvolvimento e mantém a página inicial e o manual nas três rotas de idioma.

## Estrutura

- `_config.yml`: configuração do Jekyll, domínio, caminho-base e idiomas.
- `_layouts/default.html`: estrutura compartilhada das páginas.
- `_includes/`: metadados, cabeçalho e rodapé.
- `_data/copy.yml`: textos compartilhados do menu e rodapé nos três idiomas.
- `index.html`, `en/` e `es/`: páginas iniciais com metadados Jekyll no front matter.
- `manual/`, `en/manual/` e `es/manual/`: manuais localizados.
- `src/style.css`, `src/script.js` e `src/theme-init.js`: estilos e interações compartilhados.
- `src/assets/images/`: marca e ilustração do Potoo IDE.

## GitHub Pages

O repositório `diegopn/potoo-site` usa Jekyll e publica a partir da branch `main` e da raiz (`/(root)`), sem workflow próprio. A configuração já define `baseurl: /potoo-site` para as rotas do site de projeto. Depois do primeiro push, abra **Settings → Pages**, selecione **Deploy from a branch**, escolha `main` e `/(root)` e salve. O GitHub habilita essa opção quando a branch `main` já existe.

## Prévia local

Com Jekyll instalado, execute neste diretório:

    jekyll serve

Depois abra http://localhost:4000/potoo-site/.
