import React from 'react';
import { observer } from 'mobx-react';
import PageStore from '../store/PageStore';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = observer((props) => {
  const baseUrl = window.location.origin;
  const [product, setProduct] = React.useState(props.data)

  const { openEditModal, openDeleteModal } = React.useContext(PageStore)

  const convertPrice = (price) => {
    if (price < 1) {
        return price;
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Card 
      sx={{ 
        minWidth: 275,
        borderRadius: '1rem'
      }}
      raised={true}
    >
      <CardMedia
        component="img"
        height="100"
        image={baseUrl + "/assets/dummy-product.jpg"}
        alt={product.name}
      />
      <CardContent
        sx={{padding: '1rem 1.25rem'}}
      >
        <h5 className='text-xl font-semibold'>
          {product.name}
        </h5>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {'SKU: ' + product.sku }
        </Typography>
        <p className='text-sm font-light mb-4'>
          {product.description}
        </p>
        <h6 className='font-bold text-lg'>
          {'Rp. ' + convertPrice(product.price)}
        </h6>
      </CardContent>
      <CardActions 
        className='mb-4' 
        sx={{padding: '0.75rem 1.25rem', justifyContent: 'end'}}
      >
        <Button 
          onClick={() => openEditModal}
          size="small" 
          variant="outlined" 
          sx={{borderRadius: '1rem', padding: '0.25rem 1rem'}}
        >
          Edit
        </Button>
        <Button 
          size="small" 
          color="error"
          startIcon={<DeleteIcon />}
          variant="outlined" 
          sx={{borderRadius: '1rem', padding: '0.25rem 1rem'}}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
})

export default ProductCard;