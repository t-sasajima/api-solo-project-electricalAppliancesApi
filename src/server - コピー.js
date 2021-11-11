//const _ = require("underscore");
const pokeData = require("./data");
const express = require("express");
const app = express();

const if_func = (key) => {
  if (isFinite(key)) {
    ey = key.padStart(3, "0");
    return (pokemon) => {
      return pokemon.id === key;
    };
  }
  key = key.toLowerCase();
  return (pokemon) => {
    return pokemon.name.toLowerCase() === key;
  };
};

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  app.use(express.json());

  app.get("/api/pokemon", (req, res) => {
    const { limit } = req.query;
    let ret = pokeData.pokemon;
    if (limit !== undefined) {
      ret = ret.slice(0, Number(limit));
    }
    res.send(ret);
  });
  app.post("/api/pokemon", (req, res) => {
    const addPokemon = req.body;
    addPokemon.id = pokeData.pokemon.length + 1;
    pokeData.pokemon.push(addPokemon);
    res.send(addPokemon);
  });
  app.get("/api/pokemon/:key", (req, res) => {
    const { key } = req.params;
    let ret;
    if (isFinite(key)) {
      const id = key.padStart(3, "0");
      ret = pokeData.pokemon.filter((val) => {
        return val.id === id;
      });
    } else {
      const name = key.toLowerCase();
      ret = pokeData.pokemon.filter((val) => {
        return val.name.toLowerCase() === name;
      });
    }
    if (ret.length === 0) {
      res.status(404).end();
    } else {
      res.send(ret);
    }
  });

  app.patch("/api/pokemon/:key", (req, res) => {
    const { key } = req.params;
    const changeData = req.body;

    const using_if_func = if_func(key);

    for (let i = 0; i < pokeData.pokemon.length; i++) {
      const pokemon = pokeData.pokemon[i];
      if (using_if_func(pokemon)) {
        for (const changeKey in changeData) {
          pokemon[changeKey] = changeData[changeKey];
        }
        res.send([pokemon]);
        break;
      }
    }
  });

  app.delete("/api/pokemon/:key", (req, res) => {
    const { key } = req.params;
    const using_if_func = if_func(key);

    for (let i = 0; i < pokeData.pokemon.length; i++) {
      const pokemon = pokeData.pokemon[i];
      if (using_if_func(pokemon)) {
        pokeData.pokemon.splice(i, 1);
        res.send([pokemon]);
        break;
      }
    }
  });

  return app;
};

module.exports = { setupServer };
