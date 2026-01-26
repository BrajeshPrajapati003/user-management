'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import UserList from "./UserList";

type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
};



const AddUser = () => {

const [refreshKey, setRefreshKey] = useState(0);
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState<CreateUser>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(USER_API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to save user");
    }

    reset(e);
    // After successful user creation, increment the refreshKey to trigger UserList refresh
setRefreshKey(prevKey => prevKey + 1);
    
    

    // success
    setUser({ firstName: "", lastName: "", email: "" });
    closeModal();
  };

  const reset = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ firstName: "", lastName: "", email: "" });
  }

  return (
    <>
      <div className="container mx-auto my-8">
        <button
          onClick={openModal}
          className="rounded bg-gray-600 text-white px-6 py-2 font-semibold">
          Add User
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">

              <div className="inline-block w-full max-w-md p-6 my-8 border-cyan-400 rounded-md shadow-xl text-left bg-white/20 backdrop-blur-md align-middle transition-all">
                <Dialog.Title className="text-lg font-medium text-cyan-600">
                  Add new User
                </Dialog.Title>

                <form onSubmit={saveUser}>
                  <div className="my-4">
                    <label className="block text-sm text-gray-300">First Name</label>
                    <input
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="w-full mt-2 px-2 py-2 border border-cyan-800 bg-transparent text-white
             focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  <div className="my-4">
                    <label className="block text-sm text-gray-300">Last Name</label>
                    <input
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="w-full mt-2 px-2 py-2 border border-cyan-800 bg-transparent text-white
             focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>

                  <div className="my-4">
                    <label className="block text-sm text-gray-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full mt-2 px-2 py-2 border border-cyan-800 bg-transparent text-white
             focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded">
                      Cancel
                    </button>
                  </div>
                </form>

              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <UserList refreshKey={refreshKey} />
    </>
  );
};

export default AddUser;
