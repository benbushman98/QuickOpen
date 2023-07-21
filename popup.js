const localArrays = {
    list1: [],
    list2: [],
    list3: [],
  };
  
  function openTab(evt, tabName) {
    const tabContent = document.getElementsByClassName("tab");
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
  
    const tabLinks = document.getElementsByClassName("tabLinks");
    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove("active");
    }
  
    document.getElementById(tabName).style.display = "block";
    if (evt) {
      evt.currentTarget.classList.add("active");
    }
  }
  
  function setNewWebsiteToLocalStorage(tabName, value) {
    if (value.trim() !== "") {
      if (!localArrays[tabName]) {
        localArrays[tabName] = [];
      }
      localArrays[tabName].push(value);
      localStorage.setItem(`Favorite:${tabName}`, JSON.stringify(localArrays[tabName]));
      document.getElementById("entry").value = "";
      init(tabName); // Call init() to populate the list after adding a new item
    }
  }
  
  function init(tabName) {
    const list = document.getElementById(`favList${tabName}`);
    const setArray = localStorage.getItem(`Favorite:${tabName}`);
  
    if (setArray) {
      localArrays[tabName] = JSON.parse(setArray);
    } else {
      localArrays[tabName] = [];
    }
  
    list.innerHTML = "";
  
    for (let i = 0; i < localArrays[tabName].length; i++) {
      const url = localArrays[tabName][i];
      const modifiedUrl = removeCharactersAfterDomain(url); // Call the function to modify the URL
  
      let listItem = document.createElement("li");
      listItem.textContent = modifiedUrl; // Use the modified URL as the text content
  
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteFromLocalStorage(tabName, i);
      });
  
      listItem.appendChild(deleteButton);
      list.appendChild(listItem);
    }
  }
  
  function deleteFromLocalStorage(tabName, index) {
    localArrays[tabName].splice(index, 1);
    localStorage.setItem(`Favorite:${tabName}`, JSON.stringify(localArrays[tabName]));
    init(tabName);
  }
  
  function removeCharactersAfterDomain(url) {
    // Regular expression to match the domain extension and everything after it
    const regex = /^(https?:\/\/)?([^/?#\s]+)(.*)/;
  
    // Extract the domain extension and everything before it
    const [, protocol, domain, rest] = url.match(regex) || [];
  
    // Reconstruct the URL with only the protocol and domain
    const modifiedUrl = (protocol ? protocol : '') + domain;
  
    return modifiedUrl;
  }
  
  function openFavorites(tabName) {
    console.log(tabName.split(' '))

    const getReady = localStorage.getItem(`Favorite:${tabName.split("favList")[1]}`);
    console.log(getReady)
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
  
  
  async function initializeDefaultTab() {
    const activeTab = document.querySelector(".tabLinks.active");
    const defaultTab = activeTab ? activeTab.getAttribute("data-tab") : "list1";
  
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(); // Simulate a short delay to ensure local storage data retrieval
      }, 100);
    });
  
    openTab(null, defaultTab); // Open the default tab
    init(defaultTab); // Initialize the default tab's list
  }
  
  // Attach event listeners after the DOM has loaded
  document.addEventListener("DOMContentLoaded", function () {
    const tabLinks = document.getElementsByClassName("tabLinks");
    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].addEventListener("click", function (event) {
        const tabName = event.target.getAttribute("data-tab");
        openTab(event, tabName);
        init(tabName); // Call init() to populate the list when switching tabs
      });
    }
  
    initializeDefaultTab(); // Initialize the default tab's list
  
    document.getElementById("submitButton").addEventListener("click", function () {
      const activeTab = document.querySelector(".tabLinks.active");
      if (activeTab) {
        const tabName = activeTab.getAttribute("data-tab");
        const value = document.getElementById("entry").value;
        setNewWebsiteToLocalStorage(tabName, value);
      }
    });
  
    const openFavsButtons = document.querySelectorAll("[id^='openFavs']");
    openFavsButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        const tabName = event.target.getAttribute("data-list");
        openFavorites(`favList${tabName}`);
      });
    });
  });
  