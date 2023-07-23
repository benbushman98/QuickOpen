// const localArrays = {
//   list1: [],
//   list2: [],
//   list3: [],
// };
// let tabArray = [];

// document.getElementById("newTab").addEventListener("click", function () {
//   let prompt = window.prompt("What is the name of your list?");
//   if(prompt === "" || prompt === null) {
//     console.log("fail")
//     prompt
//   } else {
//     tabArray.push(prompt);
//     localStorage.setItem("tabName", JSON.stringify(tabArray));
//     init(prompt);
//   }
// });

// function openTab(evt, tabName) {
//   const tabContent = document.getElementsByClassName("tab");
//   // console.log(tabContent)
//   for (let i = 0; i < tabContent.length; i++) {
//     // console.log("test")
//     tabContent[i].style.display = "none";
//   }

//   const tabLinks = document.getElementsByClassName("tabLinks");
//   // console.log(tabLinks)
//   // console.log(tabLinks.length)
//   for (let i = 0; i < tabLinks.length; i++) {
//     // console.log("remove")
//     tabLinks[i].classList.remove("active");
//   }

//   document.getElementById(tabName).style.display = "block";
//   if (evt) {
//     // console.log("added")
//     evt.currentTarget.classList.add("active");
//   }
// }

// function setNewWebsiteToLocalStorage(tabName, value) {
//   if (value.trim() !== "") {
//     if (!localArrays[tabName]) {
//       localArrays[tabName] = [];
//     }
//     localArrays[tabName].push(value);
//     localStorage.setItem(
//       `Favorite:${tabName}`,
//       JSON.stringify(localArrays[tabName])
//     );
//     document.getElementById("entry").value = "";
//     init(tabName); // Call init() to populate the list after adding a new item
//   }
// }

// function init(tabName) {
//   const list = document.getElementById(`favList${tabName}`);
//   const setArray = localStorage.getItem(`Favorite:${tabName}`);
//   const buttonList = document.querySelector(".tabLinksContainer");
//   const setTabArray = localStorage.getItem("tabName");

//   if (setTabArray) {
//     tabArray = JSON.parse(setTabArray);
//   } else {
//     tabArray = [];
//   }

//   if (setArray) {
//     localArrays[tabName] = JSON.parse(setArray);
//   } else {
//     localArrays[tabName] = [];
//   }
//   buttonList.innerHTML = "";
//   if (list === null) {
//     console.log("null")
//   } else {
//   list.innerHTML = "";
//   }
//   for (let i = 0; i < tabArray.length; i++) {
//     let name = tabArray[i];
//     let container = document.querySelector(".tabLinksContainer");

//     let deleteButton = document.createElement("button");
//     deleteButton.textContent = "X";
//     deleteButton.classList.add("tabDeleteButton")
//     deleteButton.addEventListener("click", function () {
//       deleteTabFromLocalStorage(name, i);
//     });

//     let newTab = document.createElement("button");
//     newTab.classList.add("tabLinks");
//     newTab.setAttribute("data-tab", `list${i}`);
//     newTab.textContent = name;
//     newTab.appendChild(deleteButton);
//     // console.log(newTab)
//     container.appendChild(newTab);
//   }

//   for (let i = 0; i < localArrays[tabName].length; i++) {
//     const url = localArrays[tabName][i];
//     const modifiedUrl = removeCharactersAfterDomain(url); // Call the function to modify the URL

//     let listItem = document.createElement("li");
//     listItem.textContent = modifiedUrl; // Use the modified URL as the text content

//     let deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.addEventListener("click", function () {
//       deleteFromLocalStorage(tabName, i);
//     });

//     listItem.appendChild(deleteButton);
//     list.appendChild(listItem);
//   }
// }

// function deleteTabFromLocalStorage(tabName, index) {
//   tabArray.splice(index, 1);
//   localStorage.setItem(
//     `tabName`,
//     JSON.stringify(tabArray)
//   );
//   init(tabName);
// }
// function deleteFromLocalStorage(tabName, index) {
//   localArrays[tabName].splice(index, 1);
//   localStorage.setItem(
//     `Favorite:${tabName}`,
//     JSON.stringify(localArrays[tabName])
//   );
//   init(tabName);
// }

// function removeCharactersAfterDomain(url) {
//   // Regular expression to match the domain extension and everything after it
//   const regex = /^(https?:\/\/)?([^/?#\s]+)(.*)/;

//   // Extract the domain extension and everything before it
//   const [, protocol, domain, rest] = url.match(regex) || [];

//   // Reconstruct the URL with only the protocol and domain
//   const modifiedUrl = (protocol ? protocol : "") + domain;

//   return modifiedUrl;
// }

// function openFavorites(tabName) {
//   console.log(tabName.split(" "));

//   const getReady = localStorage.getItem(
//     `Favorite:${tabName.split("favList")[1]}`
//   );
//   console.log(getReady);
//   const items = getReady ? JSON.parse(getReady) : [];

//   if (items.length === 0) {
//     console.log("No items in the list.");
//     return; // Nothing to open
//   }

//   for (let i = 0; i < items.length; i++) {
//     console.log(`Opening URL: ${items[i]}`);
//     window.open(`${items[i]}`, "_blank");
//   }
// }

// async function initializeDefaultTab() {
//   const activeTab = document.querySelector(".tabLinks.active");
//   const defaultTab = activeTab ? activeTab.getAttribute("data-tab") : "list0";
//   // console.log(defaultTab)
//   // console.log("Initializing default tab...")
//   // console.log(defaultTab)
//   openTab(null, defaultTab); // Open the default tab
//   init(defaultTab); // Initialize the default tab's list
// }

// // Attach event listeners after the DOM has loaded
// document.addEventListener("DOMContentLoaded", async function  () {
//   await initializeDefaultTab(); // Initialize the default tab's list
//   const tabLinks = document.getElementsByClassName("tabLinks");
//   // console.log(tabLinks)
//   // console.log(tabLinks.length)
//   for (let i = 0; i < tabLinks.length; i++) {
//     tabLinks[i].addEventListener("click", function (event) {
//       console.log("test")
//       const tabName = event.target.getAttribute("data-tab");
//       openTab(event, tabName);
//       init(tabName); // Call init() to populate the list when switching tabs
//     });
//   }


//   document
//     .getElementById("submitButton")
//     .addEventListener("click", function () {
//       const activeTab = document.querySelector(".tabLinks.active");
//       if (activeTab) {
//         console.log("activeTab")
//         const tabName = activeTab.getAttribute("data-tab");
//         const value = document.getElementById("entry").value;
//         setNewWebsiteToLocalStorage(tabName, value);
//       }
//     });

//   });
//   const openFavsButtons = document.querySelectorAll("[id^='openFavs']");
//   console.log(openFavsButtons)
//   openFavsButtons.forEach((button) => {
//     button.addEventListener("click", function (event) {
//       console.log("test click")
//       const tabName = event.target.getAttribute("data-list");
//       openFavorites(`favList${tabName}`);
//     });
//   });


// Version one code.