// 從react導入名叫useState的函式(具名匯入),
// 從components/WordList導入WordList的不具名(=預設=default)匯出的東西(不具名匯入),可以字定義名子(因為default輸出只會有一個,你只要指定要從哪裡提取電腦就知道了)
// 從components/Dictionary導入Dictionary的不具名(=預設=default)匯出的東西(不具名匯入)
// 從components/WordInput導入WordInput的不具名(=預設=default)匯出的東西(不具名匯入)
import { useState, useEffect } from "react";
import WordList from "./components/WordList";
import Dictionary from "./components/Dictionary";
import WordInput from "./components/WordInput";

// 用type定義名叫Word的預設樣式,必須要是物件,且裡面有兩個屬性id(數字)和text(字串)
type Word = {
  id: number;
  text: string;
};
//為管理方便,定義一個常數STORAGE_KEY,值是字串"words",用來當作localStorage的key值
const STORAGE_KEY = "words";

function App() {
  // 左邊的單字清單
  // <Word[]>代表初始值是要符合Word的陣列,()的內容是初始值
  const [words, setWords] = useState<Word[]>(() => {
    // 從localStorage找到名叫STORAGE_KEY的值並存入常數stored,只會執行一次
    const stored = localStorage.getItem(STORAGE_KEY);
    // 如果stored有東西，就用它當初始值；沒有的話，就用空陣列 []
    return stored ? JSON.parse(stored) : [];
  });

  // 建立一個陣列放目前選到的單字，目前被選到的單字，預設是null如果有選到就更新並且套用Word型別
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  // 用useEffect,執行一個函式,每次單字陣列(words)改變後執行,功能是將當前的單字陣列(words)變成string(JSON.stringify)後存入localStorage中叫STORAGE_KEY的盒子中(.setItem(key,value))
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  }, [words]);

  // 建立一個叫做addWord函式,他的參數限定是string
  // 功能：將傳入的字串依照空格、逗號或斜線分割成多個單字並加入清單
  const addWord = (text: string) => {
    // 使用正規表達式分割：\s 代表空格, / 代表斜線, , 代表逗號
    // filter(Boolean) 用來移除分割後產生的空字串
    const wordTexts = text.split(/[\s,/]+/).filter(Boolean);

    const newWords: Word[] = wordTexts.map((t, index) => ({
      // 加上 index 確保同時新增多個單字時 ID 不會重複
      id: Date.now() + index,
      text: t,
    }));

    // 將所有新單字一次加入陣列
    setWords((prev) => [...prev, ...newWords]);
  };

  // 建立一個叫做deleteWord的函式,他的參數限定是number,功能是回傳一個新的陣列,而這新的陣列是將目前的words陣列去掉id等於參數的那個元素後的陣列
  const deleteWord = (id: number) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
  };

  const updateWord = (id: number, newText: string) => {
    setWords((prev) =>
      prev.map((word) => (word.id === id ? { ...word, text: newText } : word))
    );
  };

  // 在網頁中顯示一個div,放的兩個components:WordList 和Dictionary 並啟動,並且分別指定word和selected和Wordselected函式(props)傳給他們給他們讓可以使用(不然他們不能用)
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, borderRight: "1px solid #ccc", padding: "16px" }}>
        <WordInput onAdd={addWord} />
        <WordList
          words={words}
          onSelect={setSelectedWord}
          onDelete={deleteWord}
          onUpdate={updateWord}
        />
      </div>
      <Dictionary word={selectedWord} />
    </div>
  );
}
//把App這個components 不具名(=預設=default)匯出,讓其他組件可以使用
export default App;
