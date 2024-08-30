import { useState } from 'react'
import { useEffect } from 'react'
import { Background } from './styledGlobal'
import styled from 'styled-components'
// import GlobalStyle from './styledGlobal'

// ^ Seção de imports do React

const Title = styled.h1`
  color: #ff5555;
  text-align: center;
  
`

const SubTitulo = styled.h2`
  color: #ff5555;
  margin-top: 0%;
  text-align: center;
`

const Texto = styled.h3`
  color: #f8f8f2;
  margin-left: 5%;
  font-size: 19px;
`

const Pesquisa = styled.input`
  border-radius: 15px;
  width: 80%;
  height: 40px;
  background-color: #D9D9D9;
  font-size: 18px;
  padding-left: 10px;
  color: #282a36;
  border: none;
  margin-left: 5%;
  
  margin-top: 1%;
  
`

const Botao = styled.button`
  border-radius: 20px;
  background-color: #50fa7b;
  height: 40px;
  margin-top: 1%;
  margin-left: 70%;
`

const DivPokemons = styled.div`
  background-color: #6272a4;
  border-radius: 30px;
  width: 60%;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  margin-left: 18%;
  margin-right: 18%;
  margin-top: 25px;
`

const Lista = styled.li`
  color: #f8f8f2;
  font-weight: 700;
  font-size: 17px;
  list-style-type: none;
  padding-left: 70px;
`
// Componentes do styled-components

// separação do styled components de javascript

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Background >
        <Title>Pokencontra</Title>
        <SubTitulo>A enciclopédia completa de pokemons</SubTitulo>
        <DivPokemons> {/**Divisória pra função pokemon, o quadrado azulzinho onde eles ficam localizados */}
          <Pokemon /> {/**Executa a função "Pokemon" Que procura e mostra os stats dos pokemons */}
        </DivPokemons>
            
      </Background>
    </>
  )
} 

export function Pokemon(){
  const [pokemon, setPokemon] = useState(0);
  const [poke, setPoke] = useState('pikachu') //usestate do poke

  useEffect(()=>{
       async function carregaDados() {
            const url = `https://pokeapi.co/api/v2/pokemon/${poke}`;
            const resp = await fetch(url);
            const dd = await resp.json();
            setPokemon(dd);
            console.log(`dados carregados para poke ${poke}`);

       }
       carregaDados();
  },[poke]); //3) UseEffect detecta a mudança na variável do useState poke e roda a variável carregaDados.
  //A variável carregaDados pega a variável do poke e coloca no fim do link da api dos pokemons. Dá fetch nela e daí espera pra não bugar. Então, coloca o valor do resultado da api no useState Pokemon(diferente de poke), daí aparece no console que caregou o pokemon.

  function mudaNomePoke() { //2) Essa função seleciona o valor do conteúdo da caixa de texto e o transforma em lowercase. 
    const txCaixa = document.querySelector('#caixa').value.toLowerCase();
    setPoke(txCaixa);  //Então, o valor seta o state do poke como o valor da caixa de texto       
  }

  function tratatecla(e) {
    if (!e.repeat) {
      if (e.key === 'Enter') {
        mudaNomePoke()
      }
    }
  }

  let resposta;

  if(pokemon!=0) { //4) Quando o pokemon mudar, ele não vai mais ser = 0 então ele vai fazer o seguinte:
      let tipoSecundario;

       resposta = <>
       <Texto>Barra de pesquisa:</Texto>
        <Pesquisa onKeyDown={tratatecla} placeholder='Digite o nome de seu pokemon' id='caixa'></Pesquisa>
        <Botao onClick={mudaNomePoke} id='bt'>Clique aqui</Botao> {/**5) Mesma coisa que o passo 1 para poder mudar novamente o pokemon */}
       
       
       <Texto>Pokémon encontrado!</Texto>
       <ul>
        {/**6) Agora, ele vai consultar o valor do usestate pokemon (que é a api completa) e daí vai consultar individualmente o nome, tipo e etc de dentro da API  */}
            <Lista>Nome: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Lista>
            <Lista>Tipo: {pokemon.types[0].type.name}</Lista>
          
            <Lista>Tipo secundário:  
            {(pokemon.types.length>1) ? tipoSecundario = ` ${pokemon.types[1].type.name}` : tipoSecundario = ' Nenhum'} {/**Tipo secundário é um caso a parte pois nem todos tem, então, você faz um if de se a quantidade de tipos for maior que 1 então ele registra o tipo secundário, se não, ele fala que a variável tipo secundário é uma string escrita"Nenhum" */}
            </Lista>
      
            <Lista>Número da Pokédex: {pokemon.id}</Lista>
            <img src={pokemon.sprites.back_default} alt="" width='23%'/>
            <img src={pokemon.sprites.front_default} alt="" width='23%'/>
            <img src={pokemon.sprites.back_shiny} alt="" width='23%'/>
            <img src={pokemon.sprites.front_shiny} alt="" width='23%'/>
       </ul>
       </>
  } else {
       resposta = <>
        <Texto>Barra de pesquisa:</Texto>
        <Pesquisa placeholder='Digite o nome de seu pokemon' id='caixa'></Pesquisa>
        <Botao onClick={mudaNomePoke} id='bt'>Clique aqui</Botao>
       </>
       // 1) Primeiro passo de execução: componente de caixa de pesquisa e botão, ao clicar no botão ou apertar enter ele executa a função mudaNomePoke()
  }

  return resposta;
}
