import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/Providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        fakeNotificationsRepository = new FakeNotificationsRepository()

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider
        );


    })

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: '12312313',
            user_id: '123123'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12312313')
    })

    it('should not be able to create two appointments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        const appointmentDate = new Date(2020, 4, 10, 13)

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '12312313',
            user_id: '123123'
        });

        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '12312313',
            user_id: '123123'
        })).rejects.toBeInstanceOf(AppError)
    });

    it ('should not be able an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            provider_id: '12312313',
            user_id: '123123'
        })).rejects.toBeInstanceOf(AppError)
    });

    it ('should not be able an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'user_id',
            user_id: 'user_id'
        })).rejects.toBeInstanceOf(AppError)
    });

    it ('should not be able an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 11, 7),
            provider_id: 'provider_id',
            user_id: 'user_id'
        })).rejects.toBeInstanceOf(AppError)

        await expect(createAppointment.execute({
            date: new Date(2020, 4, 11, 18),
            provider_id: 'provider_id',
            user_id: 'user_id'
        })).rejects.toBeInstanceOf(AppError)
    })

})