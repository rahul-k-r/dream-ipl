import React, { useEffect, useRef, useState } from "react";
import CustomBar from "./Components/CustomBar/CustomBar";
import PlayerScreen from "./Components/PlayerScreen/PlayerScreen";
import ScoreScreen from "./Components/ScoreScreen/ScoreScreen";

import Chip from "@material-ui/core/Chip";
import { green, grey } from "@material-ui/core/colors";
import SportsCricketIcon from "@material-ui/icons/SportsCricket";
import Paper from "@material-ui/core/Paper";
import "./App.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://fantasy-ipl-server.herokuapp.com/";

function App() {
  const socketRef = useRef();
  const [value, setValue] = React.useState({ 1: true, 2: false });
  const [players, setPlayers] = useState([]);
  const [scoreList, setScoreList] = useState([]);
  const [playersWithScore, setPlayersWithScore] = useState([]);
  const [score, setScore] = useState(100);
  const [count, setCount] = useState(0);
  const [checkboxState, setCheckboxState] = useState({});
  const [points, setPoints] = useState(0);
  const [team, setTeam] = useState([]);
  const [cap, setCap] = useState({ captain: "", viceCaptain: "" });
  var halfCentury = {};
  var century = {};
  var events = {
    caught: 25,
    bowled: 33,
    "run out": 25,
    lbw: 33,
    stumped: 25,
    "caught and bowled": 40,
    "hit wicket": 25,
  };

  team.forEach((player) => {
    halfCentury[player] = false;
    century[player] = false;
  });

  const handleChange = (num) => {
    if (!value[num]) setValue({ 1: !value[1], 2: !value[2] });
  };
  const getPoints = (delivery) => {
    let curPoints = 0;
    if (team.includes(delivery.batsman)) {
      curPoints += delivery.runs.batsman;
    }

    if (team.includes(delivery.bowler)) {
      if (delivery.hasOwnProperty("wicket")) {
        curPoints += events[delivery.wicket.kind];
      }
    }

    return curPoints;
  };
  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
    socketRef.current.on("player-list", (players) => {
      setPlayersWithScore(players.playersWithScore);
      setPlayers(players.selectablePlayers.sort());
    });
    socketRef.current.on("next-ball", (ball) => {
      let score = JSON.parse(JSON.stringify(scoreList));
      let addPoints = getPoints(ball);

      setPoints(points + addPoints);
      setScoreList((prevScore) => [...prevScore, ball]);
    });
    // return () => socketRef.current.disconnect();
  }, []);

  return (
    <div className="App">
      <CustomBar />
      <Chip
        label="Find Match"
        onClick={() => {
          socketRef.current.emit("select-match");
          setScoreList((prevScore) => []);
          setCount(0);
          setScore(100);
          setPoints(0);
          setCheckboxState({
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
            13: false,
            14: false,
            15: false,
            16: false,
            17: false,
            18: false,
            19: false,
            20: false,
            21: false,
            22: false,
          });
        }}
      />
      <Chip
        label="Start Match"
        onClick={() => {
          socketRef.current.emit("start-match");
        }}
      />
      <Chip
        label="Stop Match"
        onClick={() => socketRef.current.emit("stop-match")}
      />
      <div id="tab-bar">
        <StatusChip
          label="Player List"
          num="1"
          value={value[1]}
          handleChange={handleChange}
        />
        <StatusChip
          label="Score Card"
          num="2"
          value={value[2]}
          handleChange={handleChange}
        />
      </div>
      <h3>Total Points : {points}</h3>
      {value[1] ? (
        <PlayerScreen
          players={players}
          playersWithScore={playersWithScore}
          score={score}
          setScore={setScore}
          count={count}
          setCount={setCount}
          checkboxState={checkboxState}
          setCheckboxState={setCheckboxState}
          team={team}
          setTeam={setTeam}
          cap={cap}
          setCap={setCap}
        />
      ) : null}

      {value[2] ? (
        <Paper
          elevation={0}
          style={{ maxHeight: 800, overflow: "auto", marginTop: 30 }}
        >
          <ScoreScreen scoreList={[...scoreList]} />;
        </Paper>
      ) : null}
    </div>
  );
}

export default App;

function colorForStatus(status) {
  if (status) return green[600];
  else return grey[700];
}

function StatusChip({ label, num, value, handleChange }) {
  return (
    <Chip
      avatar={<SportsCricketIcon style={{ color: "#ffffff" }} />}
      label={label}
      onClick={() => handleChange(num)}
      style={{ backgroundColor: colorForStatus(value), color: "white" }}
    />
  );
}
