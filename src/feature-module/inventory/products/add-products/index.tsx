import { Link } from 'react-router-dom';
import { all_routes } from '../../../../Router/all_routes';
import './styles.scss';
import { Col, Row } from 'antd';

const ProductsType = () => {
  const route = all_routes;

  return (
    <div className="page-wrapper" style={{ background: '#F6F9FE', height: '100vh', width: '100vw' }}>
      <div className="content">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50px',
          }}
        >
          <h1>Product Type</h1>
          <p>Select the type of product you want to create</p>

          <div>
            <Row justify={'center'} align={'middle'}>
              <Col>
                <Link to={route.addStandardProduct} className="product-item">
                  <h4>Standard</h4>
                  <p>Create a standard product</p>
                </Link>
              </Col>
              <Col>
                <Link to={route.addVariantProduct} className="product-item">
                  <h4>Variant</h4>
                  <p>Will this product have multiple variants</p>
                </Link>
              </Col>
              <Col>
                <Link to={route.addCompositeProduct} className="product-item">
                  <h4>Composite</h4>
                  <p>Will this product be made up of multiple standard products</p>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsType;
