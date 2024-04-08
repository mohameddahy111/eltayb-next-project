import mongoose from "mongoose"

const connect = async () => {
    await mongoose.connect(process.env.MONGODB).then(() => {
      console.log("connect")
    }).catch((err) => {
      console.log(err) 
  })
}
export default connect