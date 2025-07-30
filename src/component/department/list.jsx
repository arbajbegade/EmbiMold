import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import secureApiFetch from "../../services/apiFetch";

const DepartmentList = () => {
  const [formData, setFormData] = useState({ department_name: '' });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    secureApiFetch("/api/v1/departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => {
        console.error("Machine name fetch error:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await secureApiFetch("/api/v1/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit Department Name");
      }

      const result = await response.json();
      console.log("✅ Submitted Data:", result);
      toast.success('Department Name Submitted Successfully!');
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong while submitting!");
    }
  };

  const handleDelete = async (departmentId) => {
    try {
      const response = await secureApiFetch("/api/v1/departments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ department_id: departmentId })
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || "Failed to delete Department");
      }

      const result = await response.json();
      toast.success("Department Name deleted successfully!");

    } catch (error) {
      console.error("Deletion error:", error);
      toast.error(error.message || "Something went wrong while deleting!");
    }
  };


  return (
    <div className="my-2 pt-4 w-full h-full p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Department Details</h2>

      {/* Input and button in one row */}
      <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department Name
          </label>
          <input
            type="text"
            name="department_name"
            value={formData.departmentName}
            onChange={handleChange}
            className="w-64 border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="Cbutton mt-6">
          Submit
        </button>
      </form>

      {/* Table with dummy data */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border text-center">Id</th>
            <th className="px-4 py-2 border text-center">Department Name</th>
            <th className="px-4 py-2 border text-center">Department Type</th>
            <th className="px-4 py-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{dept.department_id}</td>
              <td className="px-4 py-2 border">{dept.department_name}</td>
              <td className="px-4 py-2 border">{dept.department_type}</td>
              <td className="px-4 py-2 border">
                <button onClick={() => handleDelete(dept.department_id)} className="text-red-600 hover:text-red-700 cursor-pointer">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
