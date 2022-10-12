import { db } from './api-config';
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
} from 'firebase/firestore';
// import { IProduct } from '../../types';

export const retrieveStores = async (): Promise<void> => {
  const storeCollection = collection(db, 'stores');
  const storeDocs = await getDocs(storeCollection);
  const stores: Array<{ id: string }> = [];

  storeDocs.forEach((store) => stores.push({ id: store.id, ...store.data() }));

  const result = await Promise.all(
    stores.map(async (store) => {
      const productCollection = collection(db, `stores/${store.id}/products`);
      const productDocs = await getDocs(productCollection);
      const products: Array<{ id: string; category?: DocumentReference }> = [];

      productDocs.forEach(async (product) =>
        products.push({ id: product.id, ...product.data() }),
      );

      const productsWithCategory = await Promise.all(
        products.map(async (product) => {
          try {
            const categoryRef = doc(
              db,
              `stores/${store.id}/categories`,
              product.category?.id as never,
            );

            const categoryDoc = await getDoc(categoryRef);
            const categoryData = categoryDoc.data() as { name: string };
            return { ...product, category: categoryData.name };
          } catch (e) {
            console.log('errstgrsgvsrg', e);
            return product;
          }
        }),
      );

      return { ...store, products: productsWithCategory };
    }),
  );
  console.log('stores', result);
};

// export const retrieveItems = async (
//   storeId: string,
//   departID: string,
// ): Promise<IProduct[]> => [];
