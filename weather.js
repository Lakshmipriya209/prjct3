async function getRainfall(lat, lon) {
    try {
      const res = await fetch(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();
  
      return data.rainfall || 0;
    } catch (err) {
      console.error("Weather error", err);
      return 0;
    }
  }