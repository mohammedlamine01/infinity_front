'use client';

import { useEffect, useState } from 'react';
import { useAsyncLoad } from '@/hooks/useAsyncLoad';

/**
 * Example: Product List Page with Loading on Mount
 * This demonstrates automatic loading when the page first loads
 */
export default function ProductsPage() {
  const { withLoadingAndProgress } = useAsyncLoad();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      loadPageData();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  const loadPageData = async () => {
    await withLoadingAndProgress(
      async (updateProgress, updateMessage) => {
        // Step 1: Load categories
        updateMessage('Loading categories...');
        updateProgress(30);
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Step 2: Load products
        updateMessage('Loading products...');
        updateProgress(60);
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Step 3: Finalize
        updateMessage('Preparing display...');
        updateProgress(90);
        await new Promise(resolve => setTimeout(resolve, 300));

        updateProgress(100);
      },
      { message: 'Loading products page...' }
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => (
            <div key={category.id} className="p-4 border rounded-lg">
              {category.name}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-muted-foreground">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
