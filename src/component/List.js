import { useEffect } from "react";

import UserAction from "./Action";
import config from "../config";
import styles from "./List.module.css";

const List = (props) => {
  const {
    users,
    deleteUser,
    editUser,
    saveUser,
    selectAll,
    selectOne,
    selectAllRef,
    setPage,
    page
  } = props;
  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);
  let fillRows = [];
  for (
    let i = users.filter((user) => user.show).length;
    i < config.PAGE_SIZE;
    i++
  ) {
    fillRows.push(<tr key={i}></tr>);
  }

  if (users.length === 0 && page === 1) {
    return <div>NO USERS IN THE SYSTEM</div>;
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              ref={selectAllRef}
              onChange={(e) => {
                selectAll(e);
              }}
              name="selectAll"
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return user.show ? (
            <UserAction
              selectOne={selectOne}
              saveUser={saveUser}
              editUser={editUser}
              deleteUser={deleteUser}
              key={user.id}
              user={user}
            ></UserAction>
          ) : (
            ""
          );
        })}
        {fillRows}
      </tbody>
    </table>
  );
};
export default List;
