import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { ProgressSpinner } from "primereact/progressspinner";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  assignProgram,
  assignPT,
  getExercise,
  getExercises,
  getMemberProgram,
  getUser,
} from "../../../API";
import AddMember from "./AddMeasurementExercise";
import "./styleManage.css";
import { apiMe, getMemberOfPT } from "../../../API";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "react-bootstrap";

// const members = [
//   { exercise: "squat", reps: "4x12" },
//   { exercise: "bench press", reps: "4x12" },
//   { exercise: "Upright Row", reps: "4x12" },
//   { exercise: "Seated Overhead Press", reps: "4x12" },
//   { exercise: "Pull Ups", reps: "4x12" },
// ];

const exerciseList = [
  {
    code: 1,
    name: "3/4 Sit-Up",
  },
  {
    code: 2,
    name: "Band Pull Apart",
  },
  {
    code: 3,
    name: "Crunches",
  },
  {
    code: 4,
    name: "Decline Push-Up",
  },
  {
    code: 5,
    name: "Inchworm",
  },
  {
    code: 6,
    name: "Heaving Snatch Balance",
  },
  {
    code: 7,
    name: "Incline Cable Flye",
  },
  {
    code: 8,
    name: "Bench Press - With Bands",
  },
  {
    code: 9,
    name: "Quick Leap",
  },
  {
    code: 10,
    name: "Bicycling",
  },
];

const ManageMembersPT = () => {
  const [members, setMembers] = useState([]);
  const [membersProgram, setMembersProgram] = useState([]);
  const [position, setPosition] = useState("center");
  const [exercise1, setExercise1] = useState();
  const [programlar, setProgramlar] = useState([]);
  const [memberId, setMemberId] = useState();

  const [showMessage, setShowMessage] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [isSubmit, setIsSubmit] = useState(0);
  const [gymId, setGymId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);
  const [selectedexercises, setselectedexercises] = useState(null);

  const [exercises, setExercises] = useState();

  useEffect(() => {
    // getExercises().then((res) => {
    //   setExercises(res.data);
    //   console.log(res.data);
    // });

    apiMe().then((response) => {
      getMemberOfPT(response.data.ID).then((res) => {
        res.data.members.map((member) => {
          //Member names
          getUser(member.user_id)
            .then((res) => {
              member = {
                ...member,
                ["name"]: res.data.name,
              };
              setMembers((prev) => [...prev, member]);
            })
            .catch((err) => console.log(err));

          getMemberProgram(member.user_id)
            .then((res) => {
              member["programs"] = res.data.programs.map(
                (item) => item.exercise.name + " "
              );
              member["set_num"] = res.data.programs.map(
                (item) => item.set + " "
              );
              member["repetition"] = res.data.programs.map(
                (item) => item.repetition + " "
              );
              // console.log(member);

              // for (let i = 0; i < res.data.programs.length; i++) {
              //   console.log(res.data.programs[i]);
              //     member = {
              //       ...member,
              //       [["programss"]]: res2.data.name,
              //       ["set_number"]: res.data.programs[i].set,
              //       ["repetition"]: res.data.programs[i].repetition,
              //     };
              //     setMembers((prev) => [...prev, member]);
              //     // console.log(members);
              // }

              // console.log(members);
            })
            .catch((err) => console.log(err));

          // //Member program
          // getMemberProgram(member.user_id)
          //   .then((res) => {
          //     member = {
          //       ...member,
          //       ["programs"]: res.data.programs,
          //     };
          //     // setMembers((prev) => [...prev, member]);
          //   })
          //   .catch((err) => console.log(err));
        });
        setLoading(false);
      });
      initFilters1();
    });
  }, []);

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

  const addProgram = (rowData) => {
    return (
      <>
        <Button
          onClick={() => {
            setMemberId(rowData.user_id);
            onClick("displayBasic");
          }}
          label="Assign program"
          className="p-button-rounded  p-button-outlined"
        />
      </>
    );
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };
  const clearFilter1 = () => {
    initFilters1();
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      phone_number: { value: null, matchMode: FilterMatchMode.IN },
      address: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
    });
    setGlobalFilterValue1("");
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const handleFormSubmit = async () => {
    await exercise1.map((exercise) => {
      const exerciseFormat = {
        ["exercise_id"]: exercise.code,
        ["set"]: 4,
        ["repetition"]: 12,
      };
      setProgramlar((prevState) => [...prevState, exerciseFormat]);
    });

    assignProgram(memberId, programlar);
  };

  if (loading) {
    return (
      <div className="spinner">
        <ProgressSpinner />
      </div>
    );
  } else {
    return (
      <div>
        <Dialog
          visible={displayBasic}
          style={{ width: "50vw" }}
          onHide={() => onHide("displayBasic")}
        >
          <div className="form-demo">
            <div className="flex justify-content-center">
              <div className="card">
                <form className="p-fluid">
                  <div className="field">
                    <MultiSelect
                      value={exercise1}
                      options={exerciseList}
                      onChange={(e) => {
                        setExercise1(e.value);
                      }}
                      optionLabel="name"
                      placeholder="Select Exercises"
                      maxSelectedLabels={5}
                    />
                  </div>
                </form>
                <Button
                  type="submit"
                  label="Submit"
                  className="mt-2"
                  onClick={handleFormSubmit}
                />
              </div>
            </div>
          </div>
        </Dialog>

        <div className="manage-member">
          <div className="app-container">
            <div className="card">
              <DataTable
                value={members}
                responsiveLayout="scroll"
                filters={filters1}
                filterDisplay="menu"
                globalFilterFields={[
                  "name",
                  "email",
                  "phone_number",
                  "address",
                ]}
                header={renderHeader1}
                emptyMessage="No members found."
                style={{ width: "50vw" }}
              >
                <Column
                  field="name"
                  header="Name"
                  filterField="name"
                  sortable
                ></Column>
                <Column
                  field="programs"
                  header="Exercise Names"
                  sortable
                ></Column>
                <Column field="set_num" header="Set" sortable></Column>
                <Column
                  field="repetition"
                  header="Repetition"
                  sortable
                ></Column>
                <Column header="Add Exercises" body={addProgram}></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ManageMembersPT;
