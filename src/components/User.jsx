import manAgeSvg from "../assets/growing-up-man.svg";
import womanAgeSvg from "../assets/growing-up-woman.svg";
import mapSvg from "../assets/map.svg";
import phoneSvg from "../assets/phone.svg";
import padlockSvg from "../assets/padlock.svg";
import cwSvg from "../assets/cw.svg";
import React, { useEffect, useState } from "react";
import mailSvg from "../assets/mail.svg";
import manSvg from "../assets/man.svg";
import womanSvg from "../assets/woman.svg";

const User = () => {
  const [userData, setUserData] = useState();
  const [info, setInfo] = useState("");
  const [desc, setDesc] = useState("");
  const [addUser, setAddUser] = useState([]);

  const getUser = () => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => setUserData(data.results[0]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleMouseOver = (id) => {
    setInfo(id);

    if (id === "name") {
      setDesc(userData?.name?.first);
    } else if (id === "e-mail") {
      setDesc(userData?.email);
    } else if (id === "age") {
      setDesc(userData?.dob?.age);
    } else if (id === "street") {
      setDesc(userData?.location?.street?.name);
    } else if (id === "phone") {
      setDesc(userData?.phone);
    } else if (id === "password") {
      setDesc(userData?.login?.password);
    }
  };

  const handleAddUser = () => {
    const newUser = {
      id: userData?.login?.uuid,
      name: userData?.name.first,
      email: userData?.email,
      cell: userData?.cell,
      age: userData?.dob?.age,
    };

    addUser.some((item) => item.id === newUser.id)
      ? alert("Do not add the same person again..")
      : setAddUser([...addUser, newUser]);
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={userData?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {info} is</p>
          <p className="user-value">{desc}</p>
          <div className="values-list">
            <button
              className="icon"
              id="name"
              onMouseEnter={(e) => handleMouseOver(e.target.id)}
            >
              {userData?.gender === "female" ? (
                <img id="iconImg" src={womanSvg} alt="woman" />
              ) : (
                <img id="iconImg" src={manSvg} alt="man" />
              )}
            </button>
            <button
              id="e-mail"
              className="icon"
              onMouseEnter={(e) => handleMouseOver(e.target.id)}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              id="age"
              className="icon"
              onMouseEnter={(e) => handleMouseOver(e.target.id)}
            >
              {userData?.gender === "female" ? (
                <img id="iconImg" src={womanAgeSvg} alt="womanAge" />
              ) : (
                <img id="iconImg" src={manAgeSvg} alt="manAge" />
              )}
            </button>
            <button
              id="street"
              className="icon"
              onMouseEnter={(e) => handleMouseOver(e.target.id)}
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button
              id="phone"
              className="icon"
              onMouseEnter={(e) => handleMouseOver(e.target.id)}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              id="password"
              className="icon"
              onMouseEnter={(e) => handleMouseOver(e.target.id)}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button
              className="btn shadow-inset-center"
              type="button"
              onClick={getUser}
            >
              new user
            </button>
            <button
              className="btn shadow-inset-center"
              type="button"
              onClick={handleAddUser}
            >
              add user
            </button>
          </div>

          <table className="table ">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {addUser.map((item) => {
                return (
                  <>
                    <tr key={item.id} className="body-tr slide-in-top">
                      <td className="th">{item.name}</td>
                      <td className="th">{item.email}</td>
                      <td className="th">{item.cell}</td>
                      <td className="th">{item.age}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default User;
