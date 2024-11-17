import { Eye, Star, Trash2 } from 'react-feather/dist';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import TextEditor from '../../../feature-module/inventory/text-editor';

const NotesModal = () => {
  const initialSettings = {
    endDate: new Date('2020-08-11T12:30:00.000Z'),
    ranges: {
      'Last 30 Days': [new Date('2020-07-12T04:57:17.076Z'), new Date('2020-08-10T04:57:17.076Z')],
      'Last 7 Days': [new Date('2020-08-04T04:57:17.076Z'), new Date('2020-08-10T04:57:17.076Z')],
      'Last Month': [new Date('2020-06-30T18:30:00.000Z'), new Date('2020-07-31T18:29:59.999Z')],
      'This Month': [new Date('2020-07-31T18:30:00.000Z'), new Date('2020-08-31T18:29:59.999Z')],
      Today: [new Date('2020-08-10T04:57:17.076Z'), new Date('2020-08-10T04:57:17.076Z')],
      Yesterday: [new Date('2020-08-09T04:57:17.076Z'), new Date('2020-08-09T04:57:17.076Z')],
    },
    startDate: new Date('2020-08-04T04:57:17.076Z'), // Set "Last 7 Days" as default
    timePicker: false,
  };

  const optionsChoose = [
    { value: 'Choose', label: 'Choose' },
    { value: 'Recent1', label: 'Recent1' },
    { value: 'Recent2', label: 'Recent2' },
  ];

  const optionsSelect = [
    { value: 'Select', label: 'Select' },
    { value: 'Recent1', label: 'Recent1' },
    { value: 'Recent2', label: 'Recent2' },
  ];

  const optionsOnHold = [{ value: 'Onhold', label: 'Onhold' }];

  const optionsPriority = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];
  return (
    <div>
      {/* Add Note */}
      <div className="modal fade" id="note-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Notes</h4>
                  </div>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form action="todo">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Notes Title</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Assignee</label>
                          <Select classNamePrefix="react-select" options={optionsChoose} placeholder="Choose" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label">Tag</label>
                          <Select classNamePrefix="react-select" options={optionsSelect} placeholder="Select" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label">Priority</label>
                          <Select classNamePrefix="react-select" options={optionsSelect} placeholder="Select" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-blocks todo-calendar">
                          <label className="form-label">Due Date</label>
                          <div className="input-groupicon calender-input">
                            <DateRangePicker initialSettings={initialSettings}>
                              <input
                                type="text"
                                className="form-control  date-range bookingrange"
                                placeholder="Select"
                                defaultValue="13 Aug 1992"
                              />
                            </DateRangePicker>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <Select classNamePrefix="react-select" options={optionsSelect} placeholder="Select" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3 summer-description-box notes-summernote">
                          <label className="form-label">Descriptions</label>
                          <TextEditor />
                          <p>Maximum 60 Characters</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Note */}
      {/* Edit Note */}
      <div className="modal fade" id="edit-note-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Notes Title</h4>
                  </div>
                  <div className=" edit-note-head d-flex align-items-center">
                    <Link to="#" className="me-2">
                      <span>
                        <Trash2 />
                      </span>
                    </Link>
                    <Link to="#" className="me-2">
                      <span>
                        <Star />
                      </span>
                    </Link>
                    <Link to="#" className="me-2">
                      <span>
                        <Eye />
                      </span>
                    </Link>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                </div>
                <div className="modal-body custom-modal-body">
                  <form action="todo">
                    <div className="row">
                      <div className="col-12">
                        <div className="input-blocks">
                          <label className="form-label">Note Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Meet Lisa to discuss project details"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-blocks">
                          <label className="form-label">Assignee</label>
                          <Select classNamePrefix="react-select" options={optionsSelect} placeholder="Select" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-blocks">
                          <label className="form-label">Tag</label>
                          <Select classNamePrefix="react-select" options={optionsOnHold} placeholder="Onhold" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-blocks">
                          <label className="form-label">Priority</label>

                          <Select classNamePrefix="react-select" options={optionsPriority} placeholder="Priority" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-blocks todo-calendar">
                          <label className="form-label">Due Date</label>
                          <div className="input-groupicon calender-input">
                            <input
                              type="text"
                              className="form-control date-range bookingrange"
                              placeholder="Select"
                              defaultValue="13 Aug 1992"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-blocks">
                          <label className="form-label">Status</label>
                          <Select classNamePrefix="react-select" options={optionsChoose} placeholder="Choose" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-blocks summer-description-box notes-summernote">
                          <label className="form-label">Descriptions</label>
                          <TextEditor />
                          <p>Maximum 60 Characters</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Note */}
      {/* Delete Note */}
      <div className="modal fade" id="delete-note-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="delete-popup">
                  <div className="delete-image text-center mx-auto">
                    <img src="./assets/img/icons/close-circle.png" alt="Img" className="img-fluid" />
                  </div>
                  <div className="delete-heads">
                    <h4>Are You Sure?</h4>
                    <p>Do you really want to delete this item, This process cannot be undone.</p>
                  </div>
                  <div className="modal-footer-btn delete-footer">
                    <Link to="#" className="btn btn-cancel me-2" data-bs-dismiss="modal">
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-submit">
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Note */}
      {/* View Note */}
      <div className="modal fade" id="view-note-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title edit-page-title">
                    <h4>Notes</h4>
                    <p>Personal</p>
                  </div>
                  <div className=" edit-noted-head d-flex align-items-center">
                    <Link to="#">
                      <span>
                        <i data-feather="trash-2" />
                      </span>
                    </Link>
                    <Link to="#" className="me-2">
                      <span>
                        <i data-feather="star" />
                      </span>
                    </Link>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                </div>
                <div className="modal-body custom-modal-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="edit-head-view">
                        <h6>Meet Lisa to discuss project details</h6>
                        <p>
                          Hiking is a long, vigorous walk, usually on trails or footpaths in the countryside. Walking
                          for pleasure developed in Europe during the eighteenth century. Religious pilgrimages have
                          existed much longer but they involve walking long distances for a spiritual purpose associated
                          with specific religions and also we achieve inner peace while we hike at a local park.
                        </p>
                        <p className="badged high">
                          <i className="fas fa-circle" /> High
                        </p>
                      </div>
                      <div className="modal-footer-btn edit-footer-menu">
                        <Link to="" className="btn btn-cancel me-2" data-bs-dismiss="modal">
                          Close
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /View Note */}
    </div>
  );
};

export default NotesModal;
