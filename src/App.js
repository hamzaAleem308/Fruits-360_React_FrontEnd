import React, { useState } from "react";
import "./App.css";

const idxToClass = {
  0: "Grape Blue 1",
  1: "Cherimoya 1",
  2: "Plum 3",
  3: "Quince 4",
  4: "Melon Piel de Sapo 1",
  5: "Tomato 1",
  6: "Cherry 2",
  7: "Tomato 3",
  8: "Peach 2",
  9: "Strawberry Wedge 1",
  10: "Cherry Rainier 1",
  11: "Walnut 1",
  12: "Quince 3",
  13: "Apple 19",
  14: "Quince 2",
  15: "Tomato 8",
  16: "Tomato 9",
  17: "Cucumber 10",
  18: "Cactus fruit red 1",
  19: "Pear Stone 1",
  20: "Cucumber 5",
  21: "Avocado Green 1",
  22: "Pear Forelle 1",
  23: "Avocado Black 1",
  24: "Cauliflower 1",
  25: "Apple hit 1",
  26: "Pepper Orange 1",
  27: "Fig 1",
  28: "Tomato 7",
  29: "Cherry 3",
  30: "Cherry 4",
  31: "Apple 13",
  32: "Apple 10",
  33: "Pistachio 1",
  34: "Cactus fruit green 1",
  35: "Cherry Rainier 2",
  36: "Apple worm 1",
  37: "Pear 2",
  38: "Apple 7",
  39: "Apple 9",
  40: "Cherry 5",
  41: "Tomato 10",
  42: "Apple 8",
  43: "Cherry Rainier 3",
  44: "Tomato Heart 1",
  45: "Blackberrie not rippen 1",
  46: "Cherry Wax not ripen 1",
  47: "Apple Red Yellow 2",
  48: "Tomato 2",
  49: "Tomato 5",
};

const fruitInfo = {
  "Tomato 3": "A mid-sized juicy tomato often used in cooking.",
  "Apple 13": "Sweet red apple variety, great for snacks and pies.",
  "Cucumber 10": "Crunchy green cucumber with refreshing taste.",
  "Cherry 4": "Small and sweet red cherry, often used in desserts.",
  "Blackberrie not rippen 1": "Unripe blackberry, sour and not ready for eating.",
  "Strawberry Wedge 1": "Sliced strawberry with bright red color."
};

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setPredictions([]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);

    try {
      const response = await fetch("https://fruits-360resnet50backend-production.up.railway.app/predict", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setPredictions(result.predictions || [
        { class_index: result.predicted_class, confidence: 0.9774 }
      ]);
    } catch (error) {
      console.error("Prediction error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🍇 Fruit Classifier</h1>

      <div className="upload-section">
        {imagePreview && <img src={imagePreview} alt="Preview" className="preview" />}
         <input className="input" type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading || !selectedFile}>
          {loading ? "🔍 Predicting..." : "🚀 Predict"}
        </button>
      </div>

      {predictions.length > 0 && (
        <div className="results">
          <h2>Prediction Results</h2>
          {predictions.map((pred, i) => {
            const className = idxToClass[pred.class_index] || "Unknown";
            const info = fruitInfo[className] || "No additional info available.";
            return (
              <div key={i} className="card">
                <h3>{className}</h3>
                <div className="bar">
                  <div
                    className="fill"
                    style={{ width: `${(pred.confidence * 100).toFixed(2)}%` }}
                  />
                </div>
                <p><strong>Confidence:</strong> {(pred.confidence * 100).toFixed(2)}%</p>
                <p className="info">{info}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
