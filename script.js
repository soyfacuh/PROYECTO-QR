/**
 * QR Fácil · Interfaz y exportación de códigos QR.
 * Sitio estático para GitHub Pages · https://soyfacuh.com/
 * Los datos del usuario se procesan únicamente en el navegador.
 */
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const elements = {
    form: $("#qr-form"),
    fields: $("#field-area"),
    error: $("#form-error"),
    canvas: $("#qr-canvas"),
    empty: $("#empty-qr"),
    status: $("#qr-status"),
    toast: $("#toast"),
    contrast: $("#contrast-message"),
    payloadDetails: $("#generated-content"),
    payloadValue: $("#generated-value"),
    foreground: $("#dark-color"),
    background: $("#light-color"),
    style: $("#module-style"),
    size: $("#qr-size"),
    correction: $("#error-level"),
    filename: $("#file-name"),
    png: $("#download-png"),
    svg: $("#download-svg"),
    copy: $("#copy-content"),
    share: $("#share-qr"),
    print: $("#print-qr")
  };

  const countryOptions = [
    ["+54", "Argentina"],
    ["+55", "Brasil"],
    ["+56", "Chile"],
    ["+57", "Colombia"],
    ["+34", "España"],
    ["+1", "Estados Unidos / Canadá"],
    ["+52", "México"],
    ["+595", "Paraguay"],
    ["+51", "Perú"],
    ["+598", "Uruguay"],
    ["+58", "Venezuela"],
    ["+591", "Bolivia"],
    ["+593", "Ecuador"],
    ["+44", "Reino Unido"],
    ["+39", "Italia"],
    ["+33", "Francia"],
    ["+49", "Alemania"]
  ];

  const countryField = `
    <div class="field">
      <label for="phone-country">Código de país</label>
      <select id="phone-country" name="phone-country">
        ${countryOptions.map(([dial, country]) => `
          <option value="${dial}">${country} (${dial})</option>
        `).join("")}
      </select>
    </div>
  `;

  const templates = {
    url: `
      <div class="field">
        <label for="url">Enlace de destino</label>
        <input id="url" name="url" type="text" inputmode="url" autocomplete="url" placeholder="https://tusitio.com">
        <small>También podés escribir tusitio.com; agregamos https:// automáticamente.</small>
      </div>
    `,
    text: `
      <div class="field">
        <label for="text">Texto que querés compartir</label>
        <textarea id="text" name="text" rows="4" placeholder="Escribí tu mensaje acá..."></textarea>
        <small><span id="text-count">0</span> caracteres · Los textos extensos producen QR más complejos.</small>
      </div>
    `,
    whatsapp: `
      <div class="field-pair">${countryField}
        <div class="field">
          <label for="phone">Número de WhatsApp</label>
          <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="11 1234 5678">
        </div>
      </div>
      <div class="field">
        <label for="message">Mensaje predeterminado <span class="optional">(opcional)</span></label>
        <textarea id="message" name="message" rows="3" placeholder="Hola, quiero hacer una consulta..."></textarea>
        <small>El QR abre el chat. No envía el mensaje automáticamente.</small>
      </div>
    `,
    wifi: `
      <div class="field">
        <label for="ssid">Nombre de la red (SSID)</label>
        <input id="ssid" name="ssid" type="text" autocomplete="off" placeholder="WiFi de casa">
      </div>
      <div class="field-pair">
        <div class="field">
          <label for="password">Contraseña</label>
          <div class="password-wrap">
            <input id="password" name="password" type="password" autocomplete="off" placeholder="Tu contraseña de Wi-Fi">
            <button type="button" id="password-toggle" aria-label="Mostrar contraseña">Ver</button>
          </div>
        </div>
        <div class="field">
          <label for="encryption">Tipo de seguridad</label>
          <select id="encryption" name="encryption">
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Sin contraseña</option>
          </select>
        </div>
      </div>
      <label class="checkbox-field"><input type="checkbox" name="hidden-network" id="hidden-network"> Es una red oculta</label>
      <small class="field-note">La contraseña queda codificada en el QR. Cualquier persona que lo escanee podrá conocerla.</small>
    `,
    email: `
      <div class="field">
        <label for="email">Correo electrónico</label>
        <input id="email" name="email" type="email" autocomplete="email" placeholder="hola@empresa.com">
      </div>
      <div class="field">
        <label for="subject">Asunto <span class="optional">(opcional)</span></label>
        <input id="subject" name="subject" type="text" placeholder="Consulta desde el QR">
      </div>
      <div class="field">
        <label for="body">Mensaje <span class="optional">(opcional)</span></label>
        <textarea id="body" name="body" rows="3" placeholder="¡Hola! Quería consultar..."></textarea>
      </div>
    `,
    phone: `
      <div class="field-pair">${countryField}
        <div class="field">
          <label for="phone">Número de teléfono</label>
          <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="11 1234 5678">
        </div>
      </div>
    `,
    contact: `
      <div class="field">
        <label for="contact-name">Nombre completo</label>
        <input id="contact-name" name="contact-name" type="text" autocomplete="name" placeholder="Nombre y apellido">
      </div>
      <div class="field-pair">
        <div class="field">
          <label for="contact-phone">Teléfono <span class="optional">(opcional)</span></label>
          <input id="contact-phone" name="contact-phone" type="tel" placeholder="+54 11 1234 5678">
        </div>
        <div class="field">
          <label for="contact-email">Email <span class="optional">(opcional)</span></label>
          <input id="contact-email" name="contact-email" type="email" placeholder="hola@empresa.com">
        </div>
      </div>
      <div class="field-pair">
        <div class="field">
          <label for="contact-company">Empresa <span class="optional">(opcional)</span></label>
          <input id="contact-company" name="contact-company" type="text" placeholder="Mi emprendimiento">
        </div>
        <div class="field">
          <label for="contact-url">Sitio web <span class="optional">(opcional)</span></label>
          <input id="contact-url" name="contact-url" type="text" placeholder="tusitio.com">
        </div>
      </div>
    `,
    image: `
      <div class="field">
        <label for="image-url">Enlace público de una imagen</label>
        <input id="image-url" name="image-url" type="text" inputmode="url" placeholder="https://ejemplo.com/imagen.jpg">
        <small>El QR abre esa URL. No sube fotos ni incluye el archivo dentro del código.</small>
      </div>
    `,
    location: `
      <div class="field">
        <label for="location-name">Nombre del lugar <span class="optional">(opcional)</span></label>
        <input id="location-name" name="location-name" type="text" placeholder="Mi local">
      </div>
      <div class="field-pair">
        <div class="field">
          <label for="latitude">Latitud</label>
          <input id="latitude" name="latitude" type="text" inputmode="decimal" placeholder="-34.6037">
        </div>
        <div class="field">
          <label for="longitude">Longitud</label>
          <input id="longitude" name="longitude" type="text" inputmode="decimal" placeholder="-58.3816">
        </div>
      </div>
      <small class="field-note">Podés copiar las coordenadas de Google Maps, con punto decimal.</small>
    `
  };

  const exampleValues = {
    url: { url: "https://soyfacuh.com/" },
    text: { text: "¡Hola! Este es mi primer código QR creado con QR Fácil." },
    whatsapp: { "phone-country": "+54", phone: "11 1234 5678", message: "¡Hola! Quiero hacer una consulta." },
    wifi: { ssid: "Mi red WiFi", password: "ejemplo123456", encryption: "WPA" },
    email: { email: "hola@ejemplo.com", subject: "Consulta", body: "Hola, quisiera solicitar información." },
    phone: { "phone-country": "+54", phone: "11 1234 5678" },
    contact: { "contact-name": "Nombre Ejemplo", "contact-phone": "+54 11 1234 5678", "contact-email": "hola@ejemplo.com", "contact-company": "Mi Empresa" },
    image: { "image-url": "https://example.com/foto.jpg" },
    location: { "location-name": "Obelisco", latitude: "-34.6037", longitude: "-58.3816" }
  };

  let mode = "url";
  let currentResult = null;
  let refreshTimeout = null;
  let toastTimeout = null;
  const drafts = {};

  function value(id) {
    return (document.getElementById(id)?.value || "").trim();
  }

  function showError(message) {
    elements.error.textContent = message;
    elements.error.hidden = !message;
  }

  function toast(message) {
    clearTimeout(toastTimeout);
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    toastTimeout = setTimeout(() => {
      elements.toast.hidden = true;
    }, 3000);
  }

  function saveDraft() {
    drafts[mode] = Object.fromEntries(
      [...elements.fields.querySelectorAll("input, textarea, select")].map((field) => [
        field.id,
        field.type === "checkbox" ? field.checked : field.value
      ])
    );
  }

  function fillFields(data) {
    for (const [id, nextValue] of Object.entries(data)) {
      const field = document.getElementById(id);
      if (!field) continue;
      if (field.type === "checkbox") field.checked = Boolean(nextValue);
      else field.value = nextValue;
    }
    updateFieldExtras();
  }

  function updateFieldExtras() {
    const textCount = $("#text-count");
    if (textCount) textCount.textContent = String(value("text").length);

    const encryption = $("#encryption");
    const password = $("#password");
    if (encryption && password) {
      const hasPassword = encryption.value !== "nopass";
      password.disabled = !hasPassword;
      password.parentElement.classList.toggle("is-disabled", !hasPassword);
    }
  }

  function setMode(nextMode, focus = false, force = false) {
    if (!templates[nextMode]) return;
    if (!force && nextMode === mode && elements.fields.children.length) return;
    if (nextMode !== mode) saveDraft();

    mode = nextMode;
    elements.fields.innerHTML = templates[mode];
    fillFields(drafts[mode] || {});

    $$("[data-mode]").forEach((tab) => {
      const selected = tab.dataset.mode === mode;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    showError("");
    clearResult();
    if (focus) elements.fields.querySelector("input, textarea, select")?.focus();
  }

  function parseWebAddress(raw, description = "enlace") {
    if (!raw) throw new Error(`Ingresá un ${description} para continuar.`);

    const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    let url;

    try {
      url = new URL(candidate);
    } catch {
      throw new Error("Revisá la dirección. Por ejemplo: https://ejemplo.com");
    }

    if (!["https:", "http:"].includes(url.protocol) || !url.hostname ||
        (!url.hostname.includes(".") && url.hostname !== "localhost") ||
        /\s/.test(raw)) {
      throw new Error("El enlace debe ser una dirección web válida (http o https).");
    }

    return url.href;
  }

  function normalizePhone(country, raw, forWhatsApp = false) {
    const dial = country.replace(/\D/g, "");
    let digits = raw.replace(/\D/g, "");

    if (!digits) throw new Error("Ingresá un número de teléfono.");
    if (digits.startsWith("00" + dial)) digits = digits.slice(dial.length + 2);
    else if (digits.startsWith(dial)) digits = digits.slice(dial.length);

    digits = digits.replace(/^0+/, "");

    if (country === "+54") {
      // Formatos típicos argentinos: 011 15 xxxx xxxx / +54 9 11 xxxx xxxx.
      if (digits.startsWith("91115") && digits.length === 13) {
        digits = "911" + digits.slice(5);
      } else if (digits.startsWith("1115") && digits.length === 12) {
        digits = "11" + digits.slice(4);
      }
      if (forWhatsApp && !digits.startsWith("9")) digits = "9" + digits;
    }

    const full = dial + digits;
    if (full.length < 9 || full.length > 15) {
      throw new Error("Revisá el número y el país. Debe incluir el código de área.");
    }
    return full;
  }

  function escapeWifi(text) {
    return text.replace(/([\\;,:\"])/g, "\\$1");
  }

  function escapeVcard(text) {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");
  }

  function createPayload() {
    switch (mode) {
      case "url":
        return parseWebAddress(value("url"));

      case "text": {
        const text = value("text");
        if (!text) throw new Error("Escribí un texto para generar tu QR.");
        return text;
      }

      case "whatsapp": {
        const country = $("#phone-country").value;
        const number = normalizePhone(country, value("phone"), true);
        const message = value("message");
        return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
      }

      case "wifi": {
        const ssid = value("ssid");
        const password = value("password");
        const security = $("#encryption").value;
        const hidden = $("#hidden-network").checked;

        if (!ssid) throw new Error("Ingresá el nombre de la red Wi-Fi.");
        if (security !== "nopass" && !password) {
          throw new Error("Escribí la contraseña o elegí ‘Sin contraseña’.");
        }

        const key = security === "nopass" ? "" : password;
        return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${escapeWifi(key)};H:${hidden ? "true" : "false"};;`;
      }

      case "email": {
        const email = value("email");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error("Ingresá una dirección de email válida.");
        }
        const params = new URLSearchParams();
        if (value("subject")) params.set("subject", value("subject"));
        if (value("body")) params.set("body", value("body"));
        return `mailto:${email}${params.size ? `?${params}` : ""}`;
      }

      case "phone":
        return "tel:+" + normalizePhone($("#phone-country").value, value("phone"));

      case "contact": {
        const name = value("contact-name");
        const phone = value("contact-phone");
        const email = value("contact-email");
        const company = value("contact-company");
        const website = value("contact-url");

        if (!name) throw new Error("Ingresá el nombre del contacto.");
        if (!phone && !email && !website) {
          throw new Error("Sumá por lo menos un teléfono, email o sitio web.");
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error("Revisá el email del contacto.");
        }

        const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${escapeVcard(name)}`];
        if (phone) lines.push(`TEL;TYPE=CELL:${escapeVcard(phone)}`);
        if (email) lines.push(`EMAIL:${escapeVcard(email)}`);
        if (company) lines.push(`ORG:${escapeVcard(company)}`);
        if (website) lines.push(`URL:${escapeVcard(parseWebAddress(website, "sitio web"))}`);
        lines.push("END:VCARD");
        return lines.join("\r\n");
      }

      case "image":
        return parseWebAddress(value("image-url"), "enlace de imagen");

      case "location": {
        const rawLat = value("latitude");
        const rawLong = value("longitude");
        if (!rawLat || !rawLong) {
          throw new Error("Ingresá la latitud y la longitud de la ubicación.");
        }
        const lat = Number(rawLat);
        const lng = Number(rawLong);
        if (!Number.isFinite(lat) || !Number.isFinite(lng) ||
            lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          throw new Error("Las coordenadas deben ser válidas (latitud -90 a 90, longitud -180 a 180).");
        }
        const name = value("location-name");
        return `geo:${lat},${lng}${name ? `?q=${lat},${lng}(${encodeURIComponent(name)})` : ""}`;
      }

      default:
        throw new Error("Elegí un tipo de contenido válido.");
    }
  }

  function createMatrix(payload) {
    if (!window.QREngine?.QRCode) {
      throw new Error("No se pudo cargar el motor QR. Volvé a abrir la página.");
    }

    try {
      const level = window.QREngine.levels[elements.correction.value];
      const qr = new window.QREngine.QRCode(-1, level);
      qr.addData(payload);
      qr.make();
      const count = qr.getModuleCount();
      return Array.from({ length: count }, (_, y) =>
        Array.from({ length: count }, (_, x) => qr.isDark(y, x))
      );
    } catch (error) {
      console.error("QR encoder:", error);
      throw new Error("El contenido es demasiado largo para un QR. Probá acortarlo o bajá la corrección de errores.");
    }
  }

  function isFinderArea(x, y, count) {
    return (x < 8 && y < 8) ||
      (x >= count - 8 && y < 8) ||
      (x < 8 && y >= count - 8);
  }

  function createSvg(matrix, foreground, background, shape) {
    const count = matrix.length;
    const padding = 4;
    const size = count + padding * 2;
    const displaySize = Number(elements.size.value);
    const parts = [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${displaySize}" height="${displaySize}" shape-rendering="geometricPrecision">`,
      `<rect width="${size}" height="${size}" fill="${background}"/>`
    ];

    for (let y = 0; y < count; y++) {
      for (let x = 0; x < count; x++) {
        if (!matrix[y][x]) continue;
        const px = x + padding;
        const py = y + padding;
        const finder = isFinderArea(x, y, count);

        if (shape === "dots" && !finder) {
          parts.push(`<circle cx="${px + 0.5}" cy="${py + 0.5}" r="0.44" fill="${foreground}"/>`);
        } else if (shape === "rounded" && !finder) {
          parts.push(`<rect x="${px + 0.05}" y="${py + 0.05}" width="0.9" height="0.9" rx="0.19" fill="${foreground}"/>`);
        } else {
          parts.push(`<rect x="${px}" y="${py}" width="1" height="1" fill="${foreground}"/>`);
        }
      }
    }

    parts.push("</svg>");
    return parts.join("\n");
  }

  function renderCanvas(matrix, foreground, background, shape, pixels) {
    const canvas = elements.canvas;
    const ctx = canvas.getContext("2d", { alpha: false });
    const total = matrix.length + 8;
    const unit = pixels / total;
    canvas.width = pixels;
    canvas.height = pixels;

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, pixels, pixels);
    ctx.fillStyle = foreground;

    matrix.forEach((row, y) => {
      row.forEach((dark, x) => {
        if (!dark) return;
        const posX = (x + 4) * unit;
        const posY = (y + 4) * unit;
        const finder = isFinderArea(x, y, matrix.length);

        if (shape === "dots" && !finder) {
          ctx.beginPath();
          ctx.arc(posX + unit / 2, posY + unit / 2, unit * 0.44, 0, Math.PI * 2);
          ctx.fill();
        } else if (shape === "rounded" && !finder) {
          const inset = unit * 0.05;
          ctx.beginPath();
          ctx.roundRect(posX + inset, posY + inset, unit * 0.9, unit * 0.9, unit * 0.19);
          ctx.fill();
        } else {
          // Una pequeña superposición evita costuras subpíxel visibles entre módulos.
          ctx.fillRect(posX - 0.01, posY - 0.01, unit + 0.02, unit + 0.02);
        }
      });
    });
  }

  function clearResult() {
    currentResult = null;
    elements.canvas.hidden = true;
    elements.empty.hidden = false;
    elements.status.textContent = "Completá los datos para ver tu QR.";
    elements.payloadDetails.hidden = true;
    elements.payloadDetails.open = false;
    [elements.png, elements.svg, elements.copy, elements.share, elements.print].forEach((button) => {
      button.disabled = true;
    });
  }

  function drawResult(payload) {
    const matrix = createMatrix(payload);
    const foreground = elements.foreground.value;
    const background = elements.background.value;
    const shape = elements.style.value;
    const size = Number(elements.size.value);

    renderCanvas(matrix, foreground, background, shape, size);

    currentResult = {
      payload,
      svg: createSvg(matrix, foreground, background, shape)
    };

    elements.empty.hidden = true;
    elements.canvas.hidden = false;
    elements.status.textContent = `QR listo · ${matrix.length} × ${matrix.length} módulos · ${size} px`;
    elements.payloadDetails.hidden = false;
    elements.payloadValue.textContent = payload;
    [elements.png, elements.svg, elements.copy, elements.share, elements.print].forEach((button) => {
      button.disabled = false;
    });
    showError("");
  }

  function tryGenerate(showErrors = false) {
    clearTimeout(refreshTimeout);
    try {
      drawResult(createPayload());
      if (showErrors) toast("¡Tu QR está listo!");
    } catch (error) {
      clearResult();
      if (showErrors) showError(error.message);
    }
  }

  function scheduleRefresh() {
    showError("");
    clearResult();
    refreshTimeout = setTimeout(() => tryGenerate(false), 360);
  }

  function colorContrast(first, second) {
    const luminance = (hex) => {
      const channels = [1, 3, 5].map((index) => {
        const part = parseInt(hex.slice(index, index + 2), 16) / 255;
        return part <= 0.04045 ? part / 12.92 : ((part + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const a = luminance(first);
    const b = luminance(second);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }

  function updateColorLabels() {
    $("#dark-value").textContent = elements.foreground.value.toUpperCase();
    $("#light-value").textContent = elements.background.value.toUpperCase();
    const ratio = colorContrast(elements.foreground.value, elements.background.value);
    const low = ratio < 4.5;
    elements.contrast.classList.toggle("is-warning", low);
    elements.contrast.textContent = low
      ? "⚠ El contraste es bajo. Usá colores más diferentes para mejorar la lectura del QR."
      : "✓ Buen contraste. Igual, probá el QR con la cámara antes de publicarlo.";

    $$(".preset").forEach((preset) => {
      preset.classList.toggle("is-selected",
        preset.dataset.foreground === elements.foreground.value &&
        preset.dataset.background === elements.background.value
      );
    });
  }

  function downloadBlob(blob, filename) {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  function filename() {
    const cleaned = elements.filename.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70);
    return cleaned || "mi-codigo-qr";
  }

  function getPngBlob() {
    return new Promise((resolve, reject) => {
      elements.canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("El navegador no pudo crear la imagen PNG."));
      }, "image/png");
    });
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Live Server y algunos navegadores no habilitan el Clipboard API.
      }
    }

    const helper = document.createElement("textarea");
    helper.value = text;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    return copied;
  }

  async function shareResult() {
    if (!currentResult) return;

    try {
      const blob = await getPngBlob();
      const file = new File([blob], `${filename()}.png`, { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Mi código QR" });
      } else {
        downloadBlob(blob, file.name);
        toast("Descargamos el PNG para que puedas compartirlo.");
      }
    } catch (error) {
      if (error.name !== "AbortError") toast("No se pudo compartir. Probá descargar el PNG.");
    }
  }

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    tryGenerate(true);
  });

  elements.fields.addEventListener("input", (event) => {
    updateFieldExtras();
    scheduleRefresh();
  });

  elements.fields.addEventListener("change", () => {
    updateFieldExtras();
    scheduleRefresh();
  });

  elements.fields.addEventListener("click", (event) => {
    const button = event.target.closest("#password-toggle");
    if (!button) return;
    const password = $("#password");
    password.type = password.type === "password" ? "text" : "password";
    button.textContent = password.type === "password" ? "Ver" : "Ocultar";
    button.setAttribute("aria-label", password.type === "password" ? "Mostrar contraseña" : "Ocultar contraseña");
  });

  $$(".type-tab").forEach((tab, index, tabs) => {
    tab.addEventListener("click", () => setMode(tab.dataset.mode));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const destination = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      setMode(tabs[destination].dataset.mode);
      tabs[destination].focus();
    });
  });

  $$("[data-select-mode]").forEach((link) => {
    link.addEventListener("click", () => setMode(link.dataset.selectMode));
  });

  $("#example-button").addEventListener("click", () => {
    fillFields(exampleValues[mode]);
    tryGenerate(true);
  });

  $$(".preset").forEach((button) => {
    button.addEventListener("click", () => {
      elements.foreground.value = button.dataset.foreground;
      elements.background.value = button.dataset.background;
      updateColorLabels();
      if (currentResult) tryGenerate(false);
    });
  });

  [elements.foreground, elements.background].forEach((input) => {
    input.addEventListener("input", () => {
      updateColorLabels();
      if (currentResult) tryGenerate(false);
    });
  });

  [elements.style, elements.size, elements.correction].forEach((select) => {
    select.addEventListener("change", () => {
      if (currentResult) tryGenerate(false);
    });
  });

  elements.png.addEventListener("click", async () => {
    if (!currentResult) return;
    try {
      downloadBlob(await getPngBlob(), `${filename()}.png`);
      toast("PNG descargado correctamente.");
    } catch {
      toast("No pudimos crear el PNG en este navegador.");
    }
  });

  elements.svg.addEventListener("click", () => {
    if (!currentResult) return;
    const blob = new Blob([currentResult.svg], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(blob, `${filename()}.svg`);
    toast("SVG descargado correctamente.");
  });

  elements.copy.addEventListener("click", async () => {
    if (!currentResult) return;
    const copied = await copyText(currentResult.payload);
    toast(copied ? "Contenido copiado al portapapeles." : "No pudimos copiar; usá ‘Ver el contenido’.");
  });

  elements.share.addEventListener("click", shareResult);
  elements.print.addEventListener("click", () => {
    if (currentResult) window.print();
  });

  $("#reset-qr").addEventListener("click", () => {
    clearTimeout(refreshTimeout);
    Object.keys(drafts).forEach((key) => delete drafts[key]);
    elements.foreground.value = "#164d46";
    elements.background.value = "#ffffff";
    elements.style.value = "rounded";
    elements.size.value = "512";
    elements.correction.value = "M";
    elements.filename.value = "mi-codigo-qr";
    updateColorLabels();
    setMode("url", true, true);
    toast("Editor reiniciado.");
  });

  updateColorLabels();
  setMode("url");
})();
