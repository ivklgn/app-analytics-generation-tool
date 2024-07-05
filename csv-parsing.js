const { readFile } = require("./file");

function isHeaderLine(line, lineNumber) {
  return lineNumber === 1;
}

function isCategory(line, lineNumber) {
  const splittedLine = line.split(",");
  return splittedLine[0] !== "" && splittedLine.slice(-4).every((l) => l === "");
}

function isTypePrimitive(line) {
  return line
    .split(",")
    .slice(-4)
    .every((l) => l === "");
}

function isTypeCompound(line) {
  return line.split(",").every((l) => l !== "");
}

function isTypePartOfCompoundTypes(line) {
  const splittedLine = line.split(",");
  return splittedLine[0] === "" && splittedLine[1] === "" && splittedLine.slice(-4).every((l) => l !== "");
}

function isTypePartOfCompoundEvents(line) {
  const splittedLine = line.split(",");
  return splittedLine[0] === "" && splittedLine[1] === "" && splittedLine.slice(2, 5).every((l) => l !== "");
}

function underscoreToCamelCase(text) {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function formatCompoundType(type) {
  if (type === "number" || type === "string" || type === "number[]" || type === "string[]") {
    return type;
  }

  return underscoreToCamelCase(type);
}

function getTypeFromArrayType(type) {
  return type.split("[]")[0];
}

async function parseTypesFromFile(pathToTypesFile) {
  const typesData = [];

  await readFile(pathToTypesFile, function (line, lineNumber) {
    if (isHeaderLine(line, lineNumber)) {
      return null;
    }

    const splittedLine = line.split(",");

    if (isTypePrimitive(line)) {
      typesData.push({
        name: splittedLine[0],
        type: "primitive",
        description: splittedLine[1],
      });

      return;
    }

    if (isTypeCompound(line)) {
      typesData.push({
        name: splittedLine[0],
        type: "compound",
        description: splittedLine[1],
        fields: [],
      });

      return;
    }

    if (isTypePartOfCompoundTypes(line) && typesData[typesData.length - 1].type === "compound") {
      typesData[typesData.length - 1].fields.push({
        name: splittedLine[2],
        type: splittedLine[3],
        description: splittedLine[4] ?? "",
        required: splittedLine[5] === "+" ? true : false,
      });

      return;
    }
  });

  return typesData;
}

async function parseEventsFromFile(pathToEventsFile) {
  const eventsData = [];

  await readFile(pathToEventsFile, function (line, lineNumber) {
    if (isHeaderLine(line, lineNumber)) {
      return null;
    }

    const splittedLine = line.split(",");

    if (isCategory(line, lineNumber)) {
      eventsData.push({
        name: splittedLine[0],
        events: [],
      });

      return;
    }

    const eventGroup = eventsData[eventsData.length - 1];

    if (isTypeCompound(line)) {
      eventGroup.events.push({
        name: splittedLine[0],
        type: "compound",
        description: splittedLine[1],
        fields: [],
      });

      return;
    }

    if (isTypePartOfCompoundEvents(line) && eventGroup.events[eventGroup.events.length - 1].type === "compound") {
      eventGroup.events[eventGroup.events.length - 1].fields.push({
        name: splittedLine[2],
        type: splittedLine[3],
        required: splittedLine[4] === "+" ? true : false,
      });

      return;
    }
  });

  return eventsData;
}

module.exports = {
  isHeaderLine,
  isCategory,
  isTypePrimitive,
  isTypeCompound,
  isTypePartOfCompoundTypes,
  isTypePartOfCompoundEvents,
  formatCompoundType,
  underscoreToCamelCase,
  getTypeFromArrayType,
  parseTypesFromFile,
  parseEventsFromFile,
};
