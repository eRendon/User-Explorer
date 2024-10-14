import { IUser } from './IUser'

export interface IProfile extends IUser {
  name: string
  company: string
  blog: URL
  location: string
  email: string
  hireable: string
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}
