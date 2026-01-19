import React, { useEffect, useRef } from 'react';

function Itinerary({ daysData, expandAction }) {
  const detailsRefs = useRef([]);

  useEffect(() => {
    if (expandAction === 'expand') {
      detailsRefs.current.forEach(el => { if (el) el.open = true; });
    } else if (expandAction === 'collapse') {
      detailsRefs.current.forEach(el => { if (el) el.open = false; });
    }
  }, [expandAction]);

  if (!daysData) return null;

  return (
    <section className="days" id="days-container">
      {daysData.map((day, index) => (
        <details
          className="day"
          key={index}
          open={day.day === 1}
          ref={el => detailsRefs.current[index] = el}
        >
          <summary>
            <div className="dleft">{day.day}</div>
            <div className="dmain">
              <div className="dtitle">
                <h3>{day.title}</h3>
                {day.tags.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
              </div>
              <div className="dmeta" dangerouslySetInnerHTML={{ __html: day.meta }}></div>
            </div>
          </summary>
          <div className="content">
            <div className="sections">
              {day.content.map((sec, i) => (
                <div className="sec" key={i}>
                  <h4>{sec.title}</h4>
                  <ul>
                    {sec.list.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item }}></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </details>
      ))}
    </section>
  );
}

export default Itinerary;
