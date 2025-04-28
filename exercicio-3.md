# RWA Exercícios

## Descrição

O Real World App (RWA) é um aplicativo criado pela equipe do Cypress para demonstrar o uso real de métodos, padrões e fluxos de teste do Cypress. É uma espécie de clone do aplicativo Venmo, que permite aos usuários criar uma conta, adicionar uma conta bancária e enviar/receber dinheiro entre amigos. Vamos nos utilizar do RWA para fazer exercícios e colocar nosso aprendizado do curso "Guardião da Qualidade" para aprender recursos avançados do Cypress e estratégias de teste. Ele serve como uma plataforma de aprendizado para explorar e praticar testes em cenários reais de desenvolvimento de software. 

Repo do RWA: https://github.com/cypress-io/cypress-realworld-app

## Casos de teste

Exercício: Criação de Casos de Teste para a Feature "Visualizar Histórico de Transações"

A funcionalidade "Visualizar Histórico de Transações" é crucial no aplicativo Real World App, permitindo aos usuários rastrear todas as transações realizadas. Vamos criar casos de teste para garantir que essa funcionalidade funcione corretamente:

Caso de Teste: Visualizar histórico de transações com sucesso.

Descrição: Verifique se é possível visualizar o histórico de transações de um usuário com suas transações anteriores exibidas corretamente.
Caso de Teste: Tentar visualizar o histórico de transações de um usuário sem transações anteriores.

Descrição: Garanta que o sistema exiba uma mensagem indicando que o usuário não possui transações anteriores caso tente visualizar o histórico sem transações registradas.

## Automação dos casos de teste

Exercício: Automação dos Casos de Teste "Visualizar Histórico de Transações"

Agora que você criou os casos de teste, é hora de automatizá-los usando o Cypress.io. Certifique-se de que o projeto "Real World App" esteja configurado corretamente no seu ambiente de desenvolvimento. Crie scripts de teste para os casos de teste definidos nos exercícios anteriores:

Automação do Caso de Teste: Visualizar histórico de transações com sucesso.

```javascript
describe('Visualizar histórico de transações com sucesso', () => {
  it('Deve exibir o histórico de transações de um usuário corretamente', () => {
    // Implemente os passos do caso de teste aqui
  });
});
```

Automação do Caso de Teste: Tentar visualizar o histórico de transações de um usuário sem transações anteriores.

```javascript
describe('Tentar visualizar o histórico de transações sem transações anteriores', () => {
  it('Deve exibir uma mensagem indicando que o usuário não possui transações anteriores', () => {
    // Implemente os passos do caso de teste aqui
  });
});
```

Continue praticando e explorando outras funcionalidades do Cypress.io para criar casos de teste e automações abrangentes para todas as features do Real World App. O objetivo é se tornar um Guardião da Qualidade altamente capacitado, capaz de testar de forma eficaz e garantir a qualidade do aplicativo em todos os aspectos. 

Boa sorte! 
#GuardiaoDaQualidade #AutomacaoDeTestes #Cypress
