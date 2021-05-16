import React, { useState, useEffect } from "react";
import {
  Content,
  Breadcrumbs,
  Loading,
  UserDetails,
  UserListRepo,
  Select,
} from "../../components";
import {
  getByUser,
  getWishListByUser,
  getAllProdutos,
  setWishList,
} from "../../clients";
import "./styles.scss";

const UserRepo = ({ match, history }) => {
  const { cpf } = match.params;
  const [user, setUser] = useState({});
  const [produtosSelected, setProdutosSelected] = useState({ data: [] });
  const [produtos, setProdutos] = useState({ data: [] });
  const [hasError, setHasError] = useState(false);

  if (!cpf) {
    history.push("/");
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (user.id) {
      getProdutosSelected();
    }
  }, [user.id]);

  const init = async () => {
    try {
      setUser({ loading: true });
      await getUser();
    } catch (e) {
      setHasError(true);
      console.log(e);
    }
  };

  const getUser = async () => {
    return getByUser(cpf).then(({ data }) => {
      return setUser({ ...data, loading: false });
    });
  };

  const getProdutosSelected = async () => {
    const result = await getWishListByUser(user.id);
    setProdutosSelected({ data: result.data, loading: false });
    await getProdutos(result.data);
  };

  const getProdutos = async (_produtosSelected) => {
    const result = await getAllProdutos();
    let items = result.data;
    if (_produtosSelected.length > 0) {
      items = result.data.map((item) => {
        const _produto = _produtosSelected.find((x) => x.id === item.id);
        return {
          ...item,
          selected: _produto ? true : false,
        };
      });
    }
    setProdutos({ data: items, loading: false });
  };

  const handleChangeSelected = async (productId, selected) => {
    let _produtos = produtosSelected.data;
    if (selected) {
      _produtos = produtosSelected.data.filter((x) => x.id !== productId);
    } else {
      _produtos.push({ id: productId });
    }

    const idProdutos = _produtos.map((x) => x.id)

    await setWishList(
      user.id,
      idProdutos
    );
    await getProdutosSelected();
  };

  return (
    <Content>
      <>
        <Breadcrumbs crumbs={[`CPF: ${cpf}`]} />
        {user.loading && !hasError && <Loading />}
        {!user.loading && user.id && (
          <section className="row user-repo">
            <section className="col-xs-12 col-lg-3 col-md-3">
              <UserDetails user={user} />
            </section>
            <section className="col-xs-12 col-lg-9 col-md-9">
              <UserListRepo
                data={produtos.data}
                selectedChange={handleChangeSelected}
              />
            </section>
          </section>
        )}
        {!user.id && hasError && (
          <section className="home-body col-12">
            <h3 className="home-body-title">user not found!</h3>
          </section>
        )}
      </>
    </Content>
  );
};

export default UserRepo;
