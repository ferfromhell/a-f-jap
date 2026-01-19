import React from 'react';

function Gallery({ galleryData }) {
  if (!galleryData) return null;

  return (
    <section className="gallery-section">
      <h2>📸 Destination Gallery</h2>
      <p className="subtitle-text">Preview the amazing places you'll visit on this adventure</p>
      <div className="gallery-grid">
        {galleryData.map((item, index) => (
          <div className="gallery-item" key={index}>
            <img src={item.img} alt={item.alt} />
            <div className="overlay">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
