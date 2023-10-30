export type UserType = {
  user : {
    name: string,
    email: string,
    location: string,
    job: string,
    friends: [string],
    picturePath: string
  },
  token: string,
}