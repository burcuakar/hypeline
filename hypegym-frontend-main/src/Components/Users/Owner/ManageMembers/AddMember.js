import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { createUser, apiMe, assignPT, getTrainers } from "../../../API";
import AuthContext from "../../../Contexts/AuthContext";
import "./Style.css";

function AddMember({ gym_id, setIsSubmit }) {
  const [trainers, setTrainers] = useState(); // personal trainers
  const { gymId } = useContext(AuthContext);

  const membershipTimes = [
    { name: "1 month", code: 1 },
    { name: "2 months", code: 2 },
    { name: "3 months", code: 3 },
    { name: "6 months", code: 6 },
    { name: "9 months", code: 9 },
    { name: "12 months", code: 12 },
  ];

  useEffect(() => {
    getTrainers(gymId).then((response) => {
      setTrainers(response.data);
    });
  }, []);

  const [showMessage, setShowMessage] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone_number: "",
      password: "",
      trainer: "",
      gender: "",
      membership: 0,
      role: "MEMBER",
      gym_id: 0,
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) errors.name = "Name is required.";
      if (!data.password) errors.password = "Password is required.";
      if (!data.address) errors.address = "Address is required.";
      if (!data.phone_number) errors.phone_number = "Phone Number is required.";
      if (!data.gender) errors.gender = "You need to choose a gender.";
      if (!data.trainer) trainers.gender = "You need to choose a trainer.";
      if (!data.email) errors.email = "Email is required.";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]/i.test(data.email))
        errors.email = "Invalid email address. E.g. example@email.com";

      return errors;
    },
    onSubmit: async (data) => {
      data.gym_id = gym_id;
      const response = await createUser(data);
      if (response.status === 201) {
        setShowMessage(true);
        formik.resetForm();
        setIsSubmit(201);
      } else alert("Something went wrong");
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  return (
    <div>
      <Button
        label="ADD MEMBER"
        icon="pi pi-plus"
        onClick={() => onClick("displayBasic")}
      />
      <Dialog
        visible={displayBasic}
        style={{ width: "40vw" }}
        onHide={() => onHide("displayBasic")}
      >
        <div className="form-demo">
          <Dialog
            visible={showMessage}
            onHide={() => setShowMessage(false)}
            position="top"
            footer={dialogFooter}
            showHeader={false}
            breakpoints={{ "960px": "80vw" }}
            style={{ width: "30vw" }}
          >
            <div className="flex align-items-center flex-column pt-6 px-3">
              <i
                className="pi pi-check-circle"
                style={{ fontSize: "5rem", color: "var(--green-500)" }}
              ></i>
              <h5>Registration Successful!</h5>
              <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                Your new member is registered
              </p>
            </div>
          </Dialog>

          <div className="flex justify-content-center">
            <div className="card">
              <h5 className="text-center">ADD NEW MEMBER</h5>
              <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("name"),
                      })}
                    />
                    <label
                      htmlFor="name"
                      className={classNames({
                        "p-error": isFormFieldValid("name"),
                      })}
                    >
                      Name*
                    </label>
                  </span>
                  {getFormErrorMessage("name")}
                </div>
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <InputText
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className={classNames({
                        "p-invalid": isFormFieldValid("email"),
                      })}
                    />
                    <label
                      htmlFor="email"
                      className={classNames({
                        "p-error": isFormFieldValid("email"),
                      })}
                    >
                      Email*
                    </label>
                  </span>
                  {getFormErrorMessage("email")}
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("address"),
                      })}
                    />
                    <label
                      htmlFor="address"
                      className={classNames({
                        "p-error": isFormFieldValid("address"),
                      })}
                    >
                      Address*
                    </label>
                  </span>
                  {getFormErrorMessage("address")}
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <InputText
                      id="phone_number"
                      name="phone_number"
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                      autoFocus
                      className={classNames({
                        "p-invalid": isFormFieldValid("phone_number"),
                      })}
                    />
                    <label
                      htmlFor="phone_number"
                      className={classNames({
                        "p-error": isFormFieldValid("phone_number"),
                      })}
                    >
                      Phone Number*
                    </label>
                  </span>
                  {getFormErrorMessage("phone_number")}
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Password
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      toggleMask
                      className={classNames({
                        "p-invalid": isFormFieldValid("password"),
                      })}
                    />
                    <label
                      htmlFor="password"
                      className={classNames({
                        "p-error": isFormFieldValid("password"),
                      })}
                    >
                      Password*
                    </label>
                  </span>
                  {getFormErrorMessage("password")}
                </div>

                <div className="field">
                  <Dropdown
                    name="trainer"
                    value={formik.values.trainer}
                    options={trainers}
                    onChange={formik.handleChange}
                    placeholder="Select a Trainer "
                    optionLabel="name"
                  />
                </div>

                <div className="field">
                  <Dropdown
                    name="membership"
                    value={formik.values.membership}
                    optionLabel="name"
                    options={membershipTimes}
                    onChange={formik.handleChange}
                    placeholder="Select Membership Time"
                  />
                </div>

                <div className="field-radiobutton">
                  <RadioButton
                    checked={formik.values.gender === "MALE"}
                    inputId="gender1"
                    name="gender"
                    value="MALE"
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="gender1">Male</label>
                </div>
                <div className="field-radiobutton">
                  <RadioButton
                    checked={formik.values.gender === "FEMALE"}
                    inputId="gender2"
                    name="gender"
                    value="FEMALE"
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="gender2">Female</label>
                </div>
                <Button type="submit" label="Submit" className="mt-2" />
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AddMember;
