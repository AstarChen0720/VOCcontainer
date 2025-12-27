import { useState } from "react";

type Word = {
  id: number;
  text: string;
};
//  定義名叫Props的型別,是一個object,且裡面有三個屬性名words:要是一個符合"Word"型別的陣列和onSelect:他是一個函式,而這函式收到的參數我要把他叫做word,且是一個符合"Word"型別的參數(:Word),且沒有回傳值(這是typescript的語法"=>"代表回傳值,而void代表沒有回傳值,沒有用則會預設回傳值undefined,但這裡我們不需要回傳值，所以要用void),和onDelete:他是一個函式,而這函式收到的參數我要把他叫做id,且是一個數字型別(:number),且沒有回傳值(void)
type Props = {
  words: Word[];
  onSelect: (word: Word) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
};

// 創一個叫WordList的函式,並且用解構寫法將words和onSelect和onDelete這三個屬性重參數中抓出來使用,且規定型別是Props
function WordList({ words, onSelect, onDelete, onUpdate }: Props) {
  // 用useState建立一個叫hoveredId的狀態,預設值是null,型別是number或null(代表目前沒有hover任何一個單字)
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // 開始編輯
  const startEditing = (word: Word) => {
    setEditingId(word.id);
    setEditText(word.text);
  };
  // 儲存編輯
  const saveEdit = () => {
    if (editingId !== null && editText.trim() !== "") {
      onUpdate(editingId, editText);
    }
    setEditingId(null);
  };
  // 取消編輯
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div style={{ flex: 1, borderRight: "1px solid #ccc", padding: "16px" }}>
      <h2>單字卡</h2>
      {/* map遍歷words陣列中的每個元素並傳入後面,而將這個東西取名叫word,在這裡用箭頭函式回傳一個<li>元素(這裡的=>右邊加上小括號是隱式寫法,代表回傳這個<li>元素不用寫return,如果只有一行可以省略小括號) 並將list item顯示word的text*/}
      {/* 如果滑鼠移到某個單字上，他會修改該hoveredId且單字的背景會變色並且顯示刪除按鈕 */}
      <ul>
        {words.map((word) => (
          <li
            key={word.id}
            style={{
              cursor: "pointer",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px",
              borderRadius: "4px",
              backgroundColor:
                hoveredId === word.id ? "#f0f0f0" : "transparent",
            }}
            onClick={() => onSelect(word)}
            onMouseEnter={() => setHoveredId(word.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {editingId === word.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit();
                  if (e.key === "Escape") cancelEdit();
                }}
                autoFocus
                style={{
                  flex: 1,
                  padding: "4px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              // 如果不是編輯模式，雙擊就可以進入編輯模式
              <span
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  startEditing(word);
                }}
                style={{ flex: 1 }}
              >
                {word.text}
              </span>
            )}
            {/* 刪除按鈕只在滑鼠移到該單字時顯示，且不在編輯模式時顯示 */}
            {hoveredId === word.id && editingId !== word.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(word.id);
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#ff4d4f",
                  fontSize: "16px",
                  fontWeight: "bold",
                  padding: "0 8px",
                }}
                title="刪除"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 把WordList這個components 不具名(=預設=default)匯出,讓其他組件可以使用
export default WordList;
