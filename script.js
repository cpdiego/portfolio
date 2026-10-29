
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

/* ==========================================
   ANIMAÇÕES DA SEÇÃO TECNOLOGIAS
========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const elementosAnimados = document.querySelectorAll(
    '.animar-tecnologias'
  );

  const cartoesTecnologias = document.querySelectorAll(
    '.tecnologia-cartao'
  );

  const movimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Exibe tudo sem animação quando necessário
  if (
    movimentoReduzido ||
    !('IntersectionObserver' in window)
  ) {
    elementosAnimados.forEach((elemento) => {
      elemento.classList.add('tecnologias-visivel');
    });

    cartoesTecnologias.forEach((cartao) => {
      cartao.classList.add('visivel');
    });

    return;
  }

  // Observa os grupos e cabeçalhos
  const observadorSecoes = new IntersectionObserver(
    (entradas, observadorAtual) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('tecnologias-visivel');
          observadorAtual.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    }
  );

  elementosAnimados.forEach((elemento) => {
    observadorSecoes.observe(elemento);
  });

  // Anima os cards individualmente
  const observadorCartoes = new IntersectionObserver(
    (entradas, observadorAtual) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observadorAtual.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -25px 0px'
    }
  );

  cartoesTecnologias.forEach((cartao) => {
    observadorCartoes.observe(cartao);
  });
});

/* ==========================================
   SEÇÃO CONTATO — ANIMAÇÕES E FORMULÁRIO
========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------
     ANIMAÇÕES AO ROLAR A PÁGINA
  ---------------------------------------- */

  const elementosAnimados = document.querySelectorAll(
    '.animar-contato'
  );

  const movimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (
    movimentoReduzido ||
    !('IntersectionObserver' in window)
  ) {
    elementosAnimados.forEach((elemento) => {
      elemento.classList.add('contato-visivel');
    });
  } else {
    const observador = new IntersectionObserver(
      (entradas, observadorAtual) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('contato-visivel');
            observadorAtual.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px'
      }
    );

    elementosAnimados.forEach((elemento) => {
      observador.observe(elemento);
    });
  }

  /* ----------------------------------------
     FORMULÁRIO DE CONTATO
  ---------------------------------------- */

  const formulario = document.querySelector('#formulario-contato');
  const statusFormulario = document.querySelector('#contato-status');

  // Troque pelo seu e-mail profissional.
  const emailDestino = 'SEU_EMAIL@EXEMPLO.COM';

  if (!formulario || !statusFormulario) {
    return;
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!formulario.reportValidity()) {
      return;
    }

    const dados = new FormData(formulario);

    const nome = dados.get('nome').trim();
    const email = dados.get('email').trim();
    const telefone = dados.get('telefone').trim();
    const assunto = dados.get('assunto');
    const mensagem = dados.get('mensagem').trim();

    const assuntoEmail = `Contato pelo portfólio: ${assunto}`;

    const corpoEmail = [
      'Nova mensagem enviada pelo formulário do portfólio.',
      '',
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      `Telefone: ${telefone}`,
      `Assunto: ${assunto}`,
      '',
      'Mensagem:',
      mensagem
    ].join('\n');

    const linkEmail =
      `mailto:${emailDestino}` +
      `?subject=${encodeURIComponent(assuntoEmail)}` +
      `&body=${encodeURIComponent(corpoEmail)}`;

    statusFormulario.classList.add('ativo');
    statusFormulario.textContent =
      'Vamos abrir seu aplicativo de e-mail para você revisar e enviar a mensagem.';

    // Abre o aplicativo de e-mail configurado no dispositivo.
    window.location.href = linkEmail;
  });

});