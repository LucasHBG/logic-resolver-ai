# Logic Resolver Ai

## Objetivo

Passe pela experiência única de ter um professor particular de Lógica Matemática e tira suas dúvidas sem medo de ser julgado em uma das matérias mais importantes de qualquer curso de TI.

## Diagrama

![logic_resolver_diagram](https://github.com/LucasHBG/logic-resolver-ai/assets/31226269/cbe1fc25-9a43-4bef-b956-5fcce4087545)


Instruções para instalação e configuração do ambiente de desenvolvimento da plataforma.

Os tópicos abaixo requerem familiaridade com uso de terminal de comando. Para ambientes Windows, é necessário possuir instalado o [WSL2](https://docs.microsoft.com/pt-br/windows/wsl/install), que provê acesso a um terminal compatível com comandos e programas Linux.

## Requisitos

1. [Docker](https://www.docker.com/products/docker-desktop/)
1. [vscode](https://code.visualstudio.com/download)
1. [git](https://git-scm.com/downloads)

### Observações:

-   Em ambiente Windows, é importante executar todos os comandos dentro do WSL
-   Embora seja possível utilizar qualquer editor de texto, aqui, se dá preferência para o vscode uma vez que ele permite utilizar container docker de ambiente de desenvolvimento.

## Verificar WSL no Windows

Para executar o projeto em Windows, é necessário instalar o WSL2. Caso a plataforma não seja Windows, esta etapa deve ser ignorada.

-   Abrir o `cmd.exe` no modo administrador e digitar `wsl -l -v` para verificar o status da instalação.
-   Após identificar o devido estado (instalado ou não), seguir o tópico abaixo mais adequado.
-   Os comandos abaixo devem ser executados no `cmd.exe` em modo administrador

### Instalar WSL

-   Executar o comando `wsl --install -d Ubuntu` para instalar
-   Nesta etapa, pode ser necessário definir usuário e senha para a plataforma WSL. Essas credenciais podem ser iguais às do Windows, mas lembre-se de que são autenticações distintas, assim, você precisará delas futuramente para executar comandos administrativos dentro da plataforma WSL
-   O Windows pedirá para reiniciar algumas vezes e avisará quando estiver pronto

### Atualizar WSL

-   Executar o comando `wsl --update` para atualizar a versão da plataforma

### Verificar status

-   O comando `wsl -l -v` deverá retornar as seguintes informações:

```
C:\Users\usuario>wsl -l -v
  NAME                   STATE           VERSION
* Ubuntu                 Running         2
  docker-desktop-data    Running         2
  docker-desktop         Running         2
```

## Instalar git

### Windows

-   A plataforma WSL possui instalação nativa do git, assim, deve-se seguir somente ao tópico de configuração

### Configurar git

-   Definir nome com o seguinte comando `git config --global user.name "SEU NOME"`
-   Definir email com o seguinte comando `git config --global user.email "seu@email.com"`
-   Definir chave SSH para autenticação: `ssh-keygen -t ed25519 -C "seu@email.com"` (apertar Enter em todas as etapas)

## Configurar Bitbucket

Após a instalação do git e configuração da chave SSH, é necessário vincular a máquina à sua conta no Bitbucket. Além de permitir o clone do repositório, esta etapa possibilita as operações rotineiras de desenvolvimento, como push e pull de commits.

-   Exibir chave criptográfica `cat ~/.ssh/id_ed25519.pub`
-   Copiar todo o conteúdo exibido pelo comando anterior
-   Entrar no [Perfil do GitHub](https://github.com/settings/keys)
-   Clicar em "Adicionar chave" ou "Add new Key"
-   Dê um nome para identificar a máquina, colar a chave criptográfica copiada e salvar
-   Agora sua máquina tem permissão para se conectar ao repositório


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
