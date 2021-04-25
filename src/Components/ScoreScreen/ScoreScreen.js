import React, { useState, useEffect } from "react";
import ScoreCard from "../ScoreCard/ScoreCard";
import Box from "@material-ui/core/Box";


export default function ScoreScreen(props) {
  const [scoreSheet, setScoreSheet] = useState([]);

  useEffect(() => {
    if (scoreSheet != props.scoreSheet) setScoreSheet(props.scoreList);
  }, [props.scoreList]);

  return (
    <div>
      {scoreSheet
        .map((score) => (
          <Box key={score.ball} display="flex" justifyContent="center">
            
            <ScoreCard
              score={score}
            ></ScoreCard>
            
          </Box>
        ))
        .reverse()}
    </div>
  );
}
