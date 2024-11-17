import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CountryT, StoreT, StateT } from '../../../../types/product-types';

import {
  // Queries
  useGetCountriesQuery,
  useGetStatesQuery,

  // Mutations
  useAddNewOutletMutation,

  // Selectors

  selectAllCountries,
  selectAllStates,
} from '../../../../store/feature-slice/products'

const { Item: FormItem } = Form;
const { Option } = Select;

interface AddOutletProps {
  closeModal: () => void;
  // refetchStores: () => any;
}

const AddOutlet = ({ closeModal }: AddOutletProps) => {
  const [form] = Form.useForm(); // Ant Design form instance
  const [countries, setCountries] = useState<CountryT[]>([]);
  const [states, setStates] = useState<StateT[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const {
    error: countryError,
    isError: isCountryFetchingError,
    isSuccess: isCountryFetchingSuccess,
    isLoading: isCountryFetching,
  } = useGetCountriesQuery([]);
  const fetchedCountries = useSelector(selectAllCountries);

  const {
    error: stateError,
    isError: isStateFetchingError,
    isSuccess: isStateFetchingSuccess,
    isLoading: isStateFetching,
  } = useGetStatesQuery([]);
  const fetchedStates = useSelector(selectAllStates);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        if (
          isCountryFetchingSuccess
          && isStateFetchingSuccess
        ) {
          setCountries(fetchedCountries);
          setStates(fetchedStates);
        }

        if (isCountryFetchingError) {
          console.log('countryError', countryError);
          throw countryError;
        }

        if (isStateFetchingError) {
          console.log('stateError', stateError);
          throw stateError;
        }
      } catch (err) {
        console.log('Failed to fetch countries.', err);
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, [
    isCountryFetching,
    isStateFetching,
  ]);

  const [addNewOutlet, { isLoading, isSuccess, isError, error }] = useAddNewOutletMutation();
  // Handle form submission
  // const handleSubmit = async (values: StoreT) => {
  const handleSubmit = async (values: any) => {
    try {
      // setLoading(true);
      console.log('Create outlet values: ', values);
      return;
      const resOutlet = await addNewOutlet(values).unwrap();
      console.log('resStore: ', resOutlet, 'isSuccess: ', isSuccess);

      if (isError) {
        throw error;
      }
    } catch (err) {
      message.error('Failed to add outlet');
      console.log('Failed to add outlet', err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const outletAdded = async () => {
      if (isSuccess) {
        // const fun = await refetchStores().unwrap();
        // console.log('fun: ', fun);
        message.success('Outlet added successfully');
        closeModal();
        form.resetFields(); // Reset form after successful submission
      }
    }

    outletAdded();
  }, [isSuccess]);

  return (
    <>
      {/* {error && <div>{error}</div>} */}
      <h2>Add new outlet</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ padding: '10px'
      }}>
        <Row gutter={40}>
          <Col span={24}>
            <FormItem
              name="storeName"
              label="Outlet Name"
              rules={[{ required: true, message: 'Store name is required' }]}
            >
              <Input placeholder="Enter outlet name" style={{ padding: '16px' }} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={12}>
            <FormItem name="email" label="Email Address">
              <Input placeholder="Enter Email Address" style={{ padding: '16px' }} />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem name="phone-number" label="Phone No">
              <Input placeholder="Enter Phone Number" style={{ padding: '16px' }} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={24}>
            <FormItem name="storeAddress" label="Store Address">
              <Input placeholder="Enter store address" style={{ padding: '16px' }} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={12}>
            <FormItem name="city" label="City">
              <Input placeholder="Enter city" style={{ padding: '16px' }} />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem name="state" label="Select State" rules={[{ required: true, message: 'State is required' }]}>
              <Select placeholder="Select state" style={{ height: 56.5 }}>
                {states.map((state) => (
                  <Option key={state.id} value={state.stateName}>
                    {state.stateName}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={12}>
            <FormItem
              name="zipCode"
              label="Postal Code"
              rules={[{ required: true, message: 'Postal code is required' }]}
            >
              <Input placeholder="Enter postal code" style={{ padding: '16px' }} />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              name="country"
              label="Country"
              rules={[{ required: true, message: 'Country is required'
            }]}>
              <Select placeholder="Select country" style={{ height: 56.5  }}>
                {countries.map((country) => (
                  <Option key={country.id} value={country.countryName}>
                    {country.countryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>

        {loading && <div style={{ textAlign: 'center' }}>Loading...</div>}

        <Button
          type="primary"
          htmlType="submit"
          style={{
            margin: '15px auto',
            height: 56.5,
            width: 300,
            display: 'block',
          }}
          loading={isLoading}
        >
          Save
        </Button>
      </Form>
    </>
  );
};

export default AddOutlet;
