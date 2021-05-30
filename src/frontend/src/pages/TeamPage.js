import { React, useEffect, useState } from 'react';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    
    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch('http://localhost:8080/team/Rajasthan Royals');
                const data = await response.json();
                setTeam(data);
            };
            fetchMatches();
        }, [] //call this on the page load
    );


  if(!team || !team.teamName) {
      return <h1>Team not found</h1>
  }
  return (
    <div className="TeamPage">
        <h1>{team.teamName}</h1>
        <h3>Latest Matches</h3>
        <MatchDetailCard match={team.matches[0]}/>
        {team.matches.slice(1).map(match => <MatchSmallCard match={match}/>)}

    </div>
  );
}