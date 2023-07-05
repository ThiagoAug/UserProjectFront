import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CreateModal } from "../Create-Modal/create-modal";
import "react-pro-sidebar/dist/css/styles.css";
import "./sideNavigation.scss";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
} from "react-pro-sidebar";

const SideNavigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(prev => !prev);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <>
      <ProSidebar collapsed={true}>
        <div onClick={handleOpenModal}>
          <FaPlus className="icon-actions" />
        </div>
        <SidebarContent>
          <Menu>
            <MenuItem className="logo-sidebar">Dashboard</MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
      {isModalOpen && <CreateModal closeModal={handleCloseModal} isCreating={true}/>}
    </>

  );
};

export default SideNavigation;