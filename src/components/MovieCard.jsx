import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import styles from "../styles/MovieCard.module.css";
import noImage from "../images/noimage.jpg";

const MovieCard = ({ movie }) => {
  const { title, poster_path, overview, vote_average, id } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w1280`;

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const setVoteColor = (vote)=>{
    if(vote>=8) return 'green'
    else if(vote>=6.5) return 'goldenrod'
    else return 'red'
  }

  return (
    <div className={styles.movie} onClick={() => navigate(`/details/${id}`)}>
      {poster_path && (
        <img
          src={`${imgUrl}${poster_path}`}
          alt=""
        />
      )}
      {!poster_path && <img src={noImage} />}
      <div className="text-center p-2 text-white">
        <h5>{title}</h5>
        {currentUser && <span className={styles.vote} style={{backgroundColor: setVoteColor(vote_average)}}>
            {vote_average}
        </span>}
      </div>
      <div className={styles.overview}>
        <h2>OverView</h2>
        <h5>{title}</h5>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
