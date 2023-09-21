import React, { useState } from "react";

function TypingInput({ onInputChange }) {
  const [inputValue, setInputValue] = useState("");
  const audioUrl = "https://archive.org/download/SoundEffects_587/Mo.mp3";
  const typingSound = new Audio(audioUrl);

  // Función para manejar el cambio en el input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Reproduce el sonido cuando se escribe en el input
    typingSound.play().catch((error) => {
      console.error("Error al reproducir el sonido:", error);
    });
    // Llama a la función onInputChange proporcionada como prop
    if (onInputChange) {
      onInputChange(e.target.value);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe algo..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default TypingInput;
