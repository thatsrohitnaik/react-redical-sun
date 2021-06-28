import React from 'react';
import './style.css';

function Subscription(props) {
  const { status, dueOn } = props;
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const today = month + '/' + date + '/' + year;
  const date1 = new Date(today);
  const date2 = new Date(dueOn);
  const diffTime = date2 - date1;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays, today, date1, date2);
  return (
    <div className="" style={{ marginTop: 15 }}>
      <div className="card text-center">
        <div
          className={
            status === 'Active' ? 'success card-header' : 'danger card-header'
          }
        >
          {status === 'Active' ? 'Active' : 'Expired'}
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a className="btn btn-primary">Button</a>
        </div>
        <div className="card-footer text-muted">
          {diffDays > 0
            ? 'Due in: ' + diffDays + ' days'
            : 'Expired on: ' + dueOn}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
