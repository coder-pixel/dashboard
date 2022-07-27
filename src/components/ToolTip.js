import React from 'react'

const ToolTip = ({ showTooltip, tooltipData }) => {
  console.log(tooltipData)

  // const percWidth = 
  // console.log(tooltipData.consumed / tooltipData.target)
  return (
    <div className={`${showTooltip ? "tooltip" : "tooltip_hide"}`}>
      {tooltipData.map((itm => (
        <div className={`item item${itm.id}`}>
          <div className="item_details">
            <h4>{itm.name}</h4>
            <h4>{itm.target}g</h4>
          </div>
          <div className="item_meter">
            {console.log((itm.consumed / itm.target) * 100)}
            <div className="item_meter_filled" style={{width: `${(itm.consumed / itm.target) * 100}%`}}></div>
            <span>{itm.consumed}g</span>
          </div>
        </div>
      )))}
    </div>
  )
}

export default ToolTip