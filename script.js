{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const subjectURL = "https://real-time-registration.vercel.app/api/opened-subjects?semesterId=d0496450-a975-4f4c-99fb-9d77ebf4ef09";\
const tableBody = document.querySelector("#subject-table tbody");\
const lastUpdatedText = document.getElementById("last-updated");\
\
async function fetchSubjects() \{\
  try \{\
    const res = await fetch(subjectURL);\
    const data = await res.json();\
\
    tableBody.innerHTML = "";\
    data.forEach((sub) => \{\
      const row = document.createElement("tr");\
      row.innerHTML = `<td>$\{sub.subject.name\}</td><td>$\{sub.current\}</td>`;\
      tableBody.appendChild(row);\
    \});\
\
    const now = new Date();\
    lastUpdatedText.innerText = `\uc0\u47560 \u51648 \u47561  \u44081 \u49888 : $\{now.toLocaleString()\}`;\
  \} catch (e) \{\
    console.error("\uc0\u55357 \u56539  \u44284 \u47785  \u48520 \u47084 \u50724 \u44592  \u49892 \u54056 :", e);\
    lastUpdatedText.innerText = `\uc0\u55357 \u56539  \u48520 \u47084 \u50724 \u44592  \u49892 \u54056 : $\{new Date().toLocaleString()\}`;\
  \}\
\}\
\
fetchSubjects();\
setInterval(fetchSubjects, 5 * 60 * 1000);}