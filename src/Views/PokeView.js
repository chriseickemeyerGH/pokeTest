import React, { useState, useEffect } from "react";
import RecordBox from "../Components/RecordBox";
import Timer from "../Components/Timer";
import Spinner from "../Components/Spinner";
import DisplayAnswer from "../Components/DisplayAnswer";
import AnswerForm from "../Components/AnswerForm";
import axios from "axios";
import ModeForm from "../Components/ModeForm";
import Characteristics from "../Components/Characteristics";

function PokeView({ match }) {
  const [formText, setFormText] = useState("");
  const [wrongInput, setWrongInput] = useState(false);
  const [rightOrWrong, setRightOrWrong] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [mode, setMode] = useState({ normal: false, hard: false });
  const [toggleMoveBox, setToggleMoveBox] = useState(false);
  const [gameState, setGameState] = useState("intro");
  const [isTicking, setTicking] = useState(false);
  const [count, setCount] = useState(30);
  const [attrs, setAttrs] = useState({
    name: "",
    heightM: "",
    weightKg: "",
    heightIn: "",
    heightFt: "",
    type: [],
    moves: [],
    stats: [],
    image: ""
  });
  const [pokeId, setPokeId] = useState({ start: "", end: "" });
  const [correctAnswers, setCorrectAnswers] = useState(
    parseInt(localStorage.getItem("item"), 10) || 0
  );
  const [totalQuestions, setTotalQuestions] = useState(
    parseInt(localStorage.getItem("itemTwo"), 10) || 0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameState]);
  useEffect(() => {
    if (isTicking) {
      const interval = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
      const timeout = setTimeout(() => {
        setTicking(false);
        axios.get("/timeout").then(res => {
          setCount(30);
          setAttrs({
            ...attrs,
            name: res.data.serverName,
            image: res.data.serverImage
          });
          setGameState("answer");

          setFormText("");
          setTotalQuestions(totalQuestions => totalQuestions + 1);
        });
      }, 30000);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [isTicking]);

  useEffect(() => {
    localStorage.setItem("item", correctAnswers);
    localStorage.setItem("itemTwo", totalQuestions);
  }, [correctAnswers, totalQuestions]);

  useEffect(() => {
    const { id } = match.params;
    let modify = id.slice(5, 12);
    if (modify.length < 6) {
      setPokeId({
        start: parseInt(modify.slice(0, 1)),
        end: parseInt(modify.slice(2, 5))
      });
    } else {
      setPokeId({
        start: parseInt(modify.slice(0, 3)),
        end: parseInt(modify.slice(4, 7))
      });
    }
  }, [pokeId, match.params]);

  const startGame = e => {
    setSpinner(true);
    e.preventDefault();
    axios
      .post("/gamestart", {
        startingId: pokeId.start,
        endingId: pokeId.end
      })
      .then(res => {
        let response = res.data;
        setAttrs({
          ...attrs,
          heightIn: response.serverInHeight,
          heightM: response.serverMeterHeight,
          weightKg: response.serverKgWeight,
          weightLb: response.serverLbWeight,
          heightFt: response.serverFtHeight,
          type: response.serverType,
          stats: response.serverStats,
          moves: response.serverMoves
        });
        setGameState("question");
        setToggleMoveBox(false);
        setRightOrWrong(false);
        setTicking(true);
        setSpinner(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post("/answersubmit", {
        guess: formText
      })
      .then(res => {
        let response = res.data;
        setFormText("");
        const gameState = response.serverState;

        if (gameState === "Correct") {
          setAttrs({
            ...attrs,
            name: response.serverName,
            image: response.serverImage
          });
          setGameState("answer");
          setTicking(false);
          setCount(30);
          setRightOrWrong(true);
          setCorrectAnswers(correctAnswers => correctAnswers + 1);
          setTotalQuestions(totalQuestions => totalQuestions + 1);
        } else if (gameState === "Incorrect") {
          setWrongInput(true);
          setTimeout(() => {
            setWrongInput(false);
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  function normalClick(e) {
    e.preventDefault();
    setMode({ normal: true, hard: false });
  }

  function hardClick(e) {
    e.preventDefault();
    setMode({ normal: false, hard: true });
  }

  const displayDiffButtons = () => (
    <ModeForm
      normalClick={normalClick}
      hardClick={hardClick}
      normalMode={mode.normal}
      hardMode={mode.hard}
      onStartGame={startGame}
    />
  );

  const displayGameValues = () => (
    <>
      <Characteristics
        heightFt={attrs.heightFt}
        heightIn={attrs.heightIn}
        heightM={attrs.heightM}
        weightLb={attrs.weightLb}
        weightKg={attrs.weightKg}
        type={attrs.type}
        moves={attrs.moves}
        onArrowClick={() => setToggleMoveBox(!toggleMoveBox)}
        toggleMoveBox={toggleMoveBox}
        normalMode={mode.normal}
        stats={attrs.stats}
      />

      <AnswerForm
        onSubmit={onSubmit}
        startAnimation={wrongInput}
        answerVal={formText}
        onChange={e => setFormText(e.target.value.toUpperCase())}
      />

      <Timer count={count} />

      <RecordBox
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
      />
    </>
  );

  const displayAnswer = () => (
    <DisplayAnswer
      showAnswer={!!(gameState === "answer")}
      answerResult={rightOrWrong}
      name={attrs.name}
      image={attrs.image}
      onRestart={startGame}
    />
  );

  return (
    <div>
      {!!(gameState === "intro") && displayDiffButtons()}
      {!!(gameState === "question") && displayGameValues()}
      {!!(gameState === "answer") && displayAnswer()}
      {spinner && <Spinner />}
    </div>
  );
}

export default PokeView;
