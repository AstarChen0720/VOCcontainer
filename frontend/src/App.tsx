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
  const [words, setWords] = useState<Word[]>([]);
  // 建立一個陣列放目前選到的單字，目前被選到的單字，預設是null如果有選到就更新並且套用Word型別
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);    

  // 用useEffect,執行一個函式,只在第一次render後執行一次(因為依賴項是空陣列[]),他的功能是創造一個叫stored的函式,存入從localStorage取出(.getItem)名叫STORAGE_KEY的東西,如果有(不是null),就用setWords將他用JSON.parse轉成陣列後更新成當前的單字陣列(words),不用return因為他不會持續執行
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setWords(JSON.parse(stored));
    }
  }, []);

  // 用useEffect,執行一個函式,每次單字陣列(words)改變後執行,功能是將目前的單字list(words)變成string(JSON.stringify)後存入localStorage中叫STORAGE_KEY的項目中(.setItem(key,value))
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  }, [words]);

  // 建立一個叫做addWord函式,他的參數限定是string,他的工作有兩個1.建立一個叫做nesWord的object,型別限定是word,格式是第一項id會用Date.now()產生一個從1970/1/1到現在的豪秒數當id(目的是給一個獨一無二的數,方便排序)第二項是傳入的參數
  const addWord = (text: string) => {
    const newWord: Word = {
      id: Date.now(),
      text,
    };
    //調用setWrods函式,然後他預設如果括號內是函數就會將最新的狀態(words陣列)傳入第一個參數,而這函數是一個簡寫的函數,功能是立刻回傳一個新的陣列,而這新的陣列就是在目前最新的陣列最後加上newWord這個元素
    setWords((prev) => [...prev, newWord]);
  };

  // 在網頁中顯示一個div,放的兩個components:WordList 和Dictionary 並啟動,並且分別指定word和selected和Wordselected函式(props)傳給他們給他們讓可以使用(不然他們不能用)
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, borderRight: "1px solid #ccc", padding: "16px" }}>
        <WordInput onAdd={addWord} />
        <WordList words={words} onSelect={setSelectedWord} />
      </div>
      <Dictionary word={selectedWord} />
    </div>
  );
}
//把App這個components 不具名(=預設=default)匯出,讓其他組件可以使用
export default App;
