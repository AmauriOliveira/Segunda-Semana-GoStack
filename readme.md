# Segunda semana GoStack

> Aqui tem todo código feito na minha jornada de aprendizagem

![GitHub last commit](https://img.shields.io/github/last-commit/amaurioliveira/Segunda-Semana-GoStack)
![license](https://img.shields.io/github/license/amaurioliveira/Segunda-Semana-GoStack)
![GitHub repo size](https://img.shields.io/github/repo-size/amaurioliveira/Segunda-Semana-GoStack)

## :telescope: Overview

  [🏠 Homepage](https://github.com/AmauriOliveira/Segunda-Semana-GoStackk)

## Node com TypeScript

### Aprendi sobre

----

- Sempre adicione o typescript como dependência de desenvolvimento e depois rode yarn tsc --init para gerar o arquivo de configuração.

- Sempre que adicionar um pacote verifique se tem o @types dele e instale como dependência de desenvolvimento.

```bash
yarn tsc
```

  > converte TypeScript em JavaScript.

```bash
- yarn add ts-node-dev -D
```

  > Extremamente rápido para se visualizar modificações feito no código em tempo de desenvolvimento.

```bash
  ts-node-dev --transpile-only --ignore-watch node_module src/server.ts
```

 --transpile-only, não vai verificar sem tem erros de tipos.

 --ignore-watch node_module, ignora a observação e compilação da pasta node_module.

- Models, que ele representa uma entidade (tabela) no banco de dados.

- Repository, que eles manipulam os dados das models.

- Services, fica com a responsabilidade sobre todas regras de negócios.

### SOLID

- SoC, Separation of Concerns (Separação de Preocupação), que cada parte do código tenha apenas uma preocupação.

- Dependency Inversion (Inversão de Dependência), sempre que tem uma dependência externa deve receber a instancia como parâmetro do construtor da classe

### Instalar o eslint no node

```bash
yarn add eslint@6.8.0 -D
```

```bash
yarn eslint --init
```

> Respostas

- To check syntax, find problems, and enforce code style
- JavaScript modules (import/export)
- None of these
- Yes
- Node
- Use a popular style guide
- Airbnb: https://github.com/airbnb/javascript
- JSON
- No

```bash
yarn add @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.21.2 @typescript-eslint/parser@latest -D
```

## :star2: Contributing

Contributions, issues and feature requests are welcome!

- ⭐️ Star the project
- 🐛 Find and report issues
- 📥 Submit PRs to help solve issues or add features

Feel free to check [issues page](https://github.com/amaurioliveira/Segunda-Semana-GoStack/issues). You can also take a look at the contributing guide.

## :bow: Author

**Amauri Oliveira** 
* Email: amauriibate32@hotmail.com
* GitHub: [@amaurioliveira](https://github.com/amaurioliveira)
* LinkedIn: [@amauri-oliveira-058066192](https://linkedin.com/in/amauri-oliveira-058066192)

## :books: License

Copyright © 2020 Amauri Oliveira
This project is [MIT](license) licensed.
