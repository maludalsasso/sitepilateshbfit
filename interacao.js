document.addEventListener("DOMContentLoaded", () => {
  // --- CAPTURA DE ELEMENTOS DO HTML ---
  const body = document.body;
  const cursorGlow = document.querySelector(".cursor-glow");
  const leadForm = document.querySelector(".clean-contact-form"); // Captura o seu formulário de contato
  const formStatus = document.createElement("p"); // Cria dinamicamente um espaço para mensagens de erro/sucesso
  
  // Elementos com efeitos visuais
  const magneticItems = document.querySelectorAll(".magnetic");
  const tiltCards = document.querySelectorAll(".method-card-item, .service-card-item"); // Aplica o efeito 3D nos cards
  const sectionLinks = document.querySelectorAll(".nav-links a");
  const sections = [...document.querySelectorAll("section[id]")];

  // Configuração rápida do aviso de status do formulário (aparece abaixo do botão)
  if (leadForm) {
    formStatus.className = "form-status-msg";
    formStatus.style.marginTop = "10px";
    formStatus.style.fontWeight = "600";
    formStatus.style.fontSize = "0.9rem";
    leadForm.appendChild(formStatus);
  }

  // --- FUNÇÃO AUXILIAR DE VALIDAÇÃO ---
  // Limpa parênteses, traços e espaços do WhatsApp para validação numérica
  const onlyDigits = (str) => str.replace(/\D/g, "");

  // --- 1. FORMULÁRIO DE CONTATO (INTEGRAÇÃO WHATSAPP) ---
  if (leadForm) {
    leadForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Captura o campo de mensagem que tem no HTML
      const mensagemCampo = document.getElementById("message");
      const mensagem = mensagemCampo ? mensagemCampo.value.trim() : "";
      
      if (!mensagem) {
        formStatus.style.color = "#ef4444";
        formStatus.textContent = "Por favor, escreva sua mensagem antes de enviar.";
        return;
      }

      // Monta o texto codificado profissional para o WhatsApp comercial
      const texto = `Olá! Estava navegando no site da HBFIT e gostaria de mais informações.%0A%0A` +
                    `*Mensagem enviada:* ${mensagem}`;

      formStatus.style.color = "#007766";
      formStatus.textContent = "Abrindo WhatsApp...";
      
      // Abre o link direto na API do WhatsApp
      window.open(`https://wa.me/5548988161040?text=${texto}`, "_blank");
    });
  }

  // --- 2. MAGNETIC ITEMS ---
  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translate(0, 0)";
    });
  });

  // --- 3. EFEITO 3D NOS CARDS (TILT CARDS) ---
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = (x / rect.width - 0.5) * 8;
      const rotateX = (y / rect.height - 0.5) * -8;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // --- 4. CURSOR GLOW (BRILHO QUE SEGUE O MOUSE) ---
  window.addEventListener("mousemove", (event) => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  // --- 5. ROLAGEM SUAVE ---
  sectionLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 90; 
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // --- 6. MENU ATIVO CONFORME A ROLAGEM (MENU TRACKING) ---
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 140; // Margem de detecção
    
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      
      if (!navLink) return;

      if (scrollY >= top && scrollY < top + height) {
        sectionLinks.forEach((link) => link.classList.remove("active"));
        navLink.classList.add("active");
      }
    });
  });

  // --- 7. CONTROLE DO MENU HAMBÚRGUER MOBILE 
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const linksInternos = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    // Abre e fecha o menu ao clicar nas 3 barrinhas
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Fecha o menu automaticamente quando o usuário clicar em qualquer link
    linksInternos.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}); 