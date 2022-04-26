import { makeObservable, observable, action } from "mobx";
import { createContext } from 'react'

class PageStore {
    constructor () {
        makeObservable(this, {
          editModal: observable,
          addModal: observable,
          deleteModal: observable,
          openEditModal: action,
          openAddModal: action,
          openDeleteModal: action,
          closeEditModal: action,
          closeAddModal: action,
          closeDeleteModal: action,
        });
    }
    
    editModal = false;
    addModal = false;
    deleteModal = false;

    openEditModal = () => {
      return this.editModal = true;
    }

    closeEditModal = () => {
      return this.editModal = false;
    }

    openAddModal = () => {
      return this.addModal = true;
    }

    closeAddModal = () => {
      return this.addModal = false;
    }

    openDeleteModal = () => {
      return this.deleteModal = true;
    }

    closeDeleteModal = () => {
      return this.deleteModal = false;
    }
}

const store = createContext(new PageStore());
export default store;