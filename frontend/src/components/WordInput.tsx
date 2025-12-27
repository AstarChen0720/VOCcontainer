// 從react導入名叫useState的函式(具名匯入,hooks),
import { useState } from "react";

// 設定一個名叫Props的型別,這個型別是一個object,裡面要有一個叫做onAdd的屬性,他的值是一個函式,這個函式的參數是一個字串,沒有回傳值(void)
type Props = {
  onAdd: (text: string) => void;
};

// 建立一個叫wordInput的函式,他的參數限定是叫onAdd的值,且型別是Props
function WordInput({ onAdd }: Props) {
  //建立一個陣列放目前的值和更新值的函式,初始值是空字串(useState component的初始化)
  const [value, setValue] = useState("");
  //建立一個叫handleSubmit的函式,功能是先檢查目前trim後的value是不是空字串(空字串為false,前面加上!給他反轉成如果是空字串就通過),如果是就直接rturn(結束函式,簡寫不用加大括號),如果不是就執行onAdd函式(=AddWord),並將trim後的value當作參數,然後再把value設回空字串(把字串清空)
  const handleSubmit = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  //回傳一個輸入框,輸入框的值=當前的值,且有一個監視器(onChange,他會將任何改動做成一份報告並傳入第一個參數,而我們提取他的目標(監視的東西,目前就是輸入框)的值並用setValue更新目前的值)
  // 和一個按鈕他會在我按下後(onClick)自動執行handleSubmit函式
  return (
    <div style={{ marginBottom: "16px" }}>
      <input
        type="text"
        placeholder="輸入單字 (可用空格、逗號或 / 分隔)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        style={{ padding: "4px", width: "250px" }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: "8px", padding: "4px 12px" }}>
        新增
      </button>
    </div>
  );
}

export default WordInput;
