import { handleCreateMember, populateMembers } from "./member_temp.js";
import { fetchAndDrawTable, handleCreateItem, handleFilterItem } from "./table_temp.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDrawTable();

  populateMembers();

  const addItemButton = document.getElementById("add-newrow");
  addItemButton.addEventListener("click", () => {
    handleCreateItem();
  });

  const filterButton = document.getElementById("filter-button");
  filterButton.addEventListener("click", () => {
    handleFilterItem();
  });

  const addMemberButton = document.getElementById("add-member");
  addMemberButton.addEventListener("click", () => {
    handleCreateMember();
  });
});
