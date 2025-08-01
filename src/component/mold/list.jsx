import React, { useEffect, useState } from 'react'
import MoldDetails from './details'
import secureApiFetch from '../../services/apiFetch';

const MoldList = () => {
   const [moldDetails, setMoldDetails] = useState([]);

  useEffect(() => {
    secureApiFetch("/api/v1/mold-details", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMoldDetails(data.data);
        console.log("Mold details fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Machine name fetch error:", error);
      });
  }, []);
  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
       <h2 className="text-lg font-semibold mb-1">Mold Details</h2>
      <MoldDetails moldDetails={moldDetails}/>
    </div>
  )
}

export default MoldList