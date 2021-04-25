import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import SportsCricketIcon from "@material-ui/icons/SportsCricket";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";

function CustomListItem({
  primary,
  secondary,
  num,
  handleChange,
  score,
  count,
  checked,
  playersWithScore,
  cap,
  setCap,
}) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <SportsCricketIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} />
      <Checkbox
        id={primary}
        icon={<Done />}
        checkedIcon={<Close />}
        about={primary}
        color="secondary"
        inputProps={{ "aria-label": "secondary checkbox" }}
        onChange={handleChange}
        name={num}
        checked={checked}
        disabled={
          (score - parseFloat(playersWithScore[primary]) < 0 || count === 11) &&
          !checked
            ? true
            : false
        }
      />
      <ButtonGroup
        color="primary"
        aria-label="outlined primary button group"
        size="small"
      >
        <Button
          onClick={() => {
            if (cap.captain === primary) {
              alert("He is already the captain!");
              return;
            } else if (!checked) {
              alert("Not part of the team!");
              return;
            }
            setCap({ captain: primary, viceCaptain: cap.viceCaptain });
            
          }}
        >
          Make Captain
        </Button>
        <Button
          onClick={() => {
            if (cap.viceCaptain === primary) {
              alert("He is already the vice captain!");
              return;
            } else if (!checked) {
              alert("Not part of the team!");
              return;
            }
            setCap({ captain: cap.captain, viceCaptain: primary });
       
          }}
        >
          Make Vice Captain
        </Button>
      </ButtonGroup>
    </ListItem>
  );
}

function Players({
  players,
  playersWithScore,
  score,
  setScore,
  count,
  setCount,
  checkboxState,
  setCheckboxState,
  handleTeam,
  cap,
  setCap,
}) {
  const handleChange = (event) => {
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setScore(score - parseFloat(playersWithScore[event.target.id]));
      setCount(count + 1);
    } else {
      setScore(score + parseFloat(playersWithScore[event.target.id]));
      setCount(count - 1);
    }
  };

  let num = 0;
  return (
    <div>
      <h1>
        Players Chosen: {count}
        </h1><h1>
        Credits Remaining:{score}
        
      </h1>
      {players.map(
        (player) => (
          (num = num + 1),
          (
            <CustomListItem
              key={num.toString()}
              primary={player}
              secondary={playersWithScore[player]}
              handleChange={handleChange}
              count={count}
              score={score}
              num={num.toString()}
              checked={checkboxState[num]}
              playersWithScore={playersWithScore}
              cap={cap}
              setCap={setCap}
            />
          )
        )
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (count === 11) {
            let team = [];
            for (let i = 1; i <= 22; i++)
              if (checkboxState[i]) team.push(players[i - 1]);
            handleTeam(team);
          } else alert("Please select 11 players");
        }}
      >
        Confirm Team
      </Button>
    </div>
  );
}
export default Players;
