const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    let tasks = [];

    const fetchAndRenderTasks = () => {
      return fetch("https://webdev-hw-api.vercel.app/api/todos", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          tasks = responseData.todos;
          renderTasks();
        });
    };

    const renderTasks = () => {
      const tasksHtml = tasks
        .map((task) => {
          return `
          <li class="task">
            <p class="task-text">
              ${task.text}
              <button data-id="${task.id}" class="button delete-button">Удалить</button>
            </p>
          </li>`;
        })
        .join("");

      listElement.innerHTML = tasksHtml;
      const deleteButtons = document.querySelectorAll(".delete-button");

      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();

          const id = deleteButton.dataset.id;

          fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
            method: "DELETE",
          }).then((response) => {
            response.json().then((responseData) => {
              // { result: 'ok' }
              tasks = responseData.todos;
              renderTasks();
            });
          });

          renderTasks();
        });
      }
    };

    fetchAndRenderTasks();
    renderTasks();

    buttonElement.addEventListener("click", () => {
      if (textInputElement.value === "") {
        return;
      }

      buttonElement.disabled = true;
      buttonElement.textContent = "Элемент добавлятся...";
      fetch("https://webdev-hw-api.vercel.app/api/todos/with-error", {
        method: "POST",
        body: JSON.stringify({
          text: textInputElement.value,
        }),
      })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            return response.json();
          } else {
            // Код, который обработает ошибку
            // throw new Error("Сервер упал");
            return Promise.reject(new Error("Сервер упал"));
          }
        })
        .then(() => {
          return fetchAndRenderTasks();
        })
        .then(() => {
          buttonElement.disabled = false;
          buttonElement.textContent = "Добавить";
          textInputElement.value = "";
        })
        .catch((error) => {
          buttonElement.disabled = false;
          buttonElement.textContent = "Добавить";
          alert("Кажется, что-то пошло не так, попробуй позже");
          // TODO: Отправлять в систему сбора ошибок
          console.warn(error);
        });

      renderTasks();
    });