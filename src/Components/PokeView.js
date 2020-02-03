import React, { useState, useEffect } from "react";
import RecordBox from "./RecordBox";
import Timer from "./Timer";
import Spinner from "./Spinner";
import DisplayAnswer from "./DisplayAnswer";
import AnswerForm from "./AnswerForm";

import ModeForm from "./ModeForm";
import Characteristics from "./Characteristics";
import ScrollToTop from "./ScrollToTop";
import firebase from "../firebase";

function PokeView({ match }) {
  const [auth, setAuth] = useState({ loggedIn: false, UID: "" });
  const [formText, setFormText] = useState("");
  const [wrongInput, setWrongInput] = useState(false);
  const [rightOrWrong, setRightOrWrong] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [mode, setMode] = useState({ normal: false, hard: false });
  const [toggleMoveBox, setToggleMoveBox] = useState(false);
  const [gameState, setGameState] = useState("intro");
  const [isTicking, setTicking] = useState(false);
  const [count, setCount] = useState(30);
  const [attrs, setAttrs] = useState({});
  const [pokeId, setPokeId] = useState({ start: "", end: "" });
  const [correctAnswers, setCorrectAnswers] = useState(
    parseInt(localStorage.getItem("item"), 10) || 0
  );
  const [totalQuestions, setTotalQuestions] = useState(
    parseInt(localStorage.getItem("itemTwo"), 10) || 0
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user
        ? setAuth({ loggedIn: true, UID: user.uid })
        : setAuth({ loggedIn: false, UID: "" });
    });
  }, []);

  useEffect(() => {
    if (isTicking) {
      const interval = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
      const timeout = setTimeout(() => {
        setTicking(false);
        setCount(30);
        setGameState("answer");
        setFormText("");
        setTotalQuestions(totalQuestions => totalQuestions + 1);
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

  const queryData = async () => {
    const user = firebase.auth().currentUser;
    const userID = auth.loggedIn ? auth.UID : user.uid;
    try {
      const fn = firebase.functions().httpsCallable("pokemonQuery");
      const res = await fn({
        range: {
          start: pokeId.start,
          end: pokeId.end
        }
      });
      const docID = res.data.backendResult;
      const cb = await firebase
        .firestore()
        .doc(`${userID}/${docID}`)
        .get();
      const { pokeData } = cb.data();
      const {
        name,
        heightIn,
        heightM,
        weightKg,
        weightLb,
        heightFt,
        image,
        types,
        moves,
        stats
      } = pokeData;
      setAttrs({
        heightM: heightM,
        weightKg: weightKg,
        weightLb: weightLb,
        heightIn: heightIn,
        heightFt: heightFt,
        image: image,
        name: name,
        types: types,
        moves: moves,
        stats: stats
      });
      setGameState("question");
      setTicking(true);
      setSpinner(false);
      toggleMoveBox && setToggleMoveBox(false);
      rightOrWrong && setRightOrWrong(false);
    } catch (err) {
      alert(err);
    }
  };

  const onSubmission = async e => {
    e.preventDefault();
    setSpinner(true);
    try {
      if (!auth.loggedIn) {
        await firebase.auth().signInAnonymously();
        queryData();
      } else queryData();
    } catch (err) {
      alert(err);
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    if (formText === attrs.name) {
      setGameState("answer");
      setTicking(false);
      setCount(30);
      setRightOrWrong(true);
      setCorrectAnswers(correctAnswers => correctAnswers + 1);
      setTotalQuestions(totalQuestions => totalQuestions + 1);
      setFormText("");
    } else {
      setWrongInput(true);
      setTimeout(() => {
        setWrongInput(false);
      }, 1000);
    }
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
      loading={spinner}
      normalClick={normalClick}
      hardClick={hardClick}
      normalMode={mode.normal}
      hardMode={mode.hard}
      onStartGame={onSubmission}
    />
  );

  const displayGameValues = () => (
    <>
      <ScrollToTop someState={gameState} />
      <Characteristics
        heightFt={attrs.heightFt}
        heightIn={attrs.heightIn}
        heightM={attrs.heightM}
        weightLb={attrs.weightLb}
        weightKg={attrs.weightKg}
        types={attrs.types}
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
      answerResult={rightOrWrong}
      name={attrs.name}
      image={attrs.image}
      onRestart={onSubmission}
      loading={spinner}
    />
  );

  return (
    <div>
      {gameState === "intro" && displayDiffButtons()}
      {gameState === "question" && displayGameValues()}
      {gameState === "answer" && displayAnswer()}
      {spinner && <Spinner />}
    </div>
  );
}

export default PokeView;
