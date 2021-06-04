# Mozaïk jira widgets

## Jira — Sprint

> Montre l'avancement du sprint actif d'un projet

### parameters

key        | required | description
-----------|----------|----------------------------------------------------
`url  `    | yes      | *URL de l'hôte jira*
`project`  | yes      | *Nom du projet dans jira*
`board`    | yes      | *Numero de la board jira contenant les informations du projet*

### Usage

```javascript
{
  type: 'jira.sprint',
  title : "Sprint",
  url : "https://host.com/jira",
  project : "MYPROJECT",
  board : "1690",
  columns: 1, rows: 1,
  x: 0, y: 0
}
```

## Jira — Tickets

> Montre les tickets ouverts et leurs types pour un projet donné


### parameters

key        | required | description
-----------|----------|----------------------------------------------------
`url  `    | yes      | *URL de l'hôte jira*
`filter`   | yes      | *Filtre préenregistré dans l'hôte jira, ce filtre contient le nom du projet et permet d'extraire seulement les tickets ouverts*

### Usage

```javascript
{
  type: 'jira.ticket',
  title : "Tickets ouverts",
  url : "https://host.com/jira",
  filter : 39451
  columns: 1, rows: 1,
  x: 0, y: 0
}
```
