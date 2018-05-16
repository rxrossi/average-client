// @flow
export type user = {
  id: string,
  name: ?string,
  email: string,
  photo: ?string,
  photoLocation: ?{
    path: string,
    required: boolean,
    select: boolean
  }
}

export type article = {
  author: author,
  published: boolean,
  creationDate: Date,
  tags: Array<string>,
  content: string,
  mainImg: string,
  title: string,
  description: string
}
