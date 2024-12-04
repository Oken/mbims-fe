import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CountryT, StoreT, StateT, WorkingHourT } from '../../../../../types/product-types';
import { ColumnsType } from 'antd/es/table';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  message,
  Switch,
  Space,
  Table,
  TimePicker,
} from 'antd';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import dayJS from 'dayjs';

import {
  // Queries
  useGetCountriesQuery,
  useGetStatesQuery,

  // Mutations
  useAddNewOutletMutation,

  // Selectors

  selectAllCountries,
  selectAllStates,
} from '../../../../../store/feature-slice/products'
import TimelineItem from 'antd/es/timeline/TimelineItem';

const { Item: FormItem } = Form;
const { Option } = Select;

interface ColumnWorkingHourT {
  id: number;
  day: string;
}

interface AddOutletProps {
  closeModal: () => void;
  setCreatedNewOutlet: (value: boolean) => void;
}

type AddWorkingHourT = Omit<WorkingHourT, 'id'>;

const AddOutlet = ({ closeModal, setCreatedNewOutlet }: AddOutletProps) => {
  const [form] = Form.useForm(); // Ant Design form instance
  const [countries, setCountries] = useState<CountryT[]>([]);
  const [states, setStates] = useState<StateT[]>([]);
  const [loading, setLoading] = useState(false);
  const [defaultTime, setDefaultTime] = useState(dayJS('09:00 AM', 'hh:mm A'));
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

  // Working hours
  const columnWorkingHour: ColumnWorkingHourT[] = [
    { id: 1, day: 'Monday' },
    { id: 2, day: 'Tuesday' },
    { id: 3, day: 'Wednesday' },
    { id: 4, day: 'Thursday' },
    { id: 5, day: 'Friday' },
    { id: 6, day: 'Saturday' },
    { id: 7, day: 'Sunday' },
  ]
  // Handle form submission
  // const handleSubmit = async (values: StoreT) => {
  const handleSubmit = async (values: any) => {
    try {
      console.log('outlet values from form: ', values);

      const workingHours: AddWorkingHourT[] = columnWorkingHour.map((workingHour: any, _: number) => {
        return ({
          dayOfTheWeek: workingHour.day,
          enabled: false,
          openingTime: '09:00',
          closingTime: '09:00',
        });
      });

      console.log('workingHours: ', workingHours);

      const outletData = {
        outletName: values.outletName ? values.outletName : null,
        defaultTax: 15.00,
        email: values.email ? values.email : null,
        phone: values.phoneNumber ? values.phoneNumber: null,
        outletWorkingHours: {
          workingHours,
        },
        address: {
          street: values.outletAddress ? values.outletAddress : null,
          city: values.city ? values.city : null,
          state: values.state ? values.state : null,
          zipCode: values.zipCode ? values.zipCode : null,
          country: values.country ? values.country : null,
       }
      }

      console.log('Create outlet values: ', outletData);

      // return;

      const resOutlet = await addNewOutlet(outletData).unwrap();
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
        // Update the SelectOutlet with the latest data;
        setCreatedNewOutlet(true);

        message.success('Outlet added successfully');
        closeModal();
        form.resetFields(); // Reset form after successful submission
      }

      if (isError) {
        message.success('Failed to add Outlet');
      }
    }

    outletAdded();
  }, [isSuccess]);

  const columns: ColumnsType<ColumnWorkingHourT> = [
    {
      title: 'Day',
      dataIndex: 'day',
      render: (_, workingHour, index) => (
        <div key={index}>
          <span>
            {workingHour.day}
          </span>
          <FormItem
            name={['workingHours', index, 'dayOfTheWeek']}
            noStyle
            hidden
            initialValue={workingHour.day}
          >
            <Input
              type="text"
              style={{ padding: '16px', width: '150px' }}
            />
          </FormItem>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, workingHour, index) => (
        <div key={index}>
          <Space direction="horizontal" style={{ margin: '10px 0' }}>
            <FormItem
              name={['workingHours', index, 'enabled']}
              valuePropName="checked"
              noStyle
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </FormItem>
          </Space>
        </div>
      ),
    },
    {
      title: 'Opening Time',
      dataIndex: 'opening-time',
      render: (_, workingHour, index) => (
        <div key={index}>
          <FormItem
            name={['workingHours', index, 'openingTime']}
            noStyle
            initialValue={defaultTime}
          >
            <TimePicker
              format={'hh:mm A'}
              use12Hours
              allowClear={false}
              onChange={(time: any) => {
                // console.log('time: ', time.format('HH:mm'));
                // // form.setFieldsValue({ time: time ? time.format('HH:mm') : null });

                // form.setFieldValue(
                //   ['workingHours', index, 'openingTime'],
                //   // time.format('HH:mm') : null
                //   time
                // )
              }}
            />
          </FormItem>
        </div>
      ),
    },

    {
      title: 'Closing Time',
      dataIndex: 'closing-time',
      render: (_, workingHour, index) => (
        <div key={index}>
          <FormItem
            name={['workingHours', index, 'closingTime']}
            noStyle
            initialValue={defaultTime}
          >
            <TimePicker
              format={'hh:mm A'}
              use12Hours
              allowClear={false}
            />
          </FormItem>
        </div>
      ),
    },
  ];

  return (
    <>
      <h2>Add new outlet</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ padding: '10px'
      }}>
        <Row gutter={40}>
          <Col span={24}>
            <FormItem>
              <label style={{ paddingBottom: '8px' }}>
                Outlet Name <span style={{ color: 'red' }}>*</span>
              </label>
              <FormItem
                name="outletName"
                noStyle
                rules={[{ required: true, message: 'Outlet Name is required' }]}
              >
                <Input placeholder="Enter outlet name" style={{ padding: '16px' }} />
              </FormItem>
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
            <FormItem name="phoneNumber" label="Phone No">
              <Input placeholder="Enter Phone Number" style={{ padding: '16px' }} />
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={24}>
            <FormItem name="outletAddress" label="Outlet Address">
              <Input placeholder="Enter outlet address" style={{ padding: '16px' }} />
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
            <FormItem>
              <label style={{ paddingBottom: '8px' }}>
                Select State <span style={{ color: 'red' }}>*</span>
              </label>
              <FormItem
                name="state"
                rules={[{ required: true, message: 'State is required' }]}
                noStyle
              >
                <Select placeholder="Select state" style={{ height: 56.5 }}>
                  {states.map((state) => (
                    <Option key={state.id} value={state.stateName}>
                      {state.stateName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </FormItem>
          </Col>
        </Row>

        <Row gutter={40}>
          <Col span={12}>
            <FormItem>
              <label style={{ paddingBottom: '8px' }}>
                Postal Code <span style={{ color: 'red' }}>*</span>
              </label>
              <FormItem
                name="zipCode"
                noStyle
                rules={[{ required: true, message: 'Postal code is required' }]}
              >
                <Input placeholder="Enter postal code" style={{ padding: '16px' }} />
              </FormItem>
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem>
              <label style={{ paddingBottom: '8px' }}>
                Country <span style={{ color: 'red' }}>*</span>
              </label>
              <FormItem
                name="country"
                noStyle
                rules={[{
                  required: true, message: 'Country is required'
                }]}>
                <Select placeholder="Select country" style={{ height: 56.5 }}>
                  {countries.map((country) => (
                    <Option key={country.id} value={country.countryName}>
                      {country.countryName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </FormItem>
          </Col>
        </Row>

        {/* <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
          <p style={{ fontWeight: 600, display: 'inline' }}>Outlet Info</p>
          <Row gutter={40} style={{ marginTop: '20px' }}>
            <Col span={24}>
              <FormItem>
                <label style={{ paddingBottom: '8px' }}>
                  Outlet Name <span style={{ color: 'red' }}>*</span>
                </label>
                <FormItem
                  name="outletName"
                  noStyle
                  rules={[{ required: true, message: 'Outlet Name is required' }]}
                >
                  <Input placeholder="Enter outlet name" style={{ padding: '16px' }} />
                </FormItem>
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
              <FormItem name="phoneNumber" label="Phone No">
                <Input placeholder="Enter Phone Number" style={{ padding: '16px' }} />
              </FormItem>
            </Col>
          </Row>
        </div>

        <div style={{ border: '1px dashed black', padding: '10px', marginTop: '20px' }}>
          <p style={{ fontWeight: 600, display: 'inline' }}>Working Hours</p>
          <Table
          style={{ width: '100% !important', marginTop: '20px' }}
            columns={columns}
            dataSource={workingHours}
            pagination={false}
          />
        </div>

        <div style={{ border: '1px dashed black', padding: '10px', marginTop: '20px' }}>
          <p style={{ fontWeight: 600, display: 'inline' }}>Address</p>
          <Row gutter={40} style={{ marginTop: '20px' }}>
            <Col span={24}>
              <FormItem name="outletAddress" label="Outlet Address">
                <Input placeholder="Enter outlet address" style={{ padding: '16px' }} />
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
              <FormItem>
                <label style={{ paddingBottom: '8px' }}>
                  State <span style={{ color: 'red' }}>*</span>
                </label>
                <FormItem
                  name="state"
                  rules={[{ required: true, message: 'State is required' }]}
                  noStyle
                >
                  <Select placeholder="Select state" style={{ height: 56.5 }}>
                    {states.map((state) => (
                      <Option key={state.id} value={state.stateName}>
                        {state.stateName}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </FormItem>
            </Col>
          </Row>

          <Row gutter={40}>
            <Col span={12}>
              <FormItem>
                <label style={{ paddingBottom: '8px' }}>
                  Postal Code <span style={{ color: 'red' }}>*</span>
                </label>
                <FormItem
                  name="zipCode"
                  noStyle
                  rules={[{ required: true, message: 'Postal code is required' }]}
                >
                  <Input placeholder="Enter postal code" style={{ padding: '16px' }} />
                </FormItem>
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem>
                <label style={{ paddingBottom: '8px' }}>
                  Country <span style={{ color: 'red' }}>*</span>
                </label>
                <FormItem
                  name="country"
                  noStyle
                  rules={[{
                    required: true, message: 'Country is required'
                  }]}>
                  <Select placeholder="Select country" style={{ height: 56.5 }}>
                    {countries.map((country) => (
                      <Option key={country.id} value={country.countryName}>
                        {country.countryName}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </FormItem>
            </Col>
          </Row>
        </div> */}

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
