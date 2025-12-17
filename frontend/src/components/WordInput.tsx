import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

function WordInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <input
        type="text"
        placeholder="輸入單字"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ marginLeft: "8px" }}>
        新增
      </button>
    </div>
  );
}

export default WordInput;
