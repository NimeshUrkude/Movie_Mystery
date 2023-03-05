import { useState } from "react";
import { useLoaderData } from "react-router";
import gamecss from "../helper/game.css";
import Questionbox from "../helper/questionbox";
import {Link , useNavigate } from "@remix-run/react";
import  {addnewdatatodatabase} from "../server/routes.server";
import { redirect } from "@remix-run/node";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: gamecss,
    },
  ];
};

export const loader = async () => {
  try {
    const response = await fetch(process.env.API_URL);
    const data = await response.json();
    const temp = await data["results"];

    let test = [];
    for(let i=0;i<10;i++){
      let q = temp[i].question;
      let o = [...temp[i].incorrect_answers, temp[i].correct_answer].sort(() => Math.random() - 0.5);
      let a = temp[i].correct_answer;
      let va = { q, o, a };
      test.push(va);
    }
    return { full: test };
  } catch (e) {
    return { full: null };
  }
};

export async function action({ request, response }) {
  const { board } = await request.json();
  const checkifsaved = await addnewdatatodatabase(board);

  if(checkifsaved.status === "201"){
    return ("Data Saved");
  }
}  

export default function Game() {
  const { full } = useLoaderData();

  const [tempname,settempname] = useState(null);
  const [name,setname] = useState(null);
  const [score, setscore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showresult,setresult] = useState(false);

  let navigate = useNavigate();

  function eback(check){
    if(check === full[current].a){
      setscore(score+1);
    }
    setCurrent(current+1);
    if(current===9){
      setresult(true);
    }
  }

  function savetoboard(){
    let board = {
      boardname: name,
      boardscore: score,
    };
    fetch("/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({board}),
    });
    
    navigate("/");
  }

  if(name === null){
    return (
      <div className="game_div">
        <div className="game_inner_div">
          <p className="game_title">Enter Player Name</p>
          <input maxLength={15} minLength={3} className="game_input" type="text"
            onChange={(e) => {
              if (e.target.value.length > 3 && e.target.value.length < 16) {
                settempname(e.target.value);
              }
            }}
          />
          <button className="game_btn" onClick={()=>{setname(tempname);}}>Submit</button>
        </div>
      </div>
    );
  }

  if (!full) {
    return (
      <div className="game_div">
        <div className="game_inner_div">
         <p className="game_title">Loading...</p>
      </div>
    </div>
    );
  }

  if(showresult === true){
    return(
      <div className="game_div">
        <div className="game_inner_div">
          <p className="game_title">Final Score : {score}</p>
          <Link className="game_link" to="/">Back to Home</Link>
          <button className="game_link game_link_btn" onClick={savetoboard}>Save Score</button>
        </div>
      </div>
    );
  }

  return(
    <div className="game_div">
      <div className="game_inner_div game_inner_div_addon">
        <p className="game_name">Player Name : {name}</p>
        <p className="game_currentscore">Current Score : {score}</p>
        <Questionbox ques = {full[current].q} opti={full[current].o} cback={eback}/>
      </div>
    </div>
  );
}
