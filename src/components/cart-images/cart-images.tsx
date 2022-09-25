import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import DeleteIcon from '@material-ui/icons/Delete';
import { Tooltip } from '@material-ui/core';
import { itemCostTotal } from '../../transformers/item-cost';
import { IFlickrData, IProduct } from '../../types';
import { CartContext } from '../../context';

const FLICKR_API_KEY = process.env.REACT_APP_FLICKR_API_KEY;

export const CartImages: React.FC = () => {
  const [imageData, setImageData] = useState<IFlickrData[]>([]);
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    console.log('env', process.env);
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
  const imageURLS: string[] = cartItems.map((next) => next.id);
  const getImages = () => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=${imageURLS[arrayIndex]}&format=json&nojsoncallback=1`;
    axios
      .get(url)
      .then((res) => {
        const photoArray = res.data.photos.photo;
        const newEntry = {
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
      })
      .catch((e) => console.error(e));
  };

  return (
    <ImageList className="image-list" style={{ maxWidth: 900 }}>
      {cartItems &&
        imageData.map((data: IFlickrData, index) => (
          <ImageListItem key={data.id}>
            <img
              src={`${`https://live.staticflickr.com/${data.serverId}/${data.id}_${data.secret}.jpg`}?w=248&fit=crop&auto=format`}
              srcSet={`${`https://live.staticflickr.com/${data.serverId}/${data.id}_${data.secret}.jpg`}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`${data.id} from Flickr API`}
              loading="lazy"
            />
            <ImageListItemBar
              title={cartItems[index].id}
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
                    <DeleteIcon style={{ color: 'white', fontSize: '30px' }} />
                  </span>
                </Tooltip>
              }
              position="bottom"
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
};
