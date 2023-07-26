import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import { ProgressSpinner } from "primereact/progressspinner";
import AddTrainers from "./AddTrainers";
import "./Style.css";
import { apiMe, deleteMember, getTrainers } from "../../../API";

const ManageTrainers = () => {
  const [trainers, setTrainers] = useState();
  const [isSubmit, setIsSubmit] = useState(0);
  const [gymId, setGymId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);

  useEffect(() => {
    setLoading(true);

    apiMe().then((response) => {
      setGymId(response.data.gym_id);
      getTrainers(response.data.gym_id).then((response) => {
        setTrainers(response.data);
        setLoading(false);
      });
      initFilters1();
    });
  }, []);

  useEffect(() => {
    if (isSubmit === 200 || isSubmit === 201) {
      getTrainers(gymId).then((response) => {
        setTrainers(response.data);
        setIsSubmit(0);
      });
    }
  }, [isSubmit]);

  const deleteButtonBody = (rowData) => {
    return (
      <>
        <Button
          onClick={() => {
            deleteMember(rowData.ID)
              .then((response) => {
                setIsSubmit(response.status);
              })
              .catch((e) => alert(e));
          }}
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-outlined"
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

  if (loading) {
    return (
      <div className="spinner">
        <ProgressSpinner />
      </div>
    );
  } else {
    return (
      <div className="manage-member">
        <div>
          <AddTrainers gym_id={gymId} setIsSubmit={setIsSubmit} />
        </div>

        <div className="app-container">
          <div className="card">
            <DataTable
              value={trainers}
              responsiveLayout="scroll"
              filters={filters1}
              filterDisplay="menu"
              globalFilterFields={["name", "email", "phone_number", "address"]}
              header={renderHeader1}
              emptyMessage="No members found."
              style={{ width: "50vw" }}
            >
              <Column field="name" header="Name"></Column>
              <Column field="email" header="Email"></Column>
              <Column field="phone_number" header="Phone Number"></Column>
              <Column field="address" header="Address"></Column>
              <Column header="Delete" body={deleteButtonBody}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    );
  }
};

export default ManageTrainers;
