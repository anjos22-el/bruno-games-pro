
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const productGrid = document.getElementById("productGrid");
  const currentYear = document.getElementById("currentYear");

  const whatsappNumber = "244925398031";

  // Catálogo inicial: confirma os preços e a disponibilidade pelo WhatsApp.
  const products = [
    {
      name: "PlayStation 2",
      category: "Consolas",
      icon: "🎮",
      description: "Consulta a disponibilidade desta consola clássica."
    },
    {
      name: "PlayStation 3",
      category: "Consolas",
      icon: "🕹️",
      description: "Pergunta pelas versões e condições disponíveis."
    },
    {
      name: "PlayStation 4",
      category: "Consolas",
      icon: "🎮",
      description: "Consulta modelos, estado e disponibilidade."
    },
    {
      name: "PlayStation 5",
      category: "Consolas",
      icon: "🎮",
      description: "Descobre as opções de PS5 disponíveis."
    },
    {
      name: "Comandos e acessórios",
      category: "Acessórios",
      icon: "🎧",
      description: "Comandos, headsets, cabos e outros acessórios."
    },
    {
      name: "Jogos digitais",
      category: "Jogos",
      icon: "👾",
      description: "Indica-nos o jogo e a plataforma que procuras."
    }
  ];

  // Criar os cartões do catálogo.
  if (productGrid) {
    productGrid.innerHTML = products.map((product) => {
      const message = encodeURIComponent(
        `Olá, Bruno Games Pro! Gostaria de informações sobre ${product.name}. Qual é o preço e a disponibilidade?`
      );

      return `
        <article class="product-card">
          <div class="product-image" aria-hidden="true">
            <span>${product.icon}</span>
          </div>
          <div class="product-info">
            <span class="product-tag">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a
              class="btn btn-gold"
              href="https://wa.me/${whatsappNumber}?text=${message}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar ${product.name} pelo WhatsApp"
            >
              Consultar pelo WhatsApp ↗
            </a>
          </div>
        </article>
      `;
    }).join("");
  }

  // Abrir e fechar o menu nos telemóveis.
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Atualizar automaticamente o ano no rodapé.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
