window.addEventListener("DOMContentLoaded", () => {

    const whatsappBtn = document.getElementById("whatsappButton");
    const nameInput = document.getElementById("clientName");

    // seguridad
    if (!whatsappBtn || !nameInput) return;

    const BASE_URL = "https://informed-bouquet-1f02098133.strapiapp.com";

    async function getNextPhone() {
        try {
            const res = await fetch(`${BASE_URL}/phones/next`);
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

    // estado inicial botón
    whatsappBtn.disabled = true;
    whatsappBtn.style.opacity = "0.5";
    whatsappBtn.style.cursor = "not-allowed";

    // activar botón
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
    whatsappBtn.addEventListener("click", async () => {

        const name = nameInput.value.trim();
        if (!name) return;

        // Pixel
        if (typeof fbq !== "undefined") {
            fbq('trackCustom', 'WhatsappClick', { buttonName: 'WhatsApp' });
        }

        // obtener número
        const number = await getNextPhone();
        if (!number) return;

        const message = encodeURIComponent(`Hola, soy ${name}. Quiero un usuario`);

        // redirección segura
        window.location.href = `https://wa.me/${number}?text=${message}`;
    });

});
