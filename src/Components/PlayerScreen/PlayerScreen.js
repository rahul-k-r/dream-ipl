import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Players from "../Players/Players";

function PlayerScreen({
  players,
  playersWithScore,
  score,
  setScore,
  count,
  setCount,
  checkboxState,
  setCheckboxState,
  team,
  setTeam,
  cap,
  setCap
}) {
  const handleTeam = (team) => {
    setTeam(team);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Players
          players={players}
          playersWithScore={playersWithScore}
          score={score}
          setScore={setScore}
          count={count}
          setCount={setCount}
          checkboxState={checkboxState}
          setCheckboxState={setCheckboxState}
          handleTeam={handleTeam}
          cap={cap}
          setCap={setCap}
        />
      </Container>
    </React.Fragment>
  );
}

export default PlayerScreen;
