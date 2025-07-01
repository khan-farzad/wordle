"use client";
import Row from "./_components/Row";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0);
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (
        !"QWERTYUIOPASDFGHJKLZXCVBNM".includes(e.key.toUpperCase()) ||
        activeRow > 5
      ) {
        return;
      }

      setGuesses((prv) => {
        const updated = [...prv];
        updated[activeRow] += letter;
        return updated;
      });
      
      if (activeCol === 4) {
        setActiveRow((row) => row + 1);
        setActiveCol(0);
      } else {
        setActiveCol((col) => col + 1);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [activeCol, activeRow]);

  return (
    <div className="flex-center flex-col space-y-2 h-screen">
      {guesses.map((g, id) => (
        <Row
          key={id}
          row={id}
          guesses={guesses}
          activeRow={activeRow}
          activeCol={activeCol}
        />
      ))}
    </div>
  );
}
