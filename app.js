// Função para carregar posts salvos do localStorage
function carregarPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    const postsSalvos = JSON.parse(localStorage.getItem('posts')) || [];

    postsSalvos.forEach(function(post, index) {
        criarPostElemento(post.titulo, post.conteudo, index);
    });
}

// Função para criar e exibir um post no DOM
function criarPostElemento(titulo, conteudo, index) {
    const postsContainer = document.getElementById('postsContainer');

    // Cria o elemento do post
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const tituloElemento = document.createElement('h2');
    tituloElemento.textContent = titulo;

    const conteudoElemento = document.createElement('p');
    conteudoElemento.textContent = conteudo;

    // Botão de deletar post
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.addEventListener('click', function() {
        deletarPost(index);
    });

    postDiv.appendChild(tituloElemento);
    postDiv.appendChild(conteudoElemento);
    postDiv.appendChild(deleteButton);
    postsContainer.appendChild(postDiv);
}

// Função para adicionar um novo post
function adicionarPost() {
    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;

    if (titulo && conteudo) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ titulo, conteudo });
        localStorage.setItem('posts', JSON.stringify(posts));

        criarPostElemento(titulo, conteudo, posts.length - 1);

        // Limpa os campos de input
        document.getElementById('titulo').value = '';
        document.getElementById('conteudo').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para deletar um post
function deletarPost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1); // Remove o post pelo índice
    localStorage.setItem('posts', JSON.stringify(posts));

    carregarPosts(); // Recarrega os posts para refletir a mudança
}

// Adiciona o post ao clicar no botão
document.getElementById('adicionarPost').addEventListener('click', adicionarPost);

// Carrega os posts ao iniciar a página
carregarPosts();