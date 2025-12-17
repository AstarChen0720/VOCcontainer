// 從react導入名叫useState的函式(具名匯入),
// 從components/WordList導入WordList的不具名(=預設=default)匯出的東西(不具名匯入),可以字定義名子(因為default輸出只會有一個,你只要指定要從哪裡提取電腦就知道了)
// 從components/Dictionary導入Dictionary的不具名(=預設=default)匯出的東西(不具名匯入)
import { useState } from "react";
import WordList from "./components/WordList";
import Dictionary from "./components/Dictionary";

// 用type定義名叫Word的預設樣式,必須要是物件,且裡面有兩個屬性id(數字)和text(字串)
type Word = {
  id: number;
  text: string;
};

  
function App() {
  // 左邊的單字清單（暫時寫死））
  // 建立一個陣列放有哪些單字，裡面放words(左邊[]裡面的words是單純的名子,參數名),初始值是要符合Word的陣列(<Word[]>）
  const [words] = useState<Word[]>([
    { id: 1, text: "apple" },
    { id: 2, text: "banana" },
    { id: 3, text: "cat" },
  ]);

  // 建立一個陣列放目前選到的單字，目前被選到的單字，預設是null如果有選到就更新並且套用Word型別
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  // 在網頁中顯示一個div,放的兩個components:WordList 和Dictionary 並啟動,並且分別指定word和selected和Wordselected函式(props)傳給他們給他們讓可以使用(不然他們不能用)
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <WordList words={words} onSelect={setSelectedWord} />
      <Dictionary word={selectedWord} />
    </div>
  );
}
//把App這個components 不具名(=預設=default)匯出,讓其他組件可以使用
export default App;
