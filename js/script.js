const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const campo = document.querySelector('#campo');

window.addEventListener('load', () => {
    campo.addEventListener('submit', buscarBin);
})

function buscarBin(e) {
    e.preventDefault();
    const bin = document.querySelector('#bin').value
    console.log(bin);
    if (bin === '' || bin < 0) {
        mostrarError('Ingresa un bin válido');

        return;
    }
    consultarAPI(bin);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
  if(!alerta) {
      const alerta = document.createElement('div');

      alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );

      alerta.innerHTML = `
          <strong class="font-bold">ERROR: </strong>
          <span class="block sm:inline">${mensaje}</span>
      `;

      container.appendChild(alerta);
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }
}

function consultarAPI(bin) {
    var url = `https://lookup.binlist.net/${bin}`;

    Spinner();

    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(datos => {
            console.log(datos);
            limpiarHTML();
            mostrarClima(datos);
        })
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
  }

function Spinner() {

    limpiarHTML();
  
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
  
    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
  }

  function mostrarClima(datos) {

    // Formatear el Clima...
  
    const { type, brand, country: { alpha2 }, bank: {name} } = datos;
    
    const tipoTarjeta = type;
    const esquema = brand;
    const pais = emojiToName(alpha2);
    const banco = name;
  
    const nombreTipoTarjeta = document.createElement('p');
    nombreTipoTarjeta.innerHTML = `Tipo de tarjeta: ${tipoTarjeta}o`;
    nombreTipoTarjeta.classList.add('font-bold', 'text-2xl')
  
    const nombreEsquema = document.createElement('p');
    nombreEsquema.innerHTML = `Brand: ${esquema}`;
    nombreEsquema.classList.add('font-bold', 'text-2xl')
  
    const nombrePais = document.createElement('p');
    nombrePais.innerHTML = `Pais: ${pais};`;
    nombrePais.classList.add('font-bold', 'text-2xl')

    const nombreBanco = document.createElement('p');
    nombreBanco.innerHTML = `Banco: ${banco};`;
    nombreBanco.classList.add('font-bold', 'text-2xl')
    
  
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreTipoTarjeta);
    resultadoDiv.appendChild(nombreEsquema);
    resultadoDiv.appendChild(nombrePais);
    resultadoDiv.appendChild(nombreBanco);
  
    resultado.appendChild(resultadoDiv)
  }

  function emojiToName(alpha2) {
    switch (alpha2) {
        case 'MX':
          return 'México';
          break;
        case 'US':
          return 'Estados Unidos';
          break;
        case 'BR':
          return 'Brazil';
          break;
          case 'CA':
          return 'Canada';
          break;
        case 'BG':
          return 'Bulgaria';
          break;
          case 'HN':
          return 'Honduras';
          break;
        case 'PN':
          return 'Panama';
          break;
        case 'BZ':
          return 'Belize';
          break;
        case 'CO':
          return 'Colombia';
          break;       
        default:
          return 'Desconocido';
      }
  }