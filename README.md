## Twitter Hashtag Monitor - Servidor [Back-end]

Servidor da aplicação de monitoramento de hashtag no Twitter.

## Sobre este projeto

A ideia do aplicativo é referente a um desafio proposto a mim, com o seguinte contexto:

_"Um diretor de TV precisa exibir em um telão, os tweets que chegam contendo uma determinada hashtag que varia diariamente. Foi pedido que esses tweets fossem inseridos no telão por um controle: Através de um sistema web que seria comandado pelo pessoal de operações do estúdio, neste caso o mesmo deveria aprovar os tweets que estão chegando para que o mesmo seja exibido. Para essa exibição, deverá obrigatoriamente ter efeito de transição entre os tweets que foram aprovados no sistema de controle."_

## Começando

### Pré-requisitos

Para executar este projeto no modo de desenvolvimento, você precisará ter um ambiente básico com o NodeJS 8+ instalado. Para saber mais, clique [aqui](https://nodejs.org/en/).

Além disso, você precisará ter o [Redis](https://redis.io/) instalado e em execução na sua máquina..

### Instalando

**Clonando o Repositório**

```
$ git clone https://github.com/FelipePbi/twitter_hashtag_monitor_beck_end

$ cd twitter_hashtag_monitor_beck_end
```

**Instalando dependências**

```
$ yarn
```

_ou_

```
$ npm install
```

### Configurando Conexão com a API do Twitter

1 - Acesse o site [Twitter Developer](https://developer.twitter.com/en) e registre uma conta de desenvolvedor, crie uma aplicação e obtenha seu _Bearer Token_.

2 - Após o passo 1, acesse o arquivo [src / configs / SecretApiTwitter.js](https://github.com/FelipePbi/twitter_hashtag_monitor_beck_end/blob/master/src/configs/SecretApiTwitter.js) e edite o valor do campo `bearer\_token` (linha 3) informando o seu _Bearer Token_.

3 - Acesse o arquivo [src / configs / Api.js](https://github.com/FelipePbi/twitter_hashtag_monitor_beck_end/blob/master/src/configs/Api.js) e edite o valor do campo baseURL (linha 2) informando o seu o IP da sua máquina, exemplo _http://localhost:3333_.

4 - Acesse o arquivo [src / configs / Redis.js](https://github.com/FelipePbi/twitter_hashtag_monitor_beck_end/blob/master/src/configs/Redis.js) e edite os valores dos campos `host` (linha 2), `port` (linha 3) e `password` (linha 4) informando os dados de conexão do seu Redis.

### Rodando o servidor

Com todas as dependências instaladas e o ambiente configurado corretamente, agora você pode executar o servidor:

```
$ yarn dev
```

## Rotas (Endpoints)

O URL base é: http://localhost:3333/api

### Monitorar Tweets

- Iniciar/Parar monitoramento de determinada Hashtag

| URL      | Method | Params                                                                               | URL Params | Success Response                                                     | Error Response                                                                                                              |
| -------- | ------ | ------------------------------------------------------------------------------------ | ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| /monitor | `POST` | `hashtag` - String com a hashtag <br /><br /> `monitoring` - Status do monitoramento | -          | **Code:** 200 - OK<br />**Content:** `{ success: true, errors: [] }` | **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ success: false, errors: [<Mensagem com a descrição do Erro>] }` |

- Resetar listas e campos

| URL            | Method | Params | URL Params | Success Response                                                     | Error Response                                                                                                              |
| -------------- | ------ | ------ | ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| /monitor/reset | `POST` | -      | -          | **Code:** 200 - OK<br />**Content:** `{ success: true, errors: [] }` | **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ success: false, errors: [<Mensagem com a descrição do Erro>] }` |

- Aprovar Tweet

| URL                     | Method | Params             | URL Params | Success Response                                                     | Error Response                                                                                                              |
| ----------------------- | ------ | ------------------ | ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| /monitor/tweets/approve | `POST` | `id` - ID do Tweet | -          | **Code:** 200 - OK<br />**Content:** `{ success: true, errors: [] }` | **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ success: false, errors: [<Mensagem com a descrição do Erro>] }` |

- Rejeitar Tweet

| URL                    | Method | Params             | URL Params | Success Response                                                     | Error Response                                                                                                              |
| ---------------------- | ------ | ------------------ | ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| /monitor/tweets/reject | `POST` | `id` - ID do Tweet | -          | **Code:** 200 - OK<br />**Content:** `{ success: true, errors: [] }` | **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ success: false, errors: [<Mensagem com a descrição do Erro>] }` |

- Receber Tweets

| URL                     | Method | Params                     | URL Params | Success Response                                                     | Error Response                                                                                                              |
| ----------------------- | ------ | -------------------------- | ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| /monitor/tweets/receive | `POST` | `tweets` - Lista de Tweets | -          | **Code:** 200 - OK<br />**Content:** `{ success: true, errors: [] }` | **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ success: false, errors: [<Mensagem com a descrição do Erro>] }` |

## Sobre

Este projeto faz parte do meu portfólio pessoal, portanto, ficarei feliz se você puder me fornecer algum feedback sobre o projeto, código, estrutura ou qualquer coisa que você possa relatar que possa me tornar um desenvolvedor melhor!

Email: felipexd-2011@hotmail.com

Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/felipe-borges-pbi/)

Além disso, você pode usar este projeto como desejar, estudar, fazer melhorias ou ganhar dinheiro com ele!

## Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](https://github.com/steniowagner/bon-appetit-app/blob/master/LICENSE) para obter detalhes
