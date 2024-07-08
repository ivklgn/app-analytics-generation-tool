const fs = require("fs");
const { writeFile } = require("./file");
const { getTypeFromArrayType } = require("./csv-parsing");

async function generateDocusaurusDocs({ typesData, eventsData, pathToDocusaurusDir, eventToSearchResults }) {
  await fs.promises.rm(pathToDocusaurusDir, { maxRetries: 5, retryDelay: 2000, recursive: true, force: true });
  await fs.promises.mkdir(pathToDocusaurusDir);
  await generateDocusaurusTypesContent(typesData, `${pathToDocusaurusDir}/types.md`);
  await generateDocusaurusEventsContent(eventsData, `${pathToDocusaurusDir}/events`, eventToSearchResults);
}

async function generateDocusaurusTypesContent(typesData, pathToOutput) {
  const typesContent = typesData.reduce(
    (content, type) => {
      if (type.type === "compound") {
        const fieldsContent = type.fields.reduce((acc, field) => {
          acc += `| **${field.name}${field.required ? "*" : ""}** | *[${field.type}](/docs/types#${getTypeFromArrayType(
            field.type
          )})* | ${field.description} |\n`;
          return acc;
        }, "");

        content += `
## ${type.name}\n
${type.description}

| Поле | Тип | Описание |
|-|-|-|
${fieldsContent}
\n`;
      }

      if (type.type === "primitive") {
        content += `
## ${type.name}\n
${type.description}
\n`;
      }
      return content;
    },
    `---
sidebar_position: 2
---

# Types
`
  );

  await writeFile(pathToOutput, typesContent);
}

async function generateDocusaurusEventsContent(eventsData, pathToDocusaurusEvents, eventToSearchResults) {
  await fs.promises.mkdir(pathToDocusaurusEvents);
  await writeFile(
    `${pathToDocusaurusEvents}/_category_.json`,
    `
{
  "label": "Events",
  "position": 1,
  "link": {
    "type": "generated-index"
  }
}`
  );

  for (const eventGroup of eventsData) {
    const eventsContent = eventGroup.events.reduce(
      (content, event) => {
        if (event.type === "compound") {
          const fieldsContent = event.fields.reduce((acc, field) => {
            acc += `| **${field.name}${field.required ? "*" : ""}** | *[${
              field.type
            }](/docs/types#${getTypeFromArrayType(field.type)})* |\n`;
            return acc;
          }, "");

          content += `
## ${event.name}\n
${event.description}

| Поле | Тип |
|-|-|
${fieldsContent}

${eventToSearchResults.find((r) => r.eventName === event.name).results.length ? "✅ Событие реализовано" : ""}

${writeTypescriptExampleCode({ eventGroup, eventName: event.name, eventData: event })}

\n`;
        }
        return content;
      },
      `---
sidebar_position: 2
--- 
# ${eventGroup.name}

`
    );

    await writeFile(`${pathToDocusaurusEvents}/${eventGroup.name}.md`, eventsContent);
  }
}

/**
 * Just for example
 */
function writeTypescriptExampleCode({ eventGroup, eventName, eventData }) {
  const exampleEventParams = eventData.fields.reduce((acc, field, index, arr) => {
    acc += `  ${field.name}: ${getRandomValueByType(field.type)}${index < arr.length - 1 ? ",\n  " : ""}`;
    return acc;
  }, "  ");
  return `
<details>
  <summary>Code example</summary>
  \`\`\`typescript
  trackEvent("${eventGroup.name}.${eventName}", {
${exampleEventParams}
  }); 
  \`\`\`
</details>
`;
}

function getRandomValueByType(type) {
  switch (type) {
    case "string":
      return `"some string"`;
    case "number":
      return 100;
    default:
      // TODO:
      return `"TODO: compound and arrays"`;
  }
}

module.exports = { generateDocusaurusDocs };
