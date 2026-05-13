document.addEventListener("DOMContentLoaded", function () {

  // BOTONES
 
  const btnES = document.getElementById("btn-es");
  const btnEN = document.getElementById("btn-en");

  // IDIOMA GUARDADO

  let idiomaActual = localStorage.getItem("idioma") || "es";

  // SALUDO

  const textosSaludo = {
    es: h => h < 12 ? "Buenos días ☀️" : h < 18 ? "Buenas tardes 🌤️" : "Buenas noches 🌙",
    en: h => h < 12 ? "Good morning ☀️" : h < 18 ? "Good afternoon 🌤️" : "Good evening 🌙"
  };

  function actualizarSaludo() {
    const hora = new Date().getHours();
    const el = document.getElementById("mensaje-bienvenida");
    if (el) el.textContent = textosSaludo[idiomaActual](hora);
  }

  // CAMBIAR IDIOMA (AHORA CON JSON)
async function cambiarIdioma(idioma) {
  idiomaActual = idioma;
  localStorage.setItem("idioma", idioma);

  const res = await fetch(`lang/${idioma}.json`);
  const textos = await res.json();

  for (let id in textos) {
    const elemento = document.getElementById(id);

    if (elemento) {
      if (id === "hero-titulo") {
        elemento.innerHTML = textos[id];
      } else {
        elemento.textContent = textos[id];
      }
    }
  }

  actualizarSaludo();
  actualizarBotones();
}



  // BOTONES ACTIVOS
  function actualizarBotones() {
    if (!btnES || !btnEN) return;

    if (idiomaActual === "en") {
      btnEN.classList.add("activo");
      btnES.classList.remove("activo");
    } else {
      btnES.classList.add("activo");
      btnEN.classList.remove("activo");
    }
  }

  // EVENTOS
  btnEN?.addEventListener("click", () => cambiarIdioma("en"));
  btnES?.addEventListener("click", () => cambiarIdioma("es"));

  // INICIO
  cambiarIdioma(idiomaActual);
  

  // CARRUSEL 

const contenedor = document.querySelector(".carrusel-contenedor");

// Botones
const botonCarruselRetroceder =
  document.querySelector(".boton_carrusel_retroceder");

const botonCarruselAvanzar =
  document.querySelector(".boton_carrusel_avanzar");

// desplazamiento
const desplazamiento = 370;


// SOLO si existe el carrusel
if (contenedor) {

  // avanzar
  botonCarruselAvanzar?.addEventListener("click", () => {
    contenedor.scrollLeft += desplazamiento;
  });

  // retroceder
  botonCarruselRetroceder?.addEventListener("click", () => {
    contenedor.scrollLeft -= desplazamiento;
  });

}

  // SLIDER AUTOMÁTICO
setInterval(() => {
  if (!contenedor) return;

  
  if (contenedor.scrollLeft + contenedor.clientWidth >= contenedor.scrollWidth) {
    contenedor.scrollLeft = 0;
  } else {
    contenedor.scrollLeft += desplazamiento;
  }

}, 4000); 





  // MENÚ RESPONSIVE
const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuBtn && navMenu) {

  menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("activo");

    const expanded =
      menuBtn.getAttribute("aria-expanded") === "true";

    menuBtn.setAttribute("aria-expanded", !expanded);

  });

}






// FILTRO RESTAURANTES

const botones = document.querySelectorAll(".filtro");
const tarjetas = document.querySelectorAll(".restaurante-tarjeta");

botones.forEach(boton => {
  boton.addEventListener("click", () => {

    // activar botón
    botones.forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");

    const id = boton.id;

    tarjetas.forEach(tarjeta => {

      if (id === "filtro-todos") {
        tarjeta.style.display = "block";
      } 
      else if (id === "filtro-moderna") {
        tarjeta.style.display = tarjeta.classList.contains("moderna") ? "block" : "none";
      } 
      else if (id === "filtro-postres") {
        tarjeta.style.display = tarjeta.classList.contains("postres") ? "block" : "none";
      } 
      else if (id === "filtro-fusion") {
        tarjeta.style.display = tarjeta.classList.contains("fusion") ? "block" : "none";
      }

    });

  });
});



});