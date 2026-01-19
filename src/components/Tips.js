import React, { useState } from 'react';

function Tips() {
  const [toastMsg, setToastMsg] = useState('');

  const handleCopy = async () => {
    const checklistText = document.getElementById('checklist').innerText;
    try {
      await navigator.clipboard.writeText(checklistText);
      showToast('Checklist copiado ✅');
    } catch (e) {
      // fallback
      const r = document.createRange();
      r.selectNodeContents(document.getElementById('checklist'));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      document.execCommand('copy');
      sel.removeAllRanges();
      showToast('Checklist copiado ✅');
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 1200);
  };

  return (
    <section className="grid" style={{ marginTop: '16px' }}>
      <div className="card">
        <h2>📍 Links rápidos (Google Maps)</h2>
        <p className="muted">Abre en una pestaña nueva. Útil para “guardar” cada spot en tu lista.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Chidorigafuchi">Chidorigafuchi</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Kitanomaru+Park">Kitanomaru Park</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Senso-ji">Senso‑ji</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Shibuya+Scramble+Crossing">Shibuya Crossing</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Shimokitazawa">Shimokitazawa</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Fushimi+Inari+Taisha">Fushimi Inari</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Philosopher%27s+Path+Kyoto">Philosopher’s Path</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Gion+Kyoto">Gion</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Pontocho+Alley">Pontocho</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Nara+Park">Nara Park</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Todaiji">Todai‑ji</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Osaka+Castle+Park">Osaka Castle Park</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Dotonbori">Dotonbori</a>
          <a className="pill" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=teamLab+Borderless">teamLab Borderless</a>
        </div>
      </div>

      <div className="card">
        <h2>✅ Checklist rápido (copiable)</h2>
        <div style={{ position: 'relative' }}>
          <pre id="checklist" style={{ whiteSpace: 'pre-wrap', margin: 0, padding: '12px', borderRadius: '16px', border: '1px solid rgba(0,0,0,.1)', background: 'rgba(255,255,255,.05)', color: 'var(--text)', overflow: 'auto' }}>
            {`DOCUMENTOS
[ ] Pasaporte + copia (digital y física)
[ ] eTA/visas (si aplica)
[ ] Seguro de viaje

DINERO / DATOS
[ ] 1 tarjeta sin comisiones + 1 respaldo
[ ] Efectivo inicial (o plan de ATM en 7-Eleven)
[ ] eSIM/SIM/pocket Wi‑Fi

TRANSPORTE
[ ] Suica/PASMO (física o en Wallet)
[ ] Boletos Shinkansen (Tokyo↔Kyoto, Kyoto↔Tokyo)

RESERVAS
[ ] Hotel Tokyo
[ ] Hotel Kyoto
[ ] teamLab Borderless (horario fijo)

EQUIPAJE
[ ] Adaptador de corriente
[ ] Tenis cómodos + calcetines extra
[ ] Chamarra ligera (primavera)
[ ] Power bank

EXTRAS
[ ] Lista de spots en Google Maps
[ ] Apps útiles: Google Maps, Translate, Navitime (opcional)`}
          </pre>
          <button className="btn good" onClick={handleCopy} style={{ marginTop: '10px' }}>Copiar checklist rápido</button>
        </div>
        <p className="muted" style={{ marginTop: '10px' }}>Tip: pega este checklist en Notas / Google Keep y marca en el camino.</p>
      </div>

      {toastMsg && (
        <div className="toast" style={{ display: 'block' }}>{toastMsg}</div>
      )}
    </section>
  );
}

export default Tips;
