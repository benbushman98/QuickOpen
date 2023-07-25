// Definitions of Global Variables
let tabArray = [];
const localArrays = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
};

// Definition of Global Clickable Event Listeners.
document.getElementById("newTab").addEventListener("click", newTabModal);
document.getElementById("deleteTab").addEventListener("click", deleteTab);
document.getElementById("submitButton").addEventListener("click", addToList);
document.getElementById("id_dropdown").onchange = renderListOnly;
document.getElementById("openTab").addEventListener("click", openFavorites);
document.getElementById("newTabSubmitButton").addEventListener("click", createNewTab);

function newTabModal() {
  var modal = document.getElementById("newTabModal");
  var span = document.getElementsByClassName("closeNewTab")[0];

  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function createNewTab() {
  let value = document.getElementById("ListName").value;
  var modal = document.getElementById("newTabModal");

  // alert(value)
  if (value === "") {
    let warning = "Please Enter a Valid Name"
    launchWarning(warning);
  } else if (value === null) {
    return;
  }
  else {
    const setTabArray = localStorage.getItem("tabName");
    if (setTabArray !== null && setTabArray.includes(prompt)) {
      let warning = ("List Name Already in Use. Please Name Something Different.")
      launchWarning(warning);

    } else {
      tabArray.push(value);
      localStorage.setItem("tabName", JSON.stringify(tabArray));
      renderTabNameToScreenFromLocalStorage();
      modal.style.display = "none";
    }
  }
};

function deleteTab() {
  var element = document.getElementById("id_dropdown");
  if (localArrays[element.selectedIndex] === undefined) {
    let warning = ("No list to delete.")
    launchWarning(warning);
    return
  }
  let confirm = window.confirm(`Are you sure you want to delete your ${element.value} tab?`)

  // console.log(confirm)
  if (confirm) {
    tabArray.splice(element.selectedIndex, 1);
    localStorage.setItem(
      `tabName`,
      JSON.stringify(tabArray)
    );
    deleteListLocalStorage(element.value)
    renderTabNameToScreenFromLocalStorage();
    renderListtoScreenFromLocalStorage();
  } else {
    return
  }
}
function addToList() {
  var element = document.getElementById("id_dropdown");
  let tabName = document.getElementById("id_dropdown").value;
  let listName = document.getElementById("entry");
  if (listName.value === "") {
    let warning = ("Please enter a valid URL (e.g. https://google.com)")
    launchWarning(warning);
    return
  } else if (localArrays[element.selectedIndex] === undefined) {
    let warning = ("Please create a list.")
    launchWarning(warning);
    return
  }
  localArrays[element.selectedIndex].push(listName.value)
  localStorage.setItem(tabName, JSON.stringify(localArrays[element.selectedIndex]));
  renderListtoScreenFromLocalStorage();
  listName.value = "";
}

function init() {
  renderTabNameToScreenFromLocalStorage();
  renderListtoScreenFromLocalStorage();
}
function renderListOnly() {
  renderListtoScreenFromLocalStorage();
}

function deleteListLocalStorage(listName) {
  localStorage.removeItem(`${listName}`);
  window.location.reload();
}

// Get the Tab Names from Local Storage and Render Them to the Screen
function renderTabNameToScreenFromLocalStorage() {
  const buttonList = document.querySelector(".tabLinksContainer");
  const setTabArray = localStorage.getItem("tabName");

  if (setTabArray) {
    tabArray = JSON.parse(setTabArray);
  } else {
    tabArray = [];
  }
  buttonList.innerHTML = "";

  for (let i = 0; i < tabArray.length; i++) {
    let name = tabArray[i];
    let container = document.querySelector(".tabLinksContainer");

    let newTab = document.createElement("option");
    newTab.classList.add("tabLinks");
    newTab.setAttribute("value", name);
    newTab.textContent = name;
    container.appendChild(newTab);
  }
}
function renderListtoScreenFromLocalStorage() {
  const list = document.getElementById("list");
  var element = document.getElementById("id_dropdown");
  let tabName = document.getElementById("id_dropdown").value;
  const setArray = localStorage.getItem(`${tabName}`);

  list.innerHTML = ""; // Clear the list before rendering the new items

  if (setArray) {
    localArrays[element.selectedIndex] = JSON.parse(setArray);
    for (let i = 0; i < localArrays[element.selectedIndex].length; i++) {
      const url = localArrays[element.selectedIndex][i];
      const modifiedUrl = removeCharactersAfterDomain(url);
      let listItem = document.createElement("li");
      let href = document.createElement("a");
      href.setAttribute("href", url)
      href.setAttribute("target", "_blank")
      href.textContent = modifiedUrl; // Use the modified URL as the text content
      listItem.appendChild(href);

      let deleteButton = document.createElement("button");
      deleteButton.setAttribute("title", "Delete Item")
      deleteButton.textContent = "x";
      deleteButton.addEventListener("click", function () {
        console.log("delete List")
        deleteFromLocalStorage(element, i);
      });

      listItem.appendChild(deleteButton);
      list.appendChild(listItem);
    }
  }
}

function removeCharactersAfterDomain(url) {
  // Regular expression to match the domain extension
  const regex = /^(https?:\/\/)?([^/?#\s]+)/;

  // Extract the domain extension
  const [, protocol, domain] = url.match(regex) || [];

  // Reconstruct the URL with only the protocol and domain
  const modifiedUrl = (protocol ? protocol : "") + domain;

  return modifiedUrl;
}

// Function to be able to delete tab name or list name from localstorage
function deleteTabFromLocalStorage(index) {
  tabArray.splice(index, 1);
  localStorage.setItem(
    `tabName`,
    JSON.stringify(tabArray)
  );
  renderTabNameToScreenFromLocalStorage();
}
function deleteFromLocalStorage(element, index) {
  localArrays[element.selectedIndex].splice(index, 1);
  localStorage.setItem(
    `${element.value}`,
    JSON.stringify(localArrays[element.selectedIndex])
  );
  renderListtoScreenFromLocalStorage();
}

function openFavorites() {
  let tabName = document.getElementById("id_dropdown").value;
  console.log(tabName.split(" "));

  const getReady = localStorage.getItem(
    `${tabName}`
  );
  console.log(getReady);
  const items = getReady ? JSON.parse(getReady) : [];

  if (items.length === 0) {
    let warning = "Please create a list before opening.";
    launchWarning(warning)
  }

  for (let i = 0; i < items.length; i++) {
    console.log(`Opening URL: ${items[i]}`);
    window.open(`${items[i]}`, "_blank");
  }
}

function launchWarning(warning) {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var warningLocaton = document.getElementById("warning");

  warningLocaton.textContent = warning;
  modal.style.display = "block";


  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

init();