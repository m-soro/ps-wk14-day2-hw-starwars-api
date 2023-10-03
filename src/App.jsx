import "./App.css";
import { getData } from "../services/sw-api";
import { useState, useEffect } from "react";
import Cards from "./components/Cards";
import Modal from "./components/Modal";

function App() {
  const [data, setData] = useState(null);
  const [shipArray, setShipArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  // ATTEMPT TO PAGINATE
  // const [resultsArray, setResultsArray] = useState([data]);

  useEffect(() => {
    setData(getData("https://swapi.dev/api/starships/"));
  }, []);

  const handleClick = () => {
    console.log("Clicked", isShown);
    setIsShown((current) => !current);
  };

  // ATTEMPT TO PAGINATE
  // useEffect(() => {
  //   setResultsArray((resultsArray) => [...resultsArray, data]);
  // }, [data]);

  const getNextSet = () => {
    try {
      data.then((data) => {
        if (data.next) {
          setData(getData(data.next));
        } else {
          alert("Last page reached");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    try {
      data.then((data) => {
        if (data.previous) {
          setData(getData(data.previous));
        } else {
          alert("First page reached");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showData = () => {
    try {
      data.then((ships) => {
        setShipArray(ships.results);
        setIsLoading(false);
      });

      // ATTEMPT TO PAGINATE
      // console.log(resultsArray);
      // resultsArray.map((eachArray) => {
      //   if (eachArray !== null) {
      //     return eachArray.then((ships) => {
      //       return ships.results.map((ship, index) => {
      //         return <Cards key={index} ship={ship.name} />;
      //       });
      //     });
      //   }
      // });
      // console.log(resultsArray);
      return shipArray.map((ship, index) => {
        return <Cards key={index} ship={ship.name} />;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showLoading = () => {
    return (
      <dialog open className="loading-page">
        <article aria-busy="true">Loading... Please wait</article>
      </dialog>
    );
  };

  return (
    <div className="app container">
      {isShown && <Modal />}
      <h1>Star Wars</h1>
      <div>{isLoading ? showLoading() : <p></p>}</div>
      <div className="cards-container">
        {data !== null ? showData() : <p></p>}
      </div>
      <div className="button-container">
        <button className="outline" onClick={goBack}>
          Go Back
        </button>
        <button className="outline" onClick={getNextSet}>
          See more
        </button>
      </div>
    </div>
  );
}

export default App;
