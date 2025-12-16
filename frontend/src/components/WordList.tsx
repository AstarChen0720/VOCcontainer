type Word = {
  id: number;
  text: string;
};

type Props = {
  words: Word[];
  onSelect: (word: Word) => void;
};

function WordList({ words, onSelect }: Props) {
  return (
    <div
      style={{ width: "30%", borderRight: "1px solid #ccc", padding: "16px" }}
    >
      <h2>單字卡</h2>

      <ul>
        {words.map((word) => (
          <li
            key={word.id}
            style={{ cursor: "pointer", marginBottom: "8px" }}
            onClick={() => onSelect(word)}
          >
            {word.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordList;
