import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import WordList from "./components/WordList";
import Dictionary from "./components/Dictionary";
import WordInput from "./components/WordInput";
import Auth from "./components/Auth";
import { supabase } from "./supabaseClient";

type Word = {
  id: number;
  text: string;
  user_id?: string;
};

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  // 監聽登入狀態
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) setWords([]);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) setWords([]);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 當 session 改變（例如登入後），抓取該使用者的單字
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

    if (session) {
      fetchWords();
    }
  }, [session]);

  const addWord = async (text: string) => {
    if (!session) return; // 未登入不執行

    const wordTexts = text.split(/[\s,/]+/).filter(Boolean);

    // 這裡很重要：加入 user_id
    const newWordsData = wordTexts.map((t) => ({
      text: t,
      user_id: session.user.id,
    }));

    const { data, error } = await supabase
      .from("words")
      .insert(newWordsData)
      .select();

    if (error) {
      console.error("Error adding words:", error);
      alert("新增失敗：" + error.message);
    } else if (data) {
      setWords((prev) => [...prev, ...data]);
    }
  };

  const deleteWord = async (id: number) => {
    const { error } = await supabase.from("words").delete().eq("id", id);

    if (error) {
      console.error("Error deleting word:", error);
    } else {
      setWords((prev) => prev.filter((word) => word.id !== id));
      if (selectedWord?.id === id) setSelectedWord(null);
    }
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header with Logout */}
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Welcome, {session.user.email}</span>
        <button
          onClick={handleLogout}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          登出
        </button>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            borderRight: "1px solid #ccc",
            padding: "16px",
            overflowY: "auto",
          }}
        >
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
    </div>
  );
}

export default App;
