import React from 'react'

const DetailsTable = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return <p>No data available</p>;

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
    </div>
  );
};

export default DetailsTable;
