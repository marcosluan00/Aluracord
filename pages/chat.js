import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';

import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('');
    const [lista, setListaDeMensagem] = React.useState([]);

    function handleNovaMensagem(novaMensagem){
        const mensagem = {
            id:lista.length+1,
            usuario:'marcosluan00',
            texto:novaMensagem,
        }
        setListaDeMensagem([
            mensagem,
            ...lista,
        ])
        setMensagem('')
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={lista} />
                    {/* {lista.map((mensagemAtual) =>{
                        return(
                            <li key={mensagemAtual.id}>
                               {mensagemAtual.usuario}: {mensagemAtual.texto}
                            </li>
                        )
                    })}      */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event)=>{
                                
                                const valor = event.target.value;
                                setMensagem(valor)
                            }}
                            onKeyPress={(event) =>{
                                if(event.key ==='Enter'){
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) { 
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'hiden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem)=> {
                return(
                    <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '30px',
                            height: 'px',
                            borderRadius: '45%',
                            display: 'inline-block',
                            marginRight: '8px',
                            float:'left'
                        }}
                        src={`https://github.com/vanessametonini.png`}
                    />
                    <Text tag="strong"

                    >
                        {mensagem.usuario}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '8px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                            
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                <Text
                        styleSheet={{
                            fontSize: '18px',
                        }}
                    >
                        {mensagem.texto}
                    </Text>
                
            </Text>
                )
            })}    
        </Box>
    )
}