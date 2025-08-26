furnitureData = null;

window.addEventListener("load", startup);

function startup() {
  $.ajax({
    async: false,
    url: "/assets/downloads/oblivion/chairs.json",
    dataType: "json",
    success: function (response) {
      try {
        furnitureData = response;
      } catch (err) {
        (console.error || console.log).call(console, err.stack || err);
        alert(
          "Error retrieving data from the JSON file!\nPlease contact the developers!"
        );
      }
    },
    error: function () {
      alert("Unable to contact the server!\nPlease contact the developers!");
    },
  });
}

function clearSearch() {
  $("#resultsList")[0].innerHTML = "";
}

function furnitureSearch() {
  minX = document.getElementById("minX").value;
  maxX = document.getElementById("maxX").value;

  minY = document.getElementById("minY").value;
  maxY = document.getElementById("maxY").value;

  minZ = document.getElementById("minZ").value;
  maxZ = document.getElementById("maxZ").value;

  console.log('Min X: "' + minX + '" / Max X: "' + maxX + '"');
  console.log('Max Y: "' + minY + '" / Max Y: "' + maxY + '"');
  console.log('Max Z: "' + minZ + '" / Max Z: "' + maxZ + '"');

  if (furnitureData == null) {
    startup();
  }

  // Restore these to a more usable value
  minX = minX === "" ? Number.MIN_SAFE_INTEGER : minX;
  minY = minY === "" ? Number.MIN_SAFE_INTEGER : minY;
  minZ = minZ === "" ? Number.MIN_SAFE_INTEGER : minZ;

  maxX = maxX === "" ? Number.MAX_SAFE_INTEGER : maxX;
  maxY = maxY === "" ? Number.MAX_SAFE_INTEGER : maxY;
  maxZ = maxZ === "" ? Number.MAX_SAFE_INTEGER : maxZ;

  $("#resultsList")[0].innerHTML = "";

  Object.keys(furnitureData).forEach(function (key) {
    cellData = furnitureData[key];
    locationID = key;
    furnitureList = cellData["Furniture"];
    cellName = cellData["Name"];

    for (var i = furnitureList.length - 1; i >= 0; i--) {
      f = furnitureList[i];

      // Ignore those that don't fit the conditions
      if (parseFloat(f["X"]) > maxX || parseFloat(f["X"]) < minX) continue;
      if (parseFloat(f["Y"]) > maxY || parseFloat(f["Y"]) < minY) continue;
      if (parseFloat(f["Z"]) > maxZ || parseFloat(f["Z"]) < minZ) continue;

      var bulletPoint = document.createElement("li");
      bulletPoint.innerHTML =
        f["Name"] +
        ' / Cell: <code class="language-plaintext highlighter-rouge">' +
        locationID +
        '</code> @ (<code class="language-plaintext highlighter-rouge">' +
        f["X"] +
        ", " +
        f["Y"] +
        ", " +
        f["Z"] +
        "</code>)";
      $("#resultsList")[0].appendChild(bulletPoint);
    }
  });
}
