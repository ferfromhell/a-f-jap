
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    
    renderGallery(data.gallery);
    renderFlights(data.flights);
    renderDays(data.days);
    
    // Re-initialize event listeners after DOM is populated
    initInteractions();
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
});

function renderGallery(galleryData) {
  const container = document.querySelector('.gallery-grid');
  if (!container) return;
  
  container.innerHTML = galleryData.map(item => `
    <div class="gallery-item">
      <img src="${item.img}" alt="${item.alt}">
      <div class="overlay">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');
}

function renderFlights(flightsData) {
  const container = document.querySelector('.flights-container'); // Need to add this class to the container in HTML
  if (!container) return;
  
  container.innerHTML = flightsData.map(flight => `
    <div class="flight-card">
      <div class="flight-header">
        <div class="flight-airline">${flight.airline}</div>
        <div class="flight-price">
          <span class="from">from</span> ${flight.price}
        </div>
      </div>
      <div class="flight-route">
        <div class="flight-city">
          <div class="code">${flight.route.from.code}</div>
          <div class="time">${flight.route.from.time}</div>
        </div>
        <div class="flight-arrow">→</div>
        <div class="flight-city">
          <div class="code">${flight.route.to.code}</div>
          <div class="time">${flight.route.to.time}</div>
        </div>
      </div>
      <div class="flight-details">
        ${flight.details.map(detail => {
          if (detail.type === 'badge') {
            return `<div class="flight-detail"><span class="flight-badge ${detail.class}">${detail.text}</span></div>`;
          } else {
            return `<div class="flight-detail">${detail.text}</div>`;
          }
        }).join('')}
      </div>
    </div>
  `).join('');
}

function renderDays(daysData) {
  const container = document.getElementById('days-container'); // Need to add id="days-container" to the section
  if (!container) return;
  
  container.innerHTML = daysData.map(day => `
    <details class="day" ${day.day === 1 ? 'open' : ''}>
      <summary>
        <div class="dleft">${day.day}</div>
        <div class="dmain">
          <div class="dtitle">
            <h3>${day.title}</h3>
            ${day.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="dmeta">${day.meta}</div>
        </div>
      </summary>
      <div class="content">
        <div class="sections">
          ${day.content.map(sec => `
            <div class="sec">
              <h4>${sec.title}</h4>
              <ul>
                ${sec.list.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    </details>
  `).join('');
}

function initInteractions() {
  const days = [...document.querySelectorAll('details.day')];
  const btnExpand = document.getElementById('btnExpand');
  const btnCollapse = document.getElementById('btnCollapse');
  const btnCopy = document.getElementById('btnCopy');
  const checklist = document.getElementById('checklist');
  const toast = document.getElementById('toast');

  function showToast(msg){
    toast.textContent = msg;
    toast.style.display = 'block';
    if (showToast._t) clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.style.display = 'none', 1200);
  }

  if(btnExpand) {
    btnExpand.addEventListener('click', () => {
      days.forEach(d => d.open = true);
      showToast('Días abiertos ✅');
    });
  }

  if(btnCollapse) {
    btnCollapse.addEventListener('click', () => {
      days.forEach(d => d.open = false);
      showToast('Días cerrados ✅');
    });
  }

  if(btnCopy) {
    btnCopy.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(checklist.textContent.trim());
        showToast('Checklist copiado ✅');
      }catch(e){
        // fallback
        const r = document.createRange();
        r.selectNodeContents(checklist);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        document.execCommand('copy');
        sel.removeAllRanges();
        showToast('Checklist copiado ✅');
      }
    });
  }
}
