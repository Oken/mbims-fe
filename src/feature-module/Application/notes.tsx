import { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Sliders } from 'react-feather';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { ChevronUp, RotateCcw } from 'react-feather';
import { PlusCircle } from 'react-feather';
import NotesModal from '../../core/modals/applications/notes-modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleShowHeader } from '../../store/feature-slice/utils';
import NotesContent from './notes-content';

const Notes = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const showHeader = useAppSelector((state) => state.slices.showHeader);
  const options = [
    { value: 'sortByDate', label: 'Sort by Date' },
    { value: 'Ascending', label: 'Ascending' },
    { value: 'Descending', label: 'Descending' },
    { value: 'Recently Viewed', label: 'Recently Viewed' },
    { value: 'Recently Added', label: 'Recently Added' },
    { value: 'Creation Date', label: 'Creation Date' },
  ];

  const renderRefreshTooltip = (props: TooltipProps) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props: TooltipProps) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );
  return (
    <div className={`page-wrapper notes-page-wrapper ${isOpen && 'notes-tag-left'}`}>
      <div className="content">
        <div className="page-header page-add-notes flex-sm-row flex-column">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Notes</h4>
              <h6>Manage your tasks</h6>
            </div>
            <Link id="toggle_btn2" className="notes-tog" to="#" onClick={() => setOpen(!isOpen)}>
              <i className="fas fa-chevron-left" />
            </Link>
          </div>
          <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start">
            <div className="input-block add-lists todo-inbox-check">
              <label className="checkboxs">
                <input type="checkbox" defaultChecked />
                <span className="checkmarks" />
                Mark all as Complete
              </label>
            </div>
            <div className="form-sort me-2 mb-sm-0 mb-3 stylewidth">
              <Sliders className="info-img" />
              <Select
                className="img-select"
                classNamePrefix="react-select"
                options={options}
                placeholder="Sort by Date"
              />
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link to="" data-bs-toggle="tooltip" data-bs-placement="top">
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    to=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={showHeader ? 'active' : ''}
                    onClick={() => {
                      dispatch(toggleShowHeader());
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
            <div className="page-btn">
              <Link to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#note-units">
                <PlusCircle className="me-2" /> Add Task{' '}
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className={`col-xl-3 col-md-12 sidebars-right theiaStickySidebar section-bulk-widget  ${
              isOpen && 'section-notes-dashboard'
            }`}
          >
            <div className="notes-dash">
              <div className="notes-top-head">
                <h5>
                  {' '}
                  <i data-feather="file-text" className="feather-file-text me-1" /> Notes
                </h5>
              </div>
              <div className="notes-top-head-subMenu">
                <div
                  className="nav flex-column nav-pills todo-inbox"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link todo-tab todo-inbox active d-flex align-items-center"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="true"
                  >
                    {' '}
                    <i data-feather="inbox" className="feather-inbox me-2" />
                    All Notes
                    <span className="ms-auto">
                      <span>2</span>
                    </span>
                  </button>
                  <button
                    className="nav-link todo-tab-btn todo-inbox"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    {' '}
                    <i data-feather="star" className="feather-star me-2" /> Important
                  </button>
                  <button
                    className="nav-link todo-tab todo-inbox mb-0"
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    {' '}
                    <i data-feather="trash-2" className="feather-trash-2 me-2" />
                    Trash
                  </button>
                </div>
              </div>
              <div className="content-subMenu-tag">
                <h6>Tags</h6>
                <ul className="tags-list">
                  <li className="personal">
                    <Link to="#">
                      <span>
                        <i className="fas fa-square" />
                      </span>
                      Pending
                    </Link>
                  </li>
                  <li className="social">
                    <Link to="#">
                      <span>
                        <i className="fas fa-square" />
                      </span>
                      Onhold
                    </Link>
                  </li>
                  <li className="public">
                    <Link to="#">
                      <span>
                        <i className="fas fa-square" />
                      </span>
                      Inprogress
                    </Link>
                  </li>
                  <li className="work">
                    <Link to="#">
                      <span>
                        <i className="fas fa-square" />
                      </span>
                      Done
                    </Link>
                  </li>
                </ul>
                <h6>Priority</h6>
                <ul className="priority-list">
                  <li className="medium">
                    <Link to="#">
                      <span>
                        <i className="fas fa-square" />
                      </span>
                      Medium
                    </Link>
                  </li>
                  <li className="high">
                    <Link to="#">
                      <span>
                        <i className="fas fa-square" />
                      </span>
                      High
                    </Link>
                  </li>
                  <li className="low">
                    <Link to="#">
                      <span>
                        <i className="fas fa-square" />
                      </span>
                      Low
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`col-xl-9 budget-role-notes  ${isOpen && 'budgeted-role-notes'}`}>
            {isOpen ? (
              <NotesContent />
            ) : (
              <Scrollbars>
                <NotesContent />
              </Scrollbars>
            )}
          </div>
        </div>
        <NotesModal />
      </div>
    </div>
  );
};

export default Notes;
