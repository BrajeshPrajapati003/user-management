type UserProps = {
  user: UserType;
  deleteUser: (id: number) => void;
  editUser: (user: UserType) => void;
};

const User = ({ user, deleteUser, editUser }: UserProps) => {
  return (
    <tr className="hover:bg-gray-950">
      <td className="px-6 py-4 text-gray-400">{user.firstName}</td>
      <td className="px-6 py-4 text-gray-400">{user.lastName}</td>
      <td className="px-6 py-4 text-gray-400">{user.email}</td>
      <td className="px-6 py-4 text-right space-x-2">
        <button
          onClick={() => editUser(user)}
          className="text-indigo-400 hover:text-indigo-700"
        >
          Edit
        </button>

        <button
          onClick={() => deleteUser(user.id)}
          className="text-red-400 hover:text-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
