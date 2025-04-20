import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  async function fetchCrewmate() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      setCrewmate(data);
    } catch (error) {
      console.error('Error fetching crewmate:', error.message);
      setError('Could not fetch crewmate details');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this crewmate?')) return;
    
    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      navigate('/');
    } catch (error) {
      console.error('Error deleting crewmate:', error.message);
      setError('Could not delete crewmate');
    }
  }

  if (loading) return <div className="loading">Loading crewmate details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!crewmate) return <div className="not-found">Crewmate not found</div>;

  return (
    
    <div className="detail-page" style={{ minHeight: '100vh', background: '#181818', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginTop: 32 }}>
        <img src="https://pioneeroptimist.com/wp-content/uploads/2021/03/among-us-6008615_1920.png" alt="Crewmates" style={{ width: 120 }} />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: 0 }}>{`Crewmate: ${crewmate.name}`}</h1>
      <div style={{ fontSize: '2.2rem', fontWeight: 700, margin: '24px 0 0 0' }}>Stats:</div>
      <div style={{ background: '#222', borderRadius: 20, padding: 32, margin: '24px 0 0 0', minWidth: 320, textAlign: 'center', boxShadow: '0 2px 12px #0004' }}>
        <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>{`Color: ${crewmate.color.charAt(0).toUpperCase() + crewmate.color.slice(1)}`}</div>
        <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>{`Speed: ${crewmate.speed} mph`}</div>
      </div>
      {parseFloat(crewmate.speed) < 3 && (
        <div style={{ marginTop: 24, color: '#ffe066', fontSize: 18, textAlign: 'center' }}>
          You may want to find a Crewmate with more speed, this one is kind of slow <span role="img" aria-label="smile">😬</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
        <button
          onClick={() => navigate('/gallery')}
          style={{ background: '#444', color: 'white', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}
        >
          Back to Gallery
        </button>
        <button
          onClick={() => navigate(`/edit/${crewmate.id}`)}
          style={{ background: '#222', color: 'white', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}
        >
          Edit Crewmate
        </button>
      </div>
      
    </div>
  );
}

export default DetailPage;