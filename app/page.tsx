"use client";
import { words } from "./words";
import Row from "./_components/Row";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0);
  const [correctWord, setCorrectWord] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [color, setColor] = useState<boolean[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(false))
  );
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    setCorrectWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();

      if (activeCol > 0 && letter === "BACKSPACE") {
        setGuesses((prv) => {
          const updated = [...prv];
          updated[activeRow] = updated[activeRow].substring(0, activeCol - 1);
          return updated;
        });
        setActiveCol((col) => col - 1);
      }

      if (activeCol === 5 && letter === "ENTER") {
        if (correctWord === guesses[activeRow]) {
          setIsGameOver(true);
        }

        /* if(!words.includes(guesses[activeRow])) {
          setActiveCol(0);
          setGuesses(prv => {
            const tmp = [...prv];
            tmp[activeRow] = '';
            return tmp;
          })
          return;
        } */

        const map = new Map();
        for (let i = 0; i < 5; i++) {
          const ch = correctWord.charAt(i);
          if (map.has(ch)) {
            map.set(ch, map.get(ch) + 1);
          } else {
            map.set(ch, 1);
          }
        }

        for (let i = 0; i < 5; i++) {
          const ch = guesses[activeRow].charAt(i);
          if (map.has(ch)) {
            setColor((clr) => {
              const tmp = [...clr];
              tmp[activeRow][i] = true;
              return tmp;
            });
            map.set(ch, map.get(ch) - 1);
            if (map.get(ch) == 0) {
              map.delete(ch);
            }
          }
        }
        setActiveRow((row) => row + 1);
        setActiveCol(0);
      }

      if (
        !"QWERTYUIOPASDFGHJKLZXCVBNM".includes(letter) ||
        activeRow > 5 ||
        activeCol === 5 ||
        isGameOver
      ) {
        return;
      }

      setGuesses((prv) => {
        const updated = [...prv];
        updated[activeRow] += letter;
        return updated;
      });

      setActiveCol((col) => col + 1);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeCol, activeRow, guesses, isGameOver]);

  return (
    <div className="flex-center flex-col space-y-2 h-screen">
      {guesses.map((g, id) => (
        <Row
          key={id}
          row={id}
          color={color}
          guesses={guesses}
          activeRow={activeRow}
          activeCol={activeCol}
          correctWord={correctWord}
        />
      ))}
    </div>
  );
}
