
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const productGrid = document.getElementById("productGrid");
  const productSearch = document.getElementById("productSearch");
  const productFilters = document.getElementById("productFilters");
  const currentYear = document.getElementById("currentYear");

  const whatsappNumber = "244925398031";

  // Altera estes produtos quando quiseres apresentar outros artigos.
  // Os preços ficam como "Sob consulta" até confirmares os valores reais.
  const products = [
    {
      name: "Consola de videojogos",
      category: "Gaming",
      description: "Consulta a disponibilidade e as versões disponíveis.",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=80",
      tag: "GAMING"
    },
    {
      name: "Comando para consola",
      category: "Gaming",
      description: "Acessórios para melhorar a tua experiência de jogo.",
      image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=700&q=80",
      tag: "ACESSÓRIO"
    },
    {
      name: "Consola de jogos retro",
      category: "Retro",
      description: "Revive os teus jogos clássicos favoritos.",
      image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=700&q=80",
      tag: "RETRO"
    },
    {
      name: "Auscultadores",
      category: "Música",
      description: "Som para jogar, ouvir música e relaxar.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
      tag: "ÁUDIO"
    },
    {
      name: "Acessórios gamer",
      category: "Acessórios",
      description: "Descobre acessórios para completar o teu setup.",
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=700&q=80",
      tag: "GAMER"
    },
    {
      name: "Comando de videojogos",
      category: "Gaming",
      description: "Consulta modelos compatíveis com a tua consola.",
      image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=700&q=80",
      tag: "DESTAQUE"
    },
    {
      name: "Equipamento de som",
      category: "Música",
      description: "Encontra uma opção adequada às tuas necessidades.",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80",
      tag: "SOM"
    },
    {
      name: "Equipamento para setup",
      category: "Acessórios",
      description: "Dá um novo visual ao teu espaço gamer.",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=700&q=80",
      tag: "SETUP"
    }
  ];

  let activeCategory = "Todos";
  let searchTerm = "";

  // Atualiza o ano automaticamente.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Efeito do cabeçalho ao deslocar a página.
  function updateHeader() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Menu para telemóveis.
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        navigation.classList.contains("open") &&
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      }
    });
  }

  // Cria os cartões de produtos.
  function renderProducts() {
    if (!productGrid) return;

    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        activeCategory === "Todos" ||
        product.category === activeCategory;

      const searchableText =
        `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase("pt");

      const matchesSearch = searchableText.includes(searchTerm);

      return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
      productGrid.innerHTML = `
        <p class="empty-message">
          Não encontrámos produtos com esses critérios.
          Experimenta outra pesquisa ou categoria.
        </p>
      `;
      return;
    }

    productGrid.innerHTML = filteredProducts.map((product) => {
      const message =
        `Olá! Gostaria de saber o preço e a disponibilidade de: ${product.name}.`;

      const whatsappLink =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      return `
        <article class="product-card">
          <div class="product-image">
            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
            >
            <span class="product-tag">${product.tag}</span>
          </div>

          <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>

            <div class="product-bottom">
              <div class="product-price">
                <small>PREÇO</small>
                Sob consulta
              </div>

              <a
                class="product-order"
                href="${whatsappLink}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consultar preço de ${product.name} pelo WhatsApp"
              >
                Consultar ↗
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // Pesquisa por nome, categoria ou descrição.
  if (productSearch) {
    productSearch.addEventListener("input", () => {
      searchTerm = productSearch.value.trim().toLocaleLowerCase("pt");
      renderProducts();
    });
  }

  // Filtros por categoria.
  if (productFilters) {
    productFilters.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;

        productFilters.querySelectorAll("[data-filter]").forEach((item) => {
          const isActive = item === button;
          item.classList.toggle("active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });

        renderProducts();
      });
    });
  }

  // Ao clicar numa categoria visual, filtra os produtos correspondentes.
  document.querySelectorAll("[data-category-link]").forEach((card) => {
    card.addEventListener("click", () => {
      activeCategory = card.dataset.categoryLink;

      if (productSearch) {
        productSearch.value = "";
      }

      searchTerm = "";

      if (productFilters) {
        productFilters.querySelectorAll("[data-filter]").forEach((button) => {
          const isActive = button.dataset.filter === activeCategory;
          button.classList.toggle("active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });
      }

      renderProducts();
    });
  });

  // Destaca no menu a secção que está a ser visitada.
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isActive);
        });
      });
    }, {
      rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Apresenta os produtos no carregamento da página.
  renderProducts();
});
