import { Sortable } from "sortablejs";

const sortableProject = (dashboard, localStorageKeyName, type, api) => {
  Sortable.create(dashboard, {
    animation: 150,
    group: "projects",
    draggable: ".project",
    store: {
      set: (sortable) => {
        const order = sortable.toArray();
        localStorage.setItem(
          localStorageKeyName,
          JSON.stringify({
            type,
            order: order.join("|"),
          })
        );
      },
    },
    onSort: function (evt) {
      setTimeout(async () => {
        const orderData = JSON.parse(localStorage.getItem(localStorageKeyName));
        const res = await fetch(api);
        const projectData = await res.json();
        if (res.ok) {
          (order) => project_id;
          if (
            orderData.type === type &&
            orderData.order.split("|").length > 0
          ) {
            orderData.order.split("|").forEach(async (order, index) => {
              const test = await fetch(api + "/" + order);
              const data = await test.json();
              if (test.ok) {
                if (order != "") {
                  const project = projectData.find((item) => item.id == order);
                  if (project !== undefined) {
                    project.serial = index;
                    const res = await fetch(api + "/" + order, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ serial: index, status: type }),
                    });
                  }
                }
              }
            });
          }
        }
      }, 1000);
    },
  });
};

export default sortableProject;
