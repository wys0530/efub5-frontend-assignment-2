"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "@/components/TodoTemplate";
import TodoHead from "@/components/TodoHead";
import TodoList from "@/components/TodoList";
import TodoCreate from "@/components/TodoCreate";
import styled from "styled-components";
import Link from "next/link";

//더미 데이터..
const TODO_LIST = [
  { id: 1, text: "이펍과제하기", done: false },
  { id: 2, text: "푸데푸데 잠자기", done: false },
  { id: 3, text: "숙영리와 온라인 데이트(...)하기^^", done: false },
];

const GlobalStyle = createGlobalStyle`
  body {
    background:rgb(205, 233, 255)
  }
`;

const GotoDiary = styled.button`
  font-size: 17px;
  color: rgb(255, 170, 217);
  background: rgb(255, 255, 255);
  padding: 8px;

  &:hover {
    background: rgb(255, 170, 217);
  }
`;

// 로컬 스토리지: 브라우저를 껐다 켜도 저장되어있음.
// 이걸 하려면?
// 1. 앱이 로딩될 때 localStorage에서 todos를 불러온다. 2. todos가 변경될 때마다 localStorage에 저장한다.
const LOCAL_STORAGE_KEY = "todos_dom";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoFilter = "all" | "done" | "undone";

function App() {
  const [todofilter, setTodofilter] = useState<TodoFilter>("all"); // all, done , undone 상태 중 전체 보기를 초기값으로 설정
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    //getItem(key)는 키에 해당하는 값을 받아옴. 저장된 값 로딩! (1번과정)
    //우리가 설정한 키(todos)에 해당하는 값을 받아옴.
    return savedTodos ? JSON.parse(savedTodos) : TODO_LIST;
    //savedTodos가 없으면 더미데이터 반환, 있으면 이 데이터를 배열로 변환함
    //(TODO_LIST 대신 [] 을 쓰면 빈 배열(빈 내용) 반환할 수 있음)
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)); //JSON.stringify: 자바스크립트의 데이터를 문자열로 바꿈
  }, [todos]); //의존성 배열 todos의 내용물이 바뀔때마다 setItem 호출: todo(key), 값(todos의 값을 문자열로 바꾼 결과)

  //완료, 미완료 버튼 누르면 해당 상태만 보여줌
  const filteredTodos = useMemo(() => {
    if (todofilter === "done") return todos.filter((todo) => todo.done);
    if (todofilter === "undone") return todos.filter((todo) => !todo.done);
    return todos;
  }, [todos, todofilter]);
  //todos(목록)와 todofilter(완료/미완료/전체보기) 상태가 바뀌면 (버튼 클릭시 setfilter 실행되어 상태 바뀜)
  //이 함수가 실행됨.
  //-> 이 함수가 TodoList로 전달됨

  //임시 state 만들기
  const [tempState, setTempState] = useState(0);

  return (
    <>
      <GlobalStyle />

      <GotoDiary>
        <Link href="/diary">💌 한 줄 일기 📮</Link>
      </GotoDiary>

      <TodoTemplate>
        <TodoHead todos={todos} setTodos={setTodos} />
        <TodoList
          todos={filteredTodos}
          setTodos={setTodos}
          todofilter={todofilter}
          setTodofilter={setTodofilter}
        />
        <TodoCreate todos={todos} setTodos={setTodos} />
      </TodoTemplate>
    </>
  );
}

export default App;
