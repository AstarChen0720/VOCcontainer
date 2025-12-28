import { useState, useEffect } from "react";

type Word = {
  id: number;
  text: string;
};

type Props = {
  word: Word | null;
};

// Free Dictionary API 的回傳格式定義
type DictionaryEntry = {
  word: string;
  phonetic?: string;
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
};

function Dictionary({ word }: Props) {
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [translation, setTranslation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!word) {
      setEntry(null);
      setTranslation("");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");
      setEntry(null);
      setTranslation("");

      try {
        // 1. 查詢英文定義、發音、例句 (Free Dictionary API)
        const dictRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.text}`
        );

        if (dictRes.ok) {
          const data = await dictRes.json();
          if (data.length > 0) {
            setEntry(data[0]);
          }
        } else if (dictRes.status === 404) {
          // 查無此字
          setError("查無此字的英文定義");
        }

        // 2. 查詢中文翻譯 (MyMemory API - 免費版有額度限制，但練習用足夠)
        // langpair=en|zh-TW 代表從英文翻成繁體中文
        const transRes = await fetch(
          `https://api.mymemory.translated.net/get?q=${word.text}&langpair=en|zh-TW`
        );

        if (transRes.ok) {
          const data = await transRes.json();
          if (data.responseData) {
            setTranslation(data.responseData.translatedText);
          }
        }
      } catch (err) {
        console.error("Error fetching dictionary data:", err);
        setError("查詢發生錯誤，請檢查網路連線");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [word]); // 當 word 改變時重新執行

  // 播放發音的函式
  const playAudio = (audioUrl?: string) => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  };

  if (!word) {
    return (
      <div
        style={{
          flex: 1,
          padding: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#888",
        }}
      >
        <p>請點選左邊的單字以查看詳情</p>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        padding: "24px",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      {loading && <p>查詢中...</p>}

      {!loading && (
        <>
          <div
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "16px",
              marginBottom: "16px",
            }}
          >
            <h1
              style={{ margin: "0 0 8px 0", fontSize: "2.5rem", color: "#333" }}
            >
              {word.text}
            </h1>

            {/* 音標與發音按鈕 */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {entry?.phonetic && (
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "1.2rem",
                    color: "#666",
                  }}
                >
                  {entry.phonetic}
                </span>
              )}

              {/* 尋找第一個有音檔的 phonetic */}
              {entry?.phonetics.find((p) => p.audio)?.audio && (
                <button
                  onClick={() =>
                    playAudio(entry.phonetics.find((p) => p.audio)?.audio)
                  }
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="播放發音"
                >
                  🔊
                </button>
              )}
            </div>

            {/* 中文翻譯 */}
            {translation && (
              <div
                style={{
                  marginTop: "12px",
                  fontSize: "1.5rem",
                  color: "#0056b3",
                  fontWeight: "bold",
                }}
              >
                {translation}
              </div>
            )}
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* 英文定義與例句 */}
          {entry?.meanings.map((meaning, index) => (
            <div key={index} style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontStyle: "italic",
                  color: "#555",
                  borderLeft: "4px solid #0056b3",
                  paddingLeft: "8px",
                }}
              >
                {meaning.partOfSpeech}
              </h3>
              <ul style={{ paddingLeft: "20px" }}>
                {meaning.definitions.map((def, idx) => (
                  <li key={idx} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>
                      {def.definition}
                    </div>
                    {def.example && (
                      <div
                        style={{
                          color: "#666",
                          marginTop: "4px",
                          fontSize: "0.95rem",
                        }}
                      >
                        Example: "{def.example}"
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Dictionary;
