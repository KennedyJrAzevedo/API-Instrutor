# API de Gerenciamento de Funcionários e Turmas

## Funcionalidades

Esta API permite gerenciar funcionários e turmas de maneira eficiente, oferecendo funcionalidades como cadastro, vinculação e busca de informações.

## Principais Endpoints

### **Funcionários:**

- **Registro de Funcionário:**
  - **`POST /register/employee`**: Cadastra um novo funcionário.
  
- **Listar Funcionários:**
  - **`GET /employees`**: Lista todos os funcionários cadastrados.
  
- **Busca por Registro:**
  - **`GET /search/registration`**: Busca um funcionário pelo registro.
  
- **Busca por CPF:**
  - **`GET /search/cpf`**: Busca um funcionário pelo CPF.
  
- **Busca por Nome:**
  - **`GET /search/name`**: Busca um funcionário pelo nome.
  
- **Atualizar Informações:**
  - **`PUT /employee`**: Atualiza dados de um funcionário (nome, senha, email, data de nascimento, telefone).
  
- **Deletar Funcionário:**
  - **`DELETE /employee`**: Remove um funcionário do sistema.

### **Turmas:**

- **Registro de Turma:**
  - **`POST /register/class`**: Cadastra uma nova turma.
  
- **Vincular Funcionário à Turma:**
  - **`PATCH /register/employee/class`**: Vincula um funcionário a uma turma.
  
- **Listar Turmas:**
  - **`GET /classes`**: Lista todas as turmas cadastradas.
  
- **Busca por Turma:**
  - **`GET /search/class`**: Busca uma turma pelo ID.
  
- **Listar Turmas de um Funcionário:**
  - **`GET /search/classes/registration`**: Lista as turmas associadas a um funcionário.
  
- **Deletar Turma:**
  - **`DELETE /class`**: Remove uma turma, desde que não esteja vinculada a um funcionário.
