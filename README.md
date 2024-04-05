# Pass-In Event Manager (Front-End)

O Pass-In Event Manager é uma aplicação web moderna desenvolvida para gerenciamento eficiente de eventos e participantes. Este repositório contém o front-end da aplicação, desenvolvido durante o Next Level Week (NLW) da Rocketseat. Utiliza ReactJS e Tailwind CSS para criar uma experiência de usuário dinâmica e visualmente atraente. Para o back-end desta aplicação, visite [este repositório](https://github.com/Lag0/nlw-unite-nodejs).

## Funcionalidades

- **Criação e Gerenciamento de Eventos**: Permite aos usuários criar e gerenciar eventos, incluindo detalhes importantes.
- **Gerenciamento de Participantes**: Adicione e gerencie participantes, facilitando o controle de presença.
- **Check-in em Tempo Real**: Interface para realizar o check-in dos participantes, atualizando o status de participação instantaneamente.
- **Filtragem e Pesquisa Avançada**: Recursos de busca e filtragem para encontrar eventos e participantes facilmente.

## Tecnologias Utilizadas

- **ReactJS**: Criação de uma interface de usuário interativa.
- **Tailwind CSS**: Design responsivo e moderno com uma abordagem utility-first.
- **TypeScript**: Melhoria da manutenção e escalabilidade do código com tipagem estática.

## Integrando Front-End e Back-End

Este projeto é apenas o front-end da aplicação Pass-In Event Manager. Para uma funcionalidade completa, você também precisará configurar e executar o [back-end](https://github.com/Lag0/nlw-unite-nodejs), que é responsável por toda a lógica de negócios, autenticação e comunicação com o banco de dados.

## Como Executar

1. Clone o repositório do front-end:

```bash
git clone https://github.com/Lag0/nlw-unite-reactjs.git
```

2. Instale as dependências:

```bash
cd nlw-unite-reactjs
npm i
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Siga as instruções no [repositório do back-end](https://github.com/Lag0/nlw-unite-nodejs) para configurar e executar o servidor Node.js.

5. Não se esqueça de configurar a URL do back-end no arquivo `.env` do front-end para que a aplicação possa se comunicar corretamente.

```js
VITE_API_BASE_URL = "http://localhost:3333";
```

## Contribuindo

Suas contribuições são sempre bem-vindas! Sinta-se à vontade para sugerir melhorias ou adicionar novas funcionalidades ao projeto. Por favor, veja nosso guia de contribuição para mais detalhes.

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Contato

Bruno Lago - [Mais Informações](https://salvagni.co)

Front-End: [https://github.com/Lag0/nlw-unite-reactjs](https://github.com/Lag0/nlw-unite-reactjs)
Back-End: [https://github.com/Lag0/nlw-unite-nodejs](https://github.com/Lag0/nlw-unite-nodejs)

---
