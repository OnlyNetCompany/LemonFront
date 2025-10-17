// main.js

window.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".Btn");
    setTimeout(() => btn.classList.add("expand"), 300);
});

// ----------- OBTENER SIGUIENTE NÚMERO DE STRAPI -------------
async function getNextPhone() {
    try {
        const res = await fetch("https://elegant-friendship-1ee1f8c64e.strapiapp.com/phones/next");
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
const whatsappBtn = document.getElementById("whatsappBtn");

if (whatsappBtn) {
    whatsappBtn.addEventListener("click", async () => {

        // Pixel Meta
        if (typeof fbq !== "undefined") {
            fbq('trackCustom', 'WhatsappClick', { buttonName: 'WhatsApp' });
            console.log("WhatsApp button clicked - Pixel event sent!");
        }

        // Obtener el siguiente número
        const number = await getNextPhone();
        if (!number) return;

        // Redirigir a WhatsApp
        // Redirigir a WhatsApp en nueva pestaña
        const message = encodeURIComponent("Hola, quiero un usuario");
        window.open(`https://wa.me/${number}?text=${message}`, "_blank");
    });
}
