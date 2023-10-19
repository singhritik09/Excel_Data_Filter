import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";

import * as XLSX from 'xlsx'

function Home() {
    //Onchange states
    const [excelFile, setExcelFile] = useState(null)
    const [typeError, setTypeError] = useState(null)

    //Submit state
    const [excelData, setExcelData] = useState(null)

    //onchange event
    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }

    //Submit Event
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 100));
        }
    }

    return (
        <div className="container bg-gray-100 relative flex flex-col justify-center">
            <Navbar />
            {/* relative flex flex-col justify-center min-h-screen overflow-hidden */}
            <div className="container mx-auto">
                <h2>Upload Excel File</h2>
                <form className="mx-auto mt-6 bg-gray-300 w-1/2" onSubmit={handleFileSubmit}>
                    {/* <input type="file" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-purple-600 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/> */}
                    <input type="file" className="form-control " required onChange={handleFile} />
                    <button type="submit" className="mt-4 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:bg-green-600">Upload</button>
                    {typeError && (
                        <div className="alert alert-danger" role="alert">{typeError}</div>
                    )}
                </form>

            </div>

            <div className="container ">
                {excelData ? (
                    <div className="mx-auto">
                        <table className="table-auto">

                            <thead>
                                <tr>
                                    {Object.keys(excelData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {excelData.map((individualExcelData, index) => (
                                    <tr key={index}>
                                        {Object.keys(individualExcelData).map((key) => (
                                            <td key={key}>{individualExcelData[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                ) : (
                    <div>No File is uploaded yet!</div>
                )}
            </div>


        </div>
    );
}

export default Home;