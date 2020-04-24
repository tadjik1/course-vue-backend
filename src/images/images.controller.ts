import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { ImageEntity } from './image.entity';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { ReqUser } from '../common/decorators/user.decorator';
import { UserEntity } from '../users/user.entity';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';

@ApiTags('Images')
@Controller('images')
@UseInterceptors(ClassSerializerInterceptor)
export class ImagesController {
  constructor(
    @Inject(ImagesService) private readonly imagesService: ImagesService,
  ) {}

  @Post('upload')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter(req, file, callback): void {
        if (!file.mimetype.includes('image/')) {
          callback(
            new BadRequestException('Поддерживаются только изображения'),
            false,
          );
        } else {
          callback(null, true);
        }
      },
    }),
  )
  @ApiOperation({ summary: 'Загрузка изображения' })
  @ApiSecurity('cookie-session')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Изображение',
    type: FileUploadDto,
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @ReqUser() user: UserEntity,
  ): Promise<ImageEntity> {
    if (!file) {
      throw new BadRequestException('Требуется файл');
    }
    return this.imagesService.saveImage(file, user);
  }

  @Get(':imageId')
  @ApiOperation({ summary: 'Получения изображения по ID' })
  @ApiOkResponse({
    content: { 'image/*': { schema: { type: 'string', format: 'binary' } } },
  })
  async getImage(@Param('imageId', ParseIntPipe) imageId: number, @Res() res) {
    const image = await this.imagesService.getImage(imageId);
    if (!image) {
      throw new NotFoundException();
    }
    res.set('content-type', image.mimetype);
    res.send(image.data);
  }
}
