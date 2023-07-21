const moment = require("moment");
const { addDays, setHours, setMinutes, formatISO } = require("date-fns");

const Sale = require("../models/dates.model");
const sendRes = require("../lib/sendRes");
const ctrlSales = {};

ctrlSales.getDates = async (req, res) => {
  const fechasDisponibles = [];
  const dias = 24;
  const horasPorDia = 1;
  const horaInicio = 3;

  for (let dia = 0; dia <= dias; dia += 3) {
    for (let hora = 0; hora < horasPorDia; hora++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + dia);
      fecha.setHours(horaInicio);
      fecha.setMinutes(0);
      fecha.setSeconds(0);
      fechasDisponibles.push(fecha.toISOString());
    }
  }

  res.json(fechasDisponibles);
};

// Endpoint POST /appointments/reserve
// app.post('/appointments/reserve', (req, res) => {
//   const { date } = req.body;

//   // Verificar si la fecha está disponible
//   const index = availableAppointments.indexOf(date);
//   if (index !== -1) {
//     // Reservar la cita eliminando la fecha de la lista de disponibles
//     availableAppointments.splice(index, 1);
//     res.status(200).json({ message: 'Cita reservada exitosamente.' });
//   } else {
//     res.status(404).json({ message: 'La cita solicitada no está disponible.' });
//   }
// });

module.exports = ctrlSales;
