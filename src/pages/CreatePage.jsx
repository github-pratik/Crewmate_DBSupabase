import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';



function CreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: 'red'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleColorChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      color: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!formData.speed.trim() || isNaN(formData.speed)) {
      setError('Speed must be a valid number');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from('crewmates')
        .insert([{ name: formData.name.trim(), speed: parseFloat(formData.speed), color: formData.color }])
        .select();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError('Failed to create crewmate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <h1 className="create-title">Create a New Crewmate</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="crewmate-image-container">
        <img src="https://pioneeroptimist.com/wp-content/uploads/2021/03/among-us-6008615_1920.png" alt="Crewmates" className="crewmate-image"  />
      </div>
      <form className="crewmate-form" onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-section">
            <label className="form-label" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter crewmate's name"
              autoComplete="off"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-section">
            <label className="form-label" htmlFor="speed">Speed (mph):</label>
            <input
              type="number"
              id="speed"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              placeholder="Enter speed in mph"
              step="0.1"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-section color-section">
            <span className="form-label">Color:</span>
            <div className="color-radio-group">
              {['Red','Green','Blue','Purple','Yellow','Orange','Pink','Rainbow'].map(color => (
                <label key={color} className="color-radio-label">
                  <input
                    type="radio"
                    name="color"
                    value={color.toLowerCase()}
                    checked={formData.color.toLowerCase() === color.toLowerCase()}
                    onChange={handleColorChange}
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="form-button-container">
          <button type="submit" className="create-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Crewmate'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePage;