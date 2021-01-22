import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

//Permite que você veja a Rota que está usando e use um Component somente nela 
import { useLocation } from 'react-router-dom'

// Passando PROPS sem desestruturação 
// const Header = (props) => {

//Passando PROPS com desestruturação
const Header = ({ titulo, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
            {/* Não desestruturado */}
            {/* <h1>{props.titulo}</h1> */}

            {/* desestruturado */}
            <h1>{titulo}</h1>
            {/* O location é está sendo usado para omitir esse botão em outras rotas */}
            {location.pathname === '/' && (
                <Button
                    color={showAdd ? 'red' : 'green'}
                    text={showAdd ? 'Close' : 'Add'}
                    onClick={onAdd}
                />
            )}


            {/* <Button color='blue' text='Hello 1' /> */}
            {/* <Button color='red' text='Hello 2' /> */}


            {/* Essa aplicação de estilo se chama INLINE STYLE
                LEMBRETE: Ao aplico-la, lembre-se de sempre usar DOUBLE CURLY BRACKETS
                Esse método também é usado quando tiver algum componente dinâmico (Ex: Sanfona), no qual
                é bom setar o CSS na linha e com JS
            */}
            {/* <p style={{ color: 'red', backgroundColor: 'bisque' }}>Sub-Título</p> */}


            {/* <p style={headingStyle}>Sub-Título 2</p> */}

        </header>
    )
}

//DefaultProps - Setar valores padrões nos props caso nenhum props foi passado 
Header.defaultProps = {
    titulo: 'Task Tracker With Default Props'
}

//Serve para tipar as variáveis/props, fazendo com que o código fique mais robusto.
//Isso ainda faz com que seja renderizado, porém com um WARNING no console 
//Para soluções como essa, existe o TYPESCRIPT
Header.propTypes = {
    titulo: PropTypes.string,

    /*isRequired é uma boa solução, serve para forçar a tipação, 
    não deixando que renderize e ainda dando o WARNING*/
    // titulo: PropTypes.string.isRequired,

    //LEMBRETE: Ao testar/buildar, lembre que pode entrar em conflito com defaultProps, então sempre confira
}

//CSS in JS
//Uma boa alternativa é usar o lib Styled-Components
const headingStyle = {
    color: 'red',
    backgroundColor: 'bisque'
}

export default Header
