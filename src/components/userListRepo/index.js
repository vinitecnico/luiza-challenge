import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

const UserListRepo = ({ data = [], selectedChange }) => {
  return (
    <article className="user-list-repo">
      <ul>
        {data.map(({ id, name, categoria, descricao, preco, selected }) => (
          <li key={id} className="card">
            <article className="card-body">
              <h1>{name}</h1>
              <p className="description-bio">{descricao}</p>
              <p>
                {categoria && (
                  <span>
                    categoria: <strong>{categoria}</strong>
                  </span>
                )}

                <span>
                  <strong>{preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>
                </span>
                <FontAwesomeIcon icon={faHeart} className={selected ? 'selected': ''} onClick={() => selectedChange(id, selected)} />
              </p>
            </article>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default UserListRepo;
