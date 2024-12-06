import React, { useEffect, useRef, useState } from "react";

const Sabios: React.FC = () => {
  const [isCoverMounted, setIsCoverMounted] = useState(true);
  const [coverFadeOut, setCoverFadeOut] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioTracks = [
    "/audio/sabios/lo_sabios_flamenco.mp3",
    "/audio/sabios/lo_sabios_reggaeton.mp3",
    "/audio/sabios/lo_sabios_epic.mp3",
    "/audio/sabios/gases.mp3",
  ];

  const quotes = [
    { text: '"razers negros se tiñen de blñanco en rusia en los pros vayne"', author: "El Sabio" },
    { text: '"Ave si ahora hay que hacer por a alguien para saber que es subnormal"', author: "El Sabio" }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentQuote((prevIndex) => (prevIndex + 1) % quotes.length);
        setFadeOut(false);
      }, 1000);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [quotes.length]);

  // Play the next track when the current one ends
  const handleTrackEnd = () => {
    setCurrentTrackIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % audioTracks.length;
      return nextIndex;
    });
  };

  useEffect(() => {
    if (!isCoverMounted && audioRef.current) {
      audioRef.current.src = audioTracks[currentTrackIndex];
      audioRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, [currentTrackIndex]);
  
  const handleCoverClick = () => {
    // Hide the cover and start playing music
    if (audioRef.current) {
      audioRef.current.play();
    }
    setCoverFadeOut(true);
    setTimeout(() => {
      setIsCoverMounted(false);
    }, 1000);
  };

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      if (isCoverMounted) {
        navbar.style.display = "none";
      } else {
        navbar.style.display = "flex";
      }
    }
  }, [isCoverMounted]);
  

  return (
    <div className="relative">
      {isCoverMounted && (
        <div
          onClick={handleCoverClick}
          className={`cover absolute inset-0 z-50 ${
            coverFadeOut ? "fade-out" : ""
          }`}
        >
          <p
            className="mt-4 italic text-3xl text-zinc-100 pulsate"
            style={{ fontFamily: "'MedievalSharp', cursive" }}
          >
            Bienvenido, Sabio...
          </p>
        </div>
      )}
      <div
        className={`flex h-screen items-center justify-center flex-col text-center 
          ${coverFadeOut ? "animate-fade-in opacity-0" : "opacity-100"}`}
      >
        <img
          src="img/sabios/los_sabios.webp"
          alt="Los sabios"
          style={{ width: "100%", maxWidth: "800px" }}
          className="rounded-lg"
        ></img>
        <div className="quote-container text-center mt-8">
        <p
          className={`mt-4 italic text-xl text-zinc-300 transition-opacity duration-1000 ease-in-out ${fadeOut ? "opacity-0" : "opacity-100"}`}
          style={{ fontFamily: "'MedievalSharp', cursive" }}
        >
          {quotes[currentQuote].text}
        </p>
          <span className={`text-2xl text-zinc-400 mt-2 block italic transition-opacity duration-1000 ease-in-out ${fadeOut ? "opacity-0" : "opacity-100"}`}
          style={{ fontFamily: "'MedievalSharp', cursive", color: '#d4af37' }}>— {quotes[currentQuote].author}</span>
        </div>
        <div className="mt-6">
          <audio
            ref={audioRef}
            src={audioTracks[currentTrackIndex]}
            onEnded={handleTrackEnd}
            className="bg-zinc-800 text-white bg-gray-100 text-black 
             audio-player-custom rounded-full"
            controls
          />
        </div>
      </div>
    </div>
  );
};

export default Sabios;
