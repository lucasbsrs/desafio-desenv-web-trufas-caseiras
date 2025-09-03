const botoes = document.querySelectorAll('.add-carrinho')
const contador = document.querySelector('.item-count')

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
contador.innerText = carrinho.reduce((acc, item) => acc + item.quantidade, 0)

    botoes.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const produto = document.querySelectorAll('.produto')[index]
            const nome = produto.querySelector("h3").innerText
            const imagem = produto.querySelector("img").getAttribute("src")


            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

            const produtoExistente = carrinho.find(item => item.nome === nome)

            if(produtoExistente){
                produtoExistente.quantidade++
            }else{
                carrinho.push({ nome, imagem, quantidade: 1 })
            }
            contador.innerText = carrinho.reduce((acc, item) => acc + item.quantidade, 0)


            localStorage.setItem('carrinho', JSON.stringify(carrinho))

        })
    })

    // Zoom nas imagens
    document.querySelectorAll('.produto-imagem').forEach(imagem => {
        imagem.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        imagem.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });


    // Botão de ingredientes (mostrar/esconder)

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.toggle-ingredientes');
  if (!btn) return;

  e.preventDefault();

  // acha o card e o <p class="ingredientes"> correspondente
  const card = btn.closest('.produto');
  const p = card?.querySelector('.ingredientes');
  if (!p) return;

  const open = p.style.display === 'block';
  p.style.display = open ? 'none' : 'block';
  btn.textContent = open ? 'Ingredientes' : 'Esconder ingredientes';
  btn.setAttribute('aria-expanded', String(!open));
});