const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBY9LXfTyif_BuZHFcqtSFDvFSRrlNV-jSSgMoRa7uoKbDyrYL0yQD2csS-94Yagik_7YRGk-xm39/pub?gid=0&single=true&output=csv";

fetch(csvUrl)
  .then(res => res.text())
  .then(data => {
    const linhas = data.trim().split("\n").slice(1);
    const container = document.getElementById("produtos");

    linhas.forEach(linha => {
      const colunas = linha.split(",");
      if (colunas.length >= 6) {
        const nome = colunas[0];
        const imagem = colunas[1];
        const categoria = colunas[2];
        const plataforma = colunas[3];
        const link = colunas[4];
        const descricao = colunas[5];

        const card = `
          <div class="card">
            <img src="${imagem}" alt="${nome}">
            <div class="card-content">
              <div class="card-title">${nome}</div>
              <div class="card-meta">Categoria: ${categoria} | Plataforma: ${plataforma}</div>
              <div class="card-description">${descricao}</div>
              <a class="button" href="${link}" target="_blank">Ver produto</a>
            </div>
          </div>
        `;
        container.innerHTML += card;
      }
    });
  });