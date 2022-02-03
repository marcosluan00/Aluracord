import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { ButtonSendSticker } from '../src/components/SendSticker'


//Dados do supabase
const SUPABASE_ANON_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzYzNjg2OSwiZXhwIjoxOTU5MjEyODY5fQ.CpWuWZ1MKLMMHNg8sus6Bb1pRlZNu63yy5C_lQ9fdLs';
const SUPABASE_URL = 'https://fygyvwtndrhzukindbyg.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagens(adicionarMensagens){
    return supabaseClient.from('mensagens')
    .on('INSERT', (resposta) =>{
        adicionarMensagens(resposta.new);
    }).subscribe();
}

export default function ChatPage() {
    // Sua lógica vai aqui
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;

    //Use States
    const [mensagem, setMensagem] = React.useState('');
    const [lista, setListaDeMensagem] = React.useState([
        // {
        //     id:1,
        //     usuario:'marcosluan00',
        //     texto:':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_30.png'
        // }
    ]);
    
    React.useEffect(() => {
        supabaseClient.from('mensagens').select('*')
        .order('id', {ascending: false}).then(({ data }) =>{
            setListaDeMensagem(data)
        });
        escutaMensagens((novaMensagem)=>{
            setListaDeMensagem((valorAtualDaLista)=>{
                return [
                    novaMensagem, 
                    ...valorAtualDaLista
                ]
            });
        });
    }, []);
    

    function handleNovaMensagem(novaMensagem){
        const mensagem = {
            usuario:usuarioLogado,
            texto:novaMensagem,
        }
        supabaseClient.from('mensagens').insert([
            mensagem
        ])
        .then(( { data })=> {
        
        })
        setMensagem('')
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://i.pinimg.com/originals/0d/05/20/0d05201572964220c7c3b6ceab245bd8.gif)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
                
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(255 255 255 / 50%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.transparent[5],
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
                        backgroundColor: appConfig.theme.colors.transparent[5],
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
                                fontSize: '20px',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.transparent["050"],
                                marginRight: '8px',
                                color: appConfig.theme.colors.neutrals[999],
                            }}
                        />
                        <ButtonSendSticker
                        onStickerClick={(sticker) =>{
                            handleNovaMensagem(':sticker:'+sticker)
                        }}
                        />
                        <Button 
                        type="submit"
                        onClick={(evt) =>{
                            evt.preventDefault();
                            handleNovaMensagem(mensagem);
                        }}
                        
                        variant="secondary"
                        label='ENVIAR'
                        size='lg'
                        colorVariant='light'
                        styleSheet={{
                            marginBottom: '5px'
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
                overflow:'scroll',
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
                        src={`https://github.com/${mensagem.usuario}.png`}
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
                    {mensagem.texto.startsWith(":sticker:") ? (
                        <Box styleSheet={{
                            maxWidth:'15%',
                            maxHeight:'15%'
                        }}>
                        <Image src={mensagem.texto.replace(":sticker:", '')}
                        />
                        </Box>
                    ) : (
                        mensagem.texto
                    )}
            </Text>
                )
            })}    
        </Box>
    )
}