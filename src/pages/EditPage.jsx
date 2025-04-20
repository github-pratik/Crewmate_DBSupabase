import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

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

      setFormData({
        name: data.name,
        speed: data.speed.toString(),
        color: data.color
      });
    } catch (error) {
      console.error('Error fetching crewmate:', error.message);
      setError('Could not fetch crewmate details');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!formData.speed.trim() || isNaN(formData.speed)) {
      setError('Speed must be a valid number');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      const { error } = await supabase
        .from('crewmates')
        .update({
          name: formData.name.trim(),
          speed: parseFloat(formData.speed),
          color: formData.color
        })
        .eq('id', id);

      if (error) throw error;
      
      // Navigate back to detail page after successful update
      navigate(`/crewmate/${id}`);
    } catch (error) {
      console.error('Error updating crewmate:', error.message);
      setError('Failed to update crewmate. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading crewmate details...</div>;
  if (error && !formData.name) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-page" style={{ minHeight: '100vh', background: '#181818', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5em', textAlign: 'center' }}>Update Your Crewmate</h1>
      <img src="https://pioneeroptimist.com/wp-content/uploads/2021/03/among-us-6008615_1920.png" alt="Crewmates" style={{ width: 100 }} />
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <strong>Current Crewmate Info:</strong>
        <div style={{ marginTop: 8 }}>
          Name: {formData.name}, Speed: {formData.speed}, Color: {formData.color.charAt(0).toUpperCase() + formData.color.slice(1)}
        </div>
      </div>
      {error && <div className="error-message" style={{ color: '#ff6b6b', marginBottom: 12 }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 24, justifyContent: 'center', width: '100%', maxWidth: '1000px' }}>
        <div style={{ background: '#444', borderRadius: 16, padding: 24, width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="name" style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter crewmate's name"
            style={{ padding: 8, borderRadius: 8, border: 'none', width: '100%' }}
          />
        </div>
        <div style={{ background: '#444', borderRadius: 16, padding: 24, width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="speed" style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Speed (mph):</label>
          <input
            type="number"
            id="speed"
            name="speed"
            value={formData.speed}
            onChange={handleChange}
            required
            step="0.1"
            placeholder="Enter speed in mph"
            style={{ padding: 8, borderRadius: 8, border: 'none', width: '100%' }}
          />
        </div>
        <div style={{ background: '#444', borderRadius: 16, padding: 24, width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Color:</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Red','Green','Blue','Purple','Yellow','Orange','Pink','Rainbow'].map(color => (
              <label key={color} style={{ fontWeight: 400, fontSize: 16, marginBottom: 2 }}>
                <input
                  type="radio"
                  name="color"
                  value={color.toLowerCase()}
                  checked={formData.color.toLowerCase() === color.toLowerCase()}
                  onChange={handleChange}
                  style={{ marginRight: 8 }}
                />
                {color}
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', width: '100%', marginTop: 16 }}>
          <button
            type="button"
            onClick={() => navigate(`/crewmate/${id}`)}
            className="cancel-btn"
            style={{ background: '#222', color: 'white', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="submit-btn"
            style={{ background: '#4444ff', color: 'white', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 18, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'Saving...' : 'Update Crewmate'}
          </button>
          <button
            type="button"
            onClick={async () => { await supabase.from('crewmates').delete().eq('id', id); navigate('/'); }}
            style={{ background: '#ff4444', color: 'white', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: 18, cursor: 'pointer' }}
          >
            Delete Crewmate
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPage;