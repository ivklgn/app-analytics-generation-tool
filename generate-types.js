const { deleteFile, writeFile } = require("./file");
const { formatCompoundType, underscoreToCamelCase } = require("./csv-parsing");

async function generateTypes({ typesData, eventsData, pathToGeneratedTypes }) {
  await deleteFile(pathToGeneratedTypes);
  await generateTypesFromCSVFile(typesData, pathToGeneratedTypes);
  await generateEventsFromCSVFile(eventsData, pathToGeneratedTypes);
}

async function generateTypesFromCSVFile(typesData, pathToOutput) {
  const generatedInterfaces = generateCompoundInterfaces(typesData);
  await writeFile(pathToOutput, generatedInterfaces);
}

async function generateEventsFromCSVFile(eventsData, pathToOutput) {
  const events = eventsData.reduce((acc, ed) => [...acc, ...ed.events], []);
  const generatedEventsInterfaces = generateCompoundInterfaces(events);
  const generatedEventMap = generateEventMap(eventsData);

  await writeFile(pathToOutput, generatedEventsInterfaces);
  await writeFile(pathToOutput, generatedEventMap);
}

function generateCompoundInterfaces(jsonData) {
  return jsonData.reduce((interfacesTextContent, compoundType) => {
    if (compoundType.type === "compound") {
      const fields = compoundType.fields.map(
        (field) => `
  /**
   * ${field.name}
   * @type {${field.type}${field.required ? "" : " | undefined"}}
   */
  ${field.name}${field.required ? "" : "?"}: ${formatCompoundType(field.type)}`
      );

      interfacesTextContent += `
/**
 * ${compoundType.name}
 * @type {${underscoreToCamelCase(compoundType.name)}}
 * @description ${compoundType.description}
 */
export interface ${underscoreToCamelCase(compoundType.name)} { ${fields.join(" ")}
}
\n`;
    }
    return interfacesTextContent;
  }, "");
}

function generateEventMap(groupAsEvents) {
  let content = `
export type EventMap = {
`;

  groupAsEvents.forEach((group) => {
    content += `
  ${group.name}: {
`;

    content += group.events.map(
      (event) => `
${event.name}: ${underscoreToCamelCase(event.name)}`
    );

    content += "},";
  });

  content += "};";
  return content;
}

module.exports = { generateTypes };
