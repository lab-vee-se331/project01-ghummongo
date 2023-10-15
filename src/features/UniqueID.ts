let UUID = 0

export default function UniqueID() {
  const getID = (): string => {
    UUID++

    return String(UUID)
  }

  return {
    getID
  }
}
