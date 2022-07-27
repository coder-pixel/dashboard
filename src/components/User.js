import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { PieChart } from 'react-minimal-pie-chart';
import ToolTip from './ToolTip';

const User = ({ single_user }) => {
  const [currTargetSteps, setCurrTargetSteps] = useState(single_user.stepsTarget / 1000)
  const [currTargetCalories, setCurrTargetCalories] = useState(single_user.calorieTarget / 1000)
  const [feedback, setFeedback] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // console.log(single_user)
  const percentage = (100 - ((single_user.stepsTarget - single_user.stepsWalked) / single_user.stepsTarget) * 100);

  const tooltip_data = [
    {
      id: 1,
      name: "Protein",
      consumed: single_user.proteinConsumed,
      target: single_user.proteinTarget,
    },
    {
      id: 2,
      name: "Carbs",
      consumed: single_user.carbConsumed,
      target: single_user.carbTarget,
    },
    {
      id: 3,
      name: "Fats",
      consumed: single_user.fatConsumed,
      target: single_user.fatTarget,
    },
  ]

  // to increment/decrement5 steps by 500
  const incre_steps = () => {
    setCurrTargetSteps(prev => prev + .5)
  }
  const decre_steps = () => {
    if (currTargetSteps > 0) setCurrTargetSteps(prev => prev - .5)
  }

  // to increment/decrement5 calories by 100

  const incre_calories = () => {
    setCurrTargetCalories(prev => {
      console.log(prev)
      return Math.round((prev + .1) * 10) / 10
    })
  }
  const decre_calories = () => {
    if (currTargetCalories > 0) setCurrTargetCalories(prev => {
      console.log(prev)
      return Math.round((prev - .1) * 10) / 10
    })
  }


  const update_feedback = () => {
    let curr_date = new Date()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let currMonth = curr_date.getMonth()
    let currMonth_new = months[currMonth - 1]
    let currDay = curr_date.getDate()

    let date = `${currDay} ${currMonth_new}`
    console.log(date)


    if (single_user.scheduledDate == date) setFeedback(true)
  }

  useEffect(() => {
    update_feedback()
  }, [])


  return (
    <div className='user'>
      <div className="user_details">
        <div className="logo">
          <img src={`./images/${single_user.img}`} alt="" />
        </div>
        <div className="name">
          <h2>{single_user.name}</h2>
          <h4>{single_user.email}</h4>
        </div>
      </div>

      <div className="steps_details">

        <div className="progressBar">
          <CircularProgressbarWithChildren
            className='gg'
            value={percentage}
            styles={buildStyles({
              pathColor: `rgb(127, 209, 140, ${percentage / 100})`,
              trailColor: '#fff',
              strokeLinecap: 'butt',
            })}
          >
            <h2 style={{ fontSize: 12, textAlign: "center", lineHeight: 1 }}>
              {single_user.stepsWalked}
              <br />
              <span style={{ fontSize: 10, fontWeight: 100 }}>Walked</span>
            </h2>
          </CircularProgressbarWithChildren>
        </div>

        <div className="counter">
          <div className="controls" onClick={() => incre_steps()}><i class="fa-solid fa-plus"></i></div>
          <h2 className="target">{currTargetSteps}K <span>target</span></h2>
          <div className="controls" onClick={() => decre_steps()}><i class="fa-solid fa-minus"></i></div>
        </div>
      </div>

      <div className="workout_details">
        <div className="workout_dates">
          <h4><i class="fa-solid fa-user-check"></i>{single_user.performedDate}</h4>
          <h4 className={feedback ? "more_info_danger" : null}><i class="fa-solid fa-user-check"></i>{single_user.scheduledDate}</h4>
        </div>

        <Link to={`/workout/${single_user.userId}`}>
          <div className={`more_info ${feedback ? "more_info_danger" : null}`}>
            {feedback ? <i class="fa-solid fa-exclamation"></i> : <i class="fa-solid fa-angle-right"></i>}
          </div>
        </Link>
      </div>

      <div className="nutrition_details">
        <div className="chartBar" onMouseEnter={() => setShowTooltip(!showTooltip)} onMouseLeave={() => setShowTooltip(!showTooltip)}>
          <PieChart
            data={[
              { title: 'One', value: 10, color: '#03C7FC' },
              { title: 'Two', value: 15, color: '#F45C84' },
              { title: 'Three', value: 20, color: '#F5C90F' },
            ]}
            lineWidth={15}
          />
          <ToolTip showTooltip={showTooltip} tooltipData={tooltip_data} />
        </div>
        <div className="counter">
          <div className="controls" onClick={() => incre_calories()}><i class="fa-solid fa-plus"></i></div>
          <h2 className="target">{currTargetCalories}K <span>target</span></h2>
          <div className="controls" onClick={() => decre_calories()}><i class="fa-solid fa-minus"></i></div>
        </div>


        <Link to={`/nutrition/${single_user.userId}`}>
          <div className="more_info">
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </Link>
      </div>

      <div className="notification">
        <div className="notification_logo" onClick={() => alert("Notification turned on!")}>
          <i class="fa-regular fa-bell"></i>
        </div>
      </div>
    </div>
  )
}

export default User