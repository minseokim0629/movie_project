const express = require("express");
const router = express.Router();
//정보들 가져오려면 server쪽 Favorite에 접근 필요
const { Favorite } = require("../models/Favorite");
//client request가 post이기 때문에 post
//express에서 제공하는 router라는 기능
router.post("/favoriteNumber", (req, res) => {
  req.body.movieId;
  //mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err); //client에게 에러정보 보내주기
    //그 다음에 프론트에 다시 숫자 정보를 보내주기
    res.status(200).json({
      //200은 성공했다는 뜻
      success: true,
      favoriteNumber: info.length, //몇명이 이 영화를 좋아했는지
    });
  });
});

//내가 이 영화를 favorite 리스트에 넣었는지 정보를 db에서 가져오기
router.post("/favorited", (req, res) => {
  req.body.movieId;
  //mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err); //client에게 에러정보 보내주기
    //그 다음에 프론트에 다시 숫자 정보를 보내주기

    let result = false;
    if (info.length !== 0) {
      //내가 이 영화를 favorite 리스트에 넣었다면
      result = true;
      console.log(result);
    }
    console.log(result);
    res.status(200).json({
      //200은 성공했다는 뜻
      success: true,
      favorited: result,
    });
  });
});

//mongodb에 저장, 삭제 기능
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body); //instance 만들기
  console.log(favorite.movieId);
  console.log(req.body.userFrom);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorite });
  }); //정보들이 favorite document에 들어감
});

router.post("/getFavoritedMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});
module.exports = router;
