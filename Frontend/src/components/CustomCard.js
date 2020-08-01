import React from "react";

export default function CustomCard(props) {
  return (
    <div className="col-12 col-md-3">
      <div className="card-deck top-dashboard-card">
        <div className="card border border-light">
          <div className="card-body">
            <p className="card-title">{props.name}</p>
            <h4 className="card-num">{props.num}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
