const tbody      = document.getElementById('tbody-carrinho');
const msgVazio   = document.getElementById('mensagem-vazio');
const totalEl    = document.getElementById('total-geral');
const headerCnt  = document.querySelector('.item-count');

const getCart = () => JSON.parse(localStorage.getItem('carrinho')) || [];
const setCart = (c) => localStorage.setItem('carrinho', JSON.stringify(c));
const formatBRL = (n) => new Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'}).format(Number(n)||0);

function updateHeaderCount() {
  const c = getCart();
  if (headerCnt) headerCnt.textContent = c.reduce((sum,i)=>sum+(i.quantidade||1),0);
}

function render() {
  if (!tbody) return;
  const carrinho = getCart();
  tbody.innerHTML = '';

  if (!carrinho.length) {
    if (msgVazio) msgVazio.style.display = 'block';
    if (totalEl) totalEl.textContent = formatBRL(0);
    updateHeaderCount();
    return;
  } else {
    if (msgVazio) msgVazio.style.display = 'none';
  }

  let total = 0;

  carrinho.forEach((item, idx) => {
    const qtd = item.quantidade || 1;
    const preco = Number(item.preco) || 0;
    const subtotal = qtd * preco;
    total += subtotal;

    const tr = document.createElement('tr');
    tr.dataset.index = String(idx);
    tr.innerHTML = `
      <td><img src="${item.imagem}" alt="${item.nome}"></td>
      <td>${item.nome}</td>
      <td>
        <div class="qty">
          <button data-act="dec" aria-label="Diminuir">−</button>
          <input type="number" class="qty-input" min="1" value="${qtd}">
          <button data-act="inc" aria-label="Aumentar">+</button>
        </div>
      </td>
      <td>${formatBRL(preco)}</td>
      <td class="subtotal">${formatBRL(subtotal)}</td>
      <td><button class="btn-remove" data-act="remover">Remover</button></td>
    `;
    tbody.appendChild(tr);
  });

  if (totalEl) totalEl.textContent = formatBRL(total);
  updateHeaderCount();
}

// add remover
tbody?.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const tr  = btn.closest('tr');
  const idx = parseInt(tr.dataset.index, 10);
  const act = btn.dataset.act;

  const carrinho = getCart();

  if (act === 'inc') {
    carrinho[idx].quantidade += 1;

  } else if (act === 'dec') {
    carrinho[idx].quantidade = Math.max(1, (carrinho[idx].quantidade || 1) - 1);

  } else if (act === 'remover') {
    const nome = carrinho[idx]?.nome || 'este item';
    const ok = window.confirm(`Remover "${nome}" do carrinho?`);
    if (!ok) return;
    carrinho.splice(idx, 1);
  }

  setCart(carrinho);
  render();
});


// mudança manual na quantidade
tbody?.addEventListener('change', (e) => {
  const input = e.target.closest('.qty-input');
  if (!input) return;
  const tr = input.closest('tr');
  const idx = parseInt(tr.dataset.index, 10);

  const carrinho = getCart();
  let v = parseInt(input.value, 10);
  if (isNaN(v) || v < 1) v = 1;
  carrinho[idx].quantidade = v;

  setCart(carrinho);
  render();
});

render();



