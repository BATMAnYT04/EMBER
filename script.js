/* EMBER website interactions.
   Configure Formspree in config.js before publishing to receive real enquiries. */
(() => {
  const config = window.EMBER_CONFIG || {};
  const form = document.getElementById("enquiry-form");
  const status = document.getElementById("form-status");
  const nav = document.getElementById("primary-nav");
  const menuButton = document.querySelector(".menu-toggle");

  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile navigation
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  // Update these public contact details in config.js.
  if (config.contactEmail) {
    const emailLink = document.getElementById("email-link");
    emailLink.textContent = config.contactEmail + " ↗";
    emailLink.href = "mailto:" + config.contactEmail;
  }
  if (config.instagramUrl) {
    const instagramLink = document.getElementById("instagram-link");
    instagramLink.href = config.instagramUrl;
    instagramLink.textContent = (config.instagramHandle || "@ember") + " ↗";
  }

  // Prefill the event enquiry form from relevant links.
  document.querySelectorAll("[data-event-type]").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("event-type").value = link.dataset.eventType;
    });
  });
  document.querySelectorAll("[data-package]").forEach(link => {
    link.addEventListener("click", () => {
      const details = form.elements.details;
      details.value = `I'm interested in the ${link.dataset.package} package. `;
    });
  });
  document.querySelectorAll("[data-enquiry]").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("event-type").value = "Collaboration / Partnership";
    });
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    if (!form.reportValidity()) return;

    // Formspree endpoint format: https://formspree.io/f/XXXXXXXX
    const endpoint = config.formspreeEndpoint;
    if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
      status.classList.add("error");
      status.textContent = "The form is ready, but submissions are not connected yet. Please configure the Formspree endpoint in config.js before launch.";
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = "SENDING…";

    try {
      const payload = new FormData(form);
      payload.append("_subject", "New EMBER event enquiry");
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) {
        let message = "We couldn't send your enquiry. Please try again or contact us directly.";
        try {
          const result = await response.json();
          if (result.errors) message = result.errors.map(item => item.message).join(" ");
        } catch (_) {}
        throw new Error(message);
      }

      form.reset();
      status.classList.add("success");
      status.textContent = "Thank you — your enquiry has been sent. The EMBER team will be in touch.";
    } catch (error) {
      status.classList.add("error");
      status.textContent = error.message || "Something went wrong. Please try again.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
})();
