import React from "react";
import { faHome, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

const UserDetails = ({ user }) => {
  const {  cpf, nome, sobrenome } = user;

  return (
    <section className="user-details card">
      <article className="card-body">
        <h2 className="name">{`${nome} ${sobrenome}`}</h2>
        <p>
          <strong>CPF: </strong>{cpf}
        </p>
      </article>
    </section>
  );
};

export default UserDetails;
