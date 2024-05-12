// Variável para armazenar os filmes encontrados
let filmes = [];

// Função para buscar os filmes
function buscarFilme() {
    const descricao = document.getElementById("descricao").value;
    const apiKey = "1673ecba6ca6ad429ac304fc8f30a7c5"; // Chave da API
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${descricao}`;

    // Faz uma requisição para a API para obter o resultado dos filmes
    fetch(url)
        .then(response => {
            // Verifica se a resposta é bem sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar filme');
                }
                // Converte a resposta para o formato JSON
                return response.json();
            })
            .then(data => {
                // Armazena os filmes encontrados na variável "filmes"
                filmes = data.results; 
                // Exibe o primeiro filme encontrado
                exibirFilme(0);
            })
            .catch(error => {
                // Mensagem de erro no console em caso de falha
                console.error('Erro:', error);
            });
}

// Função para exibir detalhes de um filme especifico
function exibirFilme(index) {
    // Obtém a div onde o filme vai aparecer
    const filmeDiv = document.getElementById("filme");
    // Limpa o conteúdo da div
    filmeDiv.innerHTML = "";

    const filme = filmes[index];
    // Verifica se o filme existe e possui pôster
    if (filme && filme.poster_path) {
        const filmeId = filme.id;
        const apiKey = "1673ecba6ca6ad429ac304fc8f30a7c5";
        const url = `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar detalhes do filme');
                }
                    return response.json();
                })
            .then(data => {
                // Exibe os detalhes do filme na página HTML
                filmeDiv.innerHTML = `
                <h2>${filme.title}</h2>
                <p class="data"><strong>Ano de Lançamento:</strong> ${filme.release_date}</p>
                <img class="img-filme" src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="${filme.title}">
                <p class="resenha"><strong></strong> ${data.overview}</p>
                <p class="avaliacao"><strong>Avaliação Geral:</strong> ${data.vote_average}/10</p>
                <p class="id"><strong>ID TMDb:</strong> ${filme.id}</p>
                `;
            // Torna o botão de buscar outro filme visível na página
            document.getElementById("buscarOutroFilme").style.display = "inline"; // Torna o botão visível
            })
            .catch(error => {
                console.error('Erro:', error);
            });
            } else {
                filmeDiv.innerHTML = "<p>Nenhum filme encontrado.</p>";
            }
}

// Função para buscar outro filme com a mesma descrição/nome
function buscarOutroFilme() {
    if (filmes.length > 1) {
        // Remove o primeiro filme da lista
        filmes.shift();
        // Exibe o próximo encontrado
        exibirFilme(0);
    } else {
        alert("Não há mais filmes com a mesma descrição.");
    }
}