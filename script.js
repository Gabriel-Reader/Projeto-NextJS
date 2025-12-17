// ======================================================
// 1. FUNÇÕES GLOBAIS DE AUTENTICAÇÃO
// (Essenciais para o portal funcionar)
// ======================================================

function verificarAuth() {
    // Se não estivermos na página de login (index.html)
    if (!document.getElementById('loginForm') && !window.location.href.includes('index.html')) {
        const usuario = localStorage.getItem('usuarioLogado');
        if (!usuario) {
            // Se não tiver usuário logado, manda de volta para o login
            window.location.href = 'index.html'; 
        }
    }
}

function carregarUsuario() {
    const usuario = localStorage.getItem('usuarioLogado');
    const displayElement = document.getElementById('nomeUsuarioDisplay');
    
    if (displayElement && usuario) {
        displayElement.innerText = usuario;
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// ======================================================
// LÓGICA DE LOGIN (SÓ RODA NO INDEX.HTML)
// ======================================================

const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "Inter";

// Tenta pegar o formulário
const loginForm = document.getElementById("loginForm") || document.getElementById("loginFormulario");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuarioInput = document.getElementById("usuario");
        const senhaInput = document.getElementById("senha");
        
        // Elementos de mensagem de erro (opcionais)
        const ulMensagens = document.querySelector(".ul-flashed-messages");
        const liMensagem = document.querySelector(".mensagem-validacao");

        // Limpa mensagens anteriores
        if(liMensagem) liMensagem.textContent = "";
        if(ulMensagens) ulMensagens.style.display = "none";

        const usuarioDigitado = usuarioInput.value;
        const senhaDigitada = senhaInput.value;

        // VERIFICAÇÃO ESTRITA (Só entra se for igual às variáveis)
        if (usuarioDigitado === USUARIO_CORRETO && senhaDigitada === SENHA_CORRETA) {
            
            // Login com sucesso
            localStorage.setItem('usuarioLogado', usuarioDigitado); 
            window.location.href = "portal.html";

        } else {
            // Login falhou
            const mensagemErro = "Usuário ou senha incorretos.";
            
            if (liMensagem && ulMensagens) {
                // Se tiver o HTML de erro, mostra lá
                liMensagem.textContent = mensagemErro;
                ulMensagens.style.display = "block";
            } else {
                // Se não, mostra um alerta padrão
                alert(mensagemErro); 
            }
            
            // Limpa o campo de senha e foca nele novamente
            if(senhaInput) {
                senhaInput.value = "";
                senhaInput.focus();
            }
        }
    });
}

// ======================================================
// MODO ESCURO
// ======================================================

const darkModeBtn = document.getElementById("darkmodeID");
if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

// ======================================================
// LÓGICA DO PORTAL (SÓ RODA NO PORTAL.HTML)
// ======================================================

const formMorador = document.getElementById('formMorador');

if (formMorador) {
    formMorador.addEventListener('submit', function(e) {
        e.preventDefault();

        const imagemInput = document.getElementById('m_imagem');
        const file = imagemInput.files[0]; // Pega o primeiro arquivo selecionado

        if (file) {
            // Se tem arquivo, precisamos ler ele antes de criar o cartão
            const reader = new FileReader();

            // Quando o leitor terminar de ler o arquivo:
            reader.onloadend = function() {
                // O resultado (reader.result) é uma string longa (Data URL) da imagem
                // Chamamos a função que cria o cartão passando essa string
                criarCartaoPedido(reader.result);
            }

            // Manda ler o arquivo como uma URL de dados
            reader.readAsDataURL(file);

        } else {
            // Se não tem arquivo, chama a função passando null para a imagem
            criarCartaoPedido(null);
        }
    });
}


// Função separada para gerar o HTML do cartão e inserir na página
function criarCartaoPedido(imagemDataUrl) {
    // Coleta valores dos textos
    const categoria = document.getElementById('m_categoria').value;
    const descricao = document.getElementById('m_descricao').value;
    const casa = document.getElementById('m_casa').value;
    const localManutencao = document.getElementById('m_localManutencao').value;
    const quartoVal = document.getElementById('m_quarto').value;
    const alaVal = document.getElementById('m_ala').value;
    
    let localizacaoTexto = `Casa: ${casa}`;
    if(quartoVal) localizacaoTexto += ` • Quarto: ${quartoVal}`;
    if(alaVal) localizacaoTexto += ` • Ala: ${alaVal}`;

    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const idAleatorio = Math.floor(Math.random() * 10000);

    // --- LÓGICA DA IMAGEM ---
    // Prepara o HTML da imagem se ela existir, senão fica vazio
    let imagemHtml = '';
    if (imagemDataUrl) {
        imagemHtml = `
            <div class="pedido-imagem-container">
                <img src="${imagemDataUrl}" alt="Foto do problema" class="pedido-imagem">
            </div>
        `;
    }
    // ------------------------

    // Cria HTML do cartão
    const novoCartao = `
        <div class="cartao-pedido">
            <button class="btn-excluir" onclick="removerPedido(this)">X</button>

            <div class="pedido-tag-categoria">${categoria}</div>
            <p class="pedido-descricao">${descricao}</p>

            ${imagemHtml}
            
            <h4 class="pedido-local-titulo">Localização</h4>
            <p class="pedido-local-detalhe">${localizacaoTexto}</p>

            <h4 class="pedido-local-titulo">Local da Manutenção</h4>
            <p class="pedido-local-detalhe">${localManutencao}</p>
            
            <hr class="pedido-divisor">
            
            <div class="pedido-rodape">
                <div class="pedido-status-container">
                    <span class="pedido-tag-status status-aberto">Aberto</span>
                    <span class="pedido-data">Criado em: ${dataHoje}</span>
                </div>
                <span class="pedido-id">ID: ${idAleatorio}</span>
            </div>

            <hr class="pedido-divisor">

            <div class="pedido-comentarios">
                <p class="comentario-titulo">Comentários do Gestor:</p>
                <div class="comentario-conteudo">
                    <p>Aguardando análise.</p>
                </div>
            </div>
        </div>
    `;

    const lista = document.getElementById('listaPedidos');
    if (lista) {
        lista.insertAdjacentHTML('afterbegin', novoCartao);
    }

    formMorador.reset(); // Limpa o formulário
}

function removerPedido(btn) {
    if (confirm("Tem certeza que deseja excluir este pedido?")) {
        const card = btn.closest('.cartao-pedido');
        card.remove();
    }
}