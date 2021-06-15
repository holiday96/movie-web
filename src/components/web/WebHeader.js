import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import WebSearchBar from "./WebSearchBar";
import WebNav from "./WebNav";
import styled from "styled-components";
import UserAccountMenu from "../UserAccountMenu";
import Swal from "sweetalert2";

const WebHeaderContainer = styled.div`
  background-color: black;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const TitleHeader = styled.span`
  font-size: 35px;
  font-family: "Bungee Shade", cursive;
  color: white;
  margin-left: 20px;
`;

const WebHeader = (props) => {
  const [status, setStatus] = useState(false);

  const openProfile = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Profile",
      html:
        `Firstname<input type="text" value="${props.user.firstName}" placeholder="Firstname" id="swal-input-firstName" class="swal2-input">` +
        `Lastname<input type="text" value="${props.user.lastName}" placeholder="Lastname" id="swal-input-lastName" class="swal2-input">` +
        `<input type="text" value="${props.user.username}" placeholder="Username" id="swal-input-username" class="swal2-input">` +
        `<input type="email" disabled value="${props.user.email}" placeholder="Email" id="swal-input-email" class="swal2-input">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input-firstName").value,
          document.getElementById("swal-input-lastName").value,
          document.getElementById("swal-input-username").value,
          document.getElementById("swal-input-email").value,
        ];
      },
    });
    if (formValues[0] === "" || formValues[1] === "" || formValues[2] === "") {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please fill all fields!",
      });
    } else {
      Swal.fire("Nice work!", "Your profile has been updated!", "success").then(
        () => {
          const newData = {
            ...props.user,
            firstName: formValues[0],
            lastName: formValues[1],
            username: formValues[2],
          };
          props.onEditUser(newData);
          props.setUser(newData);
        }
      );
    }
    if (formValues === 0) {
      console.log(true);
    }
  };

  const openChangePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Change Password",
      html:
        `<input type="password" placeholder="Current password" id="currentPassword" class="swal2-input">` +
        `<input type="password" placeholder="New password" id="newPassword" class="swal2-input">` +
        `<input type="password" placeholder="Confirm password" id="confirmPassword" class="swal2-input">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("currentPassword").value,
          document.getElementById("newPassword").value,
          document.getElementById("confirmPassword").value,
        ];
      },
    });
    if (formValues[0] === "") {
      Swal.fire({
        icon: "info",
        title: "Miss something??",
        text: "Please type current password first!",
      });
    } else if (formValues[0] !== props.user.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Current password incorrect!",
      });
    } else {
      if (formValues[1] === "") {
        Swal.fire({
          icon: "info",
          title: "One more step??",
          text: "Please type new password!",
        });
      } else if (formValues[1] !== formValues[2]) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Confirm password incorrect!",
        });
      } else {
        Swal.fire("Nice work!", "Password has been changed!", "success").then(
          () => {
            const newData = {
              ...props.user,
              password: formValues[2],
            };
            props.onEditUser(newData);
            props.setUser(newData);
          }
        );
      }
    }
  };

  useEffect(() => {
    if (props.user) {
      if (props.user.length !== 0) setStatus(true);
      else setStatus(false);
    }
  }, [props.user]);

  return (
    <WebHeaderContainer>
      <header className="position-reletive p-3 bg-gradient text-white">
        <div className="d-flex position-fixed mb-3 align-items-center justify-content-end">
          <NavLink to="/" className="mr-5">
            <img
              id="imagee"
              src="../../logo.png"
              width={57}
              height={50}
              alt=""
            />
            <TitleHeader>WaMo</TitleHeader>
          </NavLink>
          {!status && (
            <div className="position-fixed" style={{ right: 20 }}>
              <Link
                type="button"
                to="/login"
                className="btn btn-outline-light mr-2"
              >
                Login
              </Link>
              <Link
                type="button"
                to="/register"
                className="btn btn-outline-light"
              >
                Register
              </Link>
            </div>
          )}
          {status && (
            <UserAccountMenu
              openProfile={openProfile}
              openChangePassword={openChangePassword}
              {...props}
            />
          )}
        </div>
        <WebNav {...props} />
        <WebSearchBar />
      </header>
    </WebHeaderContainer>
  );
};

export default WebHeader;
