import React from 'react';

export default function EarlyWarriorSpecials() {
  return (
    <section style={{ background: '#22223b', color: '#fff', padding: '2rem 1rem', borderRadius: 12, margin: '2rem auto', maxWidth: 600, boxShadow: '0 4px 24px #0002' }}>
      <h2 style={{ color: '#ffe066', marginBottom: 8, textAlign: 'center', letterSpacing: 2 }}>Early Warrior Specials</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: 18, margin: 0 }}>
        <li style={{ margin: '1.5rem 0', background: '#353570', borderRadius: 8, padding: '1rem' }}>
          <b>Atlas Year</b>: First 5,000 get <b>1 year</b> for <b>$20</b>
        </li>
        <li style={{ margin: '1.5rem 0', background: '#353570', borderRadius: 8, padding: '1rem' }}>
          <b>Hyperion 3-Year</b>: First 5,000 get <b>3 years</b> for <b>$40</b>
        </li>
        <li style={{ margin: '1.5rem 0', background: '#353570', borderRadius: 8, padding: '1rem' }}>
          <b>Prometheus Lifetime (Desktop)</b>: First 5,000 get <b>lifetime access</b> for <b>$100</b>
        </li>
      </ul>
      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 15, color: '#ffe066' }}>
        Unlock TitanForge at the best price—while spots last!
      </div>
    </section>
  );
}
