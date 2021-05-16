import React from "react";
import { Content } from "../../components";
import Button from "@material-ui/core/Button";

const Home = () => {
  return (
    <>
      <Content noBgColor>
        <section className="home-body col-12">
          <h3 className="home-body-title">
            Use a barra de pesquisa para encontrar o usuário desejado.
          </h3>
        </section>
        {/* <section className="home-body col-12">
          <Button variant="contained" color="primary">
            Cadastrar usuário
          </Button>
        </section> */}
      </Content>
    </>
  );
};

export default Home;
