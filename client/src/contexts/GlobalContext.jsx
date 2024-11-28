import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { LogoutIcon } from "../assets/LogoutIcon";

const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigateTo = useNavigate();

  const logout = () => onOpen();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout successful!");
    navigateTo("/");
    setUser(null);
  }

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,  
        logout, 
      }}
    >
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start align-middle items-center w-full gap-1 text-2xl"><LogoutIcon /> Logout</ModalHeader>
              <ModalBody>
                <p> Are you sure you want to logout? </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={() => {handleLogout(); onClose();}}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
