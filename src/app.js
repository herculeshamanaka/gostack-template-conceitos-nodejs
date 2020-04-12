const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  console.log(techs);

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(newRepo);
  
  response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repos => repos.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'});
  }

  repositories[repoIndex].title = title;
  repositories[repoIndex].url = url;
  repositories[repoIndex].techs = techs;

  response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  
  console.log('chamou');

  const repoIndex = repositories.findIndex(repos => repos.id === id);

  if (repoIndex < 0) {
    return res.status(400).json({ error: 'Project not found.'});
  }

  repositories.splice(repoIndex, 1);

  res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repos => repos.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'});
  }

  const repoInfo = repositories[repoIndex];
  repoInfo.likes = repoInfo.likes + 1;

  //repositories.save(repoInfo);

  response.json(repositories[repoIndex]);
});

module.exports = app;
