// ======================================================
// 1. FUNÇÕES GLOBAIS
// ======================================================

function verificarAuth() {
    if (!document.getElementById('loginFormulario') && !window.location.href.includes('index.html')) {
        const usuario = localStorage.getItem('usuarioLogado');
        if (!usuario) {
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
// LÓGICA DE LOGIN (Para index.html)
// ======================================================

const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "Inter";

const loginForm = document.getElementById("loginFormulario");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuarioInput = document.getElementById("usuario");
        const senhaInput = document.getElementById("senha");
        
        const usuarioDigitado = usuarioInput.value;
        const senhaDigitada = senhaInput.value;

        if (usuarioDigitado === USUARIO_CORRETO && senhaDigitada === SENHA_CORRETA) {
            localStorage.setItem('usuarioLogado', usuarioDigitado); 
            window.location.href = "portal.html";
        } else {
            alert("Usuário ou senha incorretos."); 
            senhaInput.value = "";
            senhaInput.focus();
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
// LÓGICA DO PORTAL DE MONITORIA (Para portal.html)
// ======================================================

const formMonitoria = document.getElementById('formMonitoria');

if (formMonitoria) {
    formMonitoria.addEventListener('submit', function(e) {
        e.preventDefault();

        const imagemInput = document.getElementById('m_imagem');
        const file = imagemInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = function() {
                criarCartaoDuvida(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            criarCartaoDuvida(null);
        }
    });
}

function criarCartaoDuvida(imagemDataUrl) {
    const materia = document.getElementById('m_materia').value;
    const tipo = document.getElementById('m_tipo').value;
    const assunto = document.getElementById('m_assunto').value;
    const turma = document.getElementById('m_turma').value;
    
    // MUDANÇA AQUI: Pegando o valor do Nome
    const nomeAluno = document.getElementById('m_nome_aluno').value;
    const descricao = document.getElementById('m_descricao').value;
    
    // Formatando o texto para mostrar o Nome
    let infoAluno = `Aluno: ${nomeAluno || 'Anônimo'} • Turma: ${turma || 'N/A'}`;

    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const idAleatorio = Math.floor(Math.random() * 10000);

    let imagemHtml = '';
    if (imagemDataUrl) {
        imagemHtml = `
            <div class="pedido-imagem-container">
                <img src="${imagemDataUrl}" alt="Foto da dúvida" class="pedido-imagem">
            </div>
        `;
    }

    const novoCartao = `
        <div class="cartao-pedido">
            <button class="btn-excluir" onclick="removerPedido(this)">X</button>
            <div class="pedido-tag-categoria">${materia}</div>
            <p class="pedido-descricao"><strong>${assunto}</strong><br>${descricao}</p>
            ${imagemHtml}
            
            <h4 class="pedido-local-titulo">Dados do Aluno</h4>
            <p class="pedido-local-detalhe">${infoAluno}</p>
            
            <h4 class="pedido-local-titulo">Tipo de Solicitação</h4>
            <p class="pedido-local-detalhe">${tipo}</p>
            <hr class="pedido-divisor">
            <div class="pedido-rodape">
                <div class="pedido-status-container">
                    <span class="pedido-tag-status status-aberto">Aguardando Monitor</span>
                    <span class="pedido-data">Postado em: ${dataHoje}</span>
                </div>
                <span class="pedido-id">ID: ${idAleatorio}</span>
            </div>
            <hr class="pedido-divisor">
            <div class="pedido-comentarios">
                <p class="comentario-titulo">Resposta do Monitor:</p>
                <div class="comentario-conteudo"><p>Ainda não respondido.</p></div>
            </div>
        </div>
    `;

    const lista = document.getElementById('listaPedidos');
    if (lista) {
        lista.insertAdjacentHTML('afterbegin', novoCartao);
    }
    formMonitoria.reset(); 
}

function removerPedido(btn) {
    if (confirm("Já resolveu esta dúvida? Deseja excluir?")) {
        btn.closest('.cartao-pedido').remove();
    }
}