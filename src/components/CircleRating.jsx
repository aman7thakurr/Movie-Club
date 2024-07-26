
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Styles from  "../Styles/circleRating.module.css";

const CircleRating = ({vote_average}) => {
  
    return (
    <div className={Styles.circleRating}>
      <CircularProgressbar
        value={vote_average}
        maxValue={10}
        text={vote_average}
        styles={buildStyles({
          pathColor: vote_average < 5 ? "red" : vote_average < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default CircleRating;