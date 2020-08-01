let favs = `
Buddhist Holidays
Moon/Astro
`;

const xpath = "//div[text()='Other calendars']";

const template = document.createElement("div");
template.innerHTML = `
<div class="GSVYRe">
    <div role="button" class="uArJ5e UQuaGc kCyAyd uQ1ixe VTaCRb I2LGc M9Bg4d" aria-disabled="false" tabindex="0" data-response-delay-ms="0" aria-expanded="true" aria-controls="tkQpTb">
      <span class="l4V7wb Fxmcue">
        <div class="o8t45d">
          <div class="aIwHYe">Favourite calendars</div>
        </div>
      </span>
    </div>
</div>
<div jsname="tkQpTb" aria-hidden="false" data-collapsed="false" class="R16x0">
	<div id="fav-calendars" class="DB71Ge ha2hpc C8Dkz" data-owned="false" aria-label="Favourite calendars" role="list" style="height: 96px;">
    </div>
</div>
`;

favs = favs.split("\n").filter((n) => n);

const fav = `//span[text()='${favs[0]}']`;
waitFor(fav, function () {
  // Create Favourite Calendars header
  const otherHeader = getNode(xpath);
  const header =
    otherHeader.parentNode.parentNode.parentNode.parentNode.parentNode;
  header.insertAdjacentElement("beforebegin", template);

  // Move all favourite calendars in to new section
  for (let favName of favs) {
    const favNode = getNode(`//span[text()='${favName}']`);
    // Move a calendar in to the favourites list
    const favParent = favNode.parentNode.parentNode.parentNode.parentNode;
    document.getElementById("fav-calendars").appendChild(favParent);
  }

  // Fix height on calendar list
  fixCalendarHeight("#fav-calendars .XXcuqd");
  fixCalendarHeight("#tkQpTb .XXcuqd");
});

function waitFor(xpath, callback) {
  var checkExist = setInterval(function () {
    const node = getNode(xpath);
    if (node) {
      callback(node);
      clearInterval(checkExist);
    }
  }, 1000); // check every 1000ms
}

function getNode(xpath) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function fixCalendarHeight(selector) {
  const entries = document.querySelectorAll(selector);
  for (let i in entries) {
    entries[i].style = `transform: translateY(${i * 32}px);height: 32px;`;
  }
  const container = entries[0].parentNode;
  container.style = `height: ${entries.length * 32 + 8}px`;
}
