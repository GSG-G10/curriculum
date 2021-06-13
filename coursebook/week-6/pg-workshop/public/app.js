fetch("/users")
  .then(res => res.json())
  .then(users => {
    const table = document.getElementById("users-table");
    users.forEach(user => {
      const row = document.createElement("tr");
      const name = document.createElement("td");
      name.textContent = user.name;
      row.appendChild(name);
      const location = document.createElement("td");
      location.textContent = user.location;
      row.appendChild(location);
      table.appendChild(row);
    });
  });
