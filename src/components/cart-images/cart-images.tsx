import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { itemCostTotal } from '../../transformers/item-cost';
import { ICartImages, IFlickrData } from '../../types';

const FLICKR_API_KEY = process.env.REACT_APP_FLICKR_API_KEY;

export const CartImages: React.FC<ICartImages> = (props) => {
  const [imageData, setImageData] = useState<IFlickrData[]>([]);

  useEffect(() => {
    getImages();
  }, []);

  let arrayIndex = 0;
  const imageURLS: string[] = props.items.map((next) => next.id);
  const getImages = () => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=${imageURLS[arrayIndex]}&format=json&nojsoncallback=1`;
    axios
      .get(url)
      .then((res) => {
        const photoArray = res.data.photos.photo;
        const newEntry = {
          serverId: photoArray[3].server,
          id: photoArray[3].id,
          secret: photoArray[3].secret,
        };
        setImageData((prev) => [...prev, newEntry]);
        arrayIndex += 1;
        if (arrayIndex < props.items.length) {
          getImages();
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <ImageList style={{ width: 800, height: 450 }}>
      {props.items &&
        imageData.map((data: IFlickrData, index) => (
          <ImageListItem key={data.id}>
            <img
              src={`${`https://live.staticflickr.com/${data.serverId}/${data.id}_${data.secret}.jpg`}?w=248&fit=crop&auto=format`}
              srcSet={`${`https://live.staticflickr.com/${data.serverId}/${data.id}_${data.secret}.jpg`}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`${data.id} from Flickr API`}
              loading="lazy"
            />
            <ImageListItemBar
              title={props.items[index].id}
              subtitle={
                <span>
                  x &nbsp;{props.items[index].quantity}&nbsp;(
                  {itemCostTotal(props.items[index])})
                </span>
              }
              position="bottom"
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
};
