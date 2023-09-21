import React, { useState, useEffect } from "react";

function AudioPlayer() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio(
      "https://archive.org/download/tvtunes_27340/Rick%20and%20Morty.mp3"
    );

    if (isAudioPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause(); // Pausar audio al desmontar el componente
    };
  }, [isAudioPlaying]);

  return (
    <div>
      <button onClick={() => setIsAudioPlaying(!isAudioPlaying)}>
        {isAudioPlaying ? "Pausar Música" : "Reproducir Música"}
      </button>
    </div>
  );
}

export default AudioPlayer;
