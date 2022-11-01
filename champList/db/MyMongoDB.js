import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const url = "mongodb://localhost:27017/fakeusers";
  const DB_NAME = "fakeUsers";
  const COLLECTION_NAME = "users";

  myDB.authenticate = async (user) => {
    const client = new MongoClient(url);
    const db = client.db(DB_NAME);
    const usersCol = db.collection(COLLECTION_NAME);
    // console.log("user collection:", usersCol);
    console.log("searching for:", user);

    const res = await usersCol.findOne({ email: user.email });
    console.log("res:", res);

    if (res === null) return false;

    console.log("res password:", res.password);
    console.log("user user password:", user.password);
    
    if (res.password === user.password) {
      return true;
    }
    return false;
  };

  myDB.createUser = async (user) => {
    const client = new MongoClient(url);
    const db = client.db(DB_NAME);
    const usersCol = db.collection(COLLECTION_NAME);
    console.log("create user searching for:", user);

    //find if already created the user
    const res = await usersCol.findOne({ email: user.email });
    console.log("res:", res);
    if (res === null) {
      console.log("Not created before");
      const newUser = await usersCol.insertOne({
        email: user.email,
        password: user.password,
      });
    } else {
      console.log("User already exists");

      return false;
    }

    return true;
  };

  return myDB;
}

export default MyMongoDB();
