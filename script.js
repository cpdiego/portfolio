
/* ==========================================
   1. ELEMENTOS DA PÁGINA
========================================== */

const botaoMenu = document.querySelector("#botao-menu");
const menuNavegacao = document.querySelector("#menu-navegacao");
const linksMenu = document.querySelectorAll(".link-menu");

const consultaCelular = window.matchMedia("(max-width: 760px)");


/* ==========================================
   2. ABRIR E FECHAR O MENU
========================================== */

function fecharMenu() {
  menuNavegacao.classList.remove("aberto");
  botaoMenu.classList.remove("aberto");

  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
}

function alternarMenu() {
  const menuEstaAberto =
    menuNavegacao.classList.contains("aberto");

  if (menuEstaAberto) {
    fecharMenu();
    return;
  }

  menuNavegacao.classList.add("aberto");
  botaoMenu.classList.add("aberto");

  botaoMenu.setAttribute("aria-expanded", "true");
  botaoMenu.setAttribute("aria-label", "Fechar menu");
}

botaoMenu.addEventListener("click", alternarMenu);


/* ==========================================
   3. FECHAR AO SELECIONAR UMA OPÇÃO
========================================== */

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    linksMenu.forEach((outroLink) => {
      outroLink.classList.remove("ativo");
      outroLink.removeAttribute("aria-current");
    });

    link.classList.add("ativo");
    link.setAttribute("aria-current", "page");

    fecharMenu();
  });
});


/* ==========================================
   4. FECHAR AO CLICAR FORA DO MENU
========================================== */

document.addEventListener("click", (evento) => {
  const clicouNoMenu =
    menuNavegacao.contains(evento.target);

  const clicouNoBotao =
    botaoMenu.contains(evento.target);

  if (!clicouNoMenu && !clicouNoBotao) {
    fecharMenu();
  }
});


/* ==========================================
   5. FECHAR COM A TECLA ESC
========================================== */

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    const menuEstavaAberto =
      menuNavegacao.classList.contains("aberto");

    fecharMenu();

    if (menuEstavaAberto && consultaCelular.matches) {
      botaoMenu.focus();
    }
  }
});


/* ==========================================
   6. ADAPTAR QUANDO A TELA MUDA
========================================== */

consultaCelular.addEventListener("change", () => {
  fecharMenu();
});


/* ==========================================
   7. SEÇÃO SOBRE — ANIMAÇÃO DE ENTRADA
========================================== */

const elementosAnimadosSobre =
  document.querySelectorAll(".animar-sobre");

function mostrarElementosSobre() {
  elementosAnimadosSobre.forEach((elemento) => {
    elemento.classList.add("sobre-visivel");
  });
}

if ("IntersectionObserver" in window) {
  const observadorSobre = new IntersectionObserver(
    (entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("sobre-visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  elementosAnimadosSobre.forEach((elemento) => {
    observadorSobre.observe(elemento);
  });
} else {
  mostrarElementosSobre();
}


/* ========================================
   ANIMAÇÃO DOS PROJETOS AO ROLAR A PÁGINA
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const elementosAnimados = document.querySelectorAll(
    '.cabecalho-projetos, .cartao-projeto, .rodape-projetos'
  );

  // Respeita a preferência de movimento reduzido
  const movimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (movimentoReduzido || !('IntersectionObserver' in window)) {
    elementosAnimados.forEach((elemento) => {
      elemento.classList.add('visivel');
    });

    return;
  }

  const observador = new IntersectionObserver(
    (entradas, observadorAtual) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');

          // Anima apenas na primeira aparição
          observadorAtual.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elementosAnimados.forEach((elemento) => {
    observador.observe(elemento);
  });
});
