import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import React from 'react'
import { useRouter } from 'next/router'


function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
      </>
    );
}

function PaginaInicial() {
  //UseState para alteração do user ao entrar no app - Deixei o username vazio para ser algo generico sem valor inicial
   const [username, setUsername] = React.useState('');
   const roteamento = useRouter();
  
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/08/27/11/59/pokemon-1624022_960_720.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '650px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '5px 10px 15px 0 rgba(255, 255, 255, 0.4)',
              backgroundColor: appConfig.theme.colors.transparent[5]
            }}
          >
            {/* Inicio do Formulário */}
            <Box
              as="form"
              onSubmit={(navegar) =>{
                navegar.preventDefault();
                roteamento.push(`/chat?username=${username}`);

              }} 
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body2" styleSheet={{ marginTop: '5px',marginBottom: '32px', color: appConfig.theme.colors.neutrals[100] }}>
                {appConfig.name} - Use seu github
              </Text>
  
              <TextField
                fullWidth
                //Usando o UseState e muda de acordo com a digitalização
                value={username}
                onChange={function(event){
                  const valor = event.target.value;
                  setUsername(valor);
                }}
                styleSheet={{
                  fontSize: '25px'
                }}
                textFieldColors={{
                  
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[100],
                    mainColor: appConfig.theme.colors.neutrals[500],
                    mainColorHighlight: appConfig.theme.colors.neutrals[999],
                    backgroundColor: appConfig.theme.colors.transparent[4],
                  },
                }}
              />
              <Button
                type='submit'               
                label='Entrar'
                fullWidth
                size='xl'
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[999],
                  mainColor: appConfig.theme.colors.primary["000"],
                  mainColorLight: appConfig.theme.colors.primary["050"],
                  mainColorStrong: appConfig.theme.colors.primary[100],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                borderRadius: '10px',
                flex: 1,
                minHeight: '200px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '20px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  fontSize: '30px',
                  color: appConfig.theme.colors.neutrals[100],
                  padding: '3px 10px',
                  fontWeight: 'bold'
                }}
              >
                {username}
                
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }

export default PaginaInicial;