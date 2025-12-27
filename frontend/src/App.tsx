// 從react導入名叫useState的函式(具名匯入),
// 從components/WordList導入WordList的不具名(=預設=default)匯出的東西(不具名匯入),可以字定義名子(因為default輸出只會有一個,你只要指定要從哪裡提取電腦就知道了)
// 從components/Dictionary導入Dictionary的不具名(=預設=default)匯出的東西(不具名匯入)
// 從components/WordInput導入WordInput的不具名(=預設=default)匯出的東西(不具名匯入)
import { useState, useEffect } from "react";
import WordList from "./components/WordList";
import Dictionary from "./components/Dictionary";
import WordInput from "./components/WordInput";
import { supabase } from "./supabaseClient";

// 用type定義名叫Word的預設樣式,必須要是物件,且裡面有兩個屬性id(數字)和text(字串)
type Word = {
  id: number;
  text: string;
};

function App() {
  // 左邊的單字清單
  const [words, setWords] = useState<Word[]>([]);

  // 建立一個陣列放目前選到的單字，目前被選到的單字，預設是null如果有選到就更新並且套用Word型別
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  // 初始載入：從 Supabase 的words欄位抓取全部資料並用id排序,然後放到words陣列中 
  useEffect(() => {
    const fetchWords = async () => {
      const { data, error } = await supabase
        .from("words")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching words:", error);
      } else {
        setWords(data || []);
      }
    };

    fetchWords();
  }, []);

  // 建立一個叫做addWord函式,他的參數限定是string
  // 功能：將傳入的字串依照空格、逗號或斜線分割成多個單字並加入清單
  const addWord = async (text: string) => {
    const wordTexts = text.split(/[\s,/]+/).filter(Boolean);

    const newWordsData = wordTexts.map((t) => ({
      text: t,
    }));

    // 存入 Supabase並且自動同步最新的資料到前端
    const { data, error } = await supabase
      .from("words")
      .insert(newWordsData)
      .select();

    if (error) {
      console.error("Error adding words:", error);
    } else if (data) {
      setWords((prev) => [...prev, ...data]);
    }
  };

  // 建立一個叫做deleteWord的函式,他的功能是刪除指定id在supabase的單字,且同步刪除前端的單字
  const deleteWord = async (id: number) => {
    const { error } = await supabase.from("words").delete().eq("id", id);

    if (error) {
      console.error("Error deleting word:", error);
    } else {
      setWords((prev) => prev.filter((word) => word.id !== id));
    }
  };

  // 建立一個叫做updateWord的函式,他的功能是更新指定id在supabase的單字,且同步更新前端的單字
  const updateWord = async (id: number, newText: string) => {
    const { error } = await supabase
      .from("words")
      .update({ text: newText })
      .eq("id", id);

    if (error) {
      console.error("Error updating word:", error);
    } else {
      setWords((prev) =>
        prev.map((word) => (word.id === id ? { ...word, text: newText } : word))
      );
    }
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
