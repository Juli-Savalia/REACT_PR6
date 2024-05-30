import React, { useEffect, useState } from "react";

const Crud = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [single, setSingle] = useState("");
  const [edit, setEdit] = useState("");
  const [mdelete, setMdelete] = useState([]);
  let data = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  const [record, setRecord] = useState(data);

  const handlesubmit = (h) => {
    h.preventDefault();

    if (!name || !contact) {
      alert("All fields must be filled..");
      return false;
    }
    let obj = { id: Date.now(), name, contact, status: "deactive" };

    let newfield = [...record, obj];
    localStorage.setItem("users", JSON.stringify(newfield));
    setRecord(newfield);
    setContact("");
    setName("");
    alert("Record Added successfully");
    // console.log(newfield);

    if (edit) {
      let newrec = [...record];
      let updaterecord = newrec.map((val) => {
        if (val.id === edit) {
          return {
            ...val,
            name: name,
            contact: contact,
          };
        }
        return val;
      });

      localStorage.setItem("users", JSON.stringify(updaterecord));
      setRecord(updaterecord);
      setEdit(" ");
      setSingle(" ");
      alert("Record Updated");
    } else {
      let allrecord = [...record, obj];
      localStorage.setItem("users", JSON.stringify(allrecord));
      alert("New Record Added");
    }
    setName("");
    setContact("");
  };

  //delete user
  // const deleteuser = (id) => {};

  //edit user

  const edituser = (id) => {
    let s = record.find((val) => val.id == id);
    setEdit(s.id);
    setSingle(s);
  };
  useEffect(() => {
    setName(single.name);
    setContact(single.contact);
  }, [single]);

  // status active deactive
  const handlestatus = (id, status) => {
    if (status === "deactive") {
      let updatestatus = record.map((val) => {
        if (val.id == id) {
          val.status = "active";
        }
        return val;
      });
      localStorage.setItem("users", JSON.stringify(updatestatus));
      setRecord(updatestatus);
      alert("Status Changed");
    }
    console.log(id);
  };

  // checked multiple delete

  const handlechecked = (id, checked) => {
    let all = [...mdelete];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((val) => val != id);
    }

    setMdelete(all);
    console.log(all);
  };

  const multipleDelete = () => {
    if (mdelete.length >= 0) {
      let delid = record.filter((val) => !mdelete.includes(val.id));
      localStorage.setItem("users", JSON.stringify(delid));
      setRecord(delid);
    } else {
      alert("Please select atleast one record to delete");
      return false;
    }
  };

  return (
    <div align="center">
      <h3>Form</h3>
      <form onSubmit={handlesubmit}>
        Name :-
        <input
          type="text"
          onChange={(n) => setName(n.target.value)}
          value={name}
        />
        <br></br>
        Contact :-
        <input
          type="tel"
          onChange={(c) => setContact(c.target.value)}
          value={contact}
        />
        <input type="submit" value="submit" />
        <button type="submit">{edit ? "Edit" : "submit"}</button>
      </form>
      <br></br>
      <br></br>
      <div>
        <table border={1} cellPadding={2} cellSpacing={2}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Action</th>
              <th>
                <button onClick={() => multipleDelete()}>Delete</button>
              </th>
              <th>
                <button onClick={() => multipleStatusUpdate()}>
                  Status Update
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* view record */}
            {record.map((val) => {
              console.log(record);
              return (
                <>
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.contact}</td>
                    <td>
                      <button onClick={() => deleteuser(val.id)}>Delete</button>
                      <button onClick={() => edituser(val.id)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handlestatus(val.id, val.status)}>
                        {val.status}
                      </button>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        onClick={(e) => handlechecked(val.id, e.target.checked)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        onClick={(e) =>
                          handlestatusupadte(val.id, e.target.checked)
                        }
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crud;
