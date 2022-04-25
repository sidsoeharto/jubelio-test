import './App.css';

import React, {Fragment} from 'react';
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
import DeleteAlert from './components/DeleteAlert';

const App = observer(() => {
  const itemsPerPage = 9;
  const baseUrl = window.location.origin;
  const scrollParentRef = React.useRef(null);

  const [hasMoreItems, setHasMoreItems] = React.useState(true);
  const [records, setRecords] = React.useState(itemsPerPage);

  const loadFunc = () => {
    if (records === product.length) {
      setHasMoreItems(false);
    } else {
      let remainingRecords = product.length - records;
      if (remainingRecords < itemsPerPage) {
        setTimeout(() => {
          setRecords(records + remainingRecords);
        }, 2000);
      } else {
        setTimeout(() => {
          setRecords(records + itemsPerPage);
        }, 2000);
      }
      
    }
  };

  const showItems = products => {
    var items = [];
    for (var i = 0; i < records; i++) {
      items.push(
        <div
          className='w-full mx-auto'
        >
          <ProductCard 
            data={products[i]}
          />
        </div>
      );
    }
    return items;
  };

  const { product } = React.useContext(ProductStore)
  return (
    <div className="flex flex-col min-h-screen min-w-screen justify-center bg-gray-100" ref={scrollParentRef}>
      <CssBaseline />
      <Header />
      <Container className="flex justify-center py-12">
          {
            product.length > 0 ?
              <InfiniteScroll
                element={'div'}
                style={{
                  display: 'grid',
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gridAutoFlow: 'row',
                  gridAutoColumns: 'max-content',
                  gap: '1rem'
                }}
                pageStart={0}
                loadMore={loadFunc}
                hasMore={hasMoreItems}
                loader={<div className="loader" key={0}>Loading ...</div>}
                useWindow={true}
            >
              {showItems(product)}
            </InfiniteScroll>
            : null
          }
      </Container>
      <AddProduct />
      <EditProduct />
      <DeleteAlert />
    </div>
  );
})

export default App;
