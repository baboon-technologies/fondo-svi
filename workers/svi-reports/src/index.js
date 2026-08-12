const REPORT_KEY = "ultimo-reporte.pdf";

function check_auth(request, env) {
  const auth_header = request.headers.get("Authorization");
  if (!auth_header || !auth_header.startsWith("Basic ")) return false;

  const decoded = atob(auth_header.slice(6));
  const [user, pass] = decoded.split(":");
  return user === env.AUTH_USER && pass === env.AUTH_PASS;
}

function require_auth() {
  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="SVI Reports"' },
  });
}

async function handle_upload(request, env) {
  if (!check_auth(request, env)) return require_auth();

  if (request.method === "GET") {
    const existing = await env.REPORTS_BUCKET.head(REPORT_KEY);
    const current_file = existing
      ? `Último informe subido: ${new Date(existing.uploaded).toLocaleDateString("es-ES")} (${(existing.size / 1024 / 1024).toFixed(1)} MB)`
      : "No hay ningún informe subido todavía.";

    return new Response(upload_html(current_file), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (request.method === "POST") {
    const form_data = await request.formData();
    const file = form_data.get("pdf");

    if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
      return new Response(upload_html("", "El archivo debe ser un PDF."), {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const file_buffer = await file.arrayBuffer();
    await env.REPORTS_BUCKET.put(REPORT_KEY, file_buffer, {
      httpMetadata: { contentType: "application/pdf" },
      customMetadata: { original_name: file.name },
    });

    const size_mb = (file_buffer.byteLength / 1024 / 1024).toFixed(1);
    return new Response(
      upload_html(`Informe actualizado: ${file.name} (${size_mb} MB)`),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  return new Response("Method not allowed", { status: 405 });
}

async function handle_download(env) {
  const object = await env.REPORTS_BUCKET.get(REPORT_KEY);
  if (!object) {
    return new Response("No hay informe disponible.", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${REPORT_KEY}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function upload_html(status_message, error_message) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SVI Reports — Subir informe</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
    .card { background: white; border-radius: 12px; padding: 40px; max-width: 480px; width: 100%; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    h1 { font-size: 1.4rem; color: #1a1a1a; margin-bottom: 8px; }
    .subtitle { color: #666; font-size: 0.9rem; margin-bottom: 24px; }
    .drop-zone { border: 2px dashed #ccc; border-radius: 8px; padding: 40px 20px; text-align: center; cursor: pointer; transition: all 0.2s; margin-bottom: 16px; }
    .drop-zone:hover, .drop-zone.dragover { border-color: #0066cc; background: #f0f7ff; }
    .drop-zone p { color: #666; font-size: 0.95rem; }
    .drop-zone .selected { color: #1a1a1a; font-weight: 500; }
    input[type="file"] { display: none; }
    button { width: 100%; padding: 12px; background: #0066cc; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; transition: background 0.2s; }
    button:hover { background: #0052a3; }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .status { margin-top: 16px; padding: 12px; border-radius: 8px; font-size: 0.9rem; }
    .status.ok { background: #e8f5e9; color: #2e7d32; }
    .status.error { background: #ffeaea; color: #c62828; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Subir informe SVI</h1>
    <p class="subtitle">El PDF reemplazará el informe actual disponible para descarga.</p>
    <form method="POST" enctype="multipart/form-data">
      <div class="drop-zone" id="dropZone">
        <p id="dropText">Arrastra el PDF aquí o haz clic para buscar</p>
      </div>
      <input type="file" name="pdf" id="fileInput" accept=".pdf">
      <button type="submit" id="submitBtn" disabled>Subir informe</button>
    </form>
    ${status_message ? `<div class="status ok">${status_message}</div>` : ""}
    ${error_message ? `<div class="status error">${error_message}</div>` : ""}
  </div>
  <script>
    const drop_zone = document.getElementById("dropZone");
    const file_input = document.getElementById("fileInput");
    const drop_text = document.getElementById("dropText");
    const submit_btn = document.getElementById("submitBtn");

    drop_zone.addEventListener("click", () => file_input.click());
    drop_zone.addEventListener("dragover", (event) => { event.preventDefault(); drop_zone.classList.add("dragover"); });
    drop_zone.addEventListener("dragleave", () => drop_zone.classList.remove("dragover"));
    drop_zone.addEventListener("drop", (event) => {
      event.preventDefault();
      drop_zone.classList.remove("dragover");
      if (event.dataTransfer.files.length) {
        file_input.files = event.dataTransfer.files;
        update_selected();
      }
    });
    file_input.addEventListener("change", update_selected);

    function update_selected() {
      if (file_input.files.length) {
        drop_text.textContent = file_input.files[0].name;
        drop_text.classList.add("selected");
        submit_btn.disabled = false;
      }
    }
  </script>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/ultimo-reporte") {
      return handle_download(env);
    }

    if (path === "/" || path === "") {
      return handle_upload(request, env);
    }

    return new Response("Not found", { status: 404 });
  },
};
