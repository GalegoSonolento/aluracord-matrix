import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker.js';

const SUPABASE_ANON_KEY =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5NzAwNywiZXhwIjoxOTU4OTczMDA3fQ.l6RCgGxDfIPozztLPYLtz_lOZMroA5vjoxDNcIBNt8c'
const SUPABASE_URL = 'https://ahyrhoppaktcpbleuwpq.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaEmRealTime(adicionaMensagem) {
    return supabaseClient
    .from('Mensagens')
    .on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
        console.log('roteamento.query', roteamento.query)
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([
        // {
        //     id: 1,
        //     de: 'omariosouto',
        //     texto: ':sticker: https://c.tenor.com/TKpmh4WFEsAAAAAC/alura-gaveta-filmes.gif'
        // },
        // {
        //     id: 2,
        //     de: 'GalegoSonolento',
        //     texto: 'o ternário é meio triste'  
        // }
    ]);

    React.useEffect(() => {
        supabaseClient
        .from('Mensagens') 
        .select('*')
        .order('id', {ascending: false })
        .then(({ data }) => {
            // console.log('dados da consulta', data);
            setListaDeMensagens(data)
        }); 
        
        escutaEmRealTime((novaMensagem) => {
            console.log('nova Mensagem', novaMensagem);
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });
    }, []);
    

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('Mensagens')
            .insert([
                // Tem q ser um objeto com os MESMOS CAMPOS que foram escritos no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
            })

        setMensagem('');
    }

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
                    <MessageList
                        mensagens={listaDeMensagens}
                        setListaDeMensagens={setListaDeMensagens}
                        listaDeMensagens={listaDeMensagens}
                    />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
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
                        <Button
                            type='button'
                            label='Send'
                            styleSheet={{
                                heigth: '100%',
                            }}
                            onClick={() => handleNovaMensagem(mensagem)}
                        />
                        {/* Interceptação -> explica onde tá configurado cada mensagem */}
                        {/* Callback  */}
                        <ButtonSendSticker 
                            onStickerClick={(sticker) => {
                                console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker:' + sticker);
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
    console.log(props);
    const handleRemove = (id) => {
        const newMessages = props.listaDeMensagens.filter(mensagem => mensagem.id !== id);
        props.setListaDeMensagens(newMessages)
    }
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
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
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}
                                />
                                <Text tag="strong">
                                    {mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>

                            <Box>
                                <Button
                                    type='button'
                                    label='&times;'
                                    size='sm'
                                    variant='tertiary'
                                    colorVariant='light'
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleRemove(mensagem.id);
                                    }}
                                    styleSheet={{
                                    }}
                                />
                            </Box>
                        </Box>
                        {/* Declarativo */}
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:') 
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )}
                            
                            
                            {/* //  ? (
                            //     <image src={mensagem.texto.replace(':sticker:', '')} />
                            // )
                            // : (
                            //     mensagem.texto
                            // )}  */}
                        {/* {mensagem.texto} */}
                    </Text>
                );
            })}
        </Box>
    )
}

// Funcionalidades ainda a adicionar 
// - Colocar um loading enquanto a mensagem ainda não foi lançada (enquanto o useEffect não passou)
// - Mouseover -> abrir imagem, link  pro GitHub, usar a API
// - Imagenzinha pra colocar anexo, imagem, etc
// - Arrumar as barras de scroll da página e do pop-up de stickers