import {Link} from "@remix-run/react";
import Tablerow from "../helper/tablerow";
import indexcss from "../helper/index.css";
import { useLoaderData } from "@remix-run/react";
import {findallfromdatabase} from "../server/routes.server";
export const links = () =>{
return[
    {
      rel:"stylesheet",
      href:indexcss,
    },
  ]
}

export const loader = async () => {
  const data = await findallfromdatabase();
  return data;
};

export default function Index() {

  const leaderboarddata = useLoaderData();

  if(leaderboarddata){
    return (
      <div className="index_div">
          <p className="index_title">Movie Mystery</p>
          <p className="index_description">Are you a movie buff? Do you want to test your knowledge of movies? Then take a quiz at Movie Mystery - a trivia game where you can test your movie knowledge and Their are 10 question. Can you guess the plot before time runs out and be on top of leaderboard?</p>
          <Link className="index_link" to="game">Let's Play</Link>
          <p className="index_leaderboard_title">Leaderboard</p>
          <table className="GeneratedTable">
          <thead>
            <tr>
              <th>Position</th>
              <th>Points</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {leaderboarddata.map((data, i) => (
              <Tablerow key={i} data={data} pos={i+1}/>
            ))}
          </tbody>
        </table>
        <p className="index_api_p">Api website is build with the help of <a className="index_api_a" href="https://opentdb.com/">Open Trivia Database</a> Api ..</p>
      </div>
    );
  }
}
