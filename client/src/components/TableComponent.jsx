// AttendanceTableComponent.jsx
import React from "react";
import themeClasses from "../utils/tableThemeClasses";

const TableComponent = ({
    theme,
    title,
    data,
    pageLimit,
    setPageLimit,
    currentPage,
    setCurrentPage,
    resultsPerPage,
}) => {
    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    // Array to ensure the number of displayed rows is always equal to the pageLimit
    const rowsToDisplay = [...data, ...Array(Math.max(pageLimit - data.length, 0)).fill({})];

    const currentTheme = themeClasses[theme] || themeClasses.indigo;

    const handleResultsPerPage = (e) => {
        setPageLimit(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-md w-full max-w-3xl mt-8 mb-2">
            <div className="flex justify-between items-center mb-4">
                <div className="flex-grow"></div>
                <h2
                    className={`text-3xl font-extrabold text-center ${currentTheme.text} flex-grow`}
                >
                    {title}
                </h2>
                <div className="flex items-center ">
                    <select
                        value={pageLimit}
                        onChange={handleResultsPerPage}
                        className="border border-gray-300 rounded-md p-1 text-sm mr-2"
                    >
                        {resultsPerPage.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm font-medium text-gray-700">results per page</span>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300 mt-10">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-sm font-medium text-gray-700 text-center">
                            Class Date
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-gray-700 text-center">
                            Class Time
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-gray-700 text-center">
                            Class
                        </th>
                        <th className="py-2 px-4 border-b text-sm font-medium text-gray-700 text-center">
                            Coach
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rowsToDisplay.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                                {row.class_date || "--"}
                            </td>
                            <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                                {row.class_time || "--"}
                            </td>
                            <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                                {row.class_category || "--"}
                            </td>
                            <td className="py-2 px-4 border-b text-sm text-gray-600 text-center">
                                {row.coach_name || "--"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="mt-10 flex justify-between items-center">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        currentTheme.bg
                    } ${currentTheme.hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        currentTheme.focusRing
                    } ${currentPage === 1 ? "opacity-50" : ""}`}
                >
                    Prev Page
                </button>
                <div className={`py-2 px-4 text-sm font-medium ${currentTheme.text}`}>
                    Page {currentPage}
                </div>
                <button
                    onClick={nextPage}
                    disabled={data.length < pageLimit || !data.length}
                    className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        currentTheme.bg
                    } ${currentTheme.hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        currentTheme.focusRing
                    } ${data.length < pageLimit || !data.length ? "opacity-50" : ""}`}
                >
                    Next Page
                </button>
            </nav>
        </div>
    );
};

export default TableComponent;
