import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { itemCostTotal } from '../../transformers/item-cost';
import { IFlickrData, IProduct } from '../../types';
import { CartContext } from '../../context/context';
import './cart-images.css';

const FLICKR_API_KEY = process.env.REACT_APP_FLICKR_API_KEY;

export const CartImages: React.FC = () => {
  const [imageData, setImageData] = useState<IFlickrData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    getImages();
  }, []);

  const removeCartItem = (itemToRemove: string) => {
    setCartItems((prevState: IProduct[]) => {
      return prevState.filter((prevItem) => prevItem.id !== itemToRemove);
    });
    setImageData((prevState: IFlickrData[]) => {
      return prevState.filter((prevItem) => prevItem.tag !== itemToRemove);
    });
  };

  let arrayIndex = 0;
  const imageURLS: string[] = cartItems
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .sort((a, b) => (a.store > b.store ? 1 : b.store > a.store ? -1 : 0))
    .map((next) => next.id);
  const getImages = () => {
    setLoading(true);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=${imageURLS[arrayIndex]}&format=json&nojsoncallback=1`;
    axios
      .get(url)
      .then((res) => {
        const photoArray = res.data.photos.photo;
        const newEntry: IFlickrData = {
          tag: imageURLS[arrayIndex],
          serverId: photoArray[3].server,
          id: photoArray[3].id,
          secret: photoArray[3].secret,
        };
        setImageData((prev) => [...prev, newEntry]);
        arrayIndex += 1;
        if (arrayIndex < cartItems.length) {
          getImages();
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        const newEntry = {
          tag: imageURLS[arrayIndex],
          serverId: 0,
          id: 0,
          secret: '',
        };
        setImageData((prev) => [...prev, newEntry]);
        arrayIndex += 1;
        if (arrayIndex < cartItems.length) {
          getImages();
        }
        setLoading(false);
      });
  };

  return (
    <ImageList style={{ maxWidth: 900 }}>
      {cartItems && loading ? (
        <div className="loading-div">
          <CircularProgress
            style={{ color: 'black', margin: 'auto' }}
            size={70}
          />
        </div>
      ) : (
        imageData.map((data: IFlickrData, index) => (
          <ImageListItem key={data.id + index}>
            <img
              src={`${`https://live.staticflickr.com/${data.serverId}/${data.id}_${data.secret}.jpg`}?w=248&fit=crop&auto=format`}
              srcSet={`${`https://live.staticflickr.com/${data.serverId}/${data.id}_${data.secret}.jpg`}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`Picture unavailable`}
              style={{ minHeight: '20%' }}
            />
            <ImageListItemBar
              title={
                <div className="basket-title">
                  <img
                    className="basket-item-image"
                    src={`https://logo.clearbit.com/${cartItems[index].store}.com.au`}
                  />
                  {cartItems[index].id}
                </div>
              }
              subtitle={
                <span>
                  x &nbsp;{cartItems[index].quantity}&nbsp;(
                  {itemCostTotal(cartItems[index])})
                </span>
              }
              actionIcon={
                <Tooltip title="Remove item">
                  <span
                    className="remove-span"
                    onClick={() => removeCartItem(cartItems[index].id)}
                  >
                    <CloseIcon style={{ color: 'white', fontSize: '30px' }} />
                  </span>
                </Tooltip>
              }
              position="bottom"
            />
          </ImageListItem>
        ))
      )}
    </ImageList>
  );
};
