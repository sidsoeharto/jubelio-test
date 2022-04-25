import './App.css';

import React from 'react';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductStore from './store/ProductStore';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

const App = observer(() => {
  const baseUrl = window.location.origin;
  const scrollParentRef = React.useRef(null);

  const { product } = React.useContext(ProductStore)
  return (
    <div className="flex flex-col min-h-screen min-w-screen justify-center bg-gray-100" ref={scrollParentRef}>
      <CssBaseline />
      <Header />
      <Container className="flex justify-center">
        <InfiniteScroll
            pageStart={0}
            // loadMore={loadFunc}
            hasMore={false}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}
        >
          <Grid container spacing={2}>
            {
              product.length > 0 ?
                product.map((el) => 
                <Grid 
                  item 
                  xs={4}
                  key={el.id}
                >
                  <ProductCard 
                    data={el}
                  />
                </Grid>)
                :
                null
            }
          </Grid>
        </InfiniteScroll>
      </Container>
      <AddProduct />
      <EditProduct />
    </div>
  );
})

export default App;
