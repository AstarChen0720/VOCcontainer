import { useState } from "react";
import WordList from "./components/WordList";
import Dictionary from "./components/Dictionary";

type Word = {
  id: number;
  text: string;
};

function App() {
  const [words] = useState<Word[]>([
    { id: 1, text: "apple" },
    { id: 2, text: "banana" },
    { id: 3, text: "cat" },
  ]);

  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <WordList words={words} onSelect={setSelectedWord} />
      <Dictionary word={selectedWord} />
    </div>
  );
}

export default App;
