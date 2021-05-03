import { RESTDataSource } from "apollo-datasource-rest";
import Hero from "../../db/models/Hero";

class HeroAPI extends RESTDataSource {
  constructor() {
    super();
  }

  getHeros = () =>
    new Promise(
      async (resolve, reject) =>
        await Hero.find({}, (err, heros) =>
          err ? reject(err) : resolve(heros)
        )
    );

  addHero = (body) =>
    new Promise((resolve, reject) =>
      new Hero(body).save((err, hero) => (err ? reject(err) : resolve(hero)))
    );

  deleteHero = (id) =>
    new Promise(
      async (resolve, reject) =>
        await Hero.findByIdAndDelete(id, (err, hero) =>
          err ? reject(err) : resolve(hero)
        )
    );
}

export default HeroAPI;
