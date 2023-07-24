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
document.getElementById("newTab").addEventListener("click", createNewTab);
document.getElementById("deleteTab").addEventListener("click", deleteTab);
document.getElementById("submitButton").addEventListener("click", addToList);
document.getElementById("id_dropdown").onchange = renderListOnly;
document.getElementById("openTab").addEventListener("click", openFavorites)

function createNewTab() {
  let prompt = window.prompt("What is the name of your list?");
  if (prompt === "" || prompt === null) {
    console.log("fail")
    alert("Please Enter a Valid Name")
  } else {
    const setTabArray = localStorage.getItem("tabName");
    if (setTabArray !== null && setTabArray.includes(prompt)) {
      alert("List Name Already in Use. Please Name Something Different.")
    } else {
      tabArray.push(prompt);
      localStorage.setItem("tabName", JSON.stringify(tabArray));
      renderTabNameToScreenFromLocalStorage();
    }
  }
};

function deleteTab() {
  var element = document.getElementById("id_dropdown");
  let confirm = window.confirm(`Are you sure you want to delete your ${element.value} tab?`)
  // console.log(confirm)
  if (confirm) {
    tabArray.splice(element.selectedIndex, 1);
    localStorage.setItem(
      `tabName`,
      JSON.stringify(tabArray)
      );
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
    alert("Please enter a valid URL (e.g. https://google.com)")
    return
  }  
  localArrays[element.selectedIndex].push(listName.value)
  localStorage.setItem(tabName, JSON.stringify(localArrays[element.selectedIndex]));
  renderListtoScreenFromLocalStorage();
  listName.value = "";
}

function init(param) {
  renderTabNameToScreenFromLocalStorage();
  renderListtoScreenFromLocalStorage();
}
function renderListOnly() {
  renderListtoScreenFromLocalStorage();

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
      listItem.textContent = modifiedUrl; // Use the modified URL as the text content
  
      let deleteButton = document.createElement("button");
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
    console.log("No items in the list.");
    return; // Nothing to open
  }

  for (let i = 0; i < items.length; i++) {
    console.log(`Opening URL: ${items[i]}`);
    window.open(`${items[i]}`, "_blank");
  }
}

init();