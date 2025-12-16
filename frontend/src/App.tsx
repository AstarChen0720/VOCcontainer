// 從 React 引入 useState函數（hooks）記得要用中括號包起來引入(named import)才不會把整個被default export的東西都引入進來
import { useState } from 'react'

// 用type定義單字的預設型別
type Word = {
  id: number
  text: string
}

function App() {
  // 左邊的單字清單（暫時寫死）
  // 建立一個
  const [words] = useState<Word[]>([
    { id: 1, text: 'apple' },
    { id: 2, text: 'banana' },
    { id: 3, text: 'cat' },
  ])

  // 目前被選到的單字
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 左側：單字卡 */}
      <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '16px' }}>
        <h2>單字卡</h2>

        <ul>
          {words.map((word) => (
            <li
              key={word.id}
              style={{ cursor: 'pointer', marginBottom: '8px' }}
              onClick={() => setSelectedWord(word)}
            >
              {word.text}
            </li>
          ))}
        </ul>
      </div>

      {/* 右側：字典 */}
      <div style={{ flex: 1, padding: '16px' }}>
        <h2>字典</h2>

        {selectedWord ? (
          <div>
            <h3>{selectedWord.text}</h3>
            <p>這裡之後會顯示字典內容</p>
          </div>
        ) : (
          <p>請點選左邊的單字</p>
        )}
      </div>
    </div>
  )
}

export default App
