# app-analytics-generation-tool

This project is a research to rethink working with analytics on the frontend.

## Concept

1. Excel: strict specification in one place
2. Stop writing boilerplate code and generate typescript data-types for analytics from Excel (CSV)
3. Generate beautiful documentation with Docusaurus for developers and business

## Showcase and usage

### Check excel structure

<https://docs.google.com/spreadsheets/d/1ENoh8O9wTyBAQpj9J63c_g7iLbDJ_8yldRQ6cvpIUOY/edit?usp=sharing>

### Generate typescript types and documentation

Clone this repo and:

```bash
npm i
npm run generate
cd ./__generated_docs__
npm run start
```

Check the generated files in `__generated_types__`

Run your generated documentation:

```bash
cd ./__generated_docs__
npm run start
```

## Inspiration

- [ts-analytics](https://github.com/jherr/ts-analytics/tree/master/src)
- [docusaurus.io](https://docusaurus.io/)
