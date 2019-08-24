import Table from '../models/table.mjs'

const findAll = (req, res) => {
  Table.find({}, (error, tables) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send(tables)
    } 
  }).sort({ _id: -1 })
}

const findOne = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else if (table) {
      res.send(table)
    } else {
      res.status(404).send({ message: `Table not found` })
    }
  })
}

const create = (req, res) => {
  new Table({
    ...req.body
  }).save((error, table) => {
    if (error || !table) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send({
        message: 'Table created successfully',
        table: table
      })
    }
  })
}

const update = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else if (table) {
      Object.keys(req.body).forEach(key => {
        if (req.body) {
          table[key] = req.body[key]
        }
      })
      Table.save((error, table) => {
        if (error || !table) {
          console.log(error)
          res.status(500).send(error)
        } else {
          res.send({
            message: 'Table updated successfully',
            table: table
          })
        }
      })
    } else {
      res.status(404).send({ message: 'Table not found' })
    }
  })
}

const destroy = (req, res) => {
  Table.remove({ _id: req.params.table_id }, (error) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send({
        message: 'Table deleted successfully'
      })
    }
  })
}

export default {
  findAll,
  findOne,
  create,
  update,
  destroy
}