const bcrypt = require("bcrypt");
const sendRes = require("../lib/sendRes");
const UserSchema = require("../models/user.model");
const ctrlAuth = {};

ctrlAuth.signup = async (req, res) => {
  const { name, email, pass } = req.body;
  const RegExpEmail =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;

  // Verificamos que el usuario NO exista antes de crearlo
  const userFound = await UserSchema.findOne({ email });
  if (userFound) {
    return sendRes(res, 400, false, "El usuario ya existe (E-mail Existente)");
  }

  // Por seguridad se encripta la contraseña y habiendo pasado el filtro de que no existe, se guarda el nuevo usuario, si todos los datos son correctos
  if (!RegExpEmail.test(email)) {
    return sendRes(res, 400, false, "Email Invalido");
  }
  const passHash = await bcrypt.hash(pass, 12);
  const newUser = new UserSchema({ name, email, pass: passHash });
  await newUser.save((err) => {
    if (err) {
      return sendRes(res, 400, false, "Credenciales Invalidos");
    }
    sendRes(res, 200, true, "Usuario registrado");
  });
};

ctrlAuth.getUser = async (req, res) => {
  const user = await UserSchema.findOne({ email: req.params.id });
  if (!user) {
    return sendRes(res, 400, false, "El usuario NO Existe");
  }
  res.json(user);
};

ctrlAuth.updateUser = async (req, res) => {
  const email = req.params.id;
  const { name, pass } = req.body;

  // Verificamos que el usuario existe
  const user = await UserSchema.findOne({ email: req.params.id });
  if (!user) {
    return sendRes(res, 400, false, "El usuario NO Existe");
  }

  // Si el usuario existe guardamos los datos actualizados y si se cambia la contraseña se vuelve a encriptar
  const passHash = await bcrypt.hash(pass, 12);
  const update = await UserSchema.findOneAndUpdate(
    { email },
    { name, pass: passHash }
  );

  if (!update) {
    return sendRes(res, 400, false, "Usuario NO Actualizado");
  }

  sendRes(res, 200, true, "Información de usuario actualizada");
};

module.exports = ctrlAuth;
