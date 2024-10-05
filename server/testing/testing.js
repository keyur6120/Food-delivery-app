
export const testing = async (req, res) => {
  try {
    const {id} = req.user
    console.log(id)
  } catch (error) {
    res.status(500).json({ message: "error in testing in user.js", error })
  }
}
