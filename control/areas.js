var kafka = require('kafka-node');
var Producer = kafka.Producer
var client = new kafka.KafkaClient({ kafkaHost: "kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092", requestTimeout: 2000 });
var producer = new Producer(client)
var mongoose = require('mongoose'),
  area = mongoose.model('Area');
//area
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://35.227.94.29:27017';
const dbName = 'Demo';
MongoClient.connect(url, function(err, client) {
  var db = client.db(dbName);

  client.close();
});
exports.create_a_area = function (req, res) {
  da = { "method": "put", "model": "Area", "data": req.body }
  j = JSON.stringify(da);
  payloads = [{ topic: 'post-topic', messages: [j], partition: 0 }]
  producer.send(payloads, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
    console.log(payloads);
  });
};


exports.read_all_area = function (req, res) {
  area.find({}, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.read_a_area = function (req, res) {
  area.find({ _id: req.params.id }, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.update_a_area = function (req, res) {
  da = { "method": "post", "model": "Area", "query": { REG: req.body.REG, CWT: req.body.CWT, AMP: req.body.AMP, TAM: req.body.TAM, DISTRICT: req.body.DISTRICT, EA: req.body.EA }, "data": req.body }
  j = JSON.stringify(da);
  payloads = [{ topic: 'post-topic', messages: [j], partition: 0 }]
  producer.send(payloads, function (err, data) {
    if (err)
      res.send(err);
    console.log(err)
    res.json(data);
    console.log(payloads);
  });
};

exports.delete_a_area = function (req, res) {
  li = req.query['0'];
  js = JSON.parse(li);
  da = { "method": "del", "model": "Area", "query": { _id: js._id } };
  j = JSON.stringify(da);
  payloads = [{ topic: 'post-topic', messages: [j], partition: 0 }]
  producer.send(payloads, function (err, data) {
    if (err)
      res.send(err);
    console.log(err)
    res.json(data);
    console.log(payloads);
  });
};

exports.get_all_ea = function (req, res) {
  area.find({}, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.insert_ea = function (req, res) {
  da = { "method": "post", "model": "Area", "data": req.body }
  j = JSON.stringify(da);
  payloads = [{ topic: 'post-topic', messages: [j], partition: 0 }]
  producer.send(payloads, function (err, data) {
    if (err)
      res.send(err);
    console.log(err)
    res.json(data);
    console.log(payloads);
  });
};

exports.update_ea = function (req, res) {
  area.updateOne({ 'REG': req.params.REG, 'CWT': req.params.CWT, 'AMP': req.params.AMP, 'TAM': req.params.TAM, 'DISTRICT': req.params.DISTRICT, 'EA': req.params.EA, }, req.body, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.delete_ea = function (req, res) {
  area.deleteOne(req.body, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.getEaByCWT = function (req, res) {
  area.find( req.query , function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.getEaByFS = function (req, res) {
  area.find( req.query, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.getEaByFI = function (req, res) {
  area.find( req.query, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

producer.on('ready', function () {
  kafkaConnected = true;
  producer.on('error', function (err) { });
});
