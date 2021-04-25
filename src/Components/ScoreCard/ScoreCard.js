import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { red, green, orange, grey } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import "./ScoreCard.css";

const pointsLookup = {
  caught: 25,
  bowled: 33,
  "run out": 25,
  lbw: 33,
  "retired hurt": 0,
  stumped: 25,
  "caught and bowled": 40,
  "hit wicket": 25,
  "Per Run": 1,
  "50 runs scored": 58,
  "100 runs scored": 116,
};

const useStyles = makeStyles((theme) => ({
  boundary: {
    color: "#fff",
    backgroundColor: green[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  wicket: {
    color: "#fff",
    backgroundColor: red[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  noball: {
    color: "#fff",
    backgroundColor: orange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  default: {
    color: "#fff",
    backgroundColor: grey[700],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  title: {
    fontSize: 20,
  },
}));

export default function ScoreCard(props) {
  const classes = useStyles();

  if (props.score.runs.batsman === 6 || props.score.runs.batsman === 4)
    return (
      <CustomCard
        class={classes.boundary}
        batsman={props.score.batsman}
        bowler={props.score.bowler}
        score={props.score.runs.batsman}
        ball={props.score.ball}
      />
    );
  else if (props.score.hasOwnProperty("wicket"))
    return (
      <CustomCard
        class={classes.wicket}
        batsman={props.score.batsman}
        bowler={props.score.bowler}
        score={"W"}
        ball={props.score.ball}
        extras={
          props.score.wicket.kind +
          
          (props.score.wicket.hasOwnProperty("fielders")
            ? " by " + props.score.wicket.fielders[0]
            : "") +
          (props.score.wicket.kind === "run out"
            ? " - " + props.score.wicket.player_out
            : "")
        }
      />
    );
  else if (props.score.runs.extras !== 0)
    return (
      <CustomCard
        class={classes.noball}
        batsman={props.score.batsman}
        bowler={props.score.bowler}
        score={props.score.runs.extras}
        ball={props.score.ball}
        extras={Object.keys(props.score.extras)[0]}
      />
    );
  else
    return (
      <CustomCard
        class={classes.default}
        batsman={props.score.batsman}
        bowler={props.score.bowler}
        score={props.score.runs.batsman}
        ball={props.score.ball}
      />
    );
}

function CustomCard(props) {
  const classes = useStyles();
  return (
    <Card key={props.ball} variant="outlined" raised={true} className="card">
      <CardContent className="card-content">
        <Avatar variant="rounded" className={props.class}>
          {props.score}
        </Avatar>

        <Typography className={classes.title} variant="h4">
          {" "}
          {props.ball} {props.bowler} to {props.batsman}{" "}
          {props.extras !== undefined ? "(" + props.extras + ")" : null}
        </Typography>
      </CardContent>
    </Card>
  );
}
