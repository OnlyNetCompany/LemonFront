// main.js 1

window.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".Btn");
    setTimeout(() => btn.classList.add("expand"), 300);
});


const BASE_URL = "https://informed-bouquet-1f02098133.strapiapp.com";

// ----------- OBTENER SIGUIENTE NÚMERO DE STRAPI -------------
async function getNextPhone() {
    try {
        const BASE_LINK = BASE_URL;
        const res = await fetch(`${BASE_LINK}/phones/next`);
        const data = await res.json();

        if (!data.number) {
            console.error("No hay números disponibles");
            return null;
        }

        return data.number;
    } catch (err) {
        console.error("Error obteniendo número:", err);
        return null;
    }
}

// ----------- EJEMPLO DE USO EN BOTÓN WHATSAPP -------------
const whatsappBtn = document.getElementById("whatsappButton");
const nameInput = document.getElementById("clientName");

// desactivar botón al inicio
whatsappBtn.disabled = true;
whatsappBtn.style.opacity = "0.5";
whatsappBtn.style.cursor = "not-allowed";

// activar botón solo si hay texto
nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim();

    if (name.length > 0) {
        whatsappBtn.disabled = false;
        whatsappBtn.style.opacity = "1";
        whatsappBtn.style.cursor = "pointer";
    } else {
        whatsappBtn.disabled = true;
        whatsappBtn.style.opacity = "0.5";
        whatsappBtn.style.cursor = "not-allowed";
    }
});

// click botón
if (whatsappBtn) {
    whatsappBtn.addEventListener("click", async () => {

        const name = nameInput.value.trim();

        // seguridad extra
        if (!name) return;

        // Pixel Meta
        if (typeof fbq !== "undefined") {
            fbq('trackCustom', 'WhatsappClick', { buttonName: 'WhatsApp' });
        }

        // obtener número
        const number = await getNextPhone();
        if (!number) return;

        // mensaje personalizado
        const message = encodeURIComponent(`Hola, soy ${name}. Quiero un usuario`);

        // redirección
        window.location.href = `https://wa.me/${number}?text=${message}`;
    });
}
