headerify = function (evt) {
  const tags = ["h2", "h3", "h4", "h5", "h6"];
  for (var tag of tags) {
    const elements = document.getElementsByTagName(tag);
    for (var element of elements) {
      if (element.getAttribute("id")) {
        link = document.createElement("a");
        link.className = "deep-link";
        link.textContent = " 🔗";
        link.href = "#" + element.getAttribute("id");

        element.appendChild(link);
      }
    }
  }
};

window.addEventListener("load", headerify);

function scrollPortfolio(button, dir) {
  const container = button.parentElement.querySelector(".portfolio-scroll");
  const amount = container.clientWidth * 0.8;

  container.scrollBy({
    left: dir * amount,
    behavior: "smooth",
  });
}
