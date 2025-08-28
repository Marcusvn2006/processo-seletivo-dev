# Teste para Vaga de Auxiliar de Desenvolvedor

## 🚀 Como utilizar

Acesse a página através do link:  
👉 [Clique aqui para abrir o projeto](https://marcusvn2006.github.io/processo-seletivo-dev/)

---

### 🔹 Caso prefira acessar localmente, siga os passos abaixo:
1. Clique no botão **Code** e depois em **Download ZIP**.  
2. Extraia o arquivo ZIP em uma pasta no seu computador.  
3. Abra o arquivo **index.html** com qualquer navegador.

---

### 🔹 Ao acessar a página online:
- O site será carregado diretamente pelo navegador.  
- Você poderá visualizar e testar todas as funcionalidades.  

---

## 📋 Descrição do Teste

Este teste tem como objetivo avaliar suas habilidades básicas em desenvolvimento front-end, utilizando **HTML**, **CSS** e **JavaScript** para criar uma aplicação simples de consulta de CEP.

## 🎯 Objetivo

Desenvolver uma página web que permita ao usuário:
1. Inserir um CEP em um campo de input
2. Consultar as informações do CEP através da API do ViaCEP
3. Exibir os dados retornados na tela de forma organizada

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilização e layout
- **JavaScript** - Lógica de consulta à API e manipulação do DOM

## 📡 API Utilizada

**ViaCEP API**: `https://viacep.com.br/`

### Endpoint
```
GET https://viacep.com.br/ws/{cep}/json/
```

**Exemplo de requisição:**
```
https://viacep.com.br/ws/01310100/json/
```

**Exemplo de resposta:**
```json
{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

## 📝 Requisitos Funcionais

### Obrigatórios:
- [ ] Campo de input para inserção do CEP
- [ ] Botão para realizar a consulta
- [ ] Validação básica do formato do CEP (XXXXX-XXX ou XXXXXXXX)
- [ ] Requisição à API do ViaCEP usando JavaScript
- [ ] Exibição das informações retornadas na tela
- [ ] Tratamento de erro para CEP inválido ou não encontrado

### Informações que devem ser exibidas:
- CEP
- Logradouro (rua)
- Bairro
- Cidade
- UF (estado)
- DDD

## 🎨 Requisitos de Interface

- Interface limpa e intuitiva
- Uso de CSS para estilização
- Layout responsivo (opcional, mas será um diferencial)
- Feedback visual durante o carregamento (opcional)

## 📁 Estrutura de Arquivos Esperada

```
projeto/
├── index.html
├── style.css
├── script.js
└── README.md (este arquivo)
```

## 📚 Recursos Úteis

- [Documentação ViaCEP](https://viacep.com.br/)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [MDN Web Docs - Promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)


## 📋 Instruções de Entrega

1. Faça um fork deste repositório no seu GitHub.
2. Desenvolva a aplicação conforme os requisitos descritos acima.
3. Certifique-se de que seu código esteja devidamente organizado.
4. Inclua instruções no seu README.md explicando como executar o projeto.
5. Envie o link do seu repositório GitHub para avaliação.

## 💡 Dicas

- Teste sua aplicação com diferentes CEPs
- Considere casos de erro (CEP inexistente, problemas de conectividade)
- Mantenha o código limpo e comentado
- Use nomes de variáveis e funções descritivos
- Teste em diferentes navegadores

## <img width="24" align="center" src="https://cdn.simpleicons.org/whatsapp" /> Dúvidas

Em caso de dúvidas sobre o teste, entre em contato através do Whatsapp: <a href="https://wa.me/+5514998386951">14 99838-6951</a>


---

**Boa sorte! 🍀**

*Este teste faz parte do processo seletivo para a vaga de Auxiliar de Desenvolvedor.*
