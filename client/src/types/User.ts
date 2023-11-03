export type UserType = {
  user : {
    _id: string,
    name: string,
    email: string,
    location: string,
    job: string,
    friends: [string],
    picturePath: string,
  },
  token: string,
}