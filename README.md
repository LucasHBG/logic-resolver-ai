## Início


## Clonar repositório

É provável que esteja lendo este documento em sua máquina, mas, caso não, siga as instruções abaixo:

-   Solicite acesso ao gerente de projeto às seguintes plataformas: Notion e GitHub, e informe seu e-mail de preferência
-   Todos os passos devem ser executados conforme descritos. Na plataforma Windows, é essencial que os comandos sejam executados dentro do WSL, caso contrário, caracteres de invisíveis de controle serão convertidos e o projeto não executará corretamente.
-   Todos os próximos passos desta documentação assumem que o terminal está localizado na pasta raiz do projeto.

### Windows

-   Abra o `cmd.exe`
-   Execute o comando `wsl` para autenticar na plataforma WSL
-   Entre na pasta de usuário, executando o comando `cd ~`
-   Clone o projeto com o seguinte comando: `git clone git@github.com:LucasHBG/logic-resolver-ai.git`
-   Abra a pasta raiz do projeto no vscode usando o comando `vscode ./logic-resolver-ai`

### Plataformas Unix-like

-   Abra o terminal
-   Navegue até o diretório em que deseja clonar o repositório
-   Clone o projeto com o seguinte comando: `git clone git@github.com:LucasHBG/logic-resolver-ai.git`
-   E entre na pasta raiz do projeto: `cd ./logic-resolver-ai`

Execute o servidor de desenvolvimento local:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para visualizar o ambiente.

Toda modificação no arquiva é automaticamente atualizada no ambiente de desenvolvimento LOCAL.
