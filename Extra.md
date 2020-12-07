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
