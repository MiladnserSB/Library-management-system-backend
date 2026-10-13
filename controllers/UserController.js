import User from "../models/UserModel.js";

export const getUsersController = (req, res) => {
  const { _sort, _order, _start, _end } = req.query;
  let result = [...User.findAll()];
  if (_sort && _order) {
    result.sort((a, b) => {
      if (a[_sort] < b[_sort]) return _order === "ASC" ? -1 : 1;
      if (a[_sort] > b[_sort]) return _order === "ASC" ? 1 : -1;
      return 0;
    });
  }
  const start = _start ? parseInt(_start) : 0;
  const end = _end ? parseInt(_end) : result.length;
  const paginated = result.slice(start, end);
  res.setHeader("Content-Range", `user ${start}-${end - 1}/${result.length}`);
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");
  res.json(paginated);
};
// export const getAllUsersController = (req, res) => {

//   // res.json(User.findAll());
// };

export const getUserByIdController = (req, res) => {
  const id = req.params.id;
  res.json(User.findUserById(id));
};

export const createNewUserController = (req, res) => {
  const tempUser = req.body;
  console.log(tempUser);
  const user = User.createUser(tempUser);
  res.json(user);
};

export const updateUserByIdController = (req, res) => {
  const updatedUser = req.body;
  const id = req.params.id;
  res.json(User.updateUserById(id, updatedUser));
};

export const deleteUserController = (req, res) => {
  const id = req.params.id;
  res.json(User.deleteUserById(id));
};
