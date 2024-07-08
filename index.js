const { parseEventsFromFile, parseTypesFromFile } = require("./csv-parsing");

const { generateTypes } = require("./generate-types");
const { generateDocusaurusDocs } = require("./generate-docusaurus-docs");
const { searchInGitlabProject } = require("./gitlab-api");

const PATH_TO_TYPES = "types.csv";
const PATH_TO_EVENTS = "events.csv";
const PATH_TO_GENERATED_TYPES = "__generated_types__/analytics.d.ts";
const PATH_TO_GENERATED_DOCS = "__generated_docs__/docs";

(async () => {
  const typesData = await parseTypesFromFile(PATH_TO_TYPES);
  const eventsData = await parseEventsFromFile(PATH_TO_EVENTS);

  await generateTypes({
    typesData,
    eventsData,
    pathToGeneratedTypes: PATH_TO_GENERATED_TYPES,
  });

  const events = eventsData
    .map((e) => e.events)
    .flat()
    .map((e) => e.name);

  const searchPromises = events.map(async (event) => {
    const results = await searchInGitlabProject(600, event);
    return { eventName: event, results };
  });

  const allSearchUsageResults = await Promise.all(searchPromises);

  await generateDocusaurusDocs({
    typesData,
    eventsData,
    pathToDocusaurusDir: PATH_TO_GENERATED_DOCS,
    eventToSearchResults: allSearchUsageResults,
  });
})();
