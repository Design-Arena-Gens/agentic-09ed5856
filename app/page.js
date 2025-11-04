'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChinesePlayers();
  }, []);

  async function fetchChinesePlayers() {
    try {
      setLoading(true);
      const response = await fetch('/api/players');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '48px',
          marginBottom: '10px',
          color: '#2d3748',
          textAlign: 'center',
          fontWeight: '800'
        }}>
          🇨🇳 Chinese Dota 2 Players
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#718096',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Tier 1 Tournament Participants in 2025
        </p>

        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            fontSize: '20px',
            color: '#4a5568'
          }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '5px solid #e2e8f0',
              borderTop: '5px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '20px' }}>Loading players...</p>
          </div>
        )}

        {error && (
          <div style={{
            padding: '30px',
            background: '#fed7d7',
            color: '#c53030',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '18px'
          }}>
            Error: {error}
          </div>
        )}

        {!loading && !error && players.length === 0 && (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            color: '#718096',
            fontSize: '18px'
          }}>
            No Chinese players found in Tier 1 tournaments for 2025.
          </div>
        )}

        {!loading && !error && players.length > 0 && (
          <div>
            <div style={{
              marginBottom: '30px',
              padding: '20px',
              background: '#edf2f7',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <span style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#2d3748'
              }}>
                {players.length}
              </span>
              <span style={{
                fontSize: '18px',
                color: '#718096',
                marginLeft: '10px'
              }}>
                Players Found
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {players.map((player, index) => (
                <div
                  key={index}
                  style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                >
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '8px'
                  }}>
                    {player.name}
                  </div>
                  {player.team && (
                    <div style={{
                      fontSize: '16px',
                      opacity: '0.95',
                      marginBottom: '12px'
                    }}>
                      Team: {player.team}
                    </div>
                  )}
                  {player.role && (
                    <div style={{
                      fontSize: '14px',
                      opacity: '0.85',
                      marginBottom: '8px'
                    }}>
                      Role: {player.role}
                    </div>
                  )}
                  {player.tournaments && player.tournaments.length > 0 && (
                    <div style={{
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255,255,255,0.3)',
                      fontSize: '13px',
                      opacity: '0.9'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '6px' }}>
                        Tournaments:
                      </div>
                      {player.tournaments.slice(0, 3).map((tournament, idx) => (
                        <div key={idx} style={{ marginBottom: '4px' }}>
                          • {tournament}
                        </div>
                      ))}
                      {player.tournaments.length > 3 && (
                        <div style={{ fontStyle: 'italic', marginTop: '6px' }}>
                          +{player.tournaments.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#edf2f7',
          borderRadius: '12px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#718096'
        }}>
          <p>Data sourced from Liquipedia Dota 2 API</p>
          <p style={{ marginTop: '8px' }}>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
