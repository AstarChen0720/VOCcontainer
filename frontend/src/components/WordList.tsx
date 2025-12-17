type Word = {
  id: number;
  text: string;
};
//  定義名叫Props的型別,是一個object,且裡面有兩個屬性名words:要是一個符合"Word"型別的陣列和onSelect:他是一個函式,而這函式收到的參數我要把他叫做word,且是一個符合"Word"型別的參數(:Word),且沒有回傳值(這是typescript的語法"=>"代表回傳值,而void代表沒有回傳值,沒有用則會預設回傳值undefined,但這裡我們不需要回傳值，所以要用void)
type Props = {
  words: Word[];
  onSelect: (word: Word) => void;
};

// 創一個叫WordList的函式,並且用解構寫法將words和onSelect這兩個屬性重參數中抓出來使用,且規定型別是Props
function WordList({ words, onSelect }: Props) {
  return (
    <div
      style={{ flex: 1, borderRight: "1px solid #ccc", padding: "16px" }}
    >
      <h2>單字卡</h2>
      {/* map遍歷words陣列中的每個元素並傳入後面,而將這個東西取名叫word,在這裡用箭頭函式回傳一個<li>元素(這裡的=>右邊加上小括號是隱式寫法,代表回傳這個<li>元素不用寫return,如果只有一行可以省略小括號) 並將list item顯示word的text*/}
      <ul>
        {words.map((word) => (
          <li
            key={word.id}
            style={{ cursor: "pointer", marginBottom: "8px" }}
            onClick={() => onSelect(word)}
          >
            {word.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 把WordList這個components 不具名(=預設=default)匯出,讓其他組件可以使用
export default WordList;
