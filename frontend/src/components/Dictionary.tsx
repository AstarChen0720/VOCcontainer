type Word = {
  id: number;
  text: string;
};

type Props = {
  word: Word | null;
};

function Dictionary({ word }: Props) {
  return (
    <div style={{ flex: 1, padding: "16px" }}>
      <h2>字典</h2>

      {word ? (
        <div>
          <h3>{word.text}</h3>
          <p>這裡之後會顯示字典內容</p>
        </div>
      ) : (
        <p>請點選左邊的單字</p>
      )}
    </div>
  );
}

export default Dictionary;
