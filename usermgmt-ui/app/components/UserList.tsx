"use client";

import React, { useEffect, useState } from "react";
import User from "./User";

type UserListProps = {
  refreshKey: number;
};

const UserList = ({ refreshKey }: UserListProps) => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(USER_API_BASE_URL);
        const data: UserType[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  const deleteUser = async (id: number) => {
    await fetch(`${USER_API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    // optimistic update
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const editUser = (user: UserType) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const response = await fetch(`${USER_API_BASE_URL}/${selectedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedUser),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const updated = await response.json();

    // Optimistic update
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updated.id ? updated : user)),
    );

    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser) return;
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* User's Table */}

      <div className="container mx-auto my-8">
        <div className="flex shadow shadow-white/40 border-b">
          <table className="min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left py-3 px-6 text-gray-300 uppercase">
                  First Name
                </th>
                <th className="text-left py-3 px-6 text-gray-300 uppercase">
                  Last Name
                </th>
                <th className="text-left py-3 px-6 text-gray-300 uppercase">
                  Email
                </th>
                <th className="text-right py-3 px-6 text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <User
                    key={user.id}
                    user={user}
                    deleteUser={deleteUser}
                    editUser={editUser}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}

      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={updateUser}
            className="bg-white/20 backdrop-blur-md p-6 rounded-md w-96"
          >
            <h3 className="text-lg text-cyan-400 mb-4">Edit User</h3>

            <input
              name="firstName"
              value={selectedUser.firstName}
              onChange={handleEditChange}
              className="w-full mb-3 p-2 bg-transparent border border-cyan-500 text-white"
              placeholder="First Name"
            />

            <input
              name="lastName"
              value={selectedUser.lastName}
              onChange={handleEditChange}
              className="w-full mb-3 p-2 bg-transparent border border-cyan-500 text-white"
              placeholder="Last Name"
            />

            <input
              name="email"
              value={selectedUser.email}
              onChange={handleEditChange}
              className="w-full mb-4 p-2 bg-transparent border border-cyan-500 text-white"
              placeholder="Email"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UserList;
