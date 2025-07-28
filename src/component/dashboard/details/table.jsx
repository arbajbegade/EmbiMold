import React from 'react'

const DetailsTable = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return <p>No data available</p>;
    const dataTable = [
    { id: 1, name: "Ps No", quantity: '23', process: "cavity", time: 7 },
    { id: 2, name: "Loading Time", quantity: '433', process: "Running cavity", time: 12 },
    { id: 3, name: "Cycle Time", quantity: '232', process: "Mold Temprature", time: 2 },
    { id: 4, name: "Electricity", quantity: "ok", process: "Month Target", time: 4 },
    { id: 5, name: "Shift Target", quantity: '321', process: "Month Actual", time: 6 },
    { id: 6, name: "Shift Actual", quantity: '544', process: "Month Rejected", time: 2 },
    { id: 7, name: "Shift Reject", quantity: '343', process: "cavity", time: 1 },
  ];

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([sectionKey, sectionValue]) => (
        <div key={sectionKey} className="border rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold capitalize border-b pb-2 mb-4">
            {sectionKey}
          </h2>

          <table className="w-full text-left border-collapse">
            <tbody>
              {Object.entries(sectionValue)
                .filter(([key]) =>
                  sectionKey === "plan"
                    ? key !== "prod_history" && key !== "rejection_history"
                    : true
                )
                .map(([key, value]) => (
                  <tr key={key} className="border-t">
                    <td className="py-2 pr-4 font-medium capitalize">{key}</td>
                    <td className="py-2">
                      {typeof value === "object" && !Array.isArray(value) ? (
                        <ul className="list-disc pl-4">
                          {Object.entries(value).map(([subKey, subVal]) => (
                            <li key={subKey}>
                              <strong>{subKey}:</strong> {subVal.toString()}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        value.toString()
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
        </div>
      ))}
       <table className="w-full table-auto border border-gray-300">
        <tbody>
          {dataTable.map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.name}</td>
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.quantity}</td>
              <td className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.process}</td>
              <td className="p-3 text-sm text-gray-700">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsTable;
