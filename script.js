const csvUrl = "https://docs.google.com/spreadsheets/d/e/1UhBbqJWQwlzr-Gtscqr3_fCGRnlklJV8W8Kv_3oHtnI/pub?gid=0&single=true&output=csv";

let todosProdutos = [];

function renderizarProdutos(produtos) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";
  if (produtos.length === 0) {
    container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }
  produtos.forEach(({ nome, imagem, categoria, plataforma, link, descricao }) => {
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
  });
}

function preencherFiltros(produtos) {
  const categorias = [...new Set(produtos.map(p => p.categoria))].sort();
  const plataformas = [...new Set(produtos.map(p => p.plataforma))].sort();

  const filtroCategoria = document.getElementById("filtro-categoria");
  const filtroPlataforma = document.getElementById("filtro-plataforma");

  filtroCategoria.innerHTML = "<option value=''>Todas as categorias</option>";
  filtroPlataforma.innerHTML = "<option value=''>Todas as plataformas</option>";

  categorias.forEach(cat => {
    filtroCategoria.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
  plataformas.forEach(plat => {
    filtroPlataforma.innerHTML += `<option value="${plat}">${plat}</option>`;
  });
}

function aplicarFiltros() {
  const cat = document.getElementById("filtro-categoria").value;
  const plat = document.getElementById("filtro-plataforma").value;
  const filtrados = todosProdutos.filter(p => {
    return (!cat || p.categoria === cat) && (!plat || p.plataforma === plat);
  });
  renderizarProdutos(filtrados);
}

fetch(csvUrl)
  .then(res => res.text())
  .then(data => {
    const linhas = data.trim().split("\n").slice(1);
    todosProdutos = linhas.map(linha => {
      const colunas = linha.split(",");
      return {
        nome: colunas[0]?.trim() || "",
        imagem: colunas[1]?.trim().replace(/^"|"$/g, "") || "",
        categoria: colunas[2]?.trim() || "",
        plataforma: colunas[3]?.trim() || "",
        link: colunas[4]?.trim() || "",
        descricao: colunas[5]?.trim() || ""
      };
    }).filter(p => p.nome && p.imagem && p.link);

    preencherFiltros(todosProdutos);
    renderizarProdutos(todosProdutos);

    document.getElementById("filtro-categoria").addEventListener("change", aplicarFiltros);
    document.getElementById("filtro-plataforma").addEventListener("change", aplicarFiltros);
  });
