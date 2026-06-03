import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat/chat.gateway';
import { RatingsModule } from './rating/ratings.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RideRequestsModule } from './ride-requests/ride-requests.module';

@Module({
  imports: [GroupsModule, PrismaModule, UsersModule, AuthModule, MessagesModule,  RatingsModule,   FavoritesModule, RideRequestsModule,],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
