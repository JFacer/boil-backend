"use strict";

const Joi = require("@hapi/joi");
  Joi.objectId = require('joi-objectid')(Joi);

const routes = [
  {
    method: "GET",
    path: "/",
    handler: async (req, h) => {
      const resp = await req.mongo.db.collection("movies").find({});
      return "Response from server " + JSON.stringify(resp);
    },
  },
  {
    method: "GET",
    path: "/movies",
    handler: async (req, h) => {
      const offset = 0;
      if (
        !(req.query.offset === undefined) &&
        typeof req.query.offset === "number"
      ) {
        offset = Number(req.query.offset) || 0;
      }
      const movies = await req.mongo.db
        .collection("movies")
        .find({})
        .sort({ year: -1 })
        .skip(offset)
        .limit(5)
        .toArray();
      let movie = {};
      let res = "";
      movies.forEach( (movie) => {
        res = res + "-> " + JSON.stringify(movie) + "\n";
      });
      return "List all movies \n" + res;
    },
  },
  {
    method: "POST",
    path: "/movies",
    handler: async (req, h) => {
      const payload = req.payload;
      const status = await req.mongo.db.collection("movies").insertOne(payload);
      return "Add new movie result: " + JSON.stringify(status);
    },
  },
  {
    method: "GET",
    path: "/movies/{id}",
    handler: async (req, h) => {
      if (!(req.params.id === undefined) && typeof req.params.id === "number") {
        const id = req.params.id;
        const ObjectID = req.mongo.ObjectID;
        const movie = await req.mongo.db.collection("movies").
                      findOne({_id: new ObjectID(id)}, {projection:{title:1,plot:1,cast:1,year:1}});
        return "Return a single movie: " + JSON.stringify(movie);
      } else {
        return "No movie found, check your param";
      }
    },
  },
  {
    method: "PUT",
    path: "/movies/{id}",
    options:{
      validate: {
        params: Joi.object({
          id: Joi.objectId()
        })
      }
    },
    handler: async (req, h) => {
      if (!(req.params.id === undefined)) {
        const id = req.params.id;
        const ObjectID = req.mongo.ObjectID;
        const payload = req.payload;
        const status = await req.mongo.db.collection("movies").updateOne({_id: ObjectID(id)}, {$set: payload});
        return "Update a single movie: " + JSON.stringify(status);
      }
    },
  },
  {
    method: "DELETE",
    path: "/movies/{id}",
    options:{
      validate: {
        params: Joi.object({
          id: Joi.objectId()
        })
      }
    },
    handler: (req, h) => {
      if (!(req.params.id === undefined)) {
        const id = req.params.id;
        const ObjectID = req.mongo.ObjectID;
        await req.mongo.db.collection("movies").findOneAndDelete({_id: ObjectID(id)})
        return "Delete a single movie: " + JSON.stringify(ObjectID(id));
      }
    },
  },
  {
    method: "GET",
    path: "/search",
    handler: (req, h) => {
      return "Return search result";
    },
  },
];

module.exports = routes;
