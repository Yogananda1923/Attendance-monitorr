class StudentAttendance extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <div id="students">
        <button class="attendance-btn" onclick="markAttendance('Alice')">Mark Alice</button>
        <button class="attendance-btn" onclick="markAttendance('Bob')">Mark Bob</button>
        <button class="attendance-btn" onclick="markAttendance('Charlie')">Mark Charlie</button>
        <div class="status" id="status">Waiting for attendance...</div>
      </div>
    `;
  }
}

customElements.define('student-attendance', StudentAttendance);

// WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

function markAttendance(name) {
  const message = { student: name, time: new Date().toISOString() };
  socket.send(JSON.stringify(message));
  document.getElementById('status').innerText = `Attendance marked for ${name}`;
}

socket.onmessage = (event) => {
  console.log('Server:', event.data);
};
