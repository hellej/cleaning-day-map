import React from 'react'



const Fly = ({ map }) => {
  return (
    <div>
      <button onClick={() => map.flyTo({ center: [24.9698, 60.2178], zoom: 13 })} > Fly </button>
    </div>
  )
}


export default Fly