import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/Providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let UpdateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        UpdateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
    })

    it('should be able to update the user avatar', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        await UpdateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg'
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update the user avatar from non existing user', async () => {
        await expect(UpdateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating the user avatar', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        await UpdateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg'
        });

        await UpdateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg'
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')

        //spy - observar se a função foi disparada

        expect(user.avatar).toBe('avatar2.jpg');
    });
})
