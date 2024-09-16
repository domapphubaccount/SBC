"use client"

import React, { useEffect, useState } from "react";
import { DeleteUser } from "../DashModules/User/Delete";
import { EditUser } from "../DashModules/User/Edit";
import { ViewUser } from "../DashModules/User/View";
import { WarnUser } from "../DashModules/User/Warn";
import { Button } from "flowbite-react";
import { AddUser } from "../DashModules/User/AddUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByIDAction,
  removeUser,
  roleModule,
} from "@/app/Redux/Features/Dashboard/UsersSlice";
import { UserRole } from "../DashModules/User/UserRole";
import {
  addModule,
  closeView,
  deleteModule,
  editModule,
  getRoleByIDAction,
  getRolesAction,
  viewModule,
} from "@/app/Redux/Features/Dashboard/RolesSlice";
import { AddRole } from "../DashModules/Roles/AddRole";
import { ViewRole } from "../DashModules/Roles/View";
import { DeleteRole } from "../DashModules/Roles/Delete";
import { EditRole } from "../DashModules/Roles/Edit";
import { Checkbox, Table } from "flowbite-react";


function DashboardData({}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const rolesData = useSelector((state) => state.rolesSlice.roles);
  const updateRolesData = useSelector((state) => state.rolesSlice.updates);
  const [openWarn, setOpenWarn] = useState(false);

  const openEdit = useSelector((state) => state.rolesSlice.editModule);
  const openDelete = useSelector((state) => state.rolesSlice.deleteModule);
  const openRole = useSelector((state) => state.usersSlice.roleModule);

  const openAdd = useSelector((state) => state.rolesSlice.addModule);
  const openView = useSelector((state) => state.rolesSlice.viewModule);

  const handleClose = () => {
    dispatch(removeUser());
    dispatch(closeView());

    dispatch(editModule(false));
    dispatch(deleteModule(false));
    dispatch(viewModule(false));
    dispatch(roleModule(false));
    dispatch(addModule(false));
  };

  // start open delete
  const handleOpenDelete = (id) => {
    dispatch(getRoleByIDAction({ token, id }));
    dispatch(deleteModule(true));
  };
  // end open delete

  // start open edit
  const handleOpenEdit = (id) => {
    dispatch(getRoleByIDAction({ token, id }));
    dispatch(editModule(true));
  };
  // end open edit

  //   // start open role
  //   const handleOpenRole = (id) => {
  //     dispatch(getUserByIDAction({ token, id }));
  //     dispatch(roleModule(true));
  //   };
  //   // end open role

  //   start add role             ####DONE
  const handleOpenAdd = () => {
    dispatch(addModule(true));
  };
  //   end add role

  // start open view
  const handleOpenView = (id) => {
    dispatch(getRoleByIDAction({ token, id }));
    dispatch(viewModule(true));
  };
  // end open view

  useEffect(() => {
    dispatch(getRolesAction({ token }));
  }, [
    /* updates */
    updateRolesData,
  ]);

  // Step 1: State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Step 2: Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Step 3: Filter the rows based on the search term
  const filteredData = rolesData.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm);
    // item.email.toLowerCase().includes(searchTerm)
  });

  useEffect(()=>{
    
  },[])

  return (
    <>
      <section>
        <div>
          <div
            class="flex py-3 pt-8 text-white rounded-lg"
            aria-label="Breadcrumb"
          >
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li>
                <div class="flex items-center">
                  <a
                    href="#"
                    class="text-sm font-medium text-white hover:text-blue-600"
                  >
                    Dashboard
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span class="ms-1 text-sm font-medium text-white md:ms-2">
                    Roles
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <div className="flex justify-between my-5">
            <div>
              <h1 className="text-white text-4xl">ROLES</h1>
            </div>
            <div>
              <Button color="blue" onClick={handleOpenAdd}>
                Add Role
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
      </section>

      {openDelete && (
        <DeleteRole handleClose={handleClose} openDelete={openDelete} />
      )}

      {openEdit && <EditRole handleClose={handleClose} openEdit={openEdit} />}

      {openView && <ViewRole handleClose={handleClose} openView={openView} />}
      {openWarn && <WarnUser role={role} handleClose={handleClose} />}
      {openAdd && <AddRole openAdd={openAdd} handleClose={handleClose} />}
      {openRole && <UserRole handleClose={handleClose} openRole={openRole} />}
    </>
  );
}

export default DashboardData;
