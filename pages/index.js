import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import reactDom from 'react-dom';
import appConfig from '../config.json';
import React from 'react';
import { useRouter } from 'next/router'





function Titulo(props) {
    console.log(props.children);
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['900']};
                font-size: 24px;
                fontweight: 600
            }
            `}</style>
        </>
    );
}


//Componente do react
//function HomePage() {
//JSX
//return (
//<div>
//<GlobalStyle />
//<Titulo tag="h2">Boas vindas de volta!</Titulo>
//<h2>Discord - Alura Matrix</h2>
//</div>
//)
//}
//export default HomePage

export default function PaginaInicial() {
    //const username = 'GalegoSonolento';
    const [username, setUsername] = React.useState('');
    const userURL = `https://api.github.com/users/${username}`
    const rotemento = useRouter();
    const [userBio, setUserBio] = React.useState('');

    function handleChange(event) {
        setUsername(event.target.value)
        
        if (event.target.value.lenght > 2) {
            fetch('userURL')
        }
    }

    const imageError = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c50866a4-48ce-43d6-83f9-e5d399327d1e/dcjb0zn-34d288a6-4f03-4c1c-bfeb-cc2365dd232c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M1MDg2NmE0LTQ4Y2UtNDNkNi04M2Y5LWU1ZDM5OTMyN2QxZVwvZGNqYjB6bi0zNGQyODhhNi00ZjAzLTRjMWMtYmZlYi1jYzIzNjVkZDIzMmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YH0h3Ms5DGTo34TIvoso_0e7tnZJ5onHI_yYWDgZkvc';

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/11/the-witcher-3-wild-hunt-kaer-morhen-1024x576.jpg)',
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
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700].opacity,
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento){
                            infosDoEvento.preventDefault();
                            console.log('Alguém submeteu');
                            rotemento.push('/chat')
                            //window.location.href = '/chat'
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Wecome Back Agent</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/*<input 
                            type='value'
                            value={username}
                            onChange={function (event){   
                                console.log('usuario digitou', event.target.value)
                                //Onde tá o valor
                                const valor = event.target.value;
                                //navegador n sabe onde colocar
                                //através do react
                                setUsername(valor);
                            }}
                            />*/}

                        <TextField
                            value={username}
                            placeholder='Nome no GitHub'
                            onChange={handleChange}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />      

                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
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
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={
                                username.length > 2
                                  ? `https://github.com/${username}.png`
                                  : imageError
                            }
                        />
                        
                        {
                            username.length > 2 && (
                                <>
                                    <Text
                                        variant="body4"
                                        styleSheet={{
                                        color: appConfig.theme.colors.neutrals[200],
                                        backgroundColor: appConfig.theme.colors.neutrals[900],
                                        padding: '3px 10px',
                                        borderRadius: '1000px'
                                        }}
                                    >
                                        {username}
                                    </Text>
                                </>
                            )
                        }
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
} 