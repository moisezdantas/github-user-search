import React, { Fragment, useEffect, useState } from "react";
import Button from "../../core/components/Button";
import ImageLoader from "./components/Loaders/ImageLoader";
import InfoLoader from "./components/Loaders/InfoLoader";
import { User } from "../../core/type/User";
import dayjs from "dayjs";
import "./styles.scss";
import { makeRequest } from "../../core/utils/request";
import { useForm } from "react-hook-form";
import DetailUser from "./components/DetailUser";

type Search = {
  text: string;
};

export const Search = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User>();
  const [isUser, setIsUser] = useState(false);
  const [isNotFound, setIsNotFound] = useState(true);

  const { register, handleSubmit } = useForm<Search>();

  useEffect(() => {
    if (!search) return;
    setLoading(true);
    setIsNotFound(true);
    setIsUser(false);
    makeRequest({ url: `${search}` })
      .then((response) => {
        const user = {
          ...response.data,
          dateFormat: dayjs(response.data?.created_at).format("DD/MM/YYYY"),
        };
        setIsUser(true);
        setUser(user);
      })
      .catch(() => {
        setIsUser(false);
        setIsNotFound(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  console.log(user);

  const onSubmit = (data: Search) => {
    setSearch(data.text);
  };

  return (
    <Fragment>
      <div className="search-container">
        <h2 className="search-text">Encontre um perfil Github</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="text"
            ref={register}
            className="search-input"
            placeholder="Usuário Github"
          />
          {!isNotFound && <span className="not-found">Não encontrado</span>}
          <div className="btn-search-container">
            <Button text="Encontrar" />
          </div>
        </form>
      </div>

      <section className={isUser ? 'info-container' : ''}>
        {loading && (
          <div className="loader-container ">
            <div className="left-loader">
              <ImageLoader />
            </div>
            <div className="right-loader">
              <InfoLoader />
            </div>
          </div>
        )}
        {user && isUser && (
          <div className="search-info">
            <div className="search-info-left">
              <img src={user?.avatar_url} alt={user?.avatar_url} />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/moisezdantas`}
              >
                <Button text="Ver Perfil" />
              </a>
            </div>
            <div className="search-info-right">
              <DetailUser user={user} />
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};
export default Search;
