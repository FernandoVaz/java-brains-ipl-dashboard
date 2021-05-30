import { React, useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    const {teamName} = useParams();
    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
            };
            fetchTeams();
        }, [teamName] //[] call this on the page load //teamName the use effect runs and then fetch the data
    );


  if(!team || !team.teamName) {
      return <h1>Team not found</h1>
  }
    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>
            
            <div className="win-loss-section">
                Win / Losses
                <PieChart
                data={[
                    {title : 'Wins', value: team.totalWins, color: 'rgb(30, 82, 30)'},
                    {title : 'Losses', value: team.totalMatches - team.totalWins, color: 'rgb(192, 55, 55)'}
                ]}
                />
            </div>
            
            <div className="match-detail-section">
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            </div>
            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName} match={match}/>)}
            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More</Link>
            </div>
        </div>
  );
}