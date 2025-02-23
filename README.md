# Sistema Íris
Sistema **Íris** de gerenciamento acadêmico.

# Prévia Visual

![image](https://github.com/user-attachments/assets/66ad8da3-6baa-4900-a882-85963c2980a5)
![image](https://github.com/user-attachments/assets/a7bf2c99-c53c-4240-91f1-f7b46d0ddafa)
![image](https://github.com/user-attachments/assets/8d663ddd-505a-4de4-8350-d9868acfe479)




## Objetivo do sistema
O sistema tem como objetivo auxiliar e substituir parte do trabalho manual realizado pelos servidores do **CEDLAN**, facilitando o gerenciamento de notas e de turmas das disciplinas eletivas (antes feito por uma tabela no Excel). O sistema será desenvolvido por 2 grupos divididos entre Front-end e Back-end.

## Tecnologias
### Frontend
- **Svelte**
- **Tailwind**
- **DaisyUI**
### Versionamento
- **Git**
### Backend
- **Java 21**
- **Spring Boot**
- **Spring Security**
- **Swagger**

## Contribuidores
**Luiz Gustavo**: Programação geral do front end, contribuiu com backend, UI/UX e gerenciamento de requisitos (Github: https://github.com/1917dc) \
**Karoline Rodrigues**: Desenvolvimento de todo Front-end relacionado ao acesso de administradores ao sistema (Github: https://github.com/krol-rustns) \
**Leonardo Brito**: Desenvolvimento do backend, e criação de dockerfiles (Github: https://github.com/D0ntP4nic42) \
**Breno Amorim**: Desenvolvimento backend (Github: https://github.com/brenoakese)

## Como rodar nosso projeto
O Backend precisará ser clonado antes, para que o usuário tenha acesso á api que alimenta o sistema; atualmente estamos desenvolvendo uma nova versão da api que está melhor estruturada do que a que usamos atualmente no projeto, ela pode ser encontrada em: https://github.com/D0ntP4nic42/iris-api \

Atualmente estamos usando a api antiga, que pode ser encontrada em: https://github.com/brenoakese/iris-backend **(certifique-se de estar na branch `Dev2.0` antes de tentar subir o projeto)**

Após colocar a api do backend dentro da pasta `/iris` (diretório base do frontend), certifique-se de ter o [docker](https://www.docker.com/products/docker-desktop/) instalado na sua máquina, e após isso coloque os seguintes comandos no terminal:
```bash
docker compose up --build
```
O projeto vai instalar todas as dependências necessárias para subir o frontend, backend e banco de dados; após esse processo tudo deve estar funcionando normalmente e o projeto pode ser testado.
