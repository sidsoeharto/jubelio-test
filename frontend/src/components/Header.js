import React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@mui/material';
import { Add, Autorenew } from '@mui/icons-material';

import PageStore from '../store/PageStore';

const Header = observer(() => {
  const baseUrl = window.location.origin;

  const { openAddModal } = React.useContext(PageStore)

  return (
    <div className='flex flex-col mb-6'>
      <img src={baseUrl+"/assets/logo-jubelio.png"} alt="logo jubelio" className='w-64 mx-auto my-3'/>
      <h1 className='text-center font-semibold text-2xl text-cyan-700 mb-4'>
        E-Commerce X Elevenia Products
      </h1>
      <div className='flex flex-row w-full justify-center'>
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
          startIcon={<Autorenew />}
          variant="contained" 
          sx={{borderRadius: '1rem', padding: '0.25rem 1rem'}}
        >
          Fetch From Elevenia
        </Button>
      </div>
    </div>
  )
})

export default Header;