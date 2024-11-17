import { useState } from 'react';
import ImageWithBasePath from '../../../core/img/imagewithbasebath';
import { Link } from 'react-router-dom';
import { all_routes } from '../../../Router/all_routes';

const Signin = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const route = all_routes;
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper">
          <div className="login-content" style={{ width: '100%' }}>
            <form className="login-userset">
              <div className="login-userheading">
                <h3>Sign In</h3>
              </div>
              <div className="form-login mb-3">
                <label className="form-label">Email Address</label>
                <div className="form-addons">
                  <input type="text" className="form- control" />
                  <ImageWithBasePath src="assets/img/icons/mail.svg" alt="img" />
                </div>
              </div>
              <div className="form-login mb-3">
                <label className="form-label">Password</label>
                <div className="pass-group">
                  <input type={isPasswordVisible ? 'text' : 'password'} className="pass-input form-control" />
                  <span
                    className={`fas toggle-password ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                    onClick={togglePasswordVisibility}
                  ></span>
                </div>
              </div>
              <div className="form-login authentication-check">
                <div className="row">
                  <div className="col-12 d-flex align-items-center justify-content-between">
                    <div className="custom-control custom-checkbox">
                      <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                        <input type="checkbox" className="form-control" />
                        <span className="checkmarks" />
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-login">
                <Link to={route.dashboard} className="btn btn-login">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
