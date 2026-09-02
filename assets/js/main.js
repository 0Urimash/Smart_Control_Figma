function salvarNomeUsuario(nome) {
    const nomeLimpo = (nome || "").trim();

    if (!nomeLimpo) return;

    localStorage.setItem("smart-control-nome", nomeLimpo);
    localStorage.setItem("smart-control-sobrenome", "");
}

const formCadastro = document.querySelector("#formCadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeInput = document.querySelector("#nomeCadastro");

        salvarNomeUsuario(nomeInput?.value);
        window.location.href = "dashboard.html";
    });
}

const formLogin = document.querySelector("#formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeInput = document.querySelector("#nomeLogin");
        const nome = (nomeInput?.value || "").trim();

        if (nome) {
            localStorage.setItem("smart-control-nome", nome);
            localStorage.setItem("smart-control-sobrenome", "");
            window.location.href = `dashboard.html?nome=${encodeURIComponent(nome)}`;
            return;
        }

        window.location.href = "dashboard.html";
    });
}

const formRecuperarSenha = document.querySelector("#formRecuperarSenha");

if (formRecuperarSenha) {
    formRecuperarSenha.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.querySelector("#emailRecuperacao")?.value.trim() || "";
        const senha = document.querySelector("#novaSenha")?.value || "";
        const confirmarSenha = document.querySelector("#confirmarSenha")?.value || "";

        if (!email || !senha || !confirmarSenha) {
            alert("Preencha todos os campos antes de continuar.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        alert("Senha atualizada com sucesso!");
        window.location.href = "index.html";
    });
}

const areaBoasVindas = document.querySelector("#boas-vindas");

if (areaBoasVindas) {
    const nomeParametro = new URLSearchParams(window.location.search).get("nome");
    const nomeSalvo = localStorage.getItem("smart-control-nome");

    let nome = nomeParametro || nomeSalvo || "Usuário";

    if (nomeParametro) {
        localStorage.setItem("smart-control-nome", nomeParametro);
        localStorage.setItem("smart-control-sobrenome", "");
    }

    if (!nome || nome.trim() === "") {
        try {
            nome = window.prompt ? window.prompt("Digite seu nome:") || "Usuário" : "Usuário";
        } catch (error) {
            nome = "Usuário";
        }
    }

    if (nome && nome.trim() !== "") {
        salvarNomeUsuario(nome);
    }

    const usuario = nome.trim();
    const agora = new Date();
    const dias = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];

    const diaSemana = dias[agora.getDay()];
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");
    const fusoMinutos = -agora.getTimezoneOffset();
    const sinal = fusoMinutos >= 0 ? "+" : "-";
    const fusoHoras = String(Math.floor(Math.abs(fusoMinutos) / 60)).padStart(2, "0");
    const fuso = `${sinal}${fusoHoras}:00`;
    const mensagem = `Olá, ${usuario}! Hoje é ${diaSemana}, ${dia}/${mes}/${ano} - ${hora}:${minuto} (${fuso})`;

    areaBoasVindas.innerHTML = `<p>${mensagem}</p>`;
    console.log(mensagem);
}

const campoBusca = document.querySelector("#campoBusca");
const linhasTabela = document.querySelectorAll(".relatorio-card tbody tr");

if (campoBusca) {
    campoBusca.addEventListener("input", function () {
        const textoBusca = campoBusca.value.trim().toLowerCase();

        linhasTabela.forEach(function (linha) {
            const textoLinha = linha.textContent.toLowerCase();
            const deveMostrar = !textoBusca || textoLinha.includes(textoBusca);
            linha.classList.toggle("linha-escondida", !deveMostrar);
        });
    });
}

const botaoTema = document.querySelector("#botaoTema");

function atualizarTema(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    localStorage.setItem("smart-control-theme", isDark ? "dark" : "light");

    if (botaoTema) {
        botaoTema.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i> Light Mode'
            : '<i class="fa-solid fa-moon"></i> Dark Mode';
    }
}

if (botaoTema) {
    const temaSalvo = localStorage.getItem("smart-control-theme");
    atualizarTema(temaSalvo === "dark");

    botaoTema.addEventListener("click", function () {
        const novoTema = !document.body.classList.contains("dark-theme");
        atualizarTema(novoTema);
    });
}

const menuToggle = document.querySelector("#menu-toggle");
const menuLateral = document.querySelector("#menu-lateral");

if (menuToggle && menuLateral) {
    menuToggle.addEventListener("change", function () {
        menuLateral.classList.toggle("menu-aberto", menuToggle.checked);
    });
}

const linksMenu = document.querySelectorAll("#menu-lateral a");
linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        if (menuToggle) menuToggle.checked = false;
        if (menuLateral) menuLateral.classList.remove("menu-aberto");
    });
});
