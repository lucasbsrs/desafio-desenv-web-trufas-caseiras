const botoes = document.querySelectorAll('.add-carrinho')
const contador = document.querySelector('.item-count')

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

    const lista = document.getElementById("lista-carrinho")
    const msgVazio = document.getElementById("mensagem-vazio")

    function carregarCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
        
        lista.innerHTML = ""
        if (carrinho.length === 0) {
            msgVazio.style.display = "block"
            return
        }else{ 
            msgVazio.style.display = "none"
        }
        carrinho.forEach((item, index) => {
            const div = document.createElement("div")
            div.classList.add("item-carrinho")

            div.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}" width="100">
                <p><strong>${item.nome}</strong></p>
                <p>Qtd: ${item.quantidade}</p>
                <button class="remover">Remover</button>
            `

            div.querySelector(".remover").addEventListener("click", () => removerItem(index))

            lista.appendChild(div)
        })

        contador.innerText = carrinho.reduce((acc, item) => acc + item.quantidade, 0)

    }

    function removerItem(index) {
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--
        } else {
            carrinho.splice(index, 1)
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        carregarCarrinho()
    }

    carregarCarrinho()