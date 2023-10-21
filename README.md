## smiles-lambda-partners-promotions

Projeto feito usando clean architecture, DDD, SOLID e clean code.

# RFs (Requisitos Funcionais)
Contexto de Campanha e Promoção
- [ ] Deve ser possível realizar a pesquisa de promoções/campanhas ativas e inativas
- [ ] Deve ser possível filtrar e ordenar as promoções com base em data, tipo.

Contexto Optin
- [ ] Deve ser possível realizar a pesquisa do membro por cpf
- [ ] Deve ser possível realizar o optin de uma campanha

# RFs (Regra de negócio)
Contexto de Campanha e Promoção
- [ ] Para pesquisas de promoções/campanhas o parceiro só pode seguir com a chamda da api apenas com escopo do auth0 - read:promotions
- [ ] Somente deve ser possível recuperar os dados de campanha e promoção relacionado ao partnerAlias

Contexto Optin
- [ ] Para optin o parceiro só pode seguir com a chamda da api apenas com escopo do auth0 - create:optin
- [ ] Para realizar o optin da campanha o parceiro precisa passar o id da promoção e cpf do member
- [ ] Para realizar o optin o cpf precisa estar cadastrado no programa Smiles
- [ ] Necessário realizar um tratamento de resposta com relação a eligibilidade do membro caso não seja elegível

# RFs (Requisitos não funcionais)
- [ ] utilizar o auth0 para geração de token de acesso
- [ ] implementar o Mutual TLS para comunicação de API (opcional)
- [ ] baixa latência (qual valor ?) => SLA de latência da Smiles
- [ ] Configurar logs encapsulados dentro de feature flags
- [ ] Documentação


Auth0

TENANT
- dev1-smiles
- dev2-smiles
- dev3-smiles
- hml5-smiles

APPLICATION

ID XYZ
Secret XYZ
API Audience  https://partners.smiles.api
Permissions (escopos): read:promotions; create:members; create:optin

https://apigw-hml5.smiles.com.br/b2b/partner/oauth/token

authority: hml5-login.smiles.com.br
Content-Type: application/json

{
    "client_id": "client_id",
    "client_secret": "client_secret",
    "audience": "https://partners.smiles.api",
    "grant_type": "client_credentials"
}


Response {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJMRkFudDJkZXJHZUxXbW9UbGNEViJ9.eyJpc3MiOiJodHRwczovL2htbDUtbG9naW4uc21pbGVzLmNvbS5ici8iLCJzdWIiOiJjd2RmMUxDMWJXUmhoNU9ZNkVaOHlSc3FheExjY0gzS0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wYXJ0bmVycy5zbWlsZXMuYXBpIiwiaWF0IjoxNjk3NDgwMTYwLCJleHAiOjE2OTc2NTI5NjAsImF6cCI6ImN3ZGYxTEMxYldSaGg1T1k2RVo4eVJzcWF4TGNjSDNLIiwic2NvcGUiOiJjcmVhdGU6bWlsZXMgY2FuY2VsOnJlZGVtcHRpb24gY3JlYXRlOm1lbWJlcnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.G8pQBBQ5mZybE2oigCnfBa-QpieLuM4NQqZZ8SJth4kooqbPpmSasCmFKcisKQOajQ_RXkyebe4v_Xp4KEp4w3MXpdfHF2Y14_n6KODo9RYyxbsfM1a3CC3QQ0I72ul51J_mcuic4MiU3CxJi29941iSJxZdtBFXIrgjPo1GfaH_6Jqc8Ut2YEccXzn1AX1sTw-GLs_3hrJbchPtmWD7D423QY2CV7i8XJg7aOatj8GAAwU_ArPeO2wFDzvIKLZssoCEqK8XxL12QvCPchYPsLheKQAiN2QErTYB829I4Afv9HBxCLd8YpHVkFIu0ZB6wljyfONFTSkdbAt1cKOtcw",
    "expires_in": 100867,
    "scope": "create:miles cancel:redemption create:members",
    "token_type": "Bearer"
}
