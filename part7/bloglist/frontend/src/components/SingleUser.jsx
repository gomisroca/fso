import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function SingleUser() {
  const id = useParams().id;
  const user = useSelector(({ users }) => {
    return users.find((user) => user.id === id);
  });

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <span className="text-xl font-bold">{user.name}</span>
      <div>
        <span className="text-lg ">Blogs Created</span>
        <ul className="ml-2 flex list-none flex-col gap-y-2">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                to={`/blogs/${blog.id}`}
                className="block w-52 rounded-md bg-neutral-200 px-4 py-1 hover:bg-neutral-300">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SingleUser;
