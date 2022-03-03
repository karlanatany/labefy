import React from "react";
import axios from "axios";
import styled from "styled-components";
import { InputBusca } from "./PlaylistSpotify";


const ContainerAdicionarMusica = styled.div` 
display:flex;
height: 10%;
align-items: center;
flex-wrap: wrap;
`

const Input = styled.input` 
margin: 5px;
border-radius: 3px;
border: none;
padding: 10px;
`

const MeuBotao = styled.button`
background: #0D0D0D;
border:none;
border-radius: 3px;
color: #FDFDFD;
font-size: 10px;
margin: 1rem;
padding: 12px;
cursor: pointer;
`


class CriarPlaylist extends React.Component {
    state = {
        nome: "",
        corDeFundo: ""
    }

    inputNomePlaylist = e => {
        const nomeNovaPlaylist = e.target.value
        this.setState({ nome: nomeNovaPlaylist })
    }

    criaPlaylist = () => {
        const axiosConfig = {
            headers: {
                Authorization: "karla-natany-joy"
            }
        }
        const body = {
            name: this.state.nome
        }
        axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", body, axiosConfig)
            .then((res) => {
                alert(`playlist "${this.state.nome}" criada com sucesso`)
                this.setState({ nome: "" })
                this.props.renderizaLista()
            })
            .catch(error => {
                alert("Já existe uma playlist com este nome, escolha outro")
                this.setState({ nome: "" })
            })
    }

    



    render() {
        return (
            <ContainerAdicionarMusica>
                <InputBusca
                placeholder="Nome da nova Playlist"
                type="text"
                value={this.state.nome}
                onChange={this.inputNomePlaylist}
                />
                <MeuBotao onClick={this.criaPlaylist}>CRIAR PLAYLIST</MeuBotao>
            </ContainerAdicionarMusica>

        )
    }
}

export default CriarPlaylist