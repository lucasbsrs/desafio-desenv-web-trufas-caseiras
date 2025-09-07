// HOME – adicionar itens ao carrinho salvando {nome, imagem, preco, quantidade}
const botoes = document.querySelectorAll('.add-carrinho');
const contador = document.querySelector('.item-count');

function getCart() {
  return JSON.parse(localStorage.getItem('carrinho')) || [];
}
function setCart(c) {
  localStorage.setItem('carrinho', JSON.stringify(c));
}
function updateHeaderCount() {
  const c = getCart();
  contador && (contador.textContent = c.reduce((acc, i) => acc + (i.quantidade || 1), 0));
}
updateHeaderCount();

botoes.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const card   = document.querySelectorAll('.produto')[index] || btn.closest('.produto');
    const nome   = card.querySelector('h3').innerText.trim();
    const imagem = card.querySelector('img').getAttribute('src');

    // Pega preço da home
    let preco = parseFloat(btn.getAttribute('data-price'));
    
    if (isNaN(preco)) {
      const pAttr = card.querySelector('.preco')?.getAttribute('data-price');
      if (pAttr) preco = parseFloat(pAttr);
    }
    if (isNaN(preco)) preco = 0;

    const carrinho = getCart();
    const existente = carrinho.find(i => i.nome === nome);

    if (existente) {
      existente.quantidade = (existente.quantidade || 1) + 1;
      if (!(typeof existente.preco === 'number') || isNaN(existente.preco) || existente.preco <= 0) {
        existente.preco = preco; // corrige se item antigo não tinha preço
      }
    } else {
      carrinho.push({ nome, imagem, preco, quantidade: 1 });
    }

    setCart(carrinho);
    updateHeaderCount();
  });
});

// Efeitos visuais da home (opcional)
document.querySelectorAll('.produto-imagem').forEach(imagem => {
  imagem.addEventListener('mouseover', function () {
    this.style.transform = 'scale(1.2)';
    this.style.transition = 'transform 0.3s ease';
  });
  imagem.addEventListener('mouseout', function () {
    this.style.transform = 'scale(1)';
  });
});
