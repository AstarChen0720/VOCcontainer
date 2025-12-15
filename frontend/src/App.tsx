function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 左側：單字卡列表 */}
      <div
        style={{ flex: 1, borderRight: "1px solid #ccc", padding: "16px" }}
      >
        <h2>單字卡</h2>
        <ul>
          <li>apple</li>
          <li>banana</li>
          <li>cat</li>
        </ul>
      </div>

      {/* 右側：字典內容 */}
      <div style={{ flex: 1, padding: "16px" }}>
        <h2>字典</h2>
        <p>請點選左邊的單字</p>
      </div>
    </div>
  );
}

export default App;
