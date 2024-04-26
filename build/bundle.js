(() => {
  const t = {
    stationIdInput: document.getElementById("station-id-input"),
    deleteButton: document.getElementById("delete-button"),
    addButton: document.getElementById("add-button"),
    formContainer: document.getElementById("form-container"),
    stationsList: document.getElementById("stations-list"),
  };
  let n,
    e = !1;
  async function o() {
    const t = await fetch("http://localhost:3000/stations");
    return (
      t.ok || console.log("Не вдалося отримати дані про станції"),
      (n = await t.json()),
      n
    );
  }
  async function i() {
    n || (await o());
    const e = t.stationsList;
    (e.innerHTML = ""),
      n.forEach((t) => {
        const n = document.createElement("div");
        n.classList.add("station"),
          (n.innerHTML = `\n                <p>ID: ${
            t.id
          }</p>\n                <p>Address: ${
            t.address
          }</p>\n                <p>Status: ${
            t.status ? "Active" : "Inactive"
          }</p>\n                <hr>\n            `),
          e.appendChild(n);
      });
  }
  (t.showDeleteFormButton = document.getElementById("show-delete-form")),
    t.showDeleteFormButton.addEventListener("click", async function () {
      if (e) (t.formContainer.innerHTML = ""), (e = !1);
      else {
        const n = document.createElement("div");
        (n.innerHTML =
          '\n                <input type="text" id="station-id-input" placeholder="Введіть ID станції">\n                <button id="delete-button">Видалити</button>\n            '),
          n.querySelector("#delete-button").addEventListener("click", () => {
            const e = n.querySelector("#station-id-input"),
              o = parseInt(e.value);
            isNaN(o)
              ? console.error("Некоректний ідентифікатор станції")
              : ((async function (t) {
                  const n = `http://localhost:3000/stations/${t}`;
                  (await fetch(n, { method: "DELETE" })).ok
                    ? (await i(),
                      console.log(`Станцію з ID ${t} успішно видалено`))
                    : console.log();
                })(o),
                t.formContainer.removeChild(n));
          }),
          t.formContainer.appendChild(n),
          (e = !0),
          await i();
      }
    }),
    (t.updateButton = document.getElementById("update-button")),
    t.updateButton.addEventListener("click", i),
    (t.showAddFormButton = document.getElementById("show-add-form")),
    t.showAddFormButton.addEventListener("click", async function () {
      if (e) (t.formContainer.innerHTML = ""), (e = !1);
      else {
        const n = document.createElement("div");
        (n.innerHTML =
          '\n                <input type="text" id="station-add-input" placeholder="Введіть назву станції">\n                <button id="add-button">Додати станцію</button>\n            '),
          n.querySelector("#add-button").addEventListener("click", async () => {
            const t = n.querySelector("#station-add-input"),
              e = t.value.trim();
            if (e) {
              const n = { address: e, status: !0 };
              await (async function (t) {
                const n = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(t),
                };
                (await fetch("http://localhost:3000/stations", n)).ok ||
                  console.log("Не вдалося додати станцію"),
                  await i();
              })(n),
                (t.value = "");
            } else console.error("Введіть назву станції");
          }),
          t.formContainer.appendChild(n),
          await i(),
          (e = !0);
      }
    }),
    (t.showEditFormButton = document.getElementById("show-edit-form")),
    t.showEditFormButton.addEventListener("click", async function (n, o) {
      if (e) (t.formContainer.innerHTML = ""), (e = !1);
      else {
        const n = document.createElement("div");
        (n.innerHTML =
          '\n                <input type="text" id="station-id-input" placeholder="Введіть ID станції">\n                <input type="text" id="station-address-input" placeholder="Введіть нову адресу станції">\n                <label for="station-status-input">Статус:</label>\n                <input type="checkbox" id="station-status-input">\n                <button id="edit-button">Редагувати</button>\n            '),
          (t.formContainer.innerHTML = ""),
          t.formContainer.appendChild(n),
          n
            .querySelector("#edit-button")
            .addEventListener("click", async () => {
              const t = n.querySelector("#station-id-input"),
                e = parseInt(t.value),
                o = n.querySelector("#station-address-input").value.trim(),
                s = n.querySelector("#station-status-input").checked;
              !isNaN(e) && o
                ? await (async function (t, n) {
                    const e = `http://localhost:3000/stations/${t}`,
                      o = {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(n),
                      };
                    (await fetch(e, o)).ok
                      ? (await i(),
                        console.log(`Станцію з ID ${t} успішно відредаговано`))
                      : console.log(
                          `Помилка при редагуванні станції з ID ${t}`
                        );
                  })(e, { address: o, status: s })
                : console.log("Некоректні дані для редагування станції");
            });
      }
    }),
    (t.showActiveStationsButton = document.getElementById(
      "show-active-stations"
    )),
    t.showActiveStationsButton.addEventListener("click", async function () {
      n || (await o());
      const e = t.stationsList;
      (e.innerHTML = ""),
        n
          .filter((t) => t.status)
          .forEach((t) => {
            const n = document.createElement("div");
            n.classList.add("station"),
              (n.innerHTML = `\n                <p>ID: ${
                t.id
              }</p>\n                <p>Address: ${
                t.address
              }</p>\n                <p>Status: ${
                t.status ? "Active" : "Inactive"
              }</p>\n                <hr>\n            `),
              e.appendChild(n);
          });
    });
})();
