"use client"
import Head from "next/head";
import { useState, useEffect } from "react";

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type Board = {
  [index: number]: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
}

export default function Home() {

  const [modalTitle, setModalTitle] = useState("")
  const [canClick, setCanClick] = useState(true);
  const [won, setWon] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [xTurn, setXTurn] = useState(true);
  const [boardData, setBoardData] = useState<Board>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  })

  useEffect(() => {
    checkWin();
    checkDraw();
  }, [boardData]);
  
  const updateBoard = (index: number) => {
    if (!boardData[index]){
      setBoardData({...boardData, [index]: xTurn? "X" : "O" });
      setXTurn(!xTurn);
    }
  }

  const checkWin = () => {
    WINNING_COMBO.map((bd) => {
      if (
        boardData[bd[0]] === boardData[bd[1]] &&
        boardData[bd[1]] === boardData[bd[2]] &&
        boardData[bd[0]]!== ""
      ) {
        setWon(true);
        setCanClick(false);
        setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!!!`);
      }
    })
  }

  const checkDraw = () => {
    let check = Object.keys(boardData).every((v) => boardData[Number(v)]);
    setIsDraw(check);
    if (check) setModalTitle("Match Draw!!!");
  }

  const reset = () => {
    setBoardData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setXTurn(true);
    setWon(false);
    setCanClick(true);
    setIsDraw(false);
    setModalTitle("");
  };
  
  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game__menu">
          <p>{xTurn === true ? "X Turn" : "O Turn"}</p>
          <p>{`Game Won:${won} Draw: ${isDraw}`}</p>
        </div>
        <div className="game__board">
          {[...Array(9)].map((v, idx) => {
            return (
              <div
                onClick={canClick ? () => {
                  updateBoard(idx);
                } : undefined}
                key={idx}
                className={"square"}
              >
                {boardData[idx]}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`modal ${modalTitle ? "show" : ""}`}>
        <div className="modal__title">{modalTitle}</div>
        <button onClick={reset}>New Game</button>
      </div>
    </div>
  );
}
