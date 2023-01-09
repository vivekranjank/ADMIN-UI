import axios from "axios";

export const searchUsers = (searchText, users) => {
  const searchTextInLowercase = searchText.toLowerCase();
  return users.map((person) => {
    if (
      person.name.toLowerCase().includes(searchTextInLowercase) ||
      person.email.toLowerCase().includes(searchTextInLowercase) ||
      person.role.toLowerCase().includes(searchTextInLowercase)
    ) {
      return person;
    } else {
      person.show = false;
      return person;
    }
  });
};

const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const getUsers = (usersData) => {
  axios
    .get(URL)
    .then((res) => {
      const users = res.data;
      usersData(
        users.map((data) => {
          data.selected = false;
          data.edit = false;
          data.show = true;
          return data;
        })
      );
    })
    .catch((err) => console.error(err));
};
