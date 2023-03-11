import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

export const validateData = (data: any) => {
  for (const key in data) {
    if (typeof data[key] !== "string" || data[key] === "") {
      return false
    }
  }
  return true
}
export let MMServer:MongoMemoryServer;
export const connectDB = async () => {
  let dbConnection = process.env["MongoDB"]!
  if (process.env.NODE_ENV === 'test') {
    MMServer = await MongoMemoryServer.create()
    dbConnection = await MMServer.getUri()
  }

  mongoose.connect(dbConnection).then(() => console.log("mongodb connected"))
}

export const contacts = [
  {
    name: "Fred S. Jones",
    address: "1658 Ridenour Street, Miami, FL 33128",
    phone: "786-250-4587",
    email: "FredSJones@rhyta.com"
  },
  {
    name: "David W. Ricker",
    address: "441 Massachusetts Avenue, Washington, DC 20024",
    phone: "202-707-3269",
    email: "DavidWRicker@teleworm.us"
  },
  {
    name: "Rebecca D. Robinson",
    address: "1021 Beech Street, Fremont, CA 94539",
    phone: "925-852-1603",
    email: "RebeccaDRobinson@rhyta.com"
  },
  {
    name: "Richard M. Abel",
    address: "1605 Butternut Lane, Hoffman, IL 62801",
    phone: "618-495-7556",
    email: "RichardMAbel@teleworm.us"
  },
  {
    name: "Jessica J. Williams",
    address: "2731 Vineyard Drive, Orwell, OH 44076",
    phone: "440-437-8722",
    email: "JessicaJWilliams@jourrapide.com"
  },
  {
    name: "Kelly D. Knuckles",
    address: "3373 Geraldine Lane, New York, NY 10011",
    phone: "646-295-9250",
    email: "KellyDKnuckles@jourrapide.com"
  },
  {
    name: "Ronald P. Willson",
    address: "3813 Smith Street, Needham, MA 02192",
    phone: "508-785-3660",
    email: "RonaldPWillson@armyspy.com"
  },
  {
    name: "Sandra R. Collier",
    address: "3896 Locust Court, Pomona, CA 91766",
    phone: "562-485-3135",
    email: "SandraRCollier@jourrapide.com"
  }
]