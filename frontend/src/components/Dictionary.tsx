// 用type定義名叫Word的預設樣式,必須要是物件,且裡面有兩個屬性id(數字)和text(字串)
type Word = {
  id: number;
  text: string;
};
// 定義名叫Props的型別,裡面有一個屬性word,word(注意大小寫)的型別規定是Word或是null
type Props = {
  word: Word | null;
};

// 這裡代表我要創建一個名叫Dictionary的函式,使用傳入的函數中word的參數，且規定型別是Props.而參數的{word}是解構寫法(簡寫法),代表直接從傳來的參數裡面取出word這個屬性來使用(跟上面沒有關係),而": Props"是typescript限定型別(格式)的語法,代表這個參數的型別限定要符合Props
function Dictionary({ word }: Props) {
  return (
    // {}代表告訴React,我要用javascript指令了,不是要轉成html喔，記得要用javascript的方法來執行我喔,且在jsx中style被規定要是javascript的物件
    // 所以才要用雙大括號{{}}:外層的大括號是告訴React我要用javascript,內層的大括號是代表這是一個javascript的物件
    <div style={{ flex: 1, padding: "16px" }}>
      <h2>字典</h2>
      {/*三元運算式,代表有沒有選到單字,有選到就顯示單字word的內容(word=true),沒選到就顯示請選單字(word=false)
      
      這裡也一樣因為這三元運算子是javascript所以外面也要用{}包起來 */}
      {word ? (
        <div>
          <h3>{word.text}</h3>
          <p>這裡之後會顯示字典內容</p>
        </div>
      ) : (
        <p>請點選左邊的單字</p>
      )}
    </div>
  );
}
// 把Dictionary這個components 不具名(=預設=default)匯出,讓其他組件可以使用
export default Dictionary;
