import {Router} from 'express'
import {parseISO} from 'date-fns'

import CreateAppointmentService from '../services/CreateAppointmenteService'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all()

    return response.json(appointments)
})


appointmentsRouter.post('/', (request, response) => {
    const { provider, date} = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentsRepository)

    const appointment = createAppointment.execute({date: parsedDate, provider:provider})

    return response.json(appointment)
})


export default appointmentsRouter
