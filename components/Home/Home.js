import React, { useState, useRef, useEffect } from "react";

import {
  PageContainer,
  EmploeesList,
  EmplyeeItem,
  EmplyeeForm,
  Input,
  Button,
  Buttons,
  TabButton,
  WorkForm,
  AddButton,
  P,
  H3,
} from "./HomeStyled";

import employees from "../../employees";

export default function Home() {
  const employeesCount = useRef(employees.length);
  const [je, setJe] = useState(false);

  const [listOfEmployees, setListOfEmployees] = useState(employees);
  const [newEmployee, setNewEmployee] = useState({
    id: employeesCount.current + 1,
    firstName: "",
    lastName: "",
    sex: "",
  });
  let countM = listOfEmployees.filter(
    (employee) => employee.sex === "m"
  ).length;
  let countW = listOfEmployees.filter(
    (employee) => employee.sex === "w"
  ).length;
  let menWorks = countM;
  let womenWorks = countW * 0.5;
  let summaryWork = menWorks + womenWorks;
  const [valid, setValid] = useState(false);
  const [activeTab, setActiveTab] = useState("list-of-employees");
  const [workStorage, setWorkStorage] = useState({
    meter: summaryWork, //women
    hours: summaryWork, //men
  });

  const [tempStorage, setTempStorage] = useState({
    meter: "",
    hours: "",
  });

  const handleChange = (e) => {
    const updateEmployee = {
      ...newEmployee,
      [e.target.name]: e.target.value,
    };
    setNewEmployee(updateEmployee);
    validateData(updateEmployee);
  };

  const handleDelete = (idToDel) => {
    setListOfEmployees(
      listOfEmployees.filter((employee) => employee.id !== idToDel)
    );
  };

  const validateData = (employeesV) => {
    if (employeesV.firstName.trim().lenght === 0) {
      return setValid(false);
    } else if (employeesV.lastName.trim().lenght === 0) {
      return setValid(false);
    } else if (employeesV.sex.checked === false) {
      return setValid(false);
    }
    setValid(true);
  };

  //
  //button
  const handleAdd = () => {
    setListOfEmployees((listOfEmployees) => {
      return [...listOfEmployees, newEmployee];
    });

    employeesCount.current++;

    const updateEmployee = {
      id: employeesCount.current + 1,
      firstName: "",
      lastName: "",
      sex: "",
    };
    setNewEmployee(updateEmployee);
  };
  //az po sem to musim zmenit

  const handleStorage = (e) => {
    const updateStorage = {
      ...tempStorage,

      [e.target.name]: e.target.value,
    };
    setTempStorage(updateStorage);
  };

  const updateStorage = () => {
    const storageValue = tempStorage;
    let newStorageValue = {};
    const keys = Object.keys(storageValue);

    keys.map(async (key) => {
      if (parseInt(workStorage[key]) - parseInt(storageValue[key]) > 0) {
        setJe(true);
        newStorageValue[key] =
          parseInt(workStorage[key]) - parseInt(storageValue[key]);
      } else {
        newStorageValue[key] = parseInt(workStorage[key]);
        setJe(false);
      }
    });

    setWorkStorage(newStorageValue);
    setTempStorage({ meter: "", hours: "" });
  };
  useEffect(() => {
    const hasPositiveDifference = Object.keys(tempStorage).some(
      (key) => parseInt(workStorage[key]) - parseInt(tempStorage[key]) > 0
    );

    setJe(hasPositiveDifference);
    setJe(hasPositiveDifference);
  }, [tempStorage, workStorage]);

  return (
    <PageContainer>
      <Buttons>
        <TabButton
          name="list-of-employees"
          data-active={activeTab}
          onClick={() => setActiveTab("list-of-employees")}
        >
          List of employees
        </TabButton>
        <TabButton
          name="work-storage"
          data-active={activeTab}
          onClick={() => setActiveTab("work-storage")}
        >
          Task
        </TabButton>
      </Buttons>
      {activeTab === "list-of-employees" && (
        <>
          {" "}
          <EmploeesList name="employeesList">
            {listOfEmployees.map((employee) => {
              return (
                <EmplyeeItem key={employee.id}>
                  {employee.firstName} /{employee.lastName}/{employee.sex}
                  <button
                    style={{
                      color: "#64766a",
                      fontWeight: "bolder",
                      border: 2 + "px solid #64766a",
                      borderRadius: 50 + "%",
                      height: 25 + "px",
                      width: 25 + "px",
                    }}
                    onClick={() => handleDelete(employee.id)}
                  >
                    X
                  </button>
                </EmplyeeItem>
              );
            })}
          </EmploeesList>
          <EmplyeeForm>
            <Input
              type="text"
              placeholder="first name"
              name="firstName"
              value={newEmployee.firstName}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={newEmployee.lastName}
              onChange={handleChange}
            />
            <input
              type="radio"
              name="sex"
              id="men"
              value="m"
              className="sexC"
              onChange={handleChange}
            />
            men
            <input
              type="radio"
              name="sex"
              id="women"
              className="sexC"
              value="w"
              onChange={handleChange}
            />{" "}
            <br />
            women
            <br />
            <br />
            <Button disabled={!valid} onClick={handleAdd}>
              Add
            </Button>{" "}
          </EmplyeeForm>
        </>
      )}

      {activeTab === "work-storage" && (
        <>
          <H3>PLANNING-EXCAVATION-WORK</H3>

          <P>
            <p>women:{countW} </p>
            <p>men: {countM}</p>
            <p>free hour:{summaryWork} </p>
            <p> free meter: {summaryWork}</p>
          </P>

          <WorkForm>
            <Input
              type="number"
              min="0"
              placeholder="hours"
              name="hours"
              value={tempStorage.hours}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="meters"
              name="meter"
              value={tempStorage.meter}
              onChange={handleStorage}
            />
            <br />
            <AddButton
              className="addWork"
              onClick={updateStorage}
              style={{ backgroundColor: je ? "green" : "red" }}
            >
              Work planning
            </AddButton>
          </WorkForm>
        </>
      )}
    </PageContainer>
  );
}
