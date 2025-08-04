import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [dishes, setDishes] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setIngredients([]);
    setDishes([]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first.");
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://127.0.0.1:5000/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIngredients(res.data.ingredients || []);
      setDishes(res.data.dishes || []);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍲 Ingredient Detector</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />

      {preview && (
        <div style={styles.previewBox}>
          <img src={preview} alt="Preview" style={styles.imagePreview} />
        </div>
      )}

      {image && (
        <button onClick={handleUpload} style={styles.uploadButton}>
          Detect Ingredients & Suggest Dishes
        </button>
      )}

      {ingredients.length > 0 && (
        <div style={styles.resultBox}>
          <h2>✅ Detected Ingredients</h2>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {dishes.length > 0 && (
        <div style={styles.resultBox}>
          <h2>🍽️ Suggested Dishes</h2>
          <ul>
            {dishes.map((dish, idx) => (
              <li key={idx}>{dish}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#1e1e2f", // 💠 Dark Charcoal Background
    color: "#ffffff", // Text changed to white for readability
  },
  title: {
    marginBottom: "20px",
    fontSize: "2rem",
  },
  fileInput: {
    marginBottom: "20px",
  },
  previewBox: {
    margin: "20px auto",
  },
  imagePreview: {
    maxWidth: "300px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(255,255,255,0.2)",
  },
  uploadButton: {
    padding: "10px 20px",
    margin: "20px",
    backgroundColor: "#ffffff", // White button
    color: "#1e1e2f",            // Dark text
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultBox: {
    marginTop: "30px",
    backgroundColor: "#2e2e3e", // Slightly lighter than background
    color: "#ffffff",
    padding: "20px",
    display: "inline-block",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(255,255,255,0.1)",
    textAlign: "left",
    maxWidth: "400px",
  },
};


export default App;
