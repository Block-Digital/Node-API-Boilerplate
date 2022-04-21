module.exports = {
  get: (req, res) => {
    res.json({
      "posts": {
        "title": 'My first Post',
        "description": "Data you should not access without being logged in"
      }
    })
  },
  create: () => {

  },
  update: () => {

  },
  delete: () => {

  },
  getAll: () => {

  }
};