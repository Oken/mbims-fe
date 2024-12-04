import { useEffect, useState, useRef, Fragment, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Form,
  Table,
  InputRef,
  Input,
  Button,
  Space,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import FeatherIcon from 'feather-icons-react';

import {
  // Queries
  useGetProductsQuery,

  // Mutations

  // Selectors
  selectAllProducts,
} from '../../../../store/feature-slice/products';

import {
  ProductT,
  SelectOptionT,
  ComponentT,
} from '../../../../types/product-types';

const { Item: FormItem } = Form;

interface CompositeProp {
  setTotalCompositePrice: any;
  setCostPrice: any;
  costPrice: any;
  setSearchedProductIds: (productIds: number[]) => void;
  searchedProductIds: number[];
  products: ProductT[];
}

const Composite = ({
  setTotalCompositePrice,
  setCostPrice,
  costPrice,
  setSearchedProductIds,
  searchedProductIds,
  products,
}: CompositeProp) => {
  // The selected products for creating the composite
  const [componentProducts, setComponentProducts] = useState<ProductT[]>([]);
  // const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  // const {
  //   error: isProductError,
  //   isSuccess: isProductFetchingSuccess,
  //   isLoading: isProductFetching,
  // } = useGetProductsQuery([]);
  // const fetchedProducts = useSelector(selectAllProducts);

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     try {
  //       if (isProductFetchingSuccess) {
  //         console.log('fetchedProducts: ', fetchedProducts);
  //         setProducts(fetchedProducts);
  //         return;
  //       }

  //       if (isProductFetchingSuccess) {
  //         console.log('We reached here actually.');
  //         console.log('productProductError', isProductError);
  //         throw isProductError;
  //       }
  //     } catch (err) {
  //       // setError('Failed to fetch products.');
  //       console.error('Failed to fetch products: ', err);
  //     }
  //   };

  //   loadProducts();
  // }, [isProductFetching]);

  useEffect(() => {
    const loadProducts = async () => {
      const filteredProducts = products.filter((product: ProductT, _: number) => {
        return searchedProductIds.includes(product.id);
      });

      console.log('Products from parent: ', products, '\nfilteredProducts: ', filteredProducts);
      setComponentProducts(filteredProducts);
    };

    loadProducts();
  }, [searchedProductIds]);

  // // Delete from the main fetch product
  // const deleteCompositeItem = (id: number) => {
  //   const filteredProducts = products.filter((product: ProductT, _: number) => product.id !== id);

  //   console.log('filteredProducts: ', filteredProducts);
  //   setComponentProducts(filteredProducts);
  // }

  // Delete from the list of selected products
  const deleteCompositeItem = (id: number) => {
    const filteredProducts = searchedProductIds.filter((productId: number, _: number) => productId !== id);

    console.log('filteredProducts: ', filteredProducts);
    setSearchedProductIds(filteredProducts);
  }

  const valueChanges = (changedValues: any, allValues: any) => {
    console.log(
      'changedValues: ', changedValues,
      '\nallValues: ', allValues,
      'form: ', form.getFieldsValue()
    );
    const totalPrice = allValues.products.reduce((total: number, product: any, index: any) => {
      console.log('index: ', index, 'product.costPrice: ', product.sellingPrice);
      if (product.sellingPrice) {
        console.log('total: ', total, '\nprice: ', product.sellingPrice);
        const price = Number(product.sellingPrice);

        setCostPrice(costPrice + product.costPrice);
        // Set the product categories
        // if (product.quantity) {
        //   console.log('quantity: ', product.quantity, '\ncost price: ', product.costPrice);
        //   setComponentProducts([...componentProducts,
        //     {
        //       id: product.id,
        //       quantity: product.quantity,
        //     }]);
        // }
        // return total + price;
      }

      console.log('We dey here o', product.sellingPrice);

      return total;
    }, 0);

    console.log('totalPrice', totalPrice);
    setTotalCompositePrice(totalPrice);
  }

  const columns: ColumnsType<ProductT> = [
    {
      title: 'Component',
      dataIndex: 'component',
      width: '50%',
      render: (_, product, index) => (
        <div>
          <p style={{ fontWeight: 600, marginBottom: 0 }}>
            {product.productName}
          </p>
          <small>
            {product.sku}
          </small>
          <Space>
            <FormItem
              name={['products', index, 'id']}
              initialValue={product.id}
              noStyle
            >
              <Input
                type="text"
                hidden
                style={{ padding: '16px', width: '150px' }}
              />
            </FormItem>
            {/* Cost Price hidden */}
            <FormItem
              name={['products', index, 'costPrice']}
              initialValue={product.costPrice}
              noStyle
            >
              {/* <Input type="text" hidden style={{ padding: '16px', width: '150px' }} /> */}
            </FormItem>
          </Space>
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (_, product, index) => (
        <>
          <FormItem
            name={['products', index, 'quantity']}
            noStyle
            initialValue={product.quantityOnHand}
            rules={[{
              required: true,
              message: 'Quantity is required'
            }]}
          >
            <Input type="number" style={{ padding: '16px', width: '150px' }} />
          </FormItem>
        </>
      ),
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      render: (_, product, index) => (
        <FormItem
          name={['products', index, 'sellingPrice']}
          noStyle
          initialValue={product.sellingPrice}
          rules={[{
            required: true,
            message: 'Price is required',
          }]}
        >
          <Input type="number" prefix="₦" style={{ padding: '16px', width: '150px' }} />
        </FormItem>
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      render: (_, product) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <div className="input-block add-lists"></div>
            <Link
              className="confirm-text"
              style={{ border: '1px solid #173F77' }}
              to="#"
              onClick={() => deleteCompositeItem(product.id)}
            >
              <FeatherIcon icon="trash-2" className="feather-trash-2" />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Form
      form={form}
      onValuesChange={valueChanges}
    >
      <Table
        columns={columns}
        dataSource={componentProducts}
        pagination={false}
        rowKey="id"
      />
    </Form>
  )
}

export default Composite;
