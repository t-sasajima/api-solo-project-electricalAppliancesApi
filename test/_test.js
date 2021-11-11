const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();
const config = require("../config");
const knex = require("knex")(config.db);

const miele = {
  name: "G 7104 C SCi",
  maker: "Miele",
  price: 352000,
  category: "Dishwasher",
};

const kantaKun = {
  name: "kanta-kun 5kg type",
  maker: "Rinnai",
  price: 140800,
  category: "Laundry dryer",
};

const roomba = {
  name: "Roomba i7",
  maker: "iRobot",
  price: 109868,
  category: "cleaner",
};

const server = setupServer();
describe("electrical appliances API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
    knex("appliances").del().then();
    knex("comments").del().then();
  });

  describe("GET /electricalAppliances", () => {
    it("should return all appliances", async () => {
      knex("appliances").insert(miele).then();
      knex("appliances").insert(kantaKun).then();
      knex("appliances").insert(roomba).then();

      const res = await request.get("/electricalAppliances");
      const resObj = JSON.parse(res.text);
      resObj.length.should.equal(3);
      resObj[0].should.have.property("id");
      resObj[0].should.include(miele);
      resObj[1].should.include(kantaKun);
      resObj[2].should.include(roomba);
    });
  });
});
