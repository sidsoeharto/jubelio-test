import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ProductStore from "../store/ProductStore";
import PageStore from "../store/PageStore";

import { Check } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material';

const EditProduct = observer(() => {
  const { productDetail, updateProduct } = React.useContext(ProductStore);
  const { editModal, closeEditModal } = React.useContext(PageStore);
  const [inputs, setInputs] = React.useState({
    name: null,
    sku: null,
    image: null,
    description: null,
    price: null,
  })

  React.useEffect(() => {
    console.log(toJS(productDetail))
    setInputs(toJS(productDetail))
  }, [productDetail])

  const handleChange = (name, value) => {
    let dataObj = inputs;
    dataObj[name] = value;

    return setInputs(dataObj);
  }

  const submitData = (payload) => {
    updateProduct(productDetail.id, payload);

    return closeEditModal();
  }

  return (
    <Dialog open={editModal} onClose={closeEditModal} maxWidth="lg" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent className='flex flex-col w-full'>
        <div className='flex flex-col w-full'>
          Edit your own product.
        </div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          value={inputs.name}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              handleChange("name", e.target.value);
            }
          }
          sx={{marginBottom: '0.875rem'}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="sku"
          label="SKU"
          type="text"
          value={inputs.sku}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              handleChange("sku", e.target.value);
            }
          }
          sx={{marginBottom: '0.875rem'}}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Product Image"
          type="text"
          value={inputs.image}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              handleChange("image", e.target.value);
            }
          }
          sx={{marginBottom: '0.875rem'}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          type="numeric"
          value={inputs.price}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              handleChange("price", e.target.value);
            }
          }
          sx={{marginBottom: '0.875rem'}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="textarea"
          value={inputs.description}
          rows={3}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              handleChange("description", e.target.value);
            }
          }
          sx={{marginBottom: '0.875rem'}}
        />
      </DialogContent>
      <DialogActions sx={{padding: '1rem 1.25rem'}}>
        <Button onClick={closeEditModal}>Cancel</Button>
        <Button 
          size="small" 
          color="success"
          startIcon={<Check />}
          onClick={() => {
            let payload = inputs;
            submitData(payload);
          }}
          variant="contained" 
          sx={{borderRadius: '1rem', padding: '0.25rem 1rem'}}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default EditProduct;