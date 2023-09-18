import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { logout } from "../firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useMovie } from "../context/Movies"


  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}&query=`
  const baseUrl = 'https://api.themoviedb.org/3'
  const movieUrl = `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_MOVIE_APP_KEY}`

  const Navbar = () => {
  const { currentUser } = useAuth();
  const {setMovies} = useMovie()
  const navigate = useNavigate();
  const [search, setSearch] = useState('')


  const logoutHandler = ()=> {
    logout();
    navigate('/login')
  }


  const searchHandle = async(e)=>{
    e.preventDefault()
    // Validation
    if(search.trim()===''){
      toast.error('Please Enter A Movie Name')
      return
    }

    const res = await axios(`${searchUrl}${search}`)

    if(res.data.results.length>0){
      setMovies(res.data.results)
      navigate('/')
    } else{
      toast.error('No Movies With This Name')
    }
    
  }

  const fetchMovies = async()=>{
    const res = await axios.get(movieUrl)
    setMovies(res.data.results)
    navigate('/')
  }


  const handleInput = async(e)=> {
    if(e.target.value==='') {
    fetchMovies()
    console.log('Trending movies fetch')
  }
    setSearch(e.target.value)
  }
  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-dark"
      style={{ backgroundColor: "#070707" }}
    >
      <div className="container flex-column flex-md-row">
        <div className="navbar-brand" onClick={fetchMovies} style={{cursor:'pointer'}}>
          <h4 className="text-danger">Second Movie App</h4>{" "}
        </div>

        <div className="d-flex align-items-center flex-column flex-md-row w-100">
          {currentUser ? (
            <>
              <form className="d-flex mb-2 mb-md-0">
                <input
                  type="search"
                  className="form-control me-2"
                  style={{flex:1}}
                  placeholder="Search"
                  value={search}
                  onChange={handleInput}
                />
                <button className="btn btn-outline-success" onClick={searchHandle}>Search</button>
              </form>

              <h4 className="text-capitalize d-inline-block text-warning mx-2"> { currentUser?.displayName } </h4>
              <button className="btn btn-outline-light" onClick={logoutHandler}>Logout</button>
            </>

          ) : (
            <div className="ms-md-auto">
              <button
                className="btn btn-outline-info text-light ms-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-success text-light ms-2"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
