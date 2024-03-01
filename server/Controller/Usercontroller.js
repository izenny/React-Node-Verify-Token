const User = require("../Modals/Userschema");
const jwt = require("jsonwebtoken");
const Crypto = require("crypto-js");
exports.createUser = async (req, res) => {
    console.log();
  const newUser = new User({
    email: req.body.email,
    password: Crypto.AES.encrypt(
      req.body.password,
      process.env.Crypto_js
    ).toString(),
  });
  try {
    console.log(newUser);
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

};

exports.LoginandToken = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ response: "please check ur email" });
      }
      const hashedPassword = Crypto.AES.decrypt(
        user.password,
        process.env.Crypto_js
      );
      const originalPassword = hashedPassword.toString(Crypto.enc.Utf8);
        console.log("original pass", originalPassword);
        console.log("login pass", req.body.password);
        if(req.body.password != originalPassword){
        return res.status(401).json({ response: "please check ur password" });

        }
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.jwt_sec,
        {
          expiresIn: "4h",
        }
      );
  
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
      console.log("login success");
    } catch (err) {
      console.log("token err:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
exports.getdatata = async( req, res)=>{
    console.log("idfjfh",req.params.id);

    try{
        console.log("idfjfh",req.params.id);
        const user = await User.findById(req.params.id)
        res.json(user)
    }catch(err){
      res.status(500).json({ error: "Internal server error" });
        
    }
}