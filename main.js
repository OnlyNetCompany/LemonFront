window.addEventListener("DOMContentLoaded", () => {

    const whatsappBtn = document.getElementById("whatsappButton");
    const nameInput = document.getElementById("clientName");

    if (!whatsappBtn || !nameInput) return;

    const BASE_URL = "https://informed-bouquet-1f02098133.strapiapp.com";

    async function getNextPhone() {
        try {
            const res = await fetch(`${BASE_URL}/phones/next`);
            const data = await res.json();
            return data.number || null;
        } catch {
            return null;
        }
    }

    whatsappBtn.addEventListener("click", () => {

        const name = nameInput.value.trim();
        if (!name) return;

        // Pixel
        if (typeof fbq !== "undefined") {
            fbq('trackCustom', 'WhatsappClick');
        }

        // abrir inmediatamente (clave)
        const newWindow = window.open("", "_self");

        // luego obtener número
        getNextPhone().then(number => {

            if (!number) return;

            const message = encodeURIComponent(`Hola, soy ${name}. Quiero un usuario`);

            newWindow.location.href = `https://wa.me/${number}?text=${message}`;
        });

    });

});
