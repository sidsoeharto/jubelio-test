import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ProductStore from "../store/ProductStore";
import PageStore from "../store/PageStore";

import { Check } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material';


const EditProduct = observer(() => {
  const { productDetail, updateProduct, editDetailState } = React.useContext(ProductStore);
  const { editModal, closeEditModal } = React.useContext(PageStore);
  const dataProd = toJS(productDetail)

  // const [inputs, setInputs] = React.useState({
  //   name: dataProd.name,
  //   sku: dataProd.sku,
  //   image: dataProd.image,
  //   description: dataProd.description,
  //   price: dataProd.price,
  // })

  // React.useEffect(() => {
  //   const payload = toJS(productDetail)
  //   const obj = {
  //     id: payload.id,
  //     name: payload.name,
  //     sku: payload.sku,
  //     image: payload.image,
  //     description: payload.description,
  //     price: payload.price
  //   }
  //   setInputs(obj)
  // }, [productDetail])

  // const handleChange = (name, value) => {
  //   let dataObj = inputs;
  //   dataObj[name] = value;

  //   return setInputs(dataObj);
  // }

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
          value={dataProd.name}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              editDetailState("name", e.target.value);
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
          value={dataProd.sku}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              editDetailState("sku", e.target.value);
            }
          }
          sx={{marginBottom: '0.875rem'}}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Product Image"
          type="text"
          value={dataProd.image}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              editDetailState("image", e.target.value);
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
          value={dataProd.price}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              editDetailState("price", e.target.value);
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
          value={dataProd.description}
          rows={3}
          fullWidth
          variant="standard"
          onChange={
            (e) => {
              editDetailState("description", e.target.value);
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
            let payload = dataProd;
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