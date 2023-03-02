import { Repository } from "typeorm";

import { EntityNameConstant } from "../../../constants/entity.constant";
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_USER,
} from "../../../constants/error-message.constant";
import { TokenService } from "../../../core/token/token.service";
import { LinksDataSource } from "../../../database";
import { UserEntity } from "../../../entity/user.entity";
import { User, UserHelper } from "../../models/user.model";
import { UserExtensionService } from "./user-extension.service";

export class UserService extends UserExtensionService {
  private tokenService!: TokenService;
  private userRepository!: Repository<UserEntity>;

  constructor() {
    super();
    this.tokenService = new TokenService();
    this.userRepository = LinksDataSource.getRepository(UserEntity);
  }

  /**
   * @description Get User
   * @param  {string} token
   * @param  {CallableFunction} callback
   * @returns {any} - Callback function for get response with user or error message
   */
  public async get(token: string, callback: CallableFunction): Promise<void> {
    if (!token || !token.length) {
      return callback(ERROR_MESSAGE.NOT_FOUND_ANY(EntityNameConstant.user));
    }

    const userId: number = this.tokenService.verifyToken(token)?.user?.id ?? 0;
    const foundUser: User | null = await this.getUserRepositoryById(userId);

    if (!foundUser) {
      return callback(ERROR_MESSAGE.NOT_FOUND_ANY(EntityNameConstant.user));
    }

    return callback(null, foundUser);
  }

  /**
   * @description Get user by id
   * @param  {number} userId
   * @param  {CallableFunction} callback
   * @returns {any} - Callback function for get response with user or error message
   */
  public async getById(
    userId: number,
    callback: CallableFunction
  ): Promise<User> {
    if (this.validateUserId(userId)) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.user));
    }

    const foundUser = await this.getUserRepositoryById(userId);
    if (!foundUser) {
      return callback(ERROR_MESSAGE.NOT_FOUND_ANY(EntityNameConstant.user));
    }

    return callback(null, UserHelper.mapToObject(foundUser));
  }

  /**
   * @description Get user by userName
   * @param  {string} userName
   * @param  {CallableFunction} callback
   * @returns {any} - Callback function for get response with user or error message
   */
  public async getByName(
    userName: string,
    callback: CallableFunction
  ): Promise<User> {
    if (this.validateUserName(userName)) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.user));
    }

    const foundUser = await this.getUserRepositoryByName(userName);

    if (!foundUser) {
      return callback(ERROR_MESSAGE.NOT_FOUND_ANY(EntityNameConstant.user));
    }

    return callback(null, UserHelper.mapToObject(foundUser));
  }

  /**
   * @description Create user
   * @param  {User} newUser
   * @param  {CallableFunction} callback - success: Created user, error: error message
   * @returns {any} - Callback function for get response with created user or error message
   */
  public async create(
    newUser: User,
    callback: CallableFunction
  ): Promise<void> {
    const foundUser: User | null = await this.getUserRepositoryByName(
      newUser.userName
    );

    if (foundUser) {
      return callback(ERROR_MESSAGE_USER.USER_ALREADY_EXIST_SAME_USERNAME);
    }

    const createdUser: User = this.userRepository.create(newUser);
    this.userRepository.insert(createdUser);

    if (!createdUser) {
      return callback(ERROR_MESSAGE.FAILED_CREATE_ANY(EntityNameConstant.user));
    }

    return callback(null, createdUser);
  }

  /**
   * @description Update user
   * @param  {User} updateUser
   * @param  {CallableFunction} callback - success: Updated user, error: error message
   * @returns {any} - Callback function for get response with updated user or error message
   */
  public async update(
    updateUser: User,
    callback: CallableFunction
  ): Promise<void> {
    const foundUser: User | null = await this.getUserRepositoryById(
      updateUser?.id
    );

    if (!foundUser) {
      return callback(ERROR_MESSAGE.FAILED_GET_ANY(EntityNameConstant.user));
    }

    this.userRepository.preload(updateUser);
    await this.userRepository.update(
      { id: updateUser.id },
      {
        userName: updateUser.userName,
        paraphrase: updateUser.paraphrase,
      }
    );

    const updatedUser = await this.userRepository.save(updateUser);

    if (!updatedUser) {
      return callback(ERROR_MESSAGE.FAILED_CREATE_ANY(EntityNameConstant.user));
    }

    return callback(null, UserHelper.mapToObject(updatedUser));
  }

  private async getUserRepositoryById(
    userId: number
  ): Promise<UserEntity | null> {
    const foundUser = await this.userRepository.findOneBy({ id: userId });
    return foundUser;
  }

  private async getUserRepositoryByName(
    userName: string
  ): Promise<UserEntity | null> {
    const foundUser = await this.userRepository.findOneBy({
      userName: userName,
    });
    return foundUser;
  }
}
