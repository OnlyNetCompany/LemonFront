// numero para cachear
let cachedNumber = null;

const BASE_URL = 'https://informed-bouquet-1f02098133.strapiapp.com';

async function getNextPhone(retries = 1) {
  try {
    const res = await fetch(`${BASE_URL}/phones/next`);

    // validar error de Strapi
    if (!res.ok) throw new Error('HTTP error');

    const data = await res.json();

    // validar si llego un numero
    if (!data.number) {
      console.error('No hay números disponibles');
      return null;
    }

    return data.number;
  } catch (err) {
    // reintentar 3 veces
    if (retries > 0) {
      console.warn('Reintentando...');
      await new Promise((r) => setTimeout(r, 1500));
      return getNextPhone(retries - 1);
    }

    console.error('Error obteniendo número:', err);
    return null;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  getNextPhone().then((num) => {
    cachedNumber = num;
  });
  const whatsappBtn = document.getElementById('whatsappButton');
  const nameInput = document.getElementById('clientName');

  // seguridad
  if (!whatsappBtn || !nameInput) return;

  // estado inicial botón
  whatsappBtn.disabled = true;
  whatsappBtn.style.opacity = '0.5';
  whatsappBtn.style.cursor = 'not-allowed';

  // activar botón
  nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim();

    if (name.length > 0) {
      whatsappBtn.disabled = false;
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.cursor = 'pointer';
    } else {
      whatsappBtn.disabled = true;
      whatsappBtn.style.opacity = '0.5';
      whatsappBtn.style.cursor = 'not-allowed';
    }
  });

  // click botón
  whatsappBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name) return;

    // dehabilitar boton
    whatsappBtn.disabled = true;
    whatsappBtn.innerText = 'Cargando...';

    // Pixel
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', 'WhatsappClick', { buttonName: 'WhatsApp' });
    }

    // obtener número
    let number = cachedNumber || (await getNextPhone());

    // numero fallback
    if (!number || typeof number !== 'string') {
      const numbers = [
        "5493513227199",
        "5493562546777",
      ];
      number = numbers[Math.floor(Math.random() * numbers.length)];
    }

    const message = encodeURIComponent(`Hola, soy ${name}. Quiero un usuario`);

    // redirección segura
    window.location.href = `https://wa.me/${number}?text=${message}`;
  });
});
