import React, { Fragment } from "react";
import { User } from "../../../../core/type/User";
import './styles.scss';

interface Props {
    user?: User;
  }

const DetailUser = ({user}: Props) => {
  return (
    <Fragment>
    
      <div className="top-right-components">
        <h1 className="top-text">
          Repositórios públicos: {user?.public_repos}
        </h1>
        <h1 className="top-text">Seguidores: {user?.followers}</h1>
        <h1 className="top-text">Seguindo: {user?.following}</h1>
      </div>
      <div className="bottom-right-components">
        <h1 className="informations">Informações</h1>
        <h1 className="infos-text">
          <strong>Empresa:</strong> {user?.company}
        </h1>
        <h1 className="infos-text">
          <strong>Website/Blog:</strong> {user?.blog}
        </h1>
        <h1 className="infos-text">
          <strong>Localidade:</strong> {user?.location}
        </h1>
        <h1 className="infos-text">
          <strong>Membro desde:</strong>
        </h1>
      </div>
    </Fragment>
  );
};
export default DetailUser;
