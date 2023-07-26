import React, { useContext, useEffect, useState } from "react";
import { apiMe, getUser } from "../../API";
import AuthContext from "../../Contexts/AuthContext";
import "./profile.css";

function Profile() {
  const { me } = useContext(AuthContext);

  if (me) {
    return (
      <div id="main_profile">
        <div className="container">
          <div className="main-body">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://100k-faces.glitch.me/random-image"
                      alt="Admin"
                      className="rounded-circle"
                    />
                    <div className="mt-3">
                      <h4>{me.name}</h4>
                      <p className="text-muted font-size-sm">{me.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>

                    <div className="col-sm-9 text-secondary">{me.name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{me.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {me.phone_number}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gym Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">HYPEGYM</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{me.address}</div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
