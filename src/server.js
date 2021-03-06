const config = require("../config");
const knex = require("knex")(config.db);
const express = require("express");
const app = express();

const setupServer = () => {
  app.use(express.json());

  //製品一覧取得
  app.get("/electricalAppliances", (req, res) => {
    knex("appliances")
      .select()
      .then((appliances) => {
        res.send(appliances);
      });
  });

  //特定の製品情報を取得
  app.get("/electricalAppliances/:id", (req, res) => {
    const { id } = req.params;

    knex("appliances")
      .where({ id })
      .select()
      .then((appliances) => {
        if (appliances.length === 0) {
          res.status(404).end();
        } else {
          res.send(appliances);
        }
      });
  });

  //製品登録
  app.post("/electricalAppliances", (req, res) => {
    const reqAppData = req.body;
    //console.log(reqAppData);
    //res.send(reqAppData);
    //DB登録=>レスポンス
    knex("appliances")
      .insert(reqAppData)
      .then(() => {
        return knex("appliances").where(reqAppData).select();
      })
      .then((appliance) => {
        res.send(appliance[0]);
      });
  });

  //製品登録情報の変更
  app.put("/electricalAppliances/:id", (req, res) => {
    const { id } = req.params;
    const changeData = req.body;

    knex("appliances")
      .where({ id })
      .update(changeData)
      .then(() => {
        return knex("appliances").where({ id }).select();
      })
      .then((appliance) => {
        res.send(appliance);
      });
  });

  // 製品の削除
  app.delete("/electricalAppliances/:id", (req, res) => {
    const { id } = req.params;

    knex("appliances")
      .where({ id })
      .del()
      .then(() => {
        res.end();
      });
  });

  return app;
};

module.exports = { setupServer };
