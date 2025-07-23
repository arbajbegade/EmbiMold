import React from 'react'
import MoldDetails from './details'

const MoldList = () => {
  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Mold Details</h2>
      <MoldDetails />
    </div>
  )
}

export default MoldList