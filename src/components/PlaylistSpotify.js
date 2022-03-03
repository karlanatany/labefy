import React from "react";
import axios from "axios";
import { MeuBotao } from "../App";
import { Link } from "./DetalhesPlaylist";
import styled from "styled-components";
import { ItemPlaylist } from "./Playlists";
import searchIcon from "../search.png"

export const ContainerSpotify = styled.div` 
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
`
const CampoBusca = styled.div` 
background-color:white;
border:solid 2px #8D92F2;
border-radius:10px;
width:250px;
height:34px;
margin-bottom: 30px;
margin-top: 30px;
`

const CampoResultadoPesquisa = styled.div` 
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-template-rows: auto;
grid-template-areas:
"header header header header";
width: 92%;
margin: auto;
justify-items: center
align-items: center;

`

const Cabecalho = styled.div` 
grid-area: header;
background-color: #8D92F2;
color: #F2CEEC;
padding: 0 15px;
margin-bottom: 10px;
width: 90%;
margin: auto;
text-align: center;
border-radius: 10px;
`
const Icone = styled.img` 
background-color: #8D92F2;
border:none;
float: right;
height: 24px;
width: 30px;
border-radius: 0 7px 7px 0;
font-weight: bold;
padding: 5px;
cursor: pointer;
&:hover{
  background-color: #b8bbf5 ;
};
`

export const InputBusca = styled.input` 
float:left;
background-color: white;
padding-left:5px;
font-size:12px;
border:none;
height:32px;
width:191px;
border-radius: 10px;
&:focus{
  box-shadow: 0 0 0 0;
  outline: 0;
}
`

const ItemResultadoPesquisa = styled.div` 
display:flex;
background-color: #0d0d0d54;
justify-content: space-between;
align-items: center;
margin: 10px;
border-radius: 10px;
padding-left: 5px ;
`


const spotify = {
  clientId: 'db1b09c53d6d4bad889b2ebd429ea3a1',
  clientSecret: '801a5b3843b848c18c6b2a63a242a4d9',
}

class PlaylistSpotify extends React.Component {
  state = {
    token: '',
    tracks: [],
    inputBuscaSpotify: "",
    nameS: "",
    artistS: "",
    urlS: ""
  }

  componentDidMount = () => {
    this.autenticaSpotify()
  }

  autenticaSpotify = async () => {
    const axiosConfig = {
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(spotify.clientId + ':' + spotify.clientSecret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const body = new URLSearchParams({
      grant_type: 'client_credentials'
    })

    axios.post('https://accounts.spotify.com/api/token', body, axiosConfig)
      .then(res => {
        this.setState({ token: res.data.access_token })
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  pegaInputSpotify = (event) => {
    this.setState({ inputBuscaSpotify: event.target.value })
  }

  pesquisaMusica = () => {
    axios.get(`https://api.spotify.com/v1/search?type=artist,track&q=${this.state.inputBuscaSpotify}`,
      {
        headers:
        {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(dados => {
        //console.log(dados.data.tracks.items)
        this.setState({ tracks: dados.data.tracks.items })
        //this.setState({ tracks: })

        console.log(this.state.tracks)

      })
      .catch(err => {
        console.log(err)
      })
  }

  adcMusica = (track) => {
    const body = {
      name: track.name,
      artist: track.artists[0].name,
      url: track.external_urls.spotify
    }
    this.props.inserirMusicaSpotify(body)
  }

  render() {
    const mostraMusica = this.state.tracks.map((musica) => {
      return (
        <ItemResultadoPesquisa key={musica.id}>
          <Link href={musica.external_urls.spotify} target="_blank" >{musica.name}</Link>
          <MeuBotao onClick={() => this.adcMusica(musica)}>+</MeuBotao>
        </ItemResultadoPesquisa>
      )
    })

    const ComponenteListaResultados = mostraMusica.length ? (
      <CampoResultadoPesquisa>
        <Cabecalho>
          <p>Resultados da busca:</p>
        </Cabecalho>
        {mostraMusica}
      </CampoResultadoPesquisa>
    ) : ""


    return (
      <ContainerSpotify>
        <CampoBusca>
          <InputBusca
            placeholder={'buscar por Artista ou música'}
            value={this.state.inputBuscaSpotify}
            onChange={this.pegaInputSpotify}
          />
          <Icone src={searchIcon} onClick={this.pesquisaMusica} />
        </CampoBusca>
        {ComponenteListaResultados}
      </ContainerSpotify>
    )
  }
}

export default PlaylistSpotify
