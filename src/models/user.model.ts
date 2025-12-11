type User = {
  name: String,
  // ....
}

// Use AI to create all the db necessary functions like findById, getNotes, getNotesByTags etc and put them in their respective model folders

export const findUserById = (id: number) : User => {
  return {
    name: ""
  }
}

const me = findUserById(1)