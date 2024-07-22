import React from "react";
import html2pdf from "html2pdf.js";

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
    const formattedData = formatData(data);
    downloadPdfFile(formattedData);
  };

  const formatData = (data) => {
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
        <div class="container mx-auto border border-black p-5 w-11/12">
          <div class="text-center mb-5">
            <img src="https://png.pngtree.com/png-clipart/20230426/original/pngtree-school-logo-design-template-png-image_9104626.png" alt="Logo" class="h-24 w-24" />
            <h1 class="text-2xl font-bold my-2">CENTRAL BOARD OF HIGHER EDUCATION /CLONE</h1>
            <h3 class="text-xl">Central Hindu School</h3>
          </div>
          <p><strong>Student Name:</strong> ${data.studentName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Exam-Name:</strong> ${data.examName}</p>
          <table class="w-full border-collapse border border-black mt-3">
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

    data.subjects.forEach((subject, index) => {
      formattedText += `
              <tr
                key=${index}
                class="border-b border-gray-200 hover:bg-gray-200 w-full ${
                  index % 2 === 0 ? "bg-slate-50" : "bg-white"
                }"
              >
                <td class="border border-black text-center p-2">${
                  subject.code
                }</td>
                <td class="border border-black px-2 py-1">${subject.name}</td>
                <td class="border border-black px-2 py-1">${
                  subject.minMarks
                }</td>
                <td class="border border-black px-2 py-1">${
                  subject.maxMarks
                }</td>
                <td class="border border-black px-2 py-1">${
                  subject.obtainedMarks
                }</td>
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
          <div class="text-center mt-2">
            <p><strong>Result:</strong> ${data.result}</p>
          </div>
        </div>
      </body>
    </html>`;

    return formattedText;
  };

  const downloadPdfFile = (formattedData) => {
    const element = document.createElement("div");
    element.innerHTML = formattedData;
    html2pdf().from(element).save("marksheet.pdf");
  };

  return (
    <div>
      <button onClick={fetchDataAndExport}>Export Data as PDF</button>
    </div>
  );
};

export default Printpaper;
