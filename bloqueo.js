// BLOQUEO CON FECHA DE CORTE PROGRAMADA - DISEÑO MINIMALISTA
function verificarRecordatorioPorURL() {
    
    var agenciasDeudoras = [
        {
            urlMatch: "crm.lig01.com/agency_launchpad", 
            linkZinli: "https://recargas.zinli.com/4YBR1juWwNjdPZBZa3sgqP",
            binanceId: "511518620 - Sam_amb",
            fechaBloqueo: "2026-10-02" // Formato AAAA-MM-DD. Aparecerá a partir de este día.
        }
    ];

    var urlActual = window.location.href;
    var datosCliente = null;
    var hoy = new Date();

    for (var i = 0; i < agenciasDeudoras.length; i++) {
        // Convertimos la fecha de texto a un objeto Date real (T00:00:00 evita errores de zona horaria)
        var fechaCorte = new Date(agenciasDeudoras[i].fechaBloqueo + "T00:00:00");
        
        // Verificamos DOS cosas: Que sea el link correcto Y que la fecha actual sea mayor o igual a la de corte
        if (urlActual.includes(agenciasDeudoras[i].urlMatch) && hoy >= fechaCorte) {
            datosCliente = agenciasDeudoras[i];
            break; 
        }
    }
    
    // Si hay coincidencia de URL y ya pasó la fecha, inyectamos el bloqueo
    if (datosCliente) {
        if (document.getElementById("bloqueo-minimal-overlay")) return; 

        if (!document.getElementById("css-bloqueo-minimal")) {
            var estilosCSS = `
                <style id="css-bloqueo-minimal">
                    .bloqueo-minimal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(17, 24, 39, 0.4); display: flex; justify-content: center; align-items: center; z-index: 9999999; font-family: system-ui, -apple-system, sans-serif; backdrop-filter: blur(8px); }
                    .bloqueo-minimal-caja { background: #ffffff; padding: 40px; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); position: relative; max-width: 440px; width: 90%; text-align: center; border: 1px solid #f3f4f6; animation: aparecer 0.4s ease-out; }
                    .minimal-icono-alerta { width: 64px; height: 64px; background: #fef2f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #ef4444; }
                    .bloqueo-minimal-caja h2 { color: #111827; margin: 0 0 12px; font-size: 22px; font-weight: 600; }
                    .bloqueo-minimal-caja p.descripcion { color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 28px; }
                    .metodos-pago { display: flex; flex-direction: column; gap: 12px; text-align: left; }
                    .tarjeta-pago { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 14px; padding: 16px; display: flex; align-items: center; gap: 16px; transition: border-color 0.2s; }
                    .tarjeta-pago:hover { border-color: #d1d5db; }
                    .tarjeta-icono { color: #6b7280; display: flex; align-items: center; }
                    .tarjeta-info { flex: 1; }
                    .tarjeta-titulo { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
                    .link-zinli { color: #2563eb; text-decoration: none; font-size: 15px; font-weight: 500; }
                    .link-zinli:hover { text-decoration: underline; color: #1d4ed8; }
                    .badge-binance { background: #e5e7eb; padding: 4px 8px; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; color: #1f2937; display: inline-block; }
                    .mensaje-footer { font-size: 13px; color: #9ca3af; margin-top: 24px; margin-bottom: 0; }
                    @keyframes aparecer { from { opacity: 0; transform: translateY(15px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', estilosCSS);
        }

        var htmlBloqueo = `
            <div id="bloqueo-minimal-overlay" class="bloqueo-minimal-overlay">
                <div class="bloqueo-minimal-caja">
                    <div class="minimal-icono-alerta">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                            <path d="M12 9v4"/><path d="M12 17h.01"/>
                        </svg>
                    </div>
                    <h2>Acceso Restringido</h2>
                    <p class="descripcion">Tu acceso al sistema ha sido suspendido temporalmente por un saldo pendiente. Para restaurar el servicio, completa tu pago en cualquiera de nuestras plataformas.</p>
                    <div class="metodos-pago">
                        <div class="tarjeta-pago">
                            <div class="tarjeta-icono"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg></div>
                            <div class="tarjeta-info"><div class="tarjeta-titulo">Zinli</div><div><a href="${datosCliente.linkZinli}" target="_blank" class="link-zinli">Pagar con Zinli &rarr;</a></div></div>
                        </div>
                        <div class="tarjeta-pago">
                            <div class="tarjeta-icono"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg></div>
                            <div class="tarjeta-info"><div class="tarjeta-titulo">Binance Pay</div><div><span class="badge-binance">${datosCliente.binanceId}</span></div></div>
                        </div>
                    </div>
                    <p class="mensaje-footer">Notifícanos al realizar el pago para reactivar tu cuenta de inmediato.</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', htmlBloqueo);
    }
}
setInterval(verificarRecordatorioPorURL, 1000);