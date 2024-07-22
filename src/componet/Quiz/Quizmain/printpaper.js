import React from "react";

const Printpaper = () => {
  const data = {
    studentName: "SUDHANSHU PANDEY",
    email: "Mr. ANAND PANDEY",
    date: "1994-05-24",
    examName: "Male",
    subjects: [
      {
        code: "101",
        name: "Hindi",
        minMarks: 35,
        maxMarks: 100,
        obtainedMarks: 85,
        remark: "D",
      },
      {
        code: "102",
        name: "English",
        minMarks: 35,
        maxMarks: 100,
        obtainedMarks: 86,
        remark: "D",
      },
      {
        code: "103",
        name: "Maths",
        minMarks: 35,
        maxMarks: 100,
        obtainedMarks: 87,
        remark: "D",
      },
      {
        code: "104",
        name: "Physics",
        minMarks: 35,
        maxMarks: 100,
        obtainedMarks: 88,
        remark: "D",
      },
      {
        code: "105",
        name: "Chemistry",
        minMarks: 35,
        maxMarks: 100,
        obtainedMarks: 89,
        remark: "D",
      },
    ],
    totalMarks: 435,
    result: "Pass",
  };
  const fetchDataAndExport = async () => {
    // Step 1: Fetch data from the API

    // Step 2: Format the data to match demo.txt
    const formattedData = formatData(data);

    // Step 3: Create a blob and trigger download
    downloadTxtFile(formattedData);
  };

  const formatData = (data) => {
    // Assuming data is an array of questions and options
    let formattedText = `
  
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Marksheet</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body class="font-sans">
        <div class="container mx-auto border border-black p-5 max-w-lg">
          <div class="text-center mb-5">
            <img src="logo.png" alt="Logo" class="w-24 h-24 mx-auto" />
            <h1 class="text-2xl font-bold my-2">
              CENTRAL BOARD OF HIGHER EDUCATION /CLONE
            </h1>
            <h3 class="text-xl">Central Hindu School</h3>
          </div>
          <p><strong>Student Name:</strong> ${data.studentName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Exam-Name:</strong> ${data.examName}</p>
  
          <table class="w-full border-collapse border border-black mt-5">
            <thead>
              <tr>
                <th class="border border-black px-2 py-1">Subject Code</th>
                <th class="border border-black px-2 py-1">Subject Name</th>
                <th class="border border-black px-2 py-1">Min Marks</th>
                <th class="border border-black px-2 py-1">Max Marks</th>
                <th class="border border-black px-2 py-1">Marks Obtained</th>
                <th class="border border-black px-2 py-1">Remark</th>
              </tr>
            </thead>
            <tbody>`;

    data.subjects.forEach((subject) => {
      formattedText += `
              <tr>
                <td class="border border-black px-2 py-1">${subject.code}</td>
                <td class="border border-black px-2 py-1">${subject.name}</td>
                <td class="border border-black px-2 py-1">${subject.minMarks}</td>
                <td class="border border-black px-2 py-1">${subject.maxMarks}</td>
                <td class="border border-black px-2 py-1">${subject.obtainedMarks}</td>
                <td class="border border-black px-2 py-1">${subject.remark}</td>
              </tr>`;
    });

    formattedText += `
              <tr>
                <td colspan="4" class="border border-black px-2 py-1">
                  <strong>Total</strong>
                </td>
                <td class="border border-black px-2 py-1"><strong>${data.totalMarks}</strong></td>
                <td class="border border-black px-2 py-1"></td>
              </tr>
            </tbody>
          </table>
          <div class="text-center mt-5">
            <p><strong>Result:</strong> ${data.result}</p>
          </div>
        </div>
      </body>
    </html>`;

    return formattedText;
  };

  const downloadTxtFile = (formattedData) => {
    const blob = new Blob([formattedData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "demo.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={fetchDataAndExport}>Export Data</button>
    </div>
  );
};

export default Printpaper;
