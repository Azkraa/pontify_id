document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    const fields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message")
    };

    const emailLabel = document.getElementById("emailLabel");

    /* ===============================
       SCROLL ANIMATION
    =============================== */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting)
                entry.target.classList.add("show");
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));


    /* ===============================
       TOGGLE GMAIL ↔ WHATSAPP
    =============================== */
    document.querySelectorAll("input[name='sendMethod']").forEach(radio => {
        radio.addEventListener("change", () => {

            const mode = document.querySelector("input[name='sendMethod']:checked").value;

            if (mode === "whatsapp") {
                emailLabel.innerText = "Nomor WhatsApp";
                fields.email.type = "tel";
                fields.email.placeholder = "Contoh: 0895709537878";
                fields.subject.value = "Pesan dari Website Pontify";

            } else {
                emailLabel.innerText = "Email";
                fields.email.type = "email";
                fields.email.placeholder = "Email Anda";
            }

        });
    });


    /* ===============================
       VALIDATION
    =============================== */
    function validate() {
        if (fields.name.value.trim() === "") return alert("Nama wajib diisi");
        if (fields.email.value.trim() === "") return alert("Email / Nomor WA wajib diisi");
        if (fields.message.value.trim().length < 2) return alert("Pesan terlalu singkat");

        return true;
    }


    /* ===============================
       SUBMIT EVENT
    =============================== */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validate()) return;

        const mode = document.querySelector("input[name='sendMethod']:checked").value;

        /* SEND WITH GMAIL */
        if (mode === "gmail") {
            const emailBody =
                `Nama: ${fields.name.value}\n` +
                `Email: ${fields.email.value}\n` +
                `Subjek: ${fields.subject.value}\n\n` +
                `${fields.message.value}`;

            window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=adminpontify@gmail.com&su=${encodeURIComponent(fields.subject.value)}&body=${encodeURIComponent(emailBody)}`,
                "_blank"
            );
        }

        /* SEND WITH WHATSAPP */
        if (mode === "whatsapp") {
            const phone = fields.email.value.replace(/\D/g, "");
            const text =
                `*Pesan dari Website Pontify.id*%0A%0A` +
                `*Nama:* ${fields.name.value}%0A` +
                `*Subjek:* ${fields.subject.value}%0A` +
                `*Pesan:* ${fields.message.value}`;

            window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
        }

        successMessage.style.display = "block";
        setTimeout(() => successMessage.style.display = "none", 3000);

        form.reset();
    });
});
