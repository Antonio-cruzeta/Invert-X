// MENU MOBILE
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// ANIMACIÓN SCROLL
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);

// PRECIOS CRYPTO
async function loadPrices() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether,usd-coin,tron,litecoin,axie-infinity&vs_currencies=usd"
    );

    const data = await res.json();

    setPrice("usdt-price", data.tether.usd);
    setPrice("usdc-price", data["usd-coin"].usd);
    setPrice("trx-price", data.tron.usd);
    setPrice("ltc-price", data.litecoin.usd);
    setPrice("axs-price", data["axie-infinity"].usd);

  } catch (error) {
    console.log("Error cargando precios:", error);
  }
}

// FUNCIÓN SEGURA PARA PONER PRECIO
function setPrice(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = "$" + value;
  }
}

// CARGAR AL INICIAR
window.addEventListener("DOMContentLoaded", () => {
  loadPrices();
  reveal(); // activa animaciones iniciales
});

// ACTUALIZAR CADA 30s
setInterval(loadPrices, 30000);