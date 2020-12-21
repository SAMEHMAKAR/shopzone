import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <div>
      <ul className="nav navbar-nav">
        <li>
          <form action="" className="navbar-form">
            <div className="form-group">
              <div className="input-group">
                <input type="search" onChange={(e) => setName(e.target.value)} name="q" id="q" placeholder="Search Here..." className="form-control" />
                <span className="input-group-addon primary" onClick={submitHandler}><span className="glyphicon glyphicon-search"></span></span>
              </div>
            </div>
          </form>
        </li>
      </ul>
    </div>
  );
}
