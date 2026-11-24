import { useState } from "react";
import "./App.css";

export default function App() {
  const [digits, setDigits] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...digits];
    const draggedItem = updated.splice(draggedIndex, 1)[0];
    updated.splice(index, 0, draggedItem);

    setDigits(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="container">
      <h1>Drag & Drop Digits</h1>

      <p>Drag the boxes to reorder the digits 0–9.</p>

      <div className="grid">
        {digits.map((digit, index) => (
          <div
            key={`${digit}-${index}`}
            draggable={true}
            className={`box ${
              draggedIndex === index
                ? "dragging"
                : dragOverIndex === index
                ? "drag-over"
                : ""
            }`}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={handleDragEnd}
          >
            {digit}
          </div>
        ))}
      </div>

      <p className="tip">
        Tip: Try reordering to make 0123456789 or reverse it!
      </p>
    </div>
  );
}