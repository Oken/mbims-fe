import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ImageWithBasePath from '../img/imagewithbasebath';

interface SelectStoreProps {
  checkbox: ReactNode; // The checkbox can be any React element, so ReactNode is appropriate
}

const SelectStore: React.FC<SelectStoreProps> = ({ checkbox }) => {
  const status = [
    { value: 'Choose', label: 'Choose' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Admin', label: 'Admin' },
  ];
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const handleToggleConfirmPassword = () => {
    setConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="select_store">
      {/* Edit User */}
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Select stores</h4>
                  </div>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#D5E5FC" />
                        <path
                          d="M14.7578 25.2438L20.0008 20.0008L25.2438 25.2438M25.2438 14.7578L19.9998 20.0008L14.7578 14.7578"
                          stroke="#0D1821"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form className="d-flex flex-column" style={{ gap: 40 }}>
                    {checkbox}
                    <div className="stores">
                      <div className="_header">
                        <h6>&nbsp;</h6>
                        <h6>Store</h6>
                      </div>

                      <div className="stores-list">
                        <div className="store">
                          <div className="checkbox">
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </div>
                          <div className="name">Maller</div>
                        </div>
                        <div className="store">
                          <div className="checkbox">
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </div>
                          <div className="name">Maller</div>
                        </div>
                        <div className="store">
                          <div className="checkbox">
                            <label className="checkboxs">
                              <input type="checkbox" />
                              <span className="checkmarks" />
                            </label>
                          </div>
                          <div className="name">Maller</div>
                        </div>
                      </div>
                    </div>

                    <p className="create_new d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M9.16699 10.8327H4.16699V9.16602H9.16699V4.16602H10.8337V9.16602H15.8337V10.8327H10.8337V15.8327H9.16699V10.8327Z"
                          fill="#F45D01"
                        />
                      </svg>
                      <span>Create a new store</span>
                    </p>

                    <div className="modal-footer-btn d-flex  align-items-center justify-content-center">
                      <Link to="#" className="next_btn btn-submit">
                        Next
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit User */}
    </div>
  );
};

export default SelectStore;
