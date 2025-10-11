import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface Todo {
  id: number;
  content: string;
}




function App() {
  const [text, setText] = useState<Todo[]>([]);

const idRef = useRef(0);

const onClickAdd = (text: string)==> {
  setTodos([
    ...todos,{
      id: idRef.current++,content: text,
    },
  ]);

  setText("");
};


  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  return (
    <div>
      <h1>Todo</h1>
      <input value={text} onChange={onChangeInput} />
      <button onClick={onClickAdd}>추가</button>
    </div>
  );
}

export default App;
