import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CountryT, OutletT, StateT, WorkingHourT } from '../../../../../types/product-types';
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
  useEditOutletMutation,

  // Selectors

  selectAllCountries,
  selectAllStates,
} from '../../../../../store/feature-slice/products'

const { Item: FormItem } = Form;
const { Option } = Select;

interface EditOutletProps {
  closeEditOutletModal: () => void;
  outlet: OutletT | null;
  setEditedOutlet: (value: boolean) => void;
}

const EditOutletForm = ({
  closeEditOutletModal,
  outlet,
  setEditedOutlet,
 }: EditOutletProps) => {
  const [form] = Form.useForm(); // Ant Design form instance
  const [countries, setCountries] = useState<CountryT[]>([]);
  const [states, setStates] = useState<StateT[]>([]);
  const [defaultTime, setDefaultTime] = useState(dayJS('09:00 AM', 'hh:mm A'));
  const [outletToEdit, setOutletToEdit] = useState(outlet);
  const [sortedWorkingHour, setSortedWorkingHour] = useState<WorkingHourT[]>([])

  // Update the form input when the outlet changes
  useEffect(() => {
    setOutletToEdit(outlet);
  }, [outlet]);

  // console.log('outletToEdit: ', outletToEdit, 'outlet: ', outlet);

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

  const [editOutlet, { isLoading, isSuccess, isError, error }] = useEditOutletMutation();
  // Handle form submission
  // const handleSubmit = async (values: StoreT) => {
  const handleSubmit = async (values: any) => {
    try {
      // setLoading(true);
      console.log('outlet values from form: ', values);

      const rawWorkingHours = values.workingHours.map((workingHour: any, _: number) => {
        // if (workingHour.enabled) {
        //   // Convert the time object to a 24hr string format `09:00`
        //   workingHour.openingTime = workingHour.openingTime.format('HH:mm');
        //   workingHour.closingTime = workingHour.closingTime.format('HH:mm');

        //   return workingHour
        // }


        // Convert the time object to a 24hr string format `09:00`
        workingHour.openingTime = workingHour.openingTime.format('HH:mm');
        workingHour.closingTime = workingHour.closingTime.format('HH:mm');

        if (!workingHour.enabled) {
          workingHour.enabled = false;
        }

        return workingHour

      });

      const workingHours = rawWorkingHours.filter((workingHour: any) => workingHour);

      console.log('workingHours: ', workingHours);

      const outletData = {
        id: values.outletId,
        outletName: values.outletName ? values.outletName : null,
        defaultTax: 15.00,
        email: values.email ? values.email : null,
        phone: values.phoneNumber ? values.phoneNumber: null,
        outletWorkingHours: workingHours ? {
          id: values.outletWorkingHoursId,
          outletId: values.outletId,
          workingHours: workingHours,
       } : null,
        address: values.country ? {
          id: values.addressId,
          street: values.outletAddress ? values.outletAddress : null,
          city: values.city ? values.city : null,
          state: values.state ? values.state : null,
          zipCode: values.zipCode ? values.zipCode : null,
          country: values.country ? values.country : null,
       } : null
      }

      console.log('Edit outlet values: ', outletData);

      // return;

      const resOutlet = await editOutlet(outletData).unwrap();
      console.log('resStore: ', resOutlet, 'isSuccess: ', isSuccess);

      if (isError) {
        throw error;
      }
    } catch (err) {
      message.error('Failed to edit outlet');
      console.log('Failed to edit outlet', err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const outletAdded = async () => {
      if (isSuccess) {
        setEditedOutlet(true);

        message.success('Outlet updated successfully');
        closeEditOutletModal();
        // form.resetFields(); // Reset form after successful submission
      }
    }

    outletAdded();
  }, [isSuccess]);

  // Working hours
  // const workingHours: WorkingHourT[] = [
  //   { id: 1, day: 'Monday' },
  //   { id: 2, day: 'Tuesday' },
  //   { id: 3, day: 'Wednesday' },
  //   { id: 4, day: 'Thursday' },
  //   { id: 5, day: 'Friday' },
  //   { id: 6, day: 'Saturday' },
  //   { id: 7, day: 'Sunday' },
  // ]

  const daysOrder: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const sortWorkingHours = () => {
    const workingHours = outletToEdit?.outletWorkingHours?.workingHours;

    const sortedWorkingHour = workingHours?.slice().sort(
      (a, b) => daysOrder.indexOf(a.dayOfTheWeek) - daysOrder.indexOf(b.dayOfTheWeek)
    ) as unknown as WorkingHourT[];

    console.log('Not sorted: ', outletToEdit?.outletWorkingHours?.workingHours, '\nsortedWorkingHour: ', sortedWorkingHour);

    setSortedWorkingHour(sortedWorkingHour);
  }

  // Populate the fields with the most current item
  useEffect(() => {
    form.setFieldValue('outletId', outletToEdit?.id);
    form.setFieldValue('outletName', outletToEdit?.outletName);
    form.setFieldValue('outletWorkingHoursId', outletToEdit?.outletWorkingHours?.id);
    form.setFieldValue('email', outletToEdit?.email);
    form.setFieldValue('phoneNumber', outletToEdit?.phone);
    form.setFieldValue('addressId', outletToEdit?.address?.id);
    form.setFieldValue('outletAddress', outletToEdit?.address?.street);
    form.setFieldValue('city', outletToEdit?.address?.city);
    form.setFieldValue('state', outletToEdit?.address?.state);
    form.setFieldValue('zipCode', outletToEdit?.address?.zipCode);
    form.setFieldValue('country', outletToEdit?.address?.country);

    // Sort the working hours
    sortWorkingHours();

  }, [outletToEdit]);

  const columns: ColumnsType<WorkingHourT> = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'dayOfTheWeek',
      render: (_, workingHour, index) => (
        <div key={index}>
          <span>
            {workingHour.dayOfTheWeek}
            {workingHour.id}
          </span>

          <FormItem
            noStyle
            shouldUpdate={(prev, cur) => {
              return prev.outletId != cur.outletId;
            }}
          >
            {() => {
              // Updates the field with the most current change
              form.setFieldValue(
                ['workingHours', index, 'id'],
                workingHour.id
              );

              return (
                <FormItem
                  name={['workingHours', index, 'id']}
                  noStyle
                  hidden
                >
                </FormItem>
              )
            }}
          </FormItem>

          <FormItem
            noStyle
            shouldUpdate={(prev, cur) => {
              return prev.outletId != cur.outletId;
            }}
          >
            {() => {
              // Updates the field with the most current change
              form.setFieldValue(
                ['workingHours', index, 'dayOfTheWeek'],
                workingHour.dayOfTheWeek
              );

              return (
                <FormItem
                  name={['workingHours', index, 'dayOfTheWeek']}
                  noStyle
                  hidden
                >
                </FormItem>
              )
            }}
          </FormItem>
        </div>
      ),
      // sorter: (a, b) => daysOrder.indexOf(a.dayOfTheWeek) - daysOrder.indexOf(b.dayOfTheWeek),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'enabled',
      render: (_, workingHour, index) => (
        <div key={index}>
          <Space direction="horizontal" style={{ margin: '10px 0' }}>
            <FormItem
              noStyle
              shouldUpdate={(prev, cur) => {
                // console.log('form.getFieldValue: ', form.getFieldValue(['workingHours', index, 'enabled']), '\nprev: ', prev);
                // form.setFieldValue(
                //   ['workingHours', index, 'enabled'],
                //   workingHour.enabled
                // );
                return prev.outletId != cur.outletId;
              }}
            >
              {() => {
                // Updates the field with the most current change
                form.setFieldValue(
                  ['workingHours', index, 'enabled'],
                  workingHour.enabled
                );

                return (
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
                )
              }}
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
            noStyle
            shouldUpdate={(prev, cur) => {
              return prev.outletId != cur.outletId;
            }}
          >
            {() => {
              // Updates the field with the most current change
              form.setFieldValue(
                ['workingHours', index, 'openingTime'],
                workingHour.openingTime ?
                  dayJS(
                    // Converts 24h format to 12h format (09:00 AM) string
                    dayJS(workingHour.openingTime, 'HH:mm:ss').format('hh:mm A'),
                    'hh:mm A' // Converts time string back to dayJS object
                  ) : defaultTime
              );

              return (
                <FormItem
                  name={['workingHours', index, 'openingTime']}
                  noStyle
                  // initialValue={
                  //   workingHour.openingTime ?
                  //     dayJS(
                  //       // Converts 24h format to 12h format (09:00 AM) string
                  //       dayJS(workingHour.openingTime, 'HH:mm:ss').format('hh:mm A'),
                  //       'hh:mm A' // Converts time string back to dayJS object
                  //     ) : defaultTime
                  // }
                >
                  <TimePicker
                    format={'hh:mm A'}
                    use12Hours
                    allowClear={false}
                  />
                </FormItem>
              )
            }}
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
            noStyle
            shouldUpdate={(prev, cur) => {
              return prev.outletId != cur.outletId;
            }}
          >
            {() => {
              // Updates the field with the most current change
              form.setFieldValue(
                ['workingHours', index, 'closingTime'],
                workingHour.closingTime ?
                  dayJS(
                    // Converts 24h format to 12h format (09:00 AM) string
                    dayJS(workingHour.closingTime, 'HH:mm:ss').format('hh:mm A'),
                    'hh:mm A' // Converts time string back to dayJS object
                  ) : defaultTime
              );

              return (
                <FormItem
                  name={['workingHours', index, 'closingTime']}
                  noStyle
                  // initialValue={
                  //   workingHour.closingTime ?
                  //     dayJS(
                  //       // Converts 24h format to 12h format (09:00 AM) string
                  //       dayJS(workingHour.closingTime, 'HH:mm:ss').format('hh:mm A'),
                  //       'hh:mm A' // Converts time string back to dayJS object
                  //     ) : defaultTime
                  // }
                >
                  <TimePicker
                    format={'hh:mm A'}
                    use12Hours
                    allowClear={false}
                  />
                </FormItem>
              )
            }}
          </FormItem>
        </div>
      ),
    },
  ];

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
        <div style={{ border: '1px dashed black', padding: '10px', marginTop: '10px' }}>
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
                  // initialValue={outletToEdit?.outletName}
                >
                  <Input placeholder="Enter outlet name" style={{ padding: '16px' }} />
                </FormItem>
                <FormItem
                  name="outletId"
                  noStyle
                  hidden
                // initialValue={outletToEdit?.id}
                >
                  <Input placeholder="Enter outlet id" style={{ padding: '16px' }} />
                </FormItem>
              </FormItem>
            </Col>
          </Row>

          <Row gutter={40}>
            <Col span={12}>
              <FormItem
                name="email"
                label="Email Address"
                // initialValue={outletToEdit?.email}
                >
                <Input placeholder="Enter Email Address" style={{ padding: '16px' }} />
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                name="phoneNumber"
                label="Phone No"
                // initialValue={outletToEdit?.phone}
                >
                <Input placeholder="Enter Phone Number" style={{ padding: '16px' }} />
              </FormItem>
            </Col>
          </Row>
        </div>

        <div style={{ border: '1px dashed black', padding: '10px', marginTop: '20px' }}>
          <p style={{ fontWeight: 600, display: 'inline' }}>Address</p>
          <Row gutter={40} style={{ marginTop: '20px' }}>
            <Col span={24}>
              <FormItem
                name="addressId"
                hidden
              // initialValue={outletToEdit?.address?.street}
              >
                <Input style={{ padding: '16px' }} />
              </FormItem>
              <FormItem
                name="outletAddress"
                label="Outlet Address"
                // initialValue={outletToEdit?.address?.street}
                >
                <Input placeholder="Enter outlet address" style={{ padding: '16px' }} />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={40}>
            <Col span={12}>
              <FormItem
                name="city"
                label="City"
                // initialValue={outletToEdit?.address?.city}
                >
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
                  // initialValue={outletToEdit?.address?.state}
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
                  // initialValue={outletToEdit?.address?.zipCode}
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
                  }]}
                  // initialValue={outletToEdit?.address?.country}
                  >
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
        </div>

        <div style={{ border: '1px dashed black', padding: '10px', marginTop: '20px' }}>
          <p style={{ fontWeight: 600, display: 'inline' }}>Working Hours</p>
          <Table
            style={{ width: '100% !important', marginTop: '20px' }}
            columns={columns}
            dataSource={sortedWorkingHour}
            pagination={false}
          />
          <FormItem
            name="outletWorkingHoursId"
            noStyle
            hidden
          // initialValue={outletToEdit?.id}
          >
            <Input placeholder="Enter outlet working hours id" style={{ padding: '16px' }} />
          </FormItem>
        </div>

        {/* {loading && <div style={{ textAlign: 'center' }}>Loading...</div>} */}

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

export default EditOutletForm;
