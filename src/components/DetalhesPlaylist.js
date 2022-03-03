import React from "react"
import axios from "axios"
import styled from "styled-components"
import { ContainerPrincipal, MeuBotao } from "../App"
import PlaylistSpotify from "./PlaylistSpotify"

const DetalheMusica = styled.div` 
display: grid;
grid-template-columns: 1fr 1fr 1fr;
width: 80%;
text-align: center;
align-items: center;
&:hover{
  background-color: #76777B;
};
border-radius: 10px;
margin: 5px;
`

const CabecalhoDetalhes = styled(DetalheMusica)` 
background-color: #8D92F2;
pointer-events: none;

`
export const Link = styled.a` 
color: white;
`



const axiosConfig = {
  headers: {
    Authorization: "karla-natany-joy"
  }
}

class DetalhesPlaylist extends React.Component {
  state = {
    quantity: 0,
    tracks: [],
    trackId: "",
    nameInput: "",
    artistInput: "",
    urlInput: ""
  }

  componentDidMount() {
    this.visualizarPlaylist()
  }

  //REQUISIÇÃO PARA VISUALIZAR PLAYLISTS

  visualizarPlaylist = () => {
    axios
      .get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playlist.id}/tracks`, axiosConfig)
      .then((res) => {
        this.setState({ tracks: res.data.result.tracks, quantity: res.data.result.quantity })
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  //ADICIONANDO UMA NOVA MÚSICA
  inserirMusica = (body) => {
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playlist.id}/tracks`,
        body,
        axiosConfig,

      )
      .then((res) => {
        this.visualizarPlaylist()
      })
      .catch(err => {
        console.log("erro ao adc musica")
        console.log(err)
      })
  }

  //Removendo uma música
  removerMusica = (trackId) => {
    axios.delete(
      `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.playlist.id}/tracks/${trackId}`,
      axiosConfig,
    )
      .then((res) => {
        alert("A faixa foi removida com sucesso")
        this.visualizarPlaylist()
      })
      .catch(err => {
        alert("erro ao apagar musica")
        console.log(err)
      })

  }
  render() {
    const detalhesDaPlaylist = this.state.tracks.map((musica) => {
      return (
        <DetalheMusica key={musica.id}>
          <div>
            <p>{musica.artist}</p>
          </div>
          <div>
            <Link href={musica.url} target="_blank" >{musica.name}</Link>
          </div>
          <div>
            <MeuBotao onClick={() => this.removerMusica(musica.id)}>X</MeuBotao>
          </div>
        </DetalheMusica>
      )
    })
    return (
        <ContainerPrincipal>
          <h1>{this.props.playlist.name}</h1>
          <p> Quantidade de músicas: {this.state.quantity}</p>

          <CabecalhoDetalhes>
            <p>Artista</p>
            <p>Acessar Música</p>
            <p>Opções</p>
          </CabecalhoDetalhes>
          {detalhesDaPlaylist}

          <PlaylistSpotify inserirMusicaSpotify={this.inserirMusica} />
          <MeuBotao onClick={this.props.retornaHome}>Home</MeuBotao>
        </ContainerPrincipal>
    )
  }
}

export default DetalhesPlaylist