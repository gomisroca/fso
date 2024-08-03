import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserList() {
  const users = useSelector(({ users }) => {
    console.log(users);
    return users;
  });

  if (!users) {
    return null;
  }
  return (
    <table className="table-auto w-1/3 m-auto">
      <thead className="bg-neutral-300">
        <tr>
          <th>User</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {[...users].map((user) => (
          <tr key={user.id} className="border-b border-neutral-600">
            <td className="px-2 py-1 text-center border-r border-neutral-600">
              <Link
                to={`/users/${user.id}`}
                className="w-full h-full hover:bg-neutral-300 block transition-colors duration-200">
                {user.name}
              </Link>
            </td>
            <td className="px-2 py-1 text-center">{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
