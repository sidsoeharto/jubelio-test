import React from 'react';
import { observer } from 'mobx-react';
import ProductStore from "../store/ProductStore";
import PageStore from "../store/PageStore";

import { Check } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material';

const AddProduct = observer(() => {
  const { createProduct } = React.useContext(ProductStore);
  const { addModal, closeAddModal } = React.useContext(PageStore);
  const [inputs, setInputs] = React.useState({
    name: null,
    sku: null,
    image: null,
    description: null,
    price: null,
  })

  const handleChange = (name, value) => {
    let dataObj = inputs;
    dataObj[name] = value;

    if(name === 'file') {
      const formData = new FormData();
      formData.append('file', value);
    }

    console.log(dataObj);
    return setInputs(dataObj);
  }

  const submitData = (payload) => {
    return console.log(createProduct(payload));
  }

  return (
    <Dialog open={addModal} onClose={closeAddModal}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent className='flex flex-col w-full'>
        <div className='flex flex-col w-full'>
          Add your own product.
        </div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
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
          type="file"
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              handleChange("image", e.target.files[0]);
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
        <Button onClick={closeAddModal}>Cancel</Button>
        <Button 
          size="small" 
          color="success"
          startIcon={<Check />}
          onClick={() => {
            console.log(inputs)
            return submitData(inputs)
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

export default AddProduct;