const buttons = document.querySelectorAll("[data-timeframe]");
const cards = document.querySelectorAll(".card");

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    cards.forEach((card, index) => {
      const title = card.querySelector(".card-type");
      const current = card.querySelector(".current-hours");
      const previous = card.querySelector(".previous-hours");

      title.textContent = data[index].title;
      current.textContent = data[index].timeframes.weekly.current + "hrs";
      previous.textContent =
        "Last week - " + data[index].timeframes.weekly.previous + "hrs";

      buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();

          const timeframe = button.dataset.timeframe;
          current.textContent =
            data[index].timeframes[timeframe].current + "hrs";
          const reduceName = timeframe.replace(/ly$/i, "");
          const goodName = reduceName.replace(/i/i, "y");

          previous.textContent =
            "Last " +
            goodName +
            " - " +
            data[index].timeframes[timeframe].previous +
            "hrs";

          buttons.forEach((btn) => {
            btn.classList.remove("active");
            button.classList.add("active");
          });
        });
      });
    });
  });
