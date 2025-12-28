import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // 切換登入或註冊模式

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } else {
      result = await supabase.auth.signUp({
        email,
        password,
      });
    }

    const { error } = result;

    if (error) {
      alert(error.message);
    } else {
      if (!isLogin) {
        alert(
          "註冊成功！請檢查您的信箱進行驗證，或直接登入（視 Supabase 設定而定）。"
        );
      }
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{isLogin ? "登入" : "註冊"}</h1>
        <form
          onSubmit={handleAuth}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "8px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "8px" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "8px", cursor: "pointer" }}
          >
            {loading ? "處理中..." : isLogin ? "登入" : "註冊"}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            marginTop: "1rem",
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {isLogin ? "沒有帳號？點此註冊" : "已有帳號？點此登入"}
        </button>
      </div>
    </div>
  );
}
