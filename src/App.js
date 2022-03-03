import React from "react";
import CriarPlaylist from "./components/CriarPlaylist"
import Playlists from "./components/Playlists"
import DetalhesPlaylist from "./components/DetalhesPlaylist"
import styled from "styled-components";
import axios from "axios";


export const ContainerPrincipal = styled.div` 
  background-color: black;
  width: 70vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin: 50px auto;
  border-radius: 5px;
  color: white;
  box-shadow: 4px 4px 10px 4px rgba(0, 0, 0, 0.2);
`
export const BarraMenu = styled.div` 
  display: flex;
  align-items: center;
  background-color: #8D92F2;
  justify-content: center;
  width: 100%;
  height: 50px;
  font-size: 30px;
  color: black;
  font-weight: bold;
  
`
export const MeuBotao = styled.button`
  background: #0D0D0D;
  border:none;
  border-radius: 10px;
  color: #FDFDFD;
  font-size: 15px;
  margin: 20px 2px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #76777B;
  };
`

const axiosConfig = {
  headers: {
    Authorization: "karla-natany-joy"
  }
}

class App extends React.Component {

  state = {
    paginaAtual: "home",
    playlist: {},
    listaPlaylist: [],

  }

  componentDidMount = () => {
    this.mostraPlaylist()
  }

  rotaPaginas = () => {
    switch (this.state.paginaAtual) {
      case "home":
        return (
          <ContainerPrincipal>
            <CriarPlaylist
              renderizaLista={this.mostraPlaylist}
              listaPlaylist={this.state.listaPlaylist} />

            <Playlists
              verDetalhes={this.irParaDetalhesPlaylist}
              renderizaLista={this.mostraPlaylist}
              listaPlaylist={this.state.listaPlaylist}
            />
          </ContainerPrincipal>
        )
      case "detalhesPlaylist":
        return <DetalhesPlaylist playlist={this.state.playlist}
          retornaHome={this.irParaHome} />
      default:
        return <div>Erro, página não encontrada! </div>
    }
  }

  //Requisição para pegar as playlists
  mostraPlaylist = () => {
    axios
      .get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", axiosConfig)
      .then((res) => {
        this.setState({ listaPlaylist: res.data.result.list })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  irParaDetalhesPlaylist = (playList) => {
    this.setState({ paginaAtual: "detalhesPlaylist", playlist: playList })
  }

  irParaHome = () => {
    this.setState({ paginaAtual: "home" })
  }

  render() {
    return (
      <ContainerPrincipal>
        <BarraMenu>LABEFY</BarraMenu>
        {this.rotaPaginas()}
      </ContainerPrincipal>
    )
  }
}

export default App