const subjectURL = "/api/opened-subjects?semesterId=d0496450-a975-4f4c-99fb-9d77ebf4ef09";
const tableBody = document.querySelector("#subject-table tbody");
const lastUpdatedText = document.getElementById("last-updated");

async function fetchSubjects() {
  try {
    const res = await fetch(subjectURL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    tableBody.innerHTML = "";
    data.forEach((sub) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${sub.subject.name}</td><td>${sub.current}</td>`;
      tableBody.appendChild(row);
    });

    const now = new Date();
    lastUpdatedText.innerText = `마지막 갱신: ${now.toLocaleString()}`;
  } catch (e) {
    console.error("📛 과목 불러오기 실패:", e);
    lastUpdatedText.innerText = `📛 불러오기 실패: ${new Date().toLocaleString()}`;
  }
}

fetchSubjects();
setInterval(fetchSubjects, 5 * 60 * 1000);
