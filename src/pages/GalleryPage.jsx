import React, { useEffect, useState } from "react";
import CrewmateCard from "./CrewmateCard";
import { supabase } from "../supabaseClient";

function GalleryPage() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  async function fetchCrewmates() {
    setLoading(true);
    const { data, error } = await supabase.from("crewmates").select("*");
    if (!error) setCrewmates(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    await supabase.from("crewmates").delete().eq("id", id);
    setCrewmates((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="gallery-page">
      <h1>Crewmate Gallery</h1>
      <p>Welcome to the gallery! Here you will see all the crewmates.</p>
      {loading ? (
        <p>Loading...</p>
      ) : crewmates.length === 0 ? (
        <p>No crewmates found.</p>
      ) : (
        <div className="gallery-list crewmate-grid">
          {crewmates.map((crewmate) => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;