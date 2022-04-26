import React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@mui/material';
import { Add, Autorenew } from '@mui/icons-material';

import PageStore from '../store/PageStore';
import ProductStore from '../store/ProductStore';

const Header = observer(() => {
  const baseUrl = window.location.origin;

  const { openAddModal } = React.useContext(PageStore)
  const { getProductFromElevenia } = React.useContext(ProductStore)

  return (
    <nav className='sticky top-0 z-50 bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded shadow-lg'>
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <img src={baseUrl+"/assets/logo-jubelio.png"} alt="logo jubelio" className='w-32 mx-auto mb-4 lg:m-0'/>
        <h1 className='text-center font-light text-lg text-cyan-700 hidden lg:block mx-auto'>
          E-Commerce X Elevenia Products
        </h1>
        <div className='flex flex-row lg:space-x-8 justify-center mx-auto lg:m-0'>
          <Button 
            size="small" 
            color="secondary"
            startIcon={<Add />}
            variant="contained"
            onClick={() => {
              openAddModal()
            }}
            sx={{borderRadius: '1rem', padding: '0.25rem 1rem', marginRight: '1rem'}}
          >
            Add Product
          </Button>
          <Button 
            size="small" 
            color="secondary"
            onClick={() => getProductFromElevenia()}
            startIcon={<Autorenew />}
            variant="contained" 
            sx={{borderRadius: '1rem', padding: '0.25rem 1rem'}}
          >
            Fetch From Elevenia
          </Button>
        </div>
      </div>
    </nav>
  )
})

export default Header;