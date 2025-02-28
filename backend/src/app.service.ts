import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { App, AppDocument } from './app.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(App.name) private appModel: Model<AppDocument>) {}

  async findAll(): Promise<App[]> {
    return this.appModel.find().exec();
  }

  async createApp(name: string, email: string): Promise<App> {
    const newApp = new this.appModel({ name, email });
    return newApp.save();
  }
}
