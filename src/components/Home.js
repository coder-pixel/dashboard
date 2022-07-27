import React from 'react'
import User from './User';

import { data } from "../data";
console.log(data[0].name)

const Home = () => {
  return (
    <div className="dashboard_container">
      <div className="dashboard">
        <div className="dashboard_titles">
          <h2><i class="fa-solid fa-person-walking"></i>Steps</h2>
          <h2><i class="fa-solid fa-dumbbell"></i>Workout</h2>
          <h2><i class="fa-solid fa-bowl-food"></i>Nutrition</h2>
        </div>
        <div className="dashboard_items">
          {data.map(single_user => (
            <User key={single_user.userId} single_user={single_user} />
          ))}
        </div>
      </div>


      
    </div>
  )
}

export default Home