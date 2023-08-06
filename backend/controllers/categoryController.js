const { validationResult } = require("express-validator");
const connect = require('../config/db');
const Category = require('../models/Category');
const { ObjectId } = require('mongodb'); 

const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name } = req.body;
    try {

      const client = await connect();
      const categoryCollection = client.db('ecommerce').collection('category');

      const categoryExist = await categoryCollection.findOne({ name });

      if (!categoryExist) {
        const newCategory = new Category(name);

        await categoryCollection.insertOne(newCategory);

        return res.status(201).json({ msg: 'The category has been created successfully.' });
      } else {
        return res.status(401).json({ errors: [{ msg: `${name} is already exists!` }] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    return res.status(401).json({ errors: errors.array() });
  }
};

const categories = async (req, res) => {
  const page = req.params.page;
  const perPage = 3;
  const skip = (page - 1) * perPage;
  try {

    const client = await connect();
    const categoryCollection = client.db('ecommerce').collection('category');

    const count = await categoryCollection.countDocuments();
    const cursor = categoryCollection.find({}).skip(skip).limit(perPage).sort({ updatedAt: -1 }); // Cursor elde ediliyor.
    const response = await cursor.toArray();
    return res.status(200).json({ perPage, count, categories: response });

  } catch (error) {
    console.log(error.message);
  }
};



const fetchCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Category ID is missing in the request.' });
  }

  try {
    console.log('Requested ID:', id);
    console.log('Converted ObjectId:', ObjectId(id));

    const client = await connect();
    const categoryCollection = client.db('ecommerce').collection('category');

    const response = await categoryCollection.findOne({ _id: new ObjectId(id) });

    if (!response) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    console.log('controller response : ', response);

    return res.status(200).json({ category: response });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: 'Server internal error!' });
  }
};

module.exports = { createCategory, fetchCategory, categories };
