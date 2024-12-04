/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useState, Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ColumnsType } from 'antd/es/table';
import { OutletT } from '../../../types/product-types';

import { Col, Form, FormInstance, Row, Select, Input, Table } from 'antd';
import CustomButton from '../../components/button';
import { Download, Upload, Plus } from 'react-feather';
import FeatherIcon from 'feather-icons-react';
import {
  // Queries
  useGetOutletsQuery,

  // Mutations
  useDeleteOutletMutation,

  // Selectors
  selectAllOutlets,
} from '../../../store/feature-slice/products';
import CustomModal, { CustomModalRef } from '../../../custom-modal';
import EditOutletForm from '../../components/button/forms/outlets/edit-outlet';

const { Item: FormItem } = Form;
const Option = Select.Option;

const OutletList = () => {
  const navigate = useNavigate();

  const [outlets, setOutlets] = useState<OutletT[]>([])
  const [editedOutlet, setEditedOutlet] = useState<boolean>(false);
  const [outletToEdit, setOutletToEdit] = useState<OutletT | null>(null)

  const editOutletModalRef = useRef<CustomModalRef>(null);

  const MySwal = withReactContent(Swal);

  const [deleteOutlet, {
    isLoading: isOutletDeletionLoading,
    isError: isOutletDeletionError,
    isSuccess: isOutletDeletionSuccess,
    error: outletDeletionError,
  }] = useDeleteOutletMutation();

  const showConfirmationAlert = async (id: number) => {
    const result = await MySwal.fire({
      title: "<h3 style={{ color: 'black' }}>Delete this outlet?</h3>",
      text: 'You won\'t be able to revert this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D5E5FC',
      cancelButtonColor: '#FF3B3B',
      padding: '20px 10px',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        // Wait for product deletion
        const deletedOutlet = await deleteOutlet(id);
        console.log('deletedOutlet: ', deletedOutlet);
      } catch (error) {
        console.error('Error deleting outlet:', error, outletDeletionError);
      }
    } else {
      MySwal.close();
    }
  };

  // for deleting items
  useEffect(() => {
    const deletingOutlet = async () => {
      // setLoading(true);
      if (isOutletDeletionSuccess) {
        // Close any currently opened modal
        MySwal.close();
        // message message
        await MySwal.fire({
          title: 'Deleted!',
          text: 'Outlet has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        return;
      }

      if (isOutletDeletionLoading) {
        // Show deleting message
        await MySwal.fire({
          title: 'Please wait',
          text: 'Deleting...',
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
        });
      }

      if (isOutletDeletionError) {
        MySwal.fire('Error', 'Failed to delete the outlet.', 'error');
      }
    };
    deletingOutlet();
  }, [isOutletDeletionLoading]);

  const {
    error: outletError,
    isError: isOutletFetchingError,
    isSuccess: isOutletFetchingSuccess,
    isLoading: isOutletFetching,
  } = useGetOutletsQuery([]);
  const fetchedOutlets = useSelector(selectAllOutlets);

  useEffect(() => {
    const loadOutlets = async () => {
      try {
        if (isOutletFetchingSuccess) {
          console.log('fetchedOutlets: ', fetchedOutlets, '\noutlets: ', outlets);
          setOutlets(fetchedOutlets);
          return;
        }

        if (isOutletFetchingError) {
          console.log('outletError', outletError);
          throw outletError;
        }
      } catch (err) {
        console.error('Failed to fetch outlet: ', err);
      }
    };

    loadOutlets();
  }, [
    isOutletFetching,
    // Update category list after new is created or updated
    fetchedOutlets,
    editedOutlet,
  ]);

  const openEditOutletModal = () => {
    editOutletModalRef.current?.openModal();
  };

  const closeEditOutletModal = () => {
    editOutletModalRef.current?.closeModal();
  };

  const columns: ColumnsType<OutletT> = [
    {
      title: 'Outlet Name',
      dataIndex: 'name',
      render: (_, outlet, index) => (
        <Fragment key={index}>
          <span>
            {outlet.outletName}
          </span>
        </Fragment>
      ),
    },
    {
      title: 'Default Tax',
      dataIndex: 'default-tax',
      render: (_, outlet, index) => (
        <Fragment key={index}>
          <span>
            {outlet.defaultTax}
          </span>
        </Fragment>
      ),
    },
    {
      title: 'Cash Registers',
      dataIndex: 'cash-registers',
      render: (_, outlet, index) => (
        <Fragment key={index}>
          <span>
          </span>
        </Fragment>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, outlet, index) => (
        <Fragment key={index}>
          <span>
          </span>
        </Fragment>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      render: (_, outlet, index) => (
        <Fragment key={index}>
          <div className="action-table-data">
            <div className="edit-delete-action" style={{ justifyContent: 'start' }}>
              <Link
                className="me-2"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => {
                  setOutletToEdit(outlet);
                  openEditOutletModal();
                  setEditedOutlet(false);
                }}
              >
                <FeatherIcon icon="edit" className="feather-edit" />
              </Link>
              <Link
                className="confirm-text"
                style={{ border: '1px solid #173F77' }}
                to="#"
                onClick={() => showConfirmationAlert(outlet.id)}
              >
                <FeatherIcon icon="trash-2" className="feather-trash-2" />
              </Link>
            </div>
          </div>
        </Fragment>
      ),
    },
  ];

  return (
    <>
      <CustomModal
        ref={editOutletModalRef}
        width={'800px'}
        content={<EditOutletForm
          closeEditOutletModal={closeEditOutletModal}
          outlet={outletToEdit}
          setEditedOutlet={setEditedOutlet}
        />}
      />
      <div className="page-wrapper">
        <div className="content">
          <div>
            <Row gutter={40} style={{
              width: '100%',
              margin: '0px 0px 20px 0px',
            }}
            >
              <Col span={10} style={{ paddingLeft: 0 }}>
                <div className="page-title">
                  <h4>Outlets & Cash Registers</h4>
                  {/* <h6>Manage your categories</h6> */}
                </div>
              </Col>
              <Col span={14} style={{ paddingRight: 0 }}>
                <Row
                  gutter={40}
                  style={{ width: '100%', margin: '0px 0px 20px 0px' }} justify={'end'}
                >
                  <Col style={{ maxWidth: 'fit-content', paddingRight: 0 }}>
                    <CustomButton
                      backgroundColor="#2D7DEE"
                      textColor="white"
                      className="search-button"
                      onClick={() => {
                        navigate('/add-outlet')
                      }}
                    >
                      <Plus className="me-2" />
                      Add New Outlet
                    </CustomButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/* /product list */}
          <div className="card table-list-card" style={{ padding: 0 }}>
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={outlets} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};

export default OutletList;
