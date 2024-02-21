import React, { useEffect, useState } from "react";

const Typewriter = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const dataText = [
    "fun living begins",
    "joyous moments thrive",
    "adventure starts",
  ];

  useEffect(() => {
    const typeWriter = () => {
      const currentString = dataText[textIndex];
      if (currentIndex < currentString.length && !isDeleting) {
        setCurrentText(currentString.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex >= 0) {
        setCurrentText(currentString.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else {
        setTimeout(
          () => {
            setIsDeleting(!isDeleting);
          },
          isDeleting ? 500 : 1000,
        ); // Menyesuaikan waktu delay setelah selesai menulis atau menghapus
      }
    };

    const intervalId = setInterval(typeWriter, 100);

    return () => clearInterval(intervalId);
  }, [currentIndex, isDeleting, textIndex]);

  useEffect(() => {
    if (isDeleting && currentIndex === 0) {
      setTimeout(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % dataText.length);
      }, 500);
    }
  }, [isDeleting, currentIndex, textIndex]);

  return (
    <h1 className="flex flex-wrap">
    Where&nbsp;
      {currentText ? (
        <span>{currentText + "|"}</span>
      ) : (
        <span className="animate-pulse">|</span>
      )}
    </h1>
  );
};

export default Typewriter;
