const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const orderForm = document.querySelector("#order-form");
const orderSummary = document.querySelector("#order-summary");
const copyOrderButton = document.querySelector("#copy-order");
const sendWhatsAppButton = document.querySelector("#send-whatsapp");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function getCheckedValues(nodeList) {
  return Array.from(nodeList)
    .filter((item) => item.checked)
    .map((item) => item.value);
}

function buildOrderSummary(form) {
  const formData = new FormData(form);
  const items = getCheckedValues(form.querySelectorAll('input[name="items"]'));

  return [
    "MIXENI order request",
    "",
    `Name: ${formData.get("customerName") || ""}`,
    `Business or event: ${formData.get("customerBusiness") || ""}`,
    `Cell number: ${formData.get("customerPhone") || ""}`,
    `Email address: ${formData.get("customerEmail") || ""}`,
    `Order type: ${formData.get("orderType") || ""}`,
    `Channel: ${formData.get("channel") || ""}`,
    `Items: ${items.length ? items.join(", ") : "None selected yet"}`,
    `Pack size: ${formData.get("packSize") || ""}`,
    `Needed by: ${formData.get("neededBy") || ""}`,
    `Delivery area: ${formData.get("deliveryArea") || ""}`,
    `Notes: ${formData.get("notes") || ""}`,
  ].join("\n");
}

if (orderForm && orderSummary) {
  const refreshSummary = () => {
    orderSummary.textContent = buildOrderSummary(orderForm);
  };

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    refreshSummary();
  });

  orderForm.addEventListener("input", refreshSummary);
  refreshSummary();
}

if (copyOrderButton && orderSummary) {
  copyOrderButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(orderSummary.textContent);
      copyOrderButton.textContent = "Copied";
      setTimeout(() => {
        copyOrderButton.textContent = "Copy summary";
      }, 1200);
    } catch (error) {
      copyOrderButton.textContent = "Copy failed";
      setTimeout(() => {
        copyOrderButton.textContent = "Copy summary";
      }, 1200);
    }
  });
}

if (sendWhatsAppButton && orderSummary) {
  sendWhatsAppButton.addEventListener("click", () => {
    const text = encodeURIComponent(orderSummary.textContent);
    window.open(`https://wa.me/27761947454?text=${text}`, "_blank", "noopener,noreferrer");
  });
}
