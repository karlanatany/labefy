import React from "react";
import axios from "axios";
import styled from "styled-components";
import { ContainerPrincipal } from "../App";


const DeleteButton = styled.div ` 
display: flex;
align-self: flex-end;

`
export const ItemPlaylist = styled.div`
background-color: #ffffff10;
width: 95%;
display: flex;
flex-direction: column;
justify-content: space-between;
margin-bottom: 5px;
align-items: center;
padding-left: 5px;
border-radius: 10px;
&:hover {
    background-color: #ffffff10;
};
height: 200px;
`

const GradePlaylist = styled.div` 
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
column-gap: 10px;
row-gap: 15px;
width: 80%;
`

const CardNome = styled.div` 
background-color: #b357a6;
//background-color: ${props => (props.teste ? 'red' : 'blue')};
width: 90%;
height: 70%;
margin-top: 10px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 5px;
cursor: pointer;
&:hover {
    background-color: #ffffff10;
};
margin-bottom: 30px;
`

const BotaoDelete = styled.button ` 
background-color: #ffffff10;
border: none;
border-radius: 0px 10px 0px 5px;
&:hover { 
  color: white;
  cursor: pointer;
}
`

const axiosConfig = {
  headers: {
    Authorization: "karla-natany-joy"
  }
}

//Página que mostra as playlists 
class Playlists extends React.Component {
  state = {
    listaPlaylist: this.props.listaPlaylist,
    playlistId: "",
    name: "",
    paginaAtual: "playlists",
  }


  //Requisição para deletar uma playlist
  deletarPlaylist = (playlistId) => {
    axios
      .delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistId}`, axiosConfig)
      .then((res) => {
        alert("Playlist removida com sucesso!")
        this.props.renderizaLista()
      })
      .catch((err) => {
        alert("Erro ao remover playlist");
      })
  }

  getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  render() {
    
    const listaDePlaylist = this.props.listaPlaylist.map((playlist) => {
      return (
        <ItemPlaylist key={playlist.id}>
           <DeleteButton>
            <BotaoDelete onClick={() => this.deletarPlaylist(playlist.id)}>x</BotaoDelete>
          </DeleteButton>
          <CardNome quadro>
            <p onClick={() => this.props.verDetalhes(playlist)}>{playlist.name}</p>
          </CardNome>
         
        </ItemPlaylist>
      )
    })

    return (
      <ContainerPrincipal>
        <h2>Minhas Playlists</h2>
        <GradePlaylist>
          {listaDePlaylist}

        </GradePlaylist>
      </ContainerPrincipal>
    )
  }
}

export default Playlists