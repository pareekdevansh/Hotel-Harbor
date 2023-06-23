import React from 'react'
import { useParams } from "react-router-dom";


function Bookingscreen({ match }) {
    const { roomid } = useParams();
    return (
        <div>
            <h1>Bookingscreen</h1>
            <p>Room id is: {roomid}</p>
        </div>
    )
}

export default Bookingscreen
