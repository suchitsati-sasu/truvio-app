import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      color: 'white',
      padding: '20px',
      textAlign: 'center'
    }}>

      <img
        src="/truvio logo.png"
        alt="Truvio Logo"
        style={{ width: '400px', marginBottom: '0px' }}
      />

      <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px', lineHeight: '1.3', marginTop: '0px' }}>
        Real Reviews.<br />Real Trust.
      </h1>

      <p style={{ fontSize: '18px', color: '#a0aec0', marginBottom: '40px', maxWidth: '500px' }}>
        Help your customers trust your store with verified photo & video reviews. Launching soon!
      </p>

      {!submitted ? (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '14px 20px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              width: '280px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
            Get Early Access
          </button>
        </div>
      ) : (
        <div style={{
          background: 'rgba(0,198,255,0.1)',
          border: '1px solid #00c6ff',
          borderRadius: '12px',
          padding: '20px 40px',
          fontSize: '18px'
        }}>
          🎉 You're on the list! We'll notify you at launch.
        </div>
      )}

      <p style={{ marginTop: '20px', color: '#718096', fontSize: '14px' }}>
        No spam. Just one email when we launch.
      </p>
    </div>
  );
}

export default App;