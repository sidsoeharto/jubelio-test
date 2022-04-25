import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import PageStore from "../store/PageStore";
import ProductStore from "../store/ProductStore";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteAlert = observer(() => {
  const { deleteModal, closeDeleteModal } = React.useContext(PageStore);
  const { productDetail, deleteProduct } = React.useContext(ProductStore);
  const [inputs, setInputs] = React.useState({
    name: null,
    sku: null,
    image: null,
    description: null,
    price: null,
  })

  React.useEffect(() => {
    setInputs(toJS(productDetail))
  }, [productDetail])

  const deleteData = async (id) => {
    const data = await deleteProduct(id);

    return closeDeleteModal();
  }

  return (
    <Dialog
      open={deleteModal}
      onClose={closeDeleteModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete This Product ?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this product ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteModal}>Cancel</Button>
        <Button onClick={() => deleteData(productDetail.id)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
})

export default DeleteAlert;