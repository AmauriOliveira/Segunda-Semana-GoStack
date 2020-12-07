# Anotações sobre testes e TDD

## Testes Automatizados

Que nossa aplicação continue funcionando independentemente do número de novas funcionalidades e do número de devs no time

### Teste Unitários

Testam funcionalidades especificas de nossa aplicação e precisa sem função puras.

> Coisa muito isoladas do código, não depende de outra parte da aplicação, não faz chamada a API e nem tem efeito colaterais

``` Dica
Dados os mesmos parâmetros sempre terão os mesmos resultados
```

``` Dica
Bom usar na hora do TDD
```

### testes de Integração

Testam uma funcionalidade completa, passando par várias camadas da aplicação,

### Teste E2E

Testes que simulam a ação do usuário dentro da nossa aplicação

> Feito geralmente no front-end e não nas API

## TDD (Test Driven Developtment)

> Desenvolvimento dirigido a testes

``` Dica
Se cria os testes antes das funcionalidades especificando como ela deve se comportar
```

## JEST

>Instalando

```bath
 yarn add -D jest
```

>Iniciando

```bath
 yarn jest --init
```

√ Would you like to use Jest when running "test" script in "package.json"? ... yes

√ Would you like to use Typescript for the configuration file? ... no

√ Choose the test environment that will be used for testing » node

√ Do you want Jest to add coverage reports? ... no

√ Which provider should be used to instrument code for coverage? » babel

√ Automatically clear mock calls and instances between every test? ... yes

```bath
yarn add ts-jest -D
```

```bath
yarn add @types/jest -D
```

### Exemplo simples de um teste

```javascript
test('Sum two number', () => {
  expect(1 + 2).toBe(3);
});
```

```bath
yarn test
```

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        6.686 s, estimated 16 s
Ran all test suites.
Done in 10.38s.
