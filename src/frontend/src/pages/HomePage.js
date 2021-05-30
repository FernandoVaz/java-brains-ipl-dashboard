import { React, useEffect, useState } from 'react';
import { TeamTile } from '../components/TeamTile';
import {useParams, Link} from 'react-router-dom';

import './HomePage.scss';

export const HomePage = () => {

    const [teams, setTeam] = useState([]);
    useEffect(
        () => {
            const fetchAll = async () => {
                const response = await fetch(`http://localhost:8080/team`);
                const data = await response.json();
                setTeam(data);
            };
            fetchAll();
        }, [] //[] call this on the page load //teamName the use effect runs and then fetch the data
    );


  if(!teams) {
      return <h1>Teams not found</h1>
  }
  return (
    <div className="HomePage">
        <div className="header-section">
            <h1 className="app-name">Java Brains IPL Dashboard tutorial</h1>
        </div>

        <div className="team-grid">
            { teams.map(team => <TeamTile teamName={team.teamName} />)}
        </div>
        
    </div>
  );
}