// TODO: 6. Custom Modal Component


type ModalTypes = {
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
  };
  
export const Modal = ({ isOpen, closeModal, children }: ModalTypes) => {
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <div 
      className="fixed shadow-md inset-0 z-50 flex items-center justify-center bg-[#00000032]">
        <div 
        // style={{borderRadius: "16% 84% 99% 1% / 30% 0% 100% 70%"}}
        className="p-4 m-4 text-center shadow-lg bg-white rounded-md relative">
          {children}
          <button
          //@ts-ignore
            className="flex items-center justify-center px-[4px] py-[2px] mt-4 text-white bg-red-600 hover:bg-red-300 
            absolute top-[-8px] right-[5px] rounded-[50%] w-4 h-4"
            onClick={closeModal}
          >
           <span className="text-[9px]">x</span>
          </button>
        </div>
      </div>
    );
  };
  
    /**
     * ? EXPLANATION
     * 
     * In this code, the modal is conditionally rendered based on modalIsOpen. 
     * If modalIsOpen is true, the modal is rendered. Otherwise, it's not 
     * rendered. The content of the modal is determined by modalContent. 
     * The "Close Modal" button in the modal calls closeModal when clicked, 
     * which hides the modal.
     * 
     * 
     * 
     * ? USAGE
     * * First, create a state variable for the modal's visibility and content
     * * Then, create a function to open the modal with specific content
     * * Now, you can use these functions to open the modal with different content from different parts
     * * of your application. For example:
     * 
     * function YourComponent() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    return (
      <div>
        <button onClick={openModal}>Open Modal</button>
  
        <Modal isOpen={modalIsOpen} closeModal={closeModal}>
          <div>Hello, world!</div>
        </Modal>
      </div>
    );
  }
     * 
     * 
     */
  