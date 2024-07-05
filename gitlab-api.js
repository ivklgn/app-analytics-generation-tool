const { Gitlab } = require("@gitbeaker/node");

const api = new Gitlab({
  host: process.env.GITLAB_HOST,
  token: process.env.GITLAB_TOKEN,
  version: process.env.GITLAB_API_VERSION,
});

async function searchInGitlabProject(projectId, search) {
  try {
    return await api.Search.all("blobs", search, {
      projectId: projectId,
      perPage: 100,
    });
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

module.exports = { searchInGitlabProject };
